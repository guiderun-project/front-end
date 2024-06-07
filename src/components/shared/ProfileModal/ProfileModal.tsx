import { ClearOutlined } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogProps,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { DisabilityChip } from '../DisabilityChip';
import { EventLinkBox } from '../EventLinkBox';
import { GenderChip } from '../GenderChip';
import { GroupChip } from '../GroupChip';

import infoApi from '@/apis/requests/info';
import { PersonalInfoGetResponse } from '@/apis/types/info';
import { BROWSER_PATH } from '@/constants/path';

interface ProfileModalProps extends DialogProps {
  userid: string;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = (props) => {
  const { userid, onClose } = props;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ['personalInfoGet', userid],
    queryFn: () => infoApi.personalInfoGet({ userId: userid }),
  });

  const { data: eventList, isLoading: isEventListLoading } = useQuery({
    queryKey: ['eventHistoryGet'],
    queryFn: () => infoApi.eventHistoryGet({ userId: userid }),
  });

  const { mutate } = useMutation({
    mutationKey: ['likePost', userid],
    mutationFn: () => infoApi.likePost({ userId: userid }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['personalInfoGet', userid],
      });

      const previous = queryClient.getQueryData(['personalInfoGet', userid]);

      queryClient.setQueryData(
        ['personalInfoGet', userid],
        (old: PersonalInfoGetResponse) => ({
          ...old,
          like: old.like + 1,
          isLiked: !old.isLiked,
        }),
      );

      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['personalInfoGet', userid], context?.previous);
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['personalInfoGet', userid] });
    },
  });

  /**
   *
   */
  const handleLikeClick = () => {
    mutate();
  };

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
          {userData?.img ? (
            <Avatar
              alt={userData?.name}
              src={userData?.img}
              sx={{ width: 80, height: 80 }}
            />
          ) : (
            <Avatar
              alt={userData?.name}
              sx={{ bgcolor: '#D9D9D9', width: 80, height: 80 }}
            ></Avatar>
          )}
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
            <IconButton size="small" onClick={handleLikeClick}>
              {userData.isLiked ? (
                <FavoriteIcon
                  fontSize="small"
                  aria-label={`${name}님의 인기도`}
                  aria-selected={userData.isLiked}
                  sx={{
                    color: 'red',
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  aria-label={`${name}님의 인기도`}
                  aria-selected={userData.isLiked}
                  sx={{
                    color: '#666',
                  }}
                />
              )}
            </IconButton>
            <Typography fontSize="0.75rem" color="#666">
              {userData.like}
            </Typography>
          </Stack>
        </Stack>
      );
    }
  };

  const renderUserDetail = () => {
    const UserDataContainer: React.FC<{
      title: string;
      content: React.ReactElement;
    }> = ({ title, content }) => {
      return (
        <Stack direction="row" alignItems="center" gap="0.5rem">
          <Typography
            component="h3"
            fontSize="1.0625rem"
            fontWeight={700}
            width="4.375rem"
          >
            {title}
          </Typography>
          {content}
        </Stack>
      );
    };
    if (userData) {
      return (
        <Stack gap="1rem" boxSizing="border-box" paddingLeft="0.5rem">
          <UserDataContainer
            title="개인 기록"
            content={<Typography>{userData.detailRecord}</Typography>}
          />
          <UserDataContainer
            title="전화번호"
            content={
              userData.isOpenNumber ? (
                <Typography>{userData.phoneNumber}</Typography>
              ) : (
                <Typography color="#808080">비공개</Typography>
              )
            }
          />
          <UserDataContainer
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
