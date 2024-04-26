import { Stack, Typography } from '@mui/material';

interface SignupFormBoxProps {
  title: string;
  content: React.ReactNode;
}

//
//
//

const SignupContentBox: React.FC<SignupFormBoxProps> = ({ title, content }) => {
  return (
    <Stack width="100%" alignItems="flex-start" gap="2.5rem">
      <Typography component="h2" fontWeight={700} fontSize="1.5rem">
        {title}
      </Typography>
      {content}
    </Stack>
  );
};

export default SignupContentBox;
