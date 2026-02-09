import { ThemedView } from "@components/themed-view";
import { ThemedText } from "@components/themed-text";

export default function PlansScreen() {
  return (
    <ThemedView style={{ padding: 16 }}>
      <ThemedText type="title">Plans</ThemedText>

      <ThemedText>16:8</ThemedText>
      <ThemedText>18:6</ThemedText>
      <ThemedText>20:4</ThemedText>
    </ThemedView>
  );
}
