import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';


export default function RecipeCard({ recipe }) {
    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
    const fav = isFavorite(recipe.idMeal);
    const navigation = useNavigation();
    const openDetail = () => {
        navigation.navigate('Detalle', { recipe });
    };
    const { user } = useContext(AuthContext);


    const toggleFavorite = () => {
        if (!user) {
            alert('Debes iniciar sesión para usar favoritos');
        return;
        }
        if (fav) removeFavorite(recipe.idMeal);
        else addFavorite(recipe);
    };

  return (
    <TouchableOpacity onPress={openDetail} style={styles.card}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={24} color={fav ? 'red' : 'gray'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    marginHorizontal: 10,
    elevation: 4,
    },
    image: {
    width: '100%',
    height: 180,
    },
    info: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    },
    title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
    },
});
