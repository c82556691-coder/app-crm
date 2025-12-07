import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useProducts } from '../state/ProductContext';
import { Ionicons } from '@expo/vector-icons';

export default function ReportScreen() {
  const { bought } = useProducts();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {bought.length === 0 ? (
        <Text style={{ color: '#666' }}>No has registrado ninguna compra aún.</Text>
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
