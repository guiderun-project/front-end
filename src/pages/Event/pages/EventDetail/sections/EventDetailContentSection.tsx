import { Stack, Typography } from '@mui/material';

import EventDetailAccordian from '../components/EventDetailAccordion';

import { EventGetResponse } from '@/apis/types/event';
import {
  DisabilityChip,
  GroupChip,
  TextLink,
  TitleContentRow,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import MatchingStandardAccordion from '@/pages/Event/components/MatchingStandardAccordion';
import RecruitCountBox from '@/pages/Event/components/RecruitCountBox';
import { Event } from '@/types/event';
import { EventStatus as EventStatusType, RecruitStatus } from '@/types/group';
import { getFullKoreanDate, getPeriod } from '@/utils/time';

interface EventDetailContentSectionProps {
  eventId: Event['eventId'];
  eventData: EventGetResponse;
  isOwner: boolean;
}

const EventDetailContentSection: React.FC<EventDetailContentSectionProps> = ({
  eventData,
  eventId,
}) => {
  const isEndEvent =
    eventData.status === EventStatusType.End ||
    eventData.recruitStatus === RecruitStatus.Close ||
    eventData.recruitStatus === RecruitStatus.End;
  //
  //
  //

  return (
    <Stack gap="0.75rem">
      <TitleContentRow
        title="주최자"
        content={
          <Stack role="text" direction="row" alignItems="center" gap="0.25rem">
            <DisabilityChip component="chip" type={eventData.organizerType} />
            <Typography fontWeight={600}>{eventData.organizer}</Typography>
            <GroupChip type="text" group={eventData.organizerPace} />
          </Stack>
        }
      />
      <TitleContentRow
        title="날짜"
        content={
          <Typography>{getFullKoreanDate(new Date(eventData.date))}</Typography>
        }
      />
      <TitleContentRow
        title="시간"
        content={
          <Typography>
            {getPeriod(eventData.startTime, eventData.endTime)}
          </Typography>
        }
      />
      <Stack>
        <TitleContentRow
          title="장소"
          alignItems="flex-start"
          content={
            <Stack gap="0.5rem">
              <Typography>{eventData.place}</Typography>
              <TextLink
                label="지역 별 이동 지원 서비스 확인하기"
                to={BROWSER_PATH.MOBILITY_SERVICE}
              />
            </Stack>
          }
        />
      </Stack>
      {isEndEvent && (
        <RecruitCountBox
          title="참여 인원"
          viNum={eventData.numV}
          guideNum={eventData.numG}
        />
      )}
      {eventData.isApply ? (
        <TitleContentRow
          title="내 파트너"
          alignItems={eventData.partner ? 'flex-start' : 'center'}
          content={
            eventData.partner.length > 0 ? (
              <Stack gap="1.5rem">
                <Stack gap="0.75rem">
                  {eventData.partner.map((partner) => (
                    <Stack
                      key={`matching-${partner.partnerName}-${partner.partnerName}`}
                      role="text"
                      direction="row"
                      gap="0.25rem"
                      alignItems="center"
                    >
                      <DisabilityChip
                        component="chip"
                        type={partner.partnerType}
                      />
                      <Typography component="span" fontSize="0.9375rem">
                        {partner.partnerName}
                      </Typography>
                      <GroupChip type="text" group={partner.partnerRecord} />
                    </Stack>
                  ))}
                </Stack>
                {eventData.status !== EventStatusType.End && (
                  <TextLink
                    label="신청내용 수정 혹은 취소"
                    to={`${BROWSER_PATH.EVENT.APPLY_DETAIL}/${eventId}`}
                  />
                )}
              </Stack>
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="14.8125rem"
              >
                <Typography
                  component="span"
                  fontSize="0.75rem"
                  fontWeight={700}
                  color="#4BABB8"
                >
                  대기중
                </Typography>
                {eventData.status !== EventStatusType.End && (
                  <TextLink
                    label="신청내용 수정 혹은 취소"
                    to={`${BROWSER_PATH.EVENT.APPLY_DETAIL}/${eventId}`}
                  />
                )}
              </Stack>
            )
          }
        />
      ) : null}
      <EventDetailAccordian detail={eventData.details} />
      <MatchingStandardAccordion />
    </Stack>
  );
};

export default EventDetailContentSection;
