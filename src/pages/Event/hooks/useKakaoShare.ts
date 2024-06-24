import React from 'react';

import Logo from '@/assets/Logo.png';

const useKakaoShare = () => {
  const { Kakao, location } = window;

  /**
   * 카카오톡 공유하기 기능
   * @param content 카카오톡에 들어갈 공유 텍스트
   * @param url 공유 주소
   * @param img 상단에 들어갈 이미지
   */
  const shareLink = (
    content: string = '이벤트에 참여하세요!',
    url = location.href,
    img = Logo,
  ) => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '딸기 치즈 케익',
        description: content,
        imageUrl: img,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '참가 신청하기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: '사이트 구경하기',
          link: {
            mobileWebUrl: location.host,
            webUrl: location.host,
          },
        },
      ],
    });
  };

  //
  //
  //
  React.useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
  }, []);

  return { shareLink };
};

export default useKakaoShare;
