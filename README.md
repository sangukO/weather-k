# 🌤️ Weather-K (행정구역 기반 반응형 날씨 서비스)
배포 URL: https://weather-k.vercel.app/

기상청 API와 카카오 위치 API를 연동하여 실시간 날씨 정보를 제공하고, 위치 검색 및 즐겨찾기 기능을 제공하는 웹 서비스입니다.

## 📱 스크린샷

| 메인 대시보드 | 주소 미리보기 | 북마크 관리 |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/6f5eed9c-fab6-40c5-acb1-b2b771c84584" width="250"> | <img src="https://github.com/user-attachments/assets/e4efd954-42e2-46c2-9f05-3976a4659620" width="250"> | <img src="https://github.com/user-attachments/assets/cbd3dd2c-8c9d-4c48-bad0-993b1b2a605f" width="250"> |

## 🚀 프로젝트 실행 방법

### 1. 환경 변수 설정
프로젝트 루트 폴더에 .env 파일을 생성하고 아래 키를 입력하세요.
- VITE_WEATHER_API_KEY: 공공데이터포털 기상청 단기예보 서비스 일반인증키 (Decoding Key)
- VITE_KAKAO_API_KEY: 카카오 개발자 센터 REST API 키

### 2. 패키지 설치 및 실행
1. 패키지 설치: npm install
2. 로컬 개발 서버 실행: npm run dev

## ✨ 구현 기능 설명

### 1. 위치 기반 서비스
- 현재 위치 탐색: 브라우저 Geolocation API를 사용하여 접속 지역의 날씨를 즉시 노출
- 지역 검색: 카카오 API를 연동하여 주소 검색 및 좌표 변환을 통해 다른 지역의 날씨 조회

### 2. 실시간 날씨 정보
- 기상청 초단기실황 및 단기예보 API를 연동하여 현재 기온, 날씨 상태, 최고/최저 기온 노출
- 시간대별 예보를 슬라이드 형태로 제공하여 직관적인 날씨 변화 확인 가능

### 3. 북마크 (위치 즐겨찾기)
- 자주 확인하는 위치를 최대 6개까지 저장 가능
- 별칭 수정 기능을 통해 사용자가 원하는 이름으로 관리 가능
- localStorage, Zustand Store 간 연동을 통해 브라우저 재접속 시에도 데이터 유지

## 🧠 기술적 의사결정 및 이유

### 1. Debouncing 커스텀 훅 도입
- 주소 입력 시마다 대용량의 행정구역 JSON 데이터를 반복적으로 필터링하는 연산을 방지하기 위해 도입했습니다.

### 2. 위치 정보 캐싱 및 상태 관리
- 사용자의 이동 가능성을 고려하여 앱 진입 시마다 최신 위치를 탐색하고, 이를 전역 스토어(Zustand)에 동기화하여 정확한 날씨 정보를 제공하는 데이터 흐름을 설계했습니다.

### 4. TanStack Query의 staleTime 설정
- 날씨 데이터의 특성상 일정 시간 동안 값이 변하지 않으므로, 적절한 staleTime을 설정하여 불필요한 네트워크 요청을 줄이고 효율적인 데이터 패칭을 구현했습니다.

## 🛠 사용 기술 스택

### Frontend
- Framework: React (Vite)
- Language: TypeScript
- State Management: Zustand
- Data Fetching: TanStack Query, Axios
- Styling: Tailwind CSS
- Library: Lucide React, Flicking

### API
- Weather Data: 기상청 단기예보 오픈 API
- Location Data: Kakao Maps Local API

## 🏗️ 아키텍처 구조 (FSD 패턴)

프로젝트는 관심사 분리와 유지보수성을 위해 FSD(Feature-Sliced Design) 아키텍처를 기반으로 설계되었습니다.

### src/
- **app/**: 앱의 진입점. 전역 스타일(CSS) 및 메인 App 컴포넌트 정의
- **pages/**: 전체 화면을 구성하는 페이지 단위 레이어 (`HomePage`)
- **widgets/**: 독립적으로 동작할 수 있는 UI 완성 단위. 복수의 Feature와 Entity를 조합 (`WeatherDashboard`)
- **features/**: 사용자의 액션이 포함된 기능 단위
  - `add-location`: 새로운 장소 검색 및 추가 미리보기
  - `search-location`: 행정구역 기반 장소 검색 로직
  - `toggle-bookmark`: 즐겨찾기(북마크) 등록 및 해제
- **entities/**: 비즈니스 도메인별 데이터 및 상태 관리
  - `weather`: 날씨 데이터 모델링, API 연동 훅 및 날씨 카드 UI
  - `location`: 전역 위치 상태 관리(Zustand Store)
  - `bookmark`: 북마크 데이터 처리 및 북마크 전용 UI
  - `district`: 행정구역 JSON 데이터 처리 및 검색 로직
- **shared/**: 프로젝트 전반에서 재사용되는 인프라 레이어
  - `ui`: Button, Input, Modal, Dropdown 등 공통 컴포넌트
  - `lib`: 공통 훅(useCurrentLocation, useDebounce), 날씨/날짜 유틸 함수
  - `api`: 외부 API(기상청, 카카오) 호출 인스턴스 정의
 
## 📝 배운 점 및 회고

### 1. FSD(Feature-Sliced Design) 아키텍처의 실전 적용
처음으로 FSD 아키텍처를 도입하며 컴포넌트의 역할과 책임에 따라 레이어를 분리하는 연습을 했습니다. 초기 설계 단계에서는 시간이 더 소요되었지만, 프로젝트가 커질수록 특정 기능을 수정할 때 어떤 폴더를 확인해야 하는지 명확해져 유지보수성이 비약적으로 향상됨을 체감했습니다.

### 2. 성능 최적화와 사용자 경험(UX)
주소 검색 시 발생하는 불필요한 연산을 줄이기 위해 `Debouncing`을 직접 구현하며, 클라이언트의 리소스를 효율적으로 관리하는 법을 배웠습니다. 또한, `TanStack Query`의 캐싱 전략을 활용해 네트워크 비용을 절감하고 사용자에게 끊김 없는 인터페이스를 제공하는 경험을 했습니다.

### 3. 상태 관리와 컴포넌트 생명주기의 이해
지역 변경 시 시간대별 예보 스크롤 위치가 초기화되지 않고 유지되는 사이드 이펙트를 경험했습니다. 이를 해결하기 위해 리액트의 `key` 프로퍼티가 컴포넌트의 재사용과 파괴에 미치는 영향을 학습했습니다. 이를 통해 외부 라이브러리(Flicking)와 리액트의 생명주기를 동기화하여 의도한 대로 UI를 제어하는 법을 터득했습니다.
