import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Badge,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import infoApi from '@/apis/requests/info';
import { PersonalInfoPatchRequest } from '@/apis/types/info';
import { PageTitle, TextLink } from '@/components/shared';
import { GenderEnum } from '@/types/group';

//
//
//

interface InfoEditProps {
  defaultValues: PersonalInfoPatchRequest;
}

//
//
//

export const StyledInputLabel = styled(InputLabel)<{ multiline?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  align-items: center;
  padding: 0.325rem;
  color: #333;

  ${({ multiline }) => {
    if (multiline) {
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

const InfoEdit: React.FC<InfoEditProps> = ({
  defaultValues: {
    age,
    gender,
    isOpenNumber,
    isOpenSns,
    name,
    phoneNumber,
    snsId,
    id1365,
  },
}) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { handleSubmit, control, setFocus, watch } =
    useForm<PersonalInfoPatchRequest>({
      defaultValues: {
        age,
        gender,
        isOpenNumber,
        isOpenSns,
        name,
        phoneNumber,
        snsId,
        id1365,
      },
    });

  const [searchParams, setSearchParams] = useSearchParams();

  /**
   *
   */
  const onSubmit = async (data: PersonalInfoPatchRequest) => {
    if (data && window.confirm('저장하시겠습니까?')) {
      try {
        await infoApi.personalInfoPatch(data);
        alert('저장되었습니다. ');
        queryClient.invalidateQueries({ queryKey: ['personalInfoGet'] });
        searchParams.set('mode', 'detail');
        setSearchParams(searchParams.toString(), { replace: true });
      } catch (err) {
        alert('오류가 발생했습니다.');
      }
    }
  };

  //
  //
  //
  React.useEffect(() => {
    setFocus('gender');
  }, [setFocus]);

  //
  //
  //

  return (
    <form id="edit_form" onSubmit={handleSubmit(onSubmit)}>
      <PageTitle title="개인 인적사항 수정" />
      <Stack gap="2rem">
        <Controller
          name="gender"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <StyledInputLabel>
              <Typography component="h3" fontWeight={700}>
                <Badge color="error" variant="dot">
                  성별
                </Badge>
              </Typography>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  {...field}
                  sx={{
                    width: '100%',
                    padding: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'space-between',
                  }}
                >
                  {[
                    {
                      value: GenderEnum.M,
                      label: intl.formatMessage({ id: 'common.gender.man' }),
                    },
                    {
                      value: GenderEnum.W,
                      label: intl.formatMessage({ id: 'common.gender.woman' }),
                    },
                  ].map((el) => (
                    <FormControlLabel
                      key={el.label}
                      value={el.value}
                      control={<Radio inputRef={field.ref} />}
                      label={el.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </StyledInputLabel>
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <StyledInputLabel>
              <Typography component="h3" fontWeight={700}>
                <Badge color="error" variant="dot">
                  이름
                </Badge>
              </Typography>
              <TextField
                {...field}
                placeholder="이름을 입력해주세요"
                fullWidth
              />
            </StyledInputLabel>
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Stack>
              <StyledInputLabel>
                <Typography component="h3" fontWeight={700}>
                  <Badge color="error" variant="dot">
                    전화번호
                  </Badge>
                </Typography>
                <TextField
                  {...field}
                  placeholder="전화번호를 입력해주세요."
                  fullWidth
                />
              </StyledInputLabel>
              <Controller
                name="isOpenNumber"
                control={control}
                render={({ field }) => (
                  <Box component="div" display="flex" justifyContent="flex-end">
                    <FormControlLabel
                      {...field}
                      control={
                        <Checkbox
                          checked={field.value}
                          size="small"
                          defaultChecked
                        />
                      }
                      label={intl.formatMessage({
                        id: 'signup.form.info.private',
                      })}
                      sx={{
                        color: '#42474E',
                        fontWeight: 400,
                      }}
                    />
                  </Box>
                )}
              />
            </Stack>
          )}
        />
        <Controller
          name="age"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <StyledInputLabel>
              <Typography component="h3" fontWeight={700}>
                <Badge color="error" variant="dot">
                  나이
                </Badge>
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel id="age">나이</InputLabel>
                <Select
                  {...field}
                  fullWidth
                  labelId="age"
                  label="나이"
                  size="small"
                >
                  {[
                    {
                      label: intl.formatMessage({
                        id: 'signup.form.info.age.class.teen',
                      }),
                      value: 10,
                    },
                    {
                      label: intl.formatMessage(
                        { id: 'signup.form.info.age.class' },
                        { age: 20 },
                      ),
                      value: 20,
                    },
                    {
                      label: intl.formatMessage(
                        { id: 'signup.form.info.age.class' },
                        { age: 30 },
                      ),
                      value: 30,
                    },
                    {
                      label: intl.formatMessage(
                        { id: 'signup.form.info.age.class' },
                        { age: 40 },
                      ),
                      value: 40,
                    },
                    {
                      label: intl.formatMessage(
                        { id: 'signup.form.info.age.class' },
                        { age: 50 },
                      ),
                      value: 50,
                    },
                    {
                      label: `${intl.formatMessage(
                        { id: 'signup.form.info.age.class.over' },
                        { age: 60 },
                      )} ${intl.formatMessage({ id: 'common.up' })}`,
                      value: 60,
                    },
                  ].map((element) => (
                    <MenuItem key={element.label} value={element.value}>
                      {element.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledInputLabel>
          )}
        />
        <Controller
          name="snsId"
          control={control}
          render={({ field }) => (
            <Stack>
              <StyledInputLabel multiline>
                <Typography component="h3" fontWeight={700}>
                  SNS(인스타그램) 아이디
                </Typography>
                <TextField {...field} placeholder="@" fullWidth />
              </StyledInputLabel>
              <Controller
                name="isOpenSns"
                control={control}
                render={({ field }) => (
                  <Box component="div" display="flex" justifyContent="flex-end">
                    <FormControlLabel
                      {...field}
                      control={
                        <Checkbox
                          checked={field.value}
                          size="small"
                          defaultChecked
                        />
                      }
                      label={intl.formatMessage({
                        id: 'signup.form.info.private',
                      })}
                      sx={{
                        color: '#42474E',
                        fontWeight: 400,
                      }}
                    />
                  </Box>
                )}
              />
            </Stack>
          )}
        />
        <Controller
          name="id1365"
          control={control}
          render={({ field }) => (
            <Stack gap="0.5rem">
              <StyledInputLabel multiline>
                <Typography component="h3" fontWeight={700}>
                  1365 아이디
                </Typography>
                <TextField
                  {...field}
                  placeholder="1365 아이디를 입력해주세요"
                  fullWidth
                />
              </StyledInputLabel>
              <Stack padding="0 0.325rem" gap="0.5rem">
                <Controller
                  name="birth"
                  control={control}
                  rules={{
                    required: watch('id1365')
                      ? '생년월일을 입력해주세요!'
                      : false,
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      color={fieldState.error && 'error'}
                      helperText={fieldState.error && fieldState.error.message}
                      placeholder="생년월일도 함께 적어주세요"
                      type="text"
                      inputMode="decimal"
                      inputProps={{
                        inputMode: 'decimal',
                        pattern: '[0-9]*',
                      }}
                    />
                  )}
                />
                <Stack
                  component="div"
                  width="100%"
                  alignItems="flex-end"
                  paddingRight="1.125rem"
                  gap="0.25rem"
                >
                  <TextLink
                    newTabs
                    label="1365 아이디 찾으러 가기"
                    to="https://www.1365.go.kr/vols/main.do"
                  />
                </Stack>
              </Stack>
            </Stack>
          )}
        />
      </Stack>
    </form>
  );
};

export default InfoEdit;
