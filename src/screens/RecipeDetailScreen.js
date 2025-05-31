import React from 'react';
import {  View,  Text,  Image,  StyleSheet,  ScrollView,  Button } from 'react-native';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;

  const extractIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure,
          image: `https://www.themealdb.com/images/ingredients/${ingredient}.png`,
        });
      }
    }
    return ingredients;
  };

  const ingredientsList = extractIngredients();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {ingredientsList.map((item, idx) => (
        <View key={idx} style={styles.ingredientRow}>
          <Image source={{ uri: item.image }} style={styles.ingredientImage} />
          <Text style={styles.ingredientText}>
            {item.name} - {item.measure}
          </Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>

      <View style={styles.backButton}>
        <Button title="Back" onPress={() => navigation.goBack()} color="#888" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    color: '#fff',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#111',
  },
  ingredientText: {
    fontSize: 16,
    color: '#ccc',
  },
  instructions: {
    fontSize: 16,
    marginTop: 8,
    color: '#ddd',
    lineHeight: 22,
  },
  backButton: {
    marginTop: 20,
  },
});



