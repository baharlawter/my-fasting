import React from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { styles } from "@/components/plan.styles";

export default function PlanScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Plan</ThemedText>
      <ThemedText>Define fasting plans and schedules.</ThemedText>
    </ThemedView>
  );
}
