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
import { useController, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { FormType } from '@/types/form';

interface FormValueType {
  value: string | number | boolean;
  label: string;
}

interface SignupFormBoxProps {
  title: string;
  name: string;
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
  name,
  formType,
  content,
  formValue,
  label = '',
  multiLine = false,
  required = false,
  disabled = false,
}) => {
  const intl = useIntl();
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: formType === FormType.CheckBox ? [] : null,
    rules: { required },
  });

  /**
   *
   */
  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    if ((field.value as string[]).includes(selectedValue)) {
      field.onChange(
        (field.value as string[]).filter((value) => value !== selectedValue),
      );
      return;
    }

    field.onChange([...field.value, selectedValue]);
  };

  /**
   *
   */
  const renderForm = () => {
    switch (formType) {
      case FormType.Input:
        return (
          <TextField
            fullWidth
            size="small"
            error={error ? true : false}
            helperText={
              error
                ? intl.formatMessage(
                    { id: 'message.form.required.error' },
                    { field: title },
                  )
                : null
            }
            disabled={disabled}
            placeholder={label}
            value={field.value}
            onChange={field.onChange}
          />
        );

      case FormType.Textarea:
        return (
          <TextField
            multiline
            fullWidth
            error={error ? true : false}
            helperText={
              error
                ? intl.formatMessage(
                    { id: 'message.form.required.error' },
                    { field: title },
                  )
                : null
            }
            disabled={disabled}
            placeholder={label}
            value={field.value}
            onChange={field.onChange}
          />
        );

      case FormType.Select:
        return (
          <FormControl fullWidth size="small">
            <InputLabel id={label}>{label}</InputLabel>
            <Select
              fullWidth
              error={error ? true : false}
              disabled={disabled}
              labelId={label}
              label={label}
              size="small"
              value={field.value}
              onChange={field.onChange}
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
          <FormControl
            error={error ? true : false}
            fullWidth
            disabled={disabled}
          >
            <RadioGroup
              row
              value={field.value}
              onChange={field.onChange}
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
          <FormGroup color={error ? 'error' : 'primary'}>
            {formValue.map((el) => (
              <FormControlLabel
                key={el.label}
                control={
                  <Checkbox
                    checked={(field.value as string[]).includes(
                      el.value as string,
                    )}
                    onChange={handleCheckBoxClick}
                  />
                }
                value={el.value}
                label={
                  <Typography whiteSpace="break-spaces">{el.label}</Typography>
                }
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
    <>
      {error ? (
        <Typography whiteSpace="break-spaces" color="error">
          {intl.formatMessage(
            { id: 'message.form.required.error' },
            { field: title },
          )}
        </Typography>
      ) : null}
      <StyledInputLabel multiLine={multiLine}>
        <Typography
          color={error ? 'error' : 'default'}
          whiteSpace="break-spaces"
          fontWeight={700}
        >
          <Badge color="error" variant="dot" invisible={!required}>
            {title}
          </Badge>
        </Typography>
        {content ? content : null}
        <Stack width="100%">{renderForm()}</Stack>
      </StyledInputLabel>
    </>
  );
};

export default SignupFormBox;
