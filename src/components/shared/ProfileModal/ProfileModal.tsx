import { ClearOutlined } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogProps,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { DisabilityChip } from '../DisabilityChip';
import { EventLinkBox } from '../EventLinkBox';
import { GenderChip } from '../GenderChip';
import { GroupChip } from '../GroupChip';
import { LikeButton } from '../LikeButton';
import { ProfileImage } from '../ProfileImage';
import { TitleContentRow } from '../TitleContentRow';

import infoApi from '@/apis/requests/info';
import { BROWSER_PATH } from '@/constants/path';

interface ProfileModalProps extends DialogProps {
  userid: string;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = (props) => {
  const { userid, onClose } = props;

  const navigate = useNavigate();

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ['userProfileGet', userid],
    queryFn: () => infoApi.userProfileGet({ userId: userid }),
  });

  const { data: eventList, isLoading: isEventListLoading } = useQuery({
    queryKey: ['eventHistoryGet'],
    queryFn: () => infoApi.eventHistoryGet({ userId: userid }),
  });

  /**
   *
   */
  const renderUserInfo = () => {
    if (isUserDataLoading) {
      return (
        <Stack alignItems="center">
          <CircularProgress size={30} />
        </Stack>
      );
    }
    if (userData) {
      return (
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          gap="1rem"
        >
          <ProfileImage img={userData.img} size={80} />
          <Stack gap="0.5rem" paddingRight="1rem">
            <Stack direction="row" gap="0.5rem" alignItems="center">
              <DisabilityChip component="chip" type={userData.type} />
              <GenderChip type={userData.gender} />
            </Stack>
            <Stack direction="row" gap="0.5rem" alignItems="center">
              <Typography fontWeight={700} fontSize="1.5rem">
                {userData.name}
              </Typography>
              <GroupChip group={userData.recordDegree} />
            </Stack>
          </Stack>
          <Stack
            height="5rem"
            justifyContent="center"
            alignItems="center"
            gap="0.25rem"
          >
            <LikeButton userid={userid} />
            <Typography fontSize="0.75rem" color="#666">
              {userData.like}
            </Typography>
          </Stack>
        </Stack>
      );
    }
  };

  const renderUserDetail = () => {
    if (userData) {
      return (
        <Stack gap="1rem" boxSizing="border-box" paddingLeft="0.5rem">
          <TitleContentRow
            title="개인 기록"
            content={<Typography>{userData.detailRecord}</Typography>}
          />
          <TitleContentRow
            title="전화번호"
            content={
              userData.isOpenNumber ? (
                <Typography>{userData.phoneNumber}</Typography>
              ) : (
                <Typography color="#808080">비공개</Typography>
              )
            }
          />
          <TitleContentRow
            title="SNS"
            content={
              userData.isOpenSns ? (
                <Typography
                  component="a"
                  href={`https://www.instagram.com/${userData.snsId}`}
                  target="_blank"
                  sx={{
                    color: '#333',
                    textDecoration: 'none',
                  }}
                >
                  {userData.snsId}
                </Typography>
              ) : (
                <Typography color="#808080">비공개</Typography>
              )
            }
          />
        </Stack>
      );
    }
  };

  const renderEventList = () => {
    if (isEventListLoading) {
      return (
        <Stack alignItems="center">
          <CircularProgress size={30} />
        </Stack>
      );
    }
    if (eventList) {
      return (
        <Stack padding="0.5rem 0" gap="0.5rem">
          <Typography component="h2" fontSize="1.0625rem" fontWeight={700}>
            최근 참여했던 이벤트
          </Typography>
          <Stack>
            {eventList.items.map((event) => (
              <EventLinkBox key={event.eventId} eventData={event} />
            ))}
          </Stack>
        </Stack>
      );
    }
  };

  //
  //
  //

  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="xs"
      sx={{
        '.MuiDialog-paper': {
          background: '#F8F9FF',
        },
        '.MuiPaper-root': {
          '&::-webkit-scrollbar ': {
            display: 'none',
          },
          maxHeight: '70vh',
          padding: '5rem 1.25rem',
          gap: '2.5rem',
        },
      }}
    >
      <IconButton
        onClick={() => onClose()}
        aria-label="닫기"
        size="large"
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        <ClearOutlined fontSize="large" />
      </IconButton>
      {/* 사용자 정보 */}
      {renderUserInfo()}
      {/* 상세정보 및 이벤트 히스토리 */}
      <Stack gap="1rem">
        {renderUserDetail()}
        {renderEventList()}
      </Stack>
      <Stack alignItems="center">
        <Button
          fullWidth
          variant="chip"
          size="large"
          sx={{
            width: '15.9375rem',
          }}
          onClick={() => navigate(`${BROWSER_PATH.PROFILE}/${userid}`)}
        >
          프로필 더 자세히 보기
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ProfileModal;
