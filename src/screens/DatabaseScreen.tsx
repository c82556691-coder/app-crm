import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import { useProducts } from '../state/ProductContext';
import { Product } from '../model/Product';
import { Ionicons } from '@expo/vector-icons';

export default function DatabaseScreen() {
  const { databaseProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  function openCreate() {
    setEditing(null);
    setName('');
    setPrice('');
    setModalVisible(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setName(p.name);
    setPrice(String(p.maxPrice));
    setModalVisible(true);
  }

  async function save() {
    if (!name.trim()) {
      Alert.alert('Nombre requerido');
      return;
    }
    const v = parseFloat(price);
    if (isNaN(v) || v <= 0) {
      Alert.alert('Precio tope debe ser mayor que 0');
      return;
    }
    if (editing) {
      await updateProduct({ ...editing, name, maxPrice: v });
    } else {
      await addProduct(name, v);
    }
    setModalVisible(false);
  }

  function confirmDelete(p: Product) {
    Alert.alert('Eliminar', `¿Eliminar '${p.name}'? Esta acción no se puede deshacer.`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => deleteProduct(p.id) }
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {databaseProducts.length === 0 ? (
        <Text style={{ color: '#666' }}>No hay productos. Pulsa + para crear uno.</Text>
      ) : (
        <FlatList data={databaseProducts} keyExtractor={(i: any) => i.id} renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => openEdit(item)} style={styles.row}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.name}</Text>
              </View>
              <Text style={{ color: '#666' }}>Precio tope: ${item.maxPrice}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmDelete(item)} style={styles.delBtn} accessibilityLabel={`Eliminar ${item.name}`}>
              <Ionicons name="trash" size={16} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        )} />
      )}

      <TouchableOpacity onPress={openCreate} style={styles.fab} accessibilityLabel="Agregar producto">
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalWrap}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: '600' }}> {editing ? 'Editar producto' : 'Crear producto'}</Text>
            <Text>Nombre</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} />
            <Text>Precio tope</Text>
            <TextInput keyboardType="numeric" value={price} onChangeText={setPrice} style={styles.input} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" onPress={save} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  delBtn: { backgroundColor: '#d9534f', padding: 8, borderRadius: 6 },
  fab: { position: 'absolute', right: 16, bottom: 16, width: 56, height: 56, borderRadius: 28, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center' },
  modalWrap: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { margin: 20, padding: 16, backgroundColor: 'white', borderRadius: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8 }
});
