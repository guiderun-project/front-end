import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, InputLabel, Typography } from '@mui/material';

interface SignupFormBoxProps {
  title: string;
  form: React.ReactNode;
  isOneLine?: boolean;
  required?: boolean;
}

//
//
//

const StyledInputLabel = styled(InputLabel)<{ isOneLine: boolean }>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  align-items: center;
  padding: 0 0.25rem;

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
  required = false,
}) => {
  return (
    <StyledInputLabel required={required} isOneLine={isOneLine}>
      <Badge
        color="secondary"
        variant="dot"
        invisible={!required}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography fontWeight={700}>{title}</Typography>
      </Badge>
      {form}
    </StyledInputLabel>
  );
};

export default SignupFormBox;
