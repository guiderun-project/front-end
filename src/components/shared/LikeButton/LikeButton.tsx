import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { UserProfileGetResponse } from '@/apis/types/info';
import useLike from '@/hooks/useLike';

interface LikeButtonProps {
  userid: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ userid }) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserProfileGetResponse>([
    'userProfileGet',
    userid,
  ]);

  const { handleLike } = useLike({ userId: userid });
  if (userData) {
    <IconButton size="small" onClick={handleLike}>
      {userData.isLiked ? (
        <FavoriteIcon
          fontSize="small"
          aria-label={`${userData.name}님의 인기도`}
          aria-selected={userData.isLiked}
          sx={{
            color: 'red',
          }}
        />
      ) : (
        <FavoriteBorderIcon
          fontSize="small"
          aria-label={`${userData.name}님의 인기도`}
          aria-selected={userData.isLiked}
          sx={{
            color: '#666',
          }}
        />
      )}
    </IconButton>;
  }

  return <>사용자 데이터를 가지고 올 수 없습니다.</>;
};

export default LikeButton;
