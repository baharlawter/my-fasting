import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function FastingScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Fasting</ThemedText>
      <ThemedText>Track and start your fasts here.</ThemedText>
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
