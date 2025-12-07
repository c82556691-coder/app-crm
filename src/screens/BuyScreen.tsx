import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import { useProducts } from '../state/ProductContext';
import { Product } from '../model/Product';
import { Ionicons } from '@expo/vector-icons';

export default function BuyScreen() {
  const { toBuy, markAsBought } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceText, setPriceText] = useState('');

  function openBuy(p: any) {
    setSelectedId(p.id);
    setSelectedProduct(p);
    setPriceText('');
    setModalVisible(true);
  }

  async function confirmBuy() {
    if (!selectedId || !selectedProduct) return;
    const price = parseFloat(priceText);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Precio inválido', 'Introduce un precio mayor a 0');
      return;
    }
    await markAsBought(selectedId, price);
    setModalVisible(false);
  }

  function renderItem({ item }: any) {
    return (
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.isBeer && <Ionicons name="beer" size={18} color="#ff8c00" style={{ marginRight: 8 }} />}
            <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.name}</Text>
          </View>
          <Text style={{ color: '#666' }}>Precio tope: ${item.maxPrice}</Text>
        </View>
        <TouchableOpacity onPress={() => openBuy(item)} style={styles.btn} accessibilityLabel={`Comprar ${item.name}`}>
          <Text style={{ color: 'white' }}>Comprar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {toBuy.length === 0 ? (
        <Text>No hay productos para comprar. Añade desde 'Base de datos'</Text>
      ) : (
        <FlatList data={toBuy} keyExtractor={(i: any) => i.id} renderItem={renderItem} />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalWrap}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: '600', marginBottom: 8 }}>{selectedProduct ? selectedProduct.name : 'Registrar compra'}</Text>
            <Text>Precio real:</Text>
            <TextInput keyboardType="numeric" value={priceText} onChangeText={setPriceText} style={styles.input} />

            {/* Sobreprecio: feedback en tiempo real */}
            {selectedProduct && priceText.length > 0 && (() => {
              const v = parseFloat(priceText);
              if (!isNaN(v) && v > selectedProduct.maxPrice) {
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="warning" size={18} color="#c62828" />
                    <Text style={{ color: '#c62828', marginLeft: 6 }}>Precio superior al tope (${selectedProduct.maxPrice})</Text>
                  </View>
                );
              }
              return null;
            })()}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Confirmar" onPress={confirmBuy} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  btn: { backgroundColor: '#007AFF', padding: 8, borderRadius: 6 },
  modalWrap: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { margin: 20, padding: 16, backgroundColor: 'white', borderRadius: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8 }
});
