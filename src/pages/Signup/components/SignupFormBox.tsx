import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, InputLabel, Typography } from '@mui/material';

interface SignupFormBoxProps {
  title: string;
  form: React.ReactNode;
  isOneLine?: boolean;
}

//
//
//

const StyledInputLabel = styled(InputLabel)<{ isOneLine: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;

  ${({ isOneLine }) => {
    if (!isOneLine) {
      return css`
        flex-direction: column;
        gap: 0.75rem;
      `;
    }
  }}
`;

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
      <Typography flexGrow={1} fontWeight={700}>
        {title}
      </Typography>
      <Box flexGrow={3}>{form}</Box>
    </StyledInputLabel>
  );
};

export default SignupFormBox;
