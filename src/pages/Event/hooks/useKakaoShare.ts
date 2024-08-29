import React from 'react';

const useKakaoShare = () => {
  const { Kakao, location } = window;

  /**
   * 카카오톡 공유하기 기능
   * @param title 이벤트 제목 required
   * @param organizer 작성자  required
   * @param content 카카오톡에 들어갈 공유 텍스트
   * @param url 공유 주소
   * @param img 상단에 들어갈 이미지
   */
  const shareLink = (
    title: string,
    organizer: string,
    content: string = `${organizer}님이 만든 이벤트에 참여해보세요!`,
    url = location.href,
  ) => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: content,
        imageUrl: 'https://dwb5oybpxbixt.cloudfront.net/guiderun3.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '메인페이지',
          link: {
            mobileWebUrl: location.host,
            webUrl: location.host,
          },
        },
        {
          title: '참가 신청',
          link: {
            mobileWebUrl: url,
            webUrl: url,
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
