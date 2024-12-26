# AdventureMap

React Native로 새 프로젝트를 시작하는 방법을 처음부터 알려드릴게요. 우리는 React Native와 Expo CLI를 사용할 예정입니다. 앱 이름은 HabitAdventureMap입니다.

1. React Native 개발 환경 설정

1.1 Node.js 설치
React Native는 Node.js가 필요합니다. Node.js가 설치되어 있지 않다면 Node.js 공식 사이트에서 LTS 버전을 다운로드하고 설치하세요.

설치 확인:

node -v
npm -v
1.2 Expo CLI 설치
Expo CLI는 React Native 프로젝트를 빠르고 쉽게 설정할 수 있도록 도와줍니다. 아래 명령어로 Expo CLI를 설치하세요:

npm install -g expo-cli
설치 확인:

expo --version
2. 새로운 React Native 프로젝트 생성

2.1 새 프로젝트 만들기
터미널에서 아래 명령어를 실행합니다:

npx create-expo-app HabitAdventureMap --template blank
HabitAdventureMap: 프로젝트 이름.
--template blank: 기본 JavaScript 템플릿.
2.2 프로젝트 디렉토리로 이동
생성이 완료되면 디렉토리로 이동합니다:

cd HabitAdventureMap
3. Expo 개발 서버 실행

터미널에서 아래 명령어를 실행해 개발 서버를 시작합니다:

npx expo start
QR 코드가 표시됩니다.
Expo Go 앱을 설치한 스마트폰에서 QR 코드를 스캔해 앱을 실행합니다.


5. 화면 전환 기능 추가

React Navigation을 사용해 화면 전환을 구현합니다.

5.1 React Navigation 설치
터미널에서 아래 명령어를 실행해 React Navigation과 관련 패키지를 설치합니다:

npm install @react-navigation/native react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons react-native-get-random-values
추가로 Stack Navigator를 설치합니다:


npm install @react-navigation/stack



7. 실행

터미널에서 **npx expo start**를 실행합니다.
QR 코드를 스캔해 앱을 실행합니다.
