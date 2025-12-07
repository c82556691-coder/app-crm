import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useProducts } from '../state/ProductContext';
import { Ionicons } from '@expo/vector-icons';
import EmptyState from '../components/EmptyState';

export default function ReportScreen() {
  const { bought } = useProducts();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {bought.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <EmptyState title="No hay compras registradas" subtitle="Las compras que registres aparecerán aquí" icon="receipt" />
        </View>
      ) : (
        <FlatList data={bought} keyExtractor={(i: any) => i.id} renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.isBeer && <Ionicons name="beer" size={16} color="#ff8c00" style={{ marginRight: 8 }} />}
                <Text style={{ fontWeight: '600' }}>{item.name}</Text>
              </View>
              <Text style={{ color: item.purchasePrice && item.purchasePrice > item.maxPrice ? '#c62828' : '#333' }}>${item.purchasePrice?.toFixed(2)} — {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : ''}</Text>
            </View>
          </View>
        )} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' }
});
