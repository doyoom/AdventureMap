import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const habits = [
  { id: 1, name: 'Coding', image: require('../assets/coding.png') },
  { id: 2, name: 'Music', image: require('../assets/music.png') },
  { id: 3, name: 'Travel', image: require('../assets/travel.png') },
  { id: 4, name: 'Study', image: require('../assets/study.png') },
  { id: 5, name: 'Climbing', image: require('../assets/climbing.png') },
  { id: 6, name: 'Model', image: require('../assets/model.png') },
  { id: 7, name: 'Cooking', image: require('../assets/cooking.png') },
  { id: 8, name: 'Bicycle', image: require('../assets/bicycle.png') },
  { id: 9, name: 'Camping', image: require('../assets/camping.png') },
  { id: 10, name: 'Movie', image: require('../assets/movie.png') },
  { id: 11, name: 'Fishing', image: require('../assets/fishing.png') },
];

export default function AddHabitScreen({ navigation, selectedHabits, setSelectedHabits, userName }) {
  const addHabit = (habit) => {
    if (!selectedHabits.some((h) => h.id === habit.id)) {
      setSelectedHabits([...selectedHabits, habit]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Add Adventures ✨</Text>
      <ScrollView>
        {habits
          .filter((habit) => !selectedHabits.some((h) => h.id === habit.id))
          .map((habit) => (
            <TouchableOpacity
              key={habit.id}
              style={styles.button}
              onPress={() => addHabit(habit)}
            >
              <Text style={styles.buttonText}>{habit.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Your Habits */}
      <Text style={styles.subtitle}>🕯️ {userName}'s Adventures 🕯️</Text>
      {selectedHabits.map((habit) => (
        <View key={habit.id} style={styles.yourHabitItem}>
          <Text style={styles.habitText}>{habit.name}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => navigation.navigate('HabitMap', { selectedHabits })}

      >
        <Text style={styles.mapButtonText}>Adventure Your LifeMap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9', padding: 34 },
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'System', // iOS 기본 폰트 (변경하려면 커스텀 폰트 설정 필요)
    textShadowColor: '#E91E63', // 분홍색 그림자
    textShadowOffset: { width: 2, height: 2 }, // 그림자 위치
    textShadowRadius: 2, // 그림자 번짐 정도
  },
  subtitle: { fontSize: 27, fontWeight: 'bold', marginTop: 10, textAlign: 'center', color: '#4CAF50' , textShadowColor: '#E91E63', // 분홍색 그림자
    textShadowOffset: { width: 2, height: 2 }, // 그림자 위치
    textShadowRadius: 1, }, // 그림자 번짐 정도},
  button: { backgroundColor: '#A5D6A7', padding: 9, marginVertical: 5, borderRadius: 10 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  yourHabitItem: { backgroundColor: '#C8E6C9', padding: 10, marginVertical: 3, borderRadius: 10 },
  habitText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  mapButton: { backgroundColor: '#81C784', padding: 15, marginTop: 20, borderRadius: 10 },
  mapButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});
