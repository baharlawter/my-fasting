import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
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

  const handleClearRecords = () => {
    Alert.alert(
      "Clear All Records",
      "Are you sure you want to delete all fasting records? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("fasting_records");
              Alert.alert("Success", "All records have been cleared.");
            } catch (error) {
              console.error("Error clearing records:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      "Reset App",
      "This will clear all data including records and plan selection. This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("fasting_records");
              await AsyncStorage.removeItem("selected_fasting_plan");
              Alert.alert("Success", "App has been reset.");
            } catch (error) {
              console.error("Error resetting app:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

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
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={handleClearRecords}
          >
            <ThemedText style={styles.actionButtonText}>
              Clear All Records
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.dangerButton]}
            activeOpacity={0.7}
            onPress={handleResetApp}
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
    backgroundColor: "#FFFBF0",
  },
  lead: {
    marginTop: 8,
    marginBottom: 16,
    color: "#5D4037",
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
    color: "#5D4037",
    fontWeight: "600",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F5E6D3",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8DCC4",
  },
  settingLabel: {
    fontSize: 15,
    color: "#5D4037",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F5E6D3",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8DCC4",
  },
  infoLabel: {
    fontSize: 15,
    color: "#5D4037",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8B6F47",
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#8B6F47",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    color: "#FFFBF0",
    fontSize: 16,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: "#F5E6D3",
    borderWidth: 2,
    borderColor: "#A0522D",
  },
  dangerButtonText: {
    color: "#A0522D",
    fontSize: 16,
    fontWeight: "600",
  },
});
