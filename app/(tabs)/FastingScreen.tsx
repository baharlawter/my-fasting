import React, { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function FastingScreen() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: any;

    if (running) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Fasting</ThemedText>
      <ThemedText>Track and start your fasts here.</ThemedText>

      <ThemedText style={{ marginTop: 20, fontSize: 24 }}>
        {seconds} seconds
      </ThemedText>

      <Button
        title={running ? "Stop" : "Start"}
        onPress={() => setRunning(!running)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
});
