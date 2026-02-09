import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const RECORDS_STORAGE_KEY = "fasting_records";
const SELECTED_PLAN_KEY = "selected_fasting_plan";

function formatDuration(totalSeconds: number) {
  if (totalSeconds < 0) totalSeconds = 0;
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function formatTimeStamp(ts?: number) {
  if (!ts) return "--:--";
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function FastingScreen() {
  const [fastingHours, setFastingHours] = useState(16); // default
  const [running, setRunning] = useState(false);
  const [startAt, setStartAt] = useState<number | null>(null);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());

  // Load selected plan on mount
  useEffect(() => {
    loadSelectedPlan();
  }, []);

  const loadSelectedPlan = async () => {
    try {
      const selectedPlan = await AsyncStorage.getItem(SELECTED_PLAN_KEY);
      if (selectedPlan) {
        // Extract hours from plan like "16:8" or "18:6"
        const hours = parseInt(selectedPlan.split(":")[0], 10);
        setFastingHours(hours);
      }
    } catch (error) {
      console.error("Error loading selected plan:", error);
    }
  };

  // tick every second while running (or to keep UI live)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!running) return;
    // if running and start/end not set, initialize
    if (!startAt) {
      const s = Date.now();
      const e = s + fastingHours * 60 * 60 * 1000;
      setStartAt(s);
      setEndAt(e);
    }
  }, [running, startAt, fastingHours]);

  // derived values
  const elapsedSeconds = startAt ? Math.floor((now - startAt) / 1000) : 0;
  const remainingSeconds = endAt
    ? Math.max(0, Math.floor((endAt - now) / 1000))
    : fastingHours * 3600;

  // stop when finished
  useEffect(() => {
    if (running && endAt && now >= endAt) {
      setRunning(false);
    }
  }, [now, running, endAt]);

  function handleStart() {
    setStartAt(null);
    setEndAt(null);
    setRunning(true);
  }

  function handleEnd() {
    if (startAt && endAt) {
      // Save the record
      saveRecord(startAt, endAt);
    }
    setRunning(false);
  }

  async function saveRecord(start: number, end: number) {
    try {
      const data = await AsyncStorage.getItem(RECORDS_STORAGE_KEY);
      const records = data ? JSON.parse(data) : [];

      const dateStr = new Date(start).toISOString().split("T")[0]; // YYYY-MM-DD
      const durationMs = end - start;
      const durationHours =
        Math.round((durationMs / (1000 * 60 * 60)) * 10) / 10;

      const newRecord = {
        date: dateStr,
        startTime: start,
        endTime: end,
        durationHours,
      };

      records.push(newRecord);
      await AsyncStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(records));

      Alert.alert("Fast Saved!", `Duration: ${durationHours}h`);
    } catch (error) {
      console.error("Error saving record:", error);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Fasting</ThemedText>
      <ThemedText style={styles.lead}>
        {fastingHours}-hour fast in progress
      </ThemedText>

      <View style={styles.timerContainer}>
        <View style={styles.timerRing}>
          <ThemedText type="title" style={styles.timerValue}>
            {formatDuration(elapsedSeconds)}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.timerSmall}>
            Elapsed
          </ThemedText>
        </View>

        <ThemedText type="defaultSemiBold" style={styles.remainingLabel}>
          Remaining: {formatDuration(remainingSeconds)}
        </ThemedText>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoCol}>
          <ThemedText type="subtitle">Start</ThemedText>
          <ThemedText style={styles.infoTime}>
            {formatTimeStamp(startAt ?? undefined)}
          </ThemedText>
        </View>
        <View style={styles.infoCol}>
          <ThemedText type="subtitle">End</ThemedText>
          <ThemedText style={styles.infoTime}>
            {formatTimeStamp(endAt ?? undefined)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.actionsRow}>
        {!running ? (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <ThemedText type="defaultSemiBold" style={styles.startText}>
              Start
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.endButton}
            onPress={handleEnd}
            activeOpacity={0.8}
          >
            <ThemedText type="defaultSemiBold" style={styles.endText}>
              End fast
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  lead: {
    marginTop: 8,
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  timerRing: {
    width: 240,
    height: 240,
    borderRadius: 240 / 2,
    borderWidth: 12,
    borderColor: "rgba(251,107,107,0.25)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  timerValue: {
    marginTop: 0,
    fontSize: 40,
    letterSpacing: 1,
  },
  timerSmall: {
    marginTop: 8,
    fontSize: 14,
    color: "#6b7280",
  },
  remainingLabel: {
    marginTop: 14,
    fontSize: 16,
    color: "#374151",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  infoCol: {
    flex: 1,
  },
  infoTime: {
    marginTop: 6,
    fontSize: 16,
  },
  actionsRow: {
    alignItems: "center",
    marginTop: 12,
  },
  startButton: {
    backgroundColor: "#FB6B6B",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 32,
    shadowColor: "#FB6B6B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  startText: {
    color: "#fff",
    fontSize: 16,
  },
  endButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#FB6B6B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  endText: {
    color: "#FB6B6B",
    fontSize: 16,
  },
});
