import styled from '@emotion/styled';
import { InputLabel, Typography } from '@mui/material';

interface SignupFormBoxProps {
  title: string;
  form: React.ReactNode;
  isOneLine?: boolean;
}

//
//
//

const StyledInputLabel = styled(InputLabel)<{ isOneLine: boolean }>``;

//
//
//

const SignupFormBox: React.FC<SignupFormBoxProps> = ({
  title,
  form,
  isOneLine = true,
}) => {
  return (
    <StyledInputLabel isOneLine={isOneLine}>
      <Typography fontWeight={700}>{title}</Typography>
      {form}
    </StyledInputLabel>
  );
};

export default SignupFormBox;
