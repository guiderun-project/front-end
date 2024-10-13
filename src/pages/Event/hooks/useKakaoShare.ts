import React from 'react';

const useKakaoShare = () => {
  const { Kakao, location } = window;
  const fullUrl = window.location.href;
  const baseUrl = fullUrl.split('?')[0];

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
    url = baseUrl,
    statusUrl = `${baseUrl}?section=status`,
  ) => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: content,
        imageUrl: 'https://dwb5oybpxbixt.cloudfront.net/Logo.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '이벤트 상세',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: '신청 현황',
          link: {
            mobileWebUrl: statusUrl,
            webUrl: statusUrl,
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
