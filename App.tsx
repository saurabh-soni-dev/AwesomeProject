import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, productName: 'Mobile', quantity: 10, price: 500 },
    { id: 2, productName: 'TV', quantity: 6, price: 1000 },
    { id: 3, productName: 'Table', quantity: 7, price: 200 },
  ]);

  const AddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateItem = (id, quantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      } else {
        return item;
      }
    });
    setCart(updatedCart);
  };

  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.productName}>
          {item.productName} - ${item.price}
        </Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => AddToCart(item)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => updateItem(item.id, item.quantity + 1)}>
            <Text style={styles.buttonText}>Update item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => deleteItem(item.id)}>
            <Text style={styles.buttonText}>Delete item</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  itemContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;