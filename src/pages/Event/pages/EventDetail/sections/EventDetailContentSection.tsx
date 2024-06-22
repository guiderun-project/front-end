import { Box, Divider, Stack, Typography } from '@mui/material';

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
import { EventStatus as EventStatusType, RecruitStatus } from '@/types/group';

interface EventDetailContentSectionProps {
  eventId: number;
  eventData: EventGetResponse;
}

const EventDetailContentSection: React.FC<EventDetailContentSectionProps> = ({
  eventData,
  eventId,
}) => {
  //
  //
  //

  return (
    <Stack gap="1rem">
      <TitleContentRow
        title="주최자"
        content={
          <Stack direction="row" alignItems="center" gap="0.25rem">
            <DisabilityChip component="chip" type={eventData.organizerType} />
            <Typography fontWeight={600}>{eventData.organizer}</Typography>
            <GroupChip type="text" group={eventData.organizerPace} />
          </Stack>
        }
      />
      <TitleContentRow
        title="일시"
        content={
          <Typography component="span" display="flex" gap="0.5rem">
            {eventData.date.replace(/-/g, '.')}
            <Divider orientation="vertical" variant="middle" flexItem />
            {eventData.startTime}~{eventData.endTime}
          </Typography>
        }
      />
      <TitleContentRow
        title="장소"
        content={<Typography>{eventData.place}</Typography>}
      />
      {eventData.status === EventStatusType.End ||
      eventData.recruitStatus === RecruitStatus.Close ||
      eventData.recruitStatus === RecruitStatus.End ? (
        <RecruitCountBox
          title="참여 인원"
          viNum={eventData.numV}
          guideNum={eventData.numG}
        />
      ) : (
        <RecruitCountBox
          title="모집 인원"
          viNum={eventData.minNumV}
          guideNum={eventData.minNumG}
        />
      )}
      {eventData.submit ? (
        <TitleContentRow
          title="내 파트너"
          alignItems="flex-start"
          content={
            eventData.partner ? (
              <Stack gap="0.5rem">
                <Stack direction="row" gap="0.25rem" alignItems="center">
                  <DisabilityChip
                    component="chip"
                    type={eventData.partnerType}
                  />
                  <Typography component="span" fontSize="0.9375rem">
                    {eventData.partner}
                  </Typography>
                  <GroupChip type="text" group={eventData.partnerPace} />
                </Stack>
                {eventData.status !== EventStatusType.End && (
                  <TextLink
                    label="신청내용 조회"
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
                    label="신청내용 조회"
                    to={`${BROWSER_PATH.EVENT.APPLY_DETAIL}/${eventId}`}
                  />
                )}
              </Stack>
            )
          }
        />
      ) : null}
      <Stack paddingTop="0.625rem" gap="0.5rem">
        <Typography component="h3" fontWeight={700}>
          훈련 상세
        </Typography>
        <Box padding="1rem" border="1px solid #D9D9D9" borderRadius="0.5rem">
          <Typography fontSize="0.8125rem" lineHeight="1.25rem">
            {eventData.details}
          </Typography>
        </Box>
      </Stack>
      <MatchingStandardAccordion />
    </Stack>
  );
};

export default EventDetailContentSection;
