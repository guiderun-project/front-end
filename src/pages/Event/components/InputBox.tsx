import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Badge, Stack, Typography } from '@mui/material';

//
//
//

interface InputBoxProps {
  title: string;
  inputElement: React.ReactElement;
  subTitle?: string;
  multiline?: boolean;
  required?: boolean;
}

//
//
//

const StyledInputBox = styled.label<{ multiline: boolean }>`
  box-sizing: border-box;
  ${({ multiline }) => {
    if (multiline) {
      return css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `;
    }

    return css`
      display: grid;
      grid-template-columns: 1fr 3.2fr;
      padding-left: 0.5rem;
      align-items: center;
      gap: 0.5rem;
    `;
  }}
`;

//
//
//

const InputBox: React.FC<InputBoxProps> = ({
  title,
  inputElement,
  subTitle,
  multiline = false,
  required = false,
}) => {
  return (
    <StyledInputBox multiline={multiline}>
      <Stack gap="0.25rem">
        <Typography fontSize="1.0625rem" fontWeight={700}>
          <Badge color="error" variant="dot" invisible={!required}>
            {title}
          </Badge>
        </Typography>
        {subTitle ? (
          <Typography fontSize="0.9375rem">{subTitle}</Typography>
        ) : null}
      </Stack>
      {inputElement}
    </StyledInputBox>
  );
};
export default InputBox;
