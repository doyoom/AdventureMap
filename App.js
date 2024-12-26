import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './screens/SplashScreen';
import NameInputScreen from './screens/NameInputScreen';
import AddHabitScreen from './screens/AddHabitScreen';
import HabitMapScreen from './screens/HabitMapScreen';
import CalendarScreen from './screens/CalendarScreen';
import WeatherScreen from './screens/WeatherScreen';

const Stack = createStackNavigator();

export default function App() {
  const [selectedHabits, setSelectedHabits] = useState([]); // 추가된 습관 상태
  const [userName, setUserName] = useState(''); // 사용자 이름 상태

  // 앱 시작 시 저장된 사용자 이름 불러오기
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error('Failed to load user name:', error);
      }
    };
    loadUserName();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {/* 스플래시 화면 */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* 이름 입력 화면 */}
        <Stack.Screen name="NameInputScreen">
          {(props) => <NameInputScreen {...props} setUserName={setUserName} />}
        </Stack.Screen>

        {/* 습관 추가 화면 */}
        <Stack.Screen name="AddHabit">
          {(props) => (
            <AddHabitScreen
              {...props}
              selectedHabits={selectedHabits}
              setSelectedHabits={setSelectedHabits}
              userName={userName} 
            />
          )}
        </Stack.Screen>

        {/* 지도 화면 */}
        <Stack.Screen name="HabitMap">
  {(props) => (
    <HabitMapScreen
      {...props}
      selectedHabits={selectedHabits}
      userName={userName} // 사용자 이름 전달
    />
  )}
</Stack.Screen>


        {/* 달력 화면 */}
        <Stack.Screen name="CalendarScreen">
          {(props) => <CalendarScreen {...props} selectedHabits={selectedHabits} 
          userName={userName} 
          />}
        </Stack.Screen>

        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
