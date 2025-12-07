import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyState({ title, subtitle, icon = 'help', buttonText, onPress }: { title: string; subtitle?: string; icon?: string; buttonText?: string; onPress?: () => void }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={56} color="#bbb" />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {buttonText ? (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{ color: 'white' }}>{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  subtitle: { color: '#666', marginTop: 6, textAlign: 'center' },
  btn: { marginTop: 12, backgroundColor: '#007AFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 }
});
