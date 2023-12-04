module.exports = {
  presets: [
    '@babel/preset-react', //JSX로 작성된 코드들을 createElement 함수를 이용한 코드로 변환해 주는 바벨 플러그인 내장
    '@babel/preset-env', //(IE 지원을 위한 프리셋)
    '@babel/preset-typescript', //(타입스크립트를 변환하기 위한 프리셋)
  ],
};
