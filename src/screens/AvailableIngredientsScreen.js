import React, { useEffect, useState } from 'react';
import {  View,  Text,  TextInput,  Button,  FlatList,  TouchableOpacity,  StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function AvailableIngredientsScreen({ navigation }) {
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then(res => res.json())
      .then(data => {
        const list = data.meals?.map(item => item.strIngredient) || [];
        setAllIngredients(list);
      })
      .catch(err => console.error('Error fetching ingredients:', err));
  }, []);

  useEffect(() => {
    if (input.length > 0) {
      const filtered = allIngredients
        .filter(ing => ing.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [input, allIngredients]);

  const addIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
    setInput('');
    setSuggestions([]);
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
  };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Choose ingredients</Text>

        <TextInput
            style={styles.input}
            placeholder="Type ingredient name"
            placeholderTextColor="#888"
            value={input}
            onChangeText={setInput}
        />

        {suggestions.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => addIngredient(item)} style={styles.suggestion}>
            <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
        ))}

        <Text style={styles.subtitle}>Selected:</Text>
        <FlatList
            data={selectedIngredients}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => removeIngredient(item)}>
                <Text style={styles.selectedItem}>❌ {item}</Text>
            </TouchableOpacity>
            )}
        />

        {selectedIngredients.length > 0 && (
            <View style={styles.searchButton}>
            <Button
                title="Search recipes with these"
                onPress={() =>
                navigation.navigate('RecipesWithIngredients', {
                    ingredients: selectedIngredients,
                })
                }
                color="#1e90ff"
            />
            </View>
        )}
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    scroll: { padding: 16 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
    input: {
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#222',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 50,
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    },
    suggestion: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#333',
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    },
    suggestionText: { color: '#fff' },
    subtitle: { marginTop: 20, fontSize: 18, fontWeight: '600', color: '#ccc' },
    selectedItem: {
    padding: 6,
    fontSize: 16,
    color: '#fff',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    },
    searchButton: {
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
    },
});

