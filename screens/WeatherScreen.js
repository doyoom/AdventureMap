import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

const WeatherScreen = ({ navigation }) => {
  const [city, setCity] = useState(''); // 입력된 도시 이름
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [showMessage, setShowMessage] = useState(false); // "Nice weather" 문구 표시 상태

  const API_KEY = '3de609e80461f1f87f0ef623ad0bc1e5'; // OpenWeather API 키

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setShowMessage(false); // 새 검색 시 문구 숨기기
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName},KR&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        // 날씨 정보가 성공적으로 로드되면 2초 후에 문구 표시
        setTimeout(() => {
          setShowMessage(true);
        }, 2000);
      } else {
        setWeather(null); // 잘못된 도시일 경우 null로 설정
        alert('City not found! Please try again.');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null); // 네트워크 오류 시 null로 설정
      alert('Failed to fetch weather. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city.trim());
    } else {
      alert('Please enter a city name!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Weather</Text>

      {/* 입력 칸 */}
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      {/* Check Weather 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Check Weather</Text>
      </TouchableOpacity>

      {/* 로딩 상태 표시 */}
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {/* 날씨 정보 */}
      {weather && !loading && (
        <View style={styles.weatherInfo}>
          <Text style={styles.infoText}>
            🌍 Location: {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.infoText}>
            🌡️ Temperature: {weather.main.temp}°C
          </Text>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            style={{ width: 50, height: 50 }}
          />
          <Text style={styles.infoText}>
            🌫️ Description: {weather.weather[0].description}
          </Text>
          <Text style={styles.infoText}>
            💨 Wind Speed: {weather.wind.speed} m/s
          </Text>
          <Text style={styles.infoText}>
            🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
          </Text>
          <Text style={styles.infoText}>
            🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
          </Text>
        </View>
      )}

      {/* Nice weather 문구 (2초 후 표시) */}
      {showMessage && (
        <Text style={styles.footerText}>Nice weather to start a journey!</Text>
      )}

      {/* Go Back 버튼 (항상 고정) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('CalendarScreen')}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#81C784',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  weatherInfo: {
    marginTop: 20,
    backgroundColor: '#C8E6C9',
    padding: 15,
    borderRadius: 10,
    width: '90%',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute', // 화면 하단 고정
    bottom: 20,
    backgroundColor: '#81C784',
    padding: 10,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WeatherScreen;
