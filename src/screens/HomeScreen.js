import React, { useState, useEffect, useContext } from 'react';
import {  View,  Text,  TextInput,  Button,  FlatList,  StyleSheet,  Pressable,  Modal, SafeAreaView, ScrollView } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const fetchRecipes = async (query) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error al buscar recetas:', error);
    }
  };

  useEffect(() => {
    fetchRecipes('');
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchRecipes(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        ListHeaderComponent={
          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Logged in as:</Text>
                  <Text style={styles.modalEmail}>{user?.username}</Text>
                  <View style={styles.modalButtons}>
                    <Button title="Log out" onPress={logout} color="red" />
                    <View style={{ height: 10 }} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                  </View>
                </View>
              </View>
            </Modal>

            <Pressable onPress={() => setModalVisible(true)} style={styles.userIcon}>
              <Ionicons name="person-circle-outline" size={28} color="#fff" />
            </Pressable>

            <Text style={styles.title}>Search recipes</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. pasta, chicken, rice..."
              placeholderTextColor="#aaa"
              value={search}
              onChangeText={setSearch}
            />

            <View style={styles.searchButton}>
              <Button title="Search" onPress={() => fetchRecipes(search)} color="#1e90ff" />
            </View>

            {recipes.length === 0 && (
              <Text style={styles.noResults}>No results. Try another search.</Text>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scroll: {
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 50,
    color: '#fff',
    backgroundColor: '#222',
    fontSize: 16,
  },
  searchButton: {
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#ccc',
    fontSize: 16,
  },
  userIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: 280,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalEmail: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  modalButtons: {
    width: '100%',
  },
});
