import { Stack, Typography } from '@mui/material';

interface SignupFormBoxProps {
  title: string;
  content: React.ReactNode;
}

//
//
//

const SignupFormBox: React.FC<SignupFormBoxProps> = ({ title, content }) => {
  return (
    <Stack width="100%" alignItems="flex-start" gap="2.5rem">
      <Typography variant="h5">{title}</Typography>
      {content}
    </Stack>
  );
};

export default SignupFormBox;
