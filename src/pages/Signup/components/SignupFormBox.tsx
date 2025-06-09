import React from 'react';

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
  prefix?: string;
  openBox?: React.ReactNode;
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

export const StyledInputLabel = styled(InputLabel)<{ multiLine: boolean }>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  align-items: center;
  padding: 0.325rem;

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
  openBox,
  prefix,
  label = '',
  multiLine = false,
  required = false,
  disabled = false,
}) => {
  const intl = useIntl();
  const { control, getValues, setValue } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: formType === FormType.CheckBox ? [] : null,
    rules: {
      required:
        formType === FormType.BooleanRadio
          ? {
              value: getValues(name) === undefined,
              message: `${intl.formatMessage(
                { id: 'message.form.required.error' },
                { field: title },
              )}`,
            }
          : required
            ? `${intl.formatMessage(
                { id: 'message.form.required.error' },
                { field: title },
              )}`
            : false,
    },
  });

  /**
   *
   */
  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    if (!field.value) {
      setValue(name, [selectedValue]);
      return;
    }
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
      case FormType.Number:
        return (
          <TextField
            fullWidth
            size="small"
            error={error ? true : false}
            inputProps={
              formType === FormType.Number
                ? {
                    inputMode: 'decimal',
                    pattern: '[0-9]*',
                  }
                : undefined
            }
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
              onChange={(e) => field.onChange(e.target.value)}
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

      case FormType.BooleanRadio:
        return (
          <FormControl
            error={error ? true : false}
            fullWidth
            disabled={disabled}
          >
            <RadioGroup
              row
              value={field.value}
              onChange={(e) => field.onChange(e.target.value === 'true')}
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
                    checked={(field.value as string[])?.includes(
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
    <Stack gap="0.5rem">
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
        <Stack direction="row" width="100%" alignItems="center" gap="0.5rem">
          {/* SNS의 @기호를 위한 거.. 일단 임시방편으로 */}
          {prefix ? (
            <Typography aria-hidden color="#999999">
              {prefix}
            </Typography>
          ) : null}
          {renderForm()}
        </Stack>
      </StyledInputLabel>
      {error && (
        <Typography
          whiteSpace="break-spaces"
          color="error"
          aria-errormessage={intl.formatMessage(
            { id: 'message.form.required.error' },
            { field: title },
          )}
        >
          {intl.formatMessage(
            { id: 'message.form.required.error' },
            { field: title },
          )}
        </Typography>
      )}
      {openBox ?? null}
    </Stack>
  );
};

export default SignupFormBox;
