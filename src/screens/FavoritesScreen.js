import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

export default function FavoritesScreen() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        ListHeaderComponent={
          <Text style={styles.title}>Your favorites</Text>
        }
        ListEmptyComponent={
          <Text style={styles.noResults}>You haven't added any favorites yet.</Text>
        }
        contentContainerStyle={favorites.length === 0 && styles.centered}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  noResults: {
    color: '#ccc',
    marginTop: 32,
    fontSize: 16,
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
