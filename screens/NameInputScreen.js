import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation, setUserName }) {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      setUserName(name);
      navigation.navigate('AddHabit');
    } else {
      alert('Please enter your name to continue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorer's Name🕵️‍♀️</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Start Your Adventure</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  startButton: {
    backgroundColor: '#81C784',
    padding: 15,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
