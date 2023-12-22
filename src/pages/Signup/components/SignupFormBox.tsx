import { css } from '@emotion/react';
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

const StyledInputLabel = styled(InputLabel)<{ isOneLine: boolean }>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  align-items: center;

  ${({ isOneLine }) => {
    if (!isOneLine) {
      return css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
      <Typography fontWeight={700}>{title}</Typography>
      {form}
    </StyledInputLabel>
  );
};

export default SignupFormBox;
