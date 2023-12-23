import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, InputLabel, Typography } from '@mui/material';

interface SignupFormBoxProps {
  title: string;
  form: React.ReactNode;
  multiLine?: boolean;
  required?: boolean;
}

//
//
//

const StyledInputLabel = styled(InputLabel)<{ multiLine: boolean }>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  align-items: center;

  ${({ multiLine }) => {
    if (multiLine) {
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
  multiLine = false,
  required = false,
}) => {
  return (
    <StyledInputLabel multiLine={multiLine}>
      <Typography fontWeight={700}>
        <Badge color="error" variant="dot" invisible={!required}>
          {title}
        </Badge>
      </Typography>
      {form}
    </StyledInputLabel>
  );
};

export default SignupFormBox;
