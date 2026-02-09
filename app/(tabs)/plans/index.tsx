import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const PLANS = [
  {
    id: "16:8",
    title: "16:8",
    subtitle: "16 hours fast / 8 hours eat",
    color: "#FB6B6B",
  },
  {
    id: "18:6",
    title: "18:6",
    subtitle: "18 hours fast / 6 hours eat",
    color: "#3AB0FF",
  },
  {
    id: "20:4",
    title: "20:4",
    subtitle: "20 hours fast / 4 hours eat",
    color: "#7ED957",
  },
];

export default function PlansScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Plan</ThemedText>
      <ThemedText type="subtitle" style={styles.lead}>
        Choose a fasting window that fits your routine.
      </ThemedText>

      <View style={styles.list}>
        {PLANS.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[styles.card, { backgroundColor: plan.color }]}
            activeOpacity={0.8}
          >
            <ThemedText
              type="defaultSemiBold"
              lightColor="#ffffff"
              darkColor="#ffffff"
              style={styles.cardTitle}
            >
              {plan.title}
            </ThemedText>
            <ThemedText
              type="subtitle"
              lightColor="rgba(255,255,255,0.95)"
              darkColor="rgba(255,255,255,0.95)"
              style={styles.cardSubtitle}
            >
              {plan.subtitle}
            </ThemedText>
          </TouchableOpacity>
        ))}
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
    marginBottom: 12,
  },
  list: {
    marginTop: 8,
  },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    color: "#ffffff",
  },
  cardSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
});
