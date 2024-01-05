import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Badge,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { FormType } from '@/types/form';

interface FormValueType {
  value: string | number | boolean;
  label: string;
}

interface SignupFormBoxProps {
  title: string;
  formType: FormType;
  formValue?: FormValueType[];
  content?: React.ReactNode | string;
  disabled?: boolean;
  multiLine?: boolean;
  label?: string;
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
  formType,
  content,
  formValue,
  label = '',
  multiLine = false,
  required = false,
  disabled = false,
}) => {
  const renderForm = () => {
    switch (formType) {
      case FormType.Input:
        return (
          <TextField
            fullWidth
            size="small"
            disabled={disabled}
            placeholder={label}
          />
        );

      case FormType.Textarea:
        return (
          <TextField
            multiline
            fullWidth
            disabled={disabled}
            placeholder={label}
          />
        );

      case FormType.Select:
        return (
          <FormControl fullWidth size="small">
            <InputLabel id={label}>{label}</InputLabel>
            <Select
              fullWidth
              disabled={disabled}
              labelId={label}
              label={label}
              size="small"
            >
              {formValue
                ? formValue.map((el) => (
                    <MenuItem
                      key={el.label}
                      value={el.value as string | number}
                    >
                      {el.label}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        );

      case FormType.Radio:
        return (
          <FormControl fullWidth disabled={disabled}>
            <RadioGroup
              row
              sx={{
                width: '100%',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'space-between',
              }}
            >
              {formValue
                ? formValue.map((el) => (
                    <FormControlLabel
                      key={el.label}
                      value={el.value}
                      control={<Radio />}
                      label={el.label}
                    />
                  ))
                : null}
            </RadioGroup>
          </FormControl>
        );

      case FormType.CheckBox:
        return formValue ? (
          <FormGroup>
            {formValue.map((el) => (
              <FormControlLabel
                key={el.label}
                control={<Checkbox />}
                value={el.value}
                label={el.label}
              />
            ))}
          </FormGroup>
        ) : null;
      case FormType.None:
      default:
        return null;
    }
  };

  //
  //
  //

  return (
    <StyledInputLabel multiLine={multiLine}>
      <Typography fontWeight={700}>
        <Badge color="error" variant="dot" invisible={!required}>
          {title}
        </Badge>
      </Typography>
      {content ? content : null}
      <Stack width="100%">{renderForm()}</Stack>
    </StyledInputLabel>
  );
};

export default SignupFormBox;
