import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalendarScreen({ navigation, selectedHabits }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [habitForDate, setHabitForDate] = useState({});
  const [showHabitModal, setShowHabitModal] = useState(false);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const storedHabits = await AsyncStorage.getItem('habitForDate');
        if (storedHabits) {
          const parsedHabits = JSON.parse(storedHabits);
          const fixedHabits = Object.fromEntries(
            Object.entries(parsedHabits).map(([date, habits]) => [
              date,
              Array.isArray(habits) ? habits : [],
            ])
          );
          setHabitForDate(fixedHabits);
        }
      } catch (error) {
        console.error('Failed to load habits:', error);
      }
    };
    loadHabits();
  }, []);

  const saveHabits = async (updatedHabits) => {
    try {
      await AsyncStorage.setItem('habitForDate', JSON.stringify(updatedHabits));
    } catch (error) {
      console.error('Failed to save habits:', error);
    }
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowHabitModal(true);
  };

  const selectHabit = (habit) => {
    const updatedHabits = {
      ...habitForDate,
      [selectedDate]: [
        ...(habitForDate[selectedDate] || []),
        { name: habit.name, image: habit.image },
      ],
    };
    setHabitForDate(updatedHabits);
    saveHabits(updatedHabits);
    setShowHabitModal(false);
  };

  const closeHabitModal = () => {
    setShowHabitModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Weather 안내 텍스트 */}
      <View style={styles.weatherTextContainer}>
        <Text style={styles.weatherText}>
          Before you start your journey, check out today's{' '}
          <Text
            style={styles.weatherLink}
            onPress={() => navigation.navigate('WeatherScreen')}
          >
            weather
          </Text>
          !
        </Text>
      </View>

      {/* 캘린더 제목 */}
      <Text style={styles.title}>✨My Calendar✨</Text>

      {/* 캘린더 */}
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...Object.keys(habitForDate).reduce((acc, date) => {
            acc[date] = {
              selected: true,
              selectedColor: '#81C784',
            };
            return acc;
          }, {}),
        }}
        theme={{
          todayTextColor: '#FFCDD2',
          arrowColor: '#4CAF50',
        }}
      />

      {/* 선택된 날짜의 습관 정보 표시 */}
      {selectedDate && habitForDate[selectedDate]?.length > 0 && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedDateText}>{`On ${selectedDate}:`}</Text>
          <View style={styles.habitRowContainer}>
            {habitForDate[selectedDate].map((habit, index) => (
              <View key={index} style={styles.habitRow}>
                <Image source={habit.image} style={styles.habitImage} />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 모달 */}
      <Modal visible={showHabitModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Today's Adventure</Text>
          <FlatList
            data={selectedHabits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.habitButton}
                onPress={() => selectHabit(item)}
              >
                <Text style={styles.habitButtonText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeHabitModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Map으로 이동 버튼 */}
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => navigation.navigate('HabitMap')}
      >
        <Text style={styles.mapButtonText}>Go to Map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  weatherTextContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  weatherLink: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  selectedInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  selectedDateText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  habitRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  habitRow: {
    marginHorizontal: 5,
  },
  habitImage: {
    width: 80,
    height: 80,
  },
  mapButton: {
    marginTop: 20,
    backgroundColor: '#FFCDD2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  mapButtonText: {
    color: '#880E4F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  habitButton: {
    backgroundColor: '#81C784',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
  },
  habitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FFCDD2',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonText: {
    color: '#880E4F',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
