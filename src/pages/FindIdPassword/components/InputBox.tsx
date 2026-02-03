import { Chip } from '@mui/material';
import { Stack, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface InputBoxProps {
  id: string;
  label: string;
  placeholder: string;
  autoFocus?: boolean;
  submitButtonLabel?: string;
  singleline?: boolean;
  isHidenSubmitButton?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputBox: React.FC<InputBoxProps> = ({
  id,
  label,
  placeholder,
  autoFocus = false,
  submitButtonLabel = '제출',
  singleline = false,
  isHidenSubmitButton = false,
  inputProps,
}) => {
  const { control, formState } = useFormContext();

  //
  //
  //

  return (
    <Stack
      direction={singleline ? 'row' : 'column'}
      gap={singleline ? '0.5rem' : '0.25rem'}
      alignItems={singleline ? 'center' : 'flex-start'}
    >
      <Typography
        whiteSpace="nowrap"
        fontWeight={700}
        component="label"
        htmlFor={id}
      >
        {label}
      </Typography>
      <Stack width="100%" direction="row" gap="0.25rem" alignItems="center">
        <Controller
          control={control}
          name={id}
          render={({ field }) => (
            <TextField
              {...field}
              inputProps={inputProps}
              fullWidth
              required
              disabled={formState.isSubmitting || formState.isSubmitSuccessful}
              autoFocus={autoFocus}
              variant="standard"
              id={id}
              placeholder={placeholder}
              InputProps={{
                style: {
                  padding: '0.25rem 0.75rem',
                },
              }}
            />
          )}
        />

        {!isHidenSubmitButton && (
          <Chip
            clickable
            disabled={formState.isSubmitting || formState.isSubmitSuccessful}
            component="button"
            type="submit"
            variant="outlined"
            size="medium"
            label={submitButtonLabel}
            sx={{
              minWidth: '5.625rem',
              borderColor: '#666',
              color: '#666',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default InputBox;
