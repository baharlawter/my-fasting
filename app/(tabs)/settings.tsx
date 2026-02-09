import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Setting</ThemedText>
      <ThemedText style={styles.lead}>
        Customize your fasting experience.
      </ThemedText>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notifications Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Notifications
          </ThemedText>
          <View style={styles.settingItem}>
            <ThemedText style={styles.settingLabel}>
              Fast Completion Alerts
            </ThemedText>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: "#81C784" }}
              thumbColor={notifications ? "#FB6B6B" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Appearance
          </ThemedText>
          <View style={styles.settingItem}>
            <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#767577", true: "#81C784" }}
              thumbColor={darkMode ? "#FB6B6B" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            About
          </ThemedText>
          <View style={styles.infoItem}>
            <ThemedText style={styles.infoLabel}>App Version</ThemedText>
            <ThemedText style={styles.infoValue}>1.0.0</ThemedText>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <ThemedText style={styles.actionButtonText}>
              Clear All Records
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.dangerButton]}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.dangerButtonText}>Reset App</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
  },
  settingLabel: {
    fontSize: 15,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 15,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#3AB0FF",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: "rgba(251,107,107,0.1)",
    borderWidth: 1,
    borderColor: "#FB6B6B",
  },
  dangerButtonText: {
    color: "#FB6B6B",
    fontSize: 16,
    fontWeight: "600",
  },
});
