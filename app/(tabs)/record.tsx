import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

interface FastingRecord {
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: number;
  endTime: number;
  durationHours: number;
}

const STORAGE_KEY = "fasting_records";

export default function RecordScreen() {
  const [records, setRecords] = useState<FastingRecord[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load records on mount
  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setRecords(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading records:", error);
    }
  };

  const saveRecords = async (newRecords: FastingRecord[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
      setRecords(newRecords);
    } catch (error) {
      console.error("Error saving records:", error);
    }
  };

  const addRecord = (date: string, startTime: number, endTime: number) => {
    const durationMs = endTime - startTime;
    const durationHours = durationMs / (1000 * 60 * 60);

    const newRecord: FastingRecord = {
      date,
      startTime,
      endTime,
      durationHours: Math.round(durationHours * 10) / 10,
    };

    const updated = [...records, newRecord].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    saveRecords(updated);
  };

  const deleteRecord = (date: string) => {
    const updated = records.filter((r) => r.date !== date);
    saveRecords(updated);
  };

  const getRecordsForMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthNum = month.getMonth();

    return records.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === year && recordDate.getMonth() === monthNum
      );
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const hasRecord = (day: number): FastingRecord | undefined => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1,
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return records.find((r) => r.date === dateStr);
  };

  const monthlyRecords = getRecordsForMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Record</ThemedText>
      <ThemedText style={styles.lead}>
        Track your completed fasts in the calendar below.
      </ThemedText>

      {/* Month Navigation */}
      <View style={styles.monthHeader}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <ThemedText style={styles.navText}>‹</ThemedText>
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold" style={styles.monthName}>
          {monthName}
        </ThemedText>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <ThemedText style={styles.navText}>›</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Day Headers */}
      <View style={styles.dayHeaderRow}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <View key={day} style={styles.dayHeaderCell}>
            <ThemedText type="defaultSemiBold" style={styles.dayHeaderText}>
              {day}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <ScrollView style={styles.calendarScroll}>
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, idx) => {
            const record = day ? hasRecord(day) : undefined;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.calendarDay,
                  day === null && styles.emptyDay,
                  record && styles.recordedDay,
                ]}
                onPress={() => {
                  if (record) {
                    Alert.alert(
                      `${record.date}`,
                      `Duration: ${record.durationHours}h\nStart: ${new Date(record.startTime).toLocaleTimeString()}\nEnd: ${new Date(record.endTime).toLocaleTimeString()}`,
                      [
                        {
                          text: "Delete",
                          onPress: () => deleteRecord(record.date),
                          style: "destructive",
                        },
                        { text: "Cancel", style: "cancel" },
                      ],
                    );
                  }
                }}
              >
                <ThemedText
                  style={[
                    styles.dayText,
                    record && styles.recordedDayText,
                    day === null && styles.emptyDayText,
                  ]}
                >
                  {day}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Summary */}
      <View style={styles.summary}>
        <ThemedText type="subtitle">
          Fasts this month: {monthlyRecords.length}
        </ThemedText>
        {monthlyRecords.length > 0 && (
          <ThemedText style={styles.summaryText}>
            Avg duration:{" "}
            {(
              monthlyRecords.reduce((sum, r) => sum + r.durationHours, 0) /
              monthlyRecords.length
            ).toFixed(1)}
            h
          </ThemedText>
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
    marginBottom: 16,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  monthName: {
    fontSize: 16,
  },
  dayHeaderRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  dayHeaderCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 12,
  },
  calendarScroll: {
    flex: 1,
    marginBottom: 12,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarDay: {
    width: "14.28%", // 7 columns
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  emptyDay: {
    backgroundColor: "transparent",
  },
  recordedDay: {
    backgroundColor: "#FB6B6B",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
  },
  recordedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyDayText: {
    color: "transparent",
  },
  summary: {
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 8,
  },
  summaryText: {
    marginTop: 6,
    fontSize: 14,
  },
});
