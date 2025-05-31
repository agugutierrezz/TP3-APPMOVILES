import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, useColorScheme, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const scheme = useColorScheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const ok = await register(username, password);
    if (ok) return;
    else setError('User alredy exists.');
  };

  const inputStyle = {
    color: scheme === 'dark' ? '#fff' : '#000',
    backgroundColor: scheme === 'dark' ? '#222' : '#fff',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme === 'dark' ? '#000' : '#fff' }]}>
      <TextInput
        placeholder="User"
        placeholderTextColor={scheme === 'dark' ? '#888' : '#aaa'}
        style={[styles.input, inputStyle]}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={scheme === 'dark' ? '#888' : '#aaa'}
        secureTextEntry
        style={[styles.input, inputStyle]}
        onChangeText={setPassword}
      />
      <View style={styles.button}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      <View style={styles.button}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    marginVertical: 6,
  },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
});
