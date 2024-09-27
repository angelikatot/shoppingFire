import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import app from './firebaseConfig'
import { useEffect, useState } from 'react';

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);
  const database = getDatabase(app);

  const handleSave = () => {
    if (product && amount) {
      push(ref(database, 'items/'), {
        name: product,
        amount: amount,
      });
      setProduct('');
      setAmount('');
    } else {
      Alert.alert('Error', 'Please enter both product and amount.');
    }
  };

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setItems(Object.entries(data).map(([key, value]) => ({ key, ...value }))); // Include keys
      } else {
        setItems([]);
      }
    });
  }, [database]);

  const handleRemove = (key) => {
    remove(ref(database, `items/${key}`))
      .then(() => {
        Alert.alert('Success', 'Item removed successfully.');
      })
      .catch((error) => {
        Alert.alert('Error', 'Could not remove item: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product"
          value={product}
          onChangeText={setProduct}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="SAVE" onPress={handleSave} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name} - {item.amount}</Text>
            <Button title="delete" onPress={() => handleRemove(item.key)} />
          </View>
        )}
        style={styles.listContainer}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    marginTop: 50,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
  },
  listContainer: {
    marginTop: 20,
    width: '100%',
  },
});
