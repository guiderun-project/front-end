import { Avatar } from '@mui/material';

interface ProfileImageProps {
  size: number;
  img?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ size, img }) => {
  if (img) {
    return (
      <Avatar alt="프로필 사진" src={img} sx={{ width: size, height: size }} />
    );
  }

  return (
    <Avatar
      alt="프로필 사진"
      sx={{ bgcolor: '#D9D9D9', width: size, height: size }}
    ></Avatar>
  );
};

export default ProfileImage;
