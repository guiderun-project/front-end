# Guiderun Project Frontend

시각장애러너와 가이드러너가 함께 만들어가는 러닝 매칭 서비스입니다.

## 주요 기능

- 러닝 스펙, 경험, 희망사항 등 상세 정보 관리
- 관리자 페이지를 통한 회원 관리
- 교통약자 이동지원센터 및 KTX 연락처 안내
- 접근성 및 반응형 UI

## 프로젝트 구조

```
public/           # 정적 파일 및 이미지
src/
  apis/          # API 요청 모듈
  components/    # UI 컴포넌트
  constants/     # 상수 정의
  hooks/         # 커스텀 훅
  i18n/          # 다국어 메시지
  mocks/         # MSW API Mock
  pages/         # 주요 페이지
  store/         # Redux 스토어
  theme/         # 테마 설정
  types/         # 타입 정의
  utils/         # 유틸리티 함수
```

## 기술 스택

- React (TypeScript)
- Redux Toolkit
- React Query
- Emotion (CSS-in-JS)
- Material UI
- React Router
- MSW(Mock Service Worker)
- Webpack

## 설치 및 실행

1. 패키지 설치  
   ```sh
   npm install
   ```

2. 개발 서버 실행  
   ```sh
   npm start
   ```

3. 빌드  
   ```sh
   npm run build
   ```

## 환경 변수

`.env` 파일에서 API 엔드포인트 등 환경변수를 설정할 수 있습니다.

## 기타

- 접근성(Accessibility)을 고려한 UI 설계
