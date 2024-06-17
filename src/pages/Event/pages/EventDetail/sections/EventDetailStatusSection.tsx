import { Stack, Typography } from '@mui/material';

import { EventGetResponse } from '@/apis/types/event';

//
//
//

interface EventDetailStatusSectionProps {
  eventData: EventGetResponse;
  eventId: number;
  isOwner: boolean;
}

//
//
//

const NOTICE_LIST = [
  '시각장애러너보다 가이드러너가 대략 1.5배 빠른 조깅이 가능한 경우 안정된 훈련이 가능합니다.',
  '미리 공지된 매칭일지라도 상황에 따라 현장에서 유연하게 진행해주세요.',
  '미성년자 러너의 경우, 서브 파트너 주자로성인 러너(보호자 가능)와 함께 될 수 있으면 동성 파트너와 매칭을 권고합니다.',
  '추가적인 문의사항이 있는 경우, 운영진에게 언제든지 알려주세요 :)',
];

//
//
//

const EventDetailStatusSection: React.FC<
  EventDetailStatusSectionProps
> = () => {
  /**
   *
   */
  const renderTabs = () => {
    return <>Tabs</>;
  };

  /**
   *
   */
  const renderPanel = () => {
    return <>panel</>;
  };

  /**
   *
   */
  const renderNotice = () => {
    return (
      <Stack gap="1rem">
        <Typography fontSize="1.5rem" fontWeight={700}>
          유의사항
        </Typography>
        <Stack
          component="ol"
          gap="1rem"
          sx={{
            listStyleType: 'decimal',
            listStylePosition: 'inside',
          }}
        >
          {NOTICE_LIST.map((notice, idx) => (
            <Typography
              key={`notice-${idx}`}
              component="li"
              lineHeight="1.25rem"
            >
              {notice}
            </Typography>
          ))}
        </Stack>
      </Stack>
    );
  };

  //
  //
  //

  return (
    <Stack gap="2rem">
      {renderTabs()}
      {renderPanel()}
      {renderNotice()}
    </Stack>
  );
};

export default EventDetailStatusSection;
