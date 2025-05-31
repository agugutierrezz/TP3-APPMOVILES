import React, { useEffect, useState } from 'react';
import {  View,  Text,  FlatList,  StyleSheet,  Image,  Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RecipesWithIngredientsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { ingredients } = route.params;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const query = ingredients.join(',');
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };
    fetchRecipes();
  }, [ingredients]);

  const handleRecipePress = async (idMeal) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await res.json();
        const fullRecipe = data.meals[0];
        navigation.navigate('Detalle', { recipe: fullRecipe });
    } catch (err) {
        console.error('Error fetching full recipe:', err);
    }
    };

    return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handleRecipePress(item.idMeal)}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.meal}>{item.strMeal}</Text>
          </Pressable>
        )}
        ListHeaderComponent={
          <Text style={styles.title}>Recipes with selected ingredients</Text>
        }
        ListEmptyComponent={
          <Text style={styles.noResults}>No recipes found</Text>
        }
        ListFooterComponent={
          <View style={styles.backContainer}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>BACK</Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  noResults: { color: '#888', textAlign: 'center', marginTop: 20 },
  card: { marginBottom: 12, backgroundColor: '#111', borderRadius: 10, overflow: 'hidden' },
  image: { width: '100%', height: 160 },
  meal: { color: '#fff', fontSize: 18, padding: 12 },
  backContainer: { marginTop: 20, alignItems: 'center' },
  backButton: {
    backgroundColor: '#888',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  backText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});