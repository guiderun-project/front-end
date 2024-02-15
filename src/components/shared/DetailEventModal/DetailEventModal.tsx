import { ClearOutlined } from '@mui/icons-material';
import {
  Box,
  Dialog,
  Typography,
  IconButton,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';

import { EventChip } from '../EventChip';
import { EventStatus } from '../EventStatus';

import { EventType, RecruitStatus } from '@/types/group';

export type DetailEventType = {
  eventId: number; //이벤트 아이디
  type: EventType;
  hasPartner: boolean; //파트너가 있는지
  partner: string; //조회하는 사람이 신청했고 파트너가 있으면 이름 노출.
  title: string; //제목
  recruitStatus: RecruitStatus;
  submit: boolean; //신청 완료된 이벤트인지 아닌지
  status: RecruitStatus;
  date: string; //이벤트 시작일
  startTime: string; //"HH : MM"
  endTime: string; //"HH : MM"
  created_at: string; //생성일
  updated_at: string; //수정일
  details: string; //상세사항
  maxNumV: number; //시각장애러너 인원 제한
  maxNumG: number; //가이드러너 인원 제한
  place: string;
};

interface DetailEventModalProps {
  eventId: number;
  isOpen: boolean;
  onModalClose: () => void;
}

//
//
//

const EVENT_DATA: DetailEventType = {
  eventId: 1,
  type: EventType.Training,
  hasPartner: false,
  partner: '',
  title: '동아마라톤 대비반 1회차',
  place: '잠실보조경기장',
  recruitStatus: RecruitStatus.Close,
  maxNumG: 30,
  maxNumV: 15,
  submit: true,
  status: RecruitStatus.Close,
  date: '2000-01-01',
  startTime: '09:00',
  endTime: '11:00',
  created_at: '2000-01-01',
  updated_at: '2000-01-01',
  details:
    '동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차동아마라톤 대비반 1회차',
};

//
//
//

const DetailEventModal: React.FC<DetailEventModalProps> = ({
  //eventId,
  isOpen,
  onModalClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="xs"
      onClose={onModalClose}
      sx={{
        '.MuiPaper-root': {
          maxHeight: '70vh',
          padding: '5rem 1.25rem',
          gap: '2.5rem',
        },
      }}
    >
      <IconButton
        onClick={onModalClose}
        size="large"
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        <ClearOutlined fontSize="large" />
      </IconButton>
      <DialogTitle display="flex" gap="0.5rem" alignItems="center">
        <EventChip variant="full" type={EVENT_DATA.type} />
        <Typography
          component="h1"
          id="modal-title"
          fontSize="1.25rem"
          fontWeight={700}
        >
          {EVENT_DATA.title}
          <EventStatus status={EVENT_DATA.status} />
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}
      >
        <Box display="grid" gridTemplateColumns="1fr 2.5fr">
          <Typography component="h3" fontWeight={700}>
            일시
          </Typography>
          <Typography display="flex" gap="0.5rem">
            {EVENT_DATA.date.replace(/-/g, '.')}
            <Divider orientation="vertical" variant="middle" flexItem />
            {EVENT_DATA.startTime}~{EVENT_DATA.endTime}
          </Typography>
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 2.5fr">
          <Typography component="h3" fontWeight={700}>
            장소
          </Typography>
          <Typography>{EVENT_DATA.place}</Typography>
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 2.5fr">
          <Typography component="h3" fontWeight={700}>
            모집인원
          </Typography>
          <Typography display="flex" flexDirection="column" gap="0.5rem">
            <span>
              시각장애러너{' '}
              <span
                style={{
                  color: '#DE1313',
                }}
              >
                {EVENT_DATA.maxNumV}
              </span>
              명
            </span>
            <span>
              가이드러너{' '}
              <span
                style={{
                  color: '#DE1313',
                }}
              >
                {EVENT_DATA.maxNumG}
              </span>
              명
            </span>
          </Typography>
        </Box>
        <Box
          paddingTop="0.625rem"
          display="flex"
          flexDirection="column"
          gap="0.5rem"
        >
          <Typography component="h3" fontWeight={700}>
            훈련 상세
          </Typography>
          <Box padding="1rem" border="1px solid #D9D9D9" borderRadius="0.5rem">
            <Typography fontSize="0.8125rem" lineHeight="1.25rem">
              {EVENT_DATA.details}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailEventModal;
