import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated, Text, TouchableOpacity } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';

export default function HabitMapScreen({ navigation, selectedHabits, userName }) {
  const viewShotRef = useRef();
  const [displayedHabits, setDisplayedHabits] = useState([]);
  const fadeInAnims = useRef({}); // 각 습관별 투명도 애니메이션 값
  const scaleAnims = useRef({}); // 각 습관별 크기 애니메이션 값

  // 습관별 고정된 위치
  const habitPositions = {
    model: { top: 450, left: 180 },
    cooking: { top: 420, left: 250 },
    coding: { top: 445, left: 10 },
    climbing: { top: 220, left: 35 },
    music: { top: 420, left: 100 },
    travel: { top: 120, left: 35 },
    study: { top: 230, left: 238 },
    bicycle: { top: 325, left: 235 },
    camping: { top: 160, left: 135 },
    movie: { top: 270, left: 135 },
    fishing: { top: 260, left: 140 },
  };

  // 저장 및 공유 기능
  const saveAndShare = () => {
    viewShotRef.current.capture().then((uri) => {
      // 1. 갤러리에 저장
      CameraRoll.save(uri, { type: 'photo' })
        .then(() => {
          alert('Image saved to gallery!');
          // 2. 저장 후 공유
          const shareOptions = {
            title: 'Adventure Map',
            url: uri,
            failOnCancel: false,
          };
          Share.open(shareOptions)
            .then(() => console.log('Shared successfully!'))
            .catch((err) => console.error('Sharing failed:', err));
        })
        .catch((err) => console.error('Save failed:', err));
    });
  };

  useEffect(() => {
    // 새로 추가된 습관만 필터링
    const newHabits = selectedHabits.filter(
      (habit) => !displayedHabits.some((h) => h.id === habit.id)
    );

    newHabits.forEach((habit) => {
      if (!fadeInAnims.current[habit.id]) {
        // 새로 추가된 습관에만 애니메이션 값 초기화
        fadeInAnims.current[habit.id] = new Animated.Value(0);
        scaleAnims.current[habit.id] = new Animated.Value(0.3);

        // 애니메이션 적용
        Animated.sequence([
          Animated.parallel([
            Animated.timing(fadeInAnims.current[habit.id], {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.spring(scaleAnims.current[habit.id], {
              toValue: 1.2,
              friction: 4,
              tension: 40,
              useNativeDriver: true,
            }),
          ]),
          Animated.spring(scaleAnims.current[habit.id], {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });

    // 새 습관을 표시된 습관 목록에 추가
    setDisplayedHabits((prev) => [...prev, ...newHabits]);
  }, [selectedHabits]);

  return (
    <View style={styles.container}>
      {/* ViewShot 영역 */}
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'jpg', quality: 0.9 }}
        style={styles.captureArea}
      >
        {/* 사용자 이름 포함 타이틀 */}
        <Text style={styles.title}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.title}>{"'s Adventure Map"}</Text>
        </Text>

        <Image source={require('../assets/sun.png')} style={styles.sunImage} />
        <Image source={require('../assets/clouds.png')} style={styles.cloudsImage} />
        <Image source={require('../assets/grass.png')} style={styles.grassImage} />
        <Image source={require('../assets/back.png')} style={styles.backImage} />


        {/* 습관 이미지 */}
        {displayedHabits.map((habit) => {
          const position = habitPositions[habit.name.toLowerCase()] || { top: 0, left: 0 };

          return (
            <Animated.Image
              key={habit.id}
              source={habit.image}
              style={[
                styles.image,
                position,
                {
                  opacity: fadeInAnims.current[habit.id] || 1,
                  transform: [
                    { scale: scaleAnims.current[habit.id] || 1 },
                  ],
                },
              ]}
            />
          );
        })}
      </ViewShot>

      {/* 저장 및 공유 버튼 */}
      <TouchableOpacity style={styles.shareButton} onPress={saveAndShare}>
        <Text style={styles.shareButtonText}>Save & Share</Text>
      </TouchableOpacity>

      {/* 추가 기능 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddHabit')}>
        <Text style={styles.addButtonText}>Add Adventure</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.calendarButton} onPress={() => navigation.navigate('CalendarScreen')}>
        <Text style={styles.calendarButtonText}>Go to Calendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    position: 'relative',
  },
  captureArea: { flex: 1 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 50,
    textShadowColor: '#E91E63',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  userName: {
    fontSize: 36,
    color: '#5A5A5A',
  },
  image: {
    position: 'absolute',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  backImage: {
    position: 'absolute',
    top: -4, // Adjust this value to move the image upward
    left: -1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sunImage: {
    position: 'absolute',
    top: 90,
    right: 10,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  cloudsImage: {
    position: 'absolute',
    top: 110,
    left: 140,
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  grassImage: {
    position: 'absolute',
    top: 310,
    right: 160,
    width: 180,
    height: 130,
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    bottom: 65,
    left: 35,
    backgroundColor: '#FFCDD2',
    padding: 15,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#880E4F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  calendarButton: {
    position: 'absolute',
    bottom: 65,
    right: 35,
    backgroundColor: '#81C784',
    padding: 15,
    borderRadius: 50,
  },
  calendarButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shareButton: {
    position: 'absolute',
    bottom: 10,
    right: 130,
    backgroundColor: '#FFAB00',
    padding: 15,
    borderRadius: 50,
  },
  shareButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});
