import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CircularProgress, IconButton } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { UserProfileGetResponse } from '@/apis/types/info';
import useUserLike from '@/hooks/useUserLike';

interface LikeButtonProps {
  userid: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ userid }) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserProfileGetResponse>([
    'userProfileGet',
    userid,
  ]);

  const { handleLike } = useUserLike({ userId: userid });
  if (userData) {
    return (
      <IconButton
        size="small"
        onClick={handleLike}
        aria-label={`${userData.name}님 좋아요`}
        aria-pressed={userData.isLiked}
      >
        {userData.isLiked ? (
          <FavoriteIcon
            fontSize="small"
            sx={{
              color: 'red',
            }}
          />
        ) : (
          <FavoriteBorderIcon
            fontSize="small"
            sx={{
              color: '#666',
            }}
          />
        )}
      </IconButton>
    );
  }

  return <CircularProgress />;
};

export default LikeButton;
