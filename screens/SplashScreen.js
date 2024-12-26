import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkUserName = async () => {
      try {
        // 저장된 사용자 이름 확인
        const userName = await AsyncStorage.getItem('userName');
        if (userName) {
          navigation.replace('AddHabit'); // 이름이 있으면 바로 AddHabit로 이동
        } else {
          navigation.replace('NameInputScreen'); // 없으면 NameInputScreen으로 이동
        }
      } catch (error) {
        console.error('Failed to load user name:', error);
        navigation.replace('NameInputScreen');
      }
    };

    // 4초 후 확인
    const timer = setTimeout(() => {
      checkUserName();
    }, 4000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <Text style={styles.title}>AdventureMap</Text>

      {/* 풀 이미지 */}
      <Image source={require('../assets/grass.png')} style={styles.background} />

      {/* 태양 이미지 */}
      <Image source={require('../assets/sun.png')} style={styles.sun} />

      {/* 구름 이미지 */}
      <Image source={require('../assets/clouds.png')} style={styles.clouds} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9', // 연두색 배경
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    textShadowColor: '#E91E63',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    position: 'absolute',
    top: '40%',
    textAlign: 'center',
  },
  background: {
    position: 'absolute',
    top: '60%',
    left: '10%',
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  sun: {
    position: 'absolute',
    top: '10%',
    left: '60%',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  clouds: {
    position: 'absolute',
    top: '27%',
    left: '55%',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
