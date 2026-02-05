import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function RecordScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Record</ThemedText>
      <ThemedText>View past fasts and notes.</ThemedText>
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
