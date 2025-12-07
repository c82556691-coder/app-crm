import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useProducts } from '../state/ProductContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { toBuy, bought, loading } = useProducts();

  const lastBought = bought.length > 0 ? bought[0] : null;

  const lastMonth = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const spendLastMonth = bought.reduce((acc: number, p: any) => (p.purchaseDate && p.purchaseDate >= lastMonth ? acc + (p.purchasePrice || 0) : acc), 0);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="cart" size={28} color="#007AFF" />
        <Text style={styles.title}>  App-Comprador</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Productos pendientes</Text>
        <Text style={styles.cardValue}>{toBuy.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gasto últimos 30 días</Text>
        <Text style={styles.cardValue}>${spendLastMonth.toFixed(2)}</Text>
      </View>

      <View style={{ marginTop: 8 }}>
        {lastBought ? (
          <Text>Último comprado: <Text style={{ fontWeight: '600' }}>{lastBought.name}</Text> — {new Date(lastBought.purchaseDate || 0).toLocaleDateString()}</Text>
        ) : (
          <Text style={{ color: '#666' }}>No hay actividad reciente</Text>
        )}
      </View>

      <View style={{ marginTop: 16 }}>
        <Button title="Comprar" onPress={() => navigation.navigate('Buy')} />
        <View style={{ height: 8 }} />
        <Button title="Base de datos" onPress={() => navigation.navigate('Database')} />
        <View style={{ height: 8 }} />
        <Button title="Informe" onPress={() => navigation.navigate('Report')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginTop: 8, shadowColor: '#000', shadowOpacity: 0.05, elevation: 1 },
  cardTitle: { color: '#666' },
  cardValue: { fontSize: 18, fontWeight: '700', marginTop: 4 }
});
