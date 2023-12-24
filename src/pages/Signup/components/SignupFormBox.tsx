import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, InputLabel, Typography } from '@mui/material';

interface SignupFormBoxProps {
  title: string;
  /**
   * @param form input이나 change가 발생하는 부분
   */
  form: React.ReactNode;

  /**
   * @param content 약관 동의 설명 부분과 같은 change가 발생하지 않는 부분
   */
  content?: React.ReactNode | string;

  /**
   * @param multiLine 해당 입력 폼이 한 줄 이상인지 나타냄
   */
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
  padding: 0.25rem;

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
