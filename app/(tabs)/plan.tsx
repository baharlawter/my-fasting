import React from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const PLANS = [
  {
    id: "16:8",
    title: "16:8",
    subtitle: "16 hours fast / 8 hours eat",
    benefits: "Best for beginners",
    color: "#FB6B6B",
  },
  {
    id: "18:6",
    title: "18:6",
    subtitle: "18 hours fast / 6 hours eat",
    benefits: "Moderate challenge",
    color: "#3AB0FF",
  },
  {
    id: "20:4",
    title: "20:4",
    subtitle: "20 hours fast / 4 hours eat",
    benefits: "Advanced fasting",
    color: "#7ED957",
  },
];

export default function Plans() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Plan</ThemedText>
      <ThemedText style={styles.lead}>
        Choose a fasting window that fits your routine.
      </ThemedText>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {PLANS.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[styles.card, { backgroundColor: plan.color }]}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeader}>
              <View>
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
              </View>
              <ThemedText
                style={styles.cardIcon}
              >
                ⏱️
              </ThemedText>
            </View>
            <View style={styles.cardDivider} />
            <ThemedText
              lightColor="rgba(255,255,255,0.9)"
              darkColor="rgba(255,255,255,0.9)"
              style={styles.cardBenefits}
            >
              {plan.benefits}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.info}>
        <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
          💡 Tip
        </ThemedText>
        <ThemedText style={styles.infoText}>
          Start with 16:8 and gradually increase your fasting window as you get more comfortable.
        </ThemedText>
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
  list: {
    flex: 1,
  },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  },
  cardIcon: {
    fontSize: 28,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 12,
  },
  cardBenefits: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  info: {
    padding: 14,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
