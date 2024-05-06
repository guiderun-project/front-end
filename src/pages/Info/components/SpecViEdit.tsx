import React from 'react';

import {
  Badge,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Select,
  FormGroup,
  Checkbox,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { StyledInputLabel } from './InfoEdit';

import infoApi from '@/apis/requests/info';
import { RunningSpecViPatchRequest } from '@/apis/types/info';
import { RootState } from '@/store/index';
import { RunningGroup } from '@/types/group';

//
//
//

const SpecViEdit: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery({
    queryKey: ['runningSpecViGet', userId],
    queryFn: () => infoApi.runningSpecViGet({ userId }),
  });
  const intl = useIntl();
  const { handleSubmit, control, setValue, watch, setFocus } =
    useForm<RunningSpecViPatchRequest>({
      defaultValues: data,
    });
  const [searchParams, setSearchParams] = useSearchParams();

  const isRunningExp = watch('isRunningExp');

  /**
   *
   */
  const onSubmit = async (data: RunningSpecViPatchRequest) => {
    if (data && window.confirm('저장하시겠습니까?')) {
      await infoApi.runningSpecViPatch(data);
      alert('저장되었습니다. ');
      queryClient.invalidateQueries({ queryKey: ['runningSpecViGet'] });
      searchParams.set('mode', 'detail');
      setSearchParams(searchParams.toString());
    }
  };

  //
  //
  //
  React.useEffect(() => {
    setFocus('isRunningExp');
  }, [setFocus]);

  //
  //
  //

  return (
    <form id="edit_form" onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title>러닝 스펙 수정 - Guide run Project</title>
      </Helmet>
      <Stack gap="2rem">
        {/* 러닝 경험 */}
        <Controller
          name="isRunningExp"
          control={control}
          render={({ field }) => (
            <StyledInputLabel>
              <Typography component="h3" fontWeight={700}>
                <Badge color="error" variant="dot">
                  러닝 경험
                </Badge>
              </Typography>
              <RadioGroup
                {...field}
                onChange={(e) => field.onChange(e.target.value === 'true')}
                sx={{
                  width: '100%',
                  padding: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'space-between',
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio inputRef={field.ref} />}
                  label={intl.formatMessage({ id: 'common.yes' })}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={intl.formatMessage({ id: 'common.no' })}
                />
              </RadioGroup>
            </StyledInputLabel>
          )}
        />
        {isRunningExp && (
          <>
            {/* 개인 기록 */}
            <Controller
              name="recordDegree"
              control={control}
              rules={{
                required: isRunningExp,
              }}
              render={({ field }) => (
                <StyledInputLabel>
                  <Typography component="h3" fontWeight={700}>
                    <Badge color="error" variant="dot">
                      개인 기록
                    </Badge>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel id="recordDegree">10km 기준</InputLabel>
                    <Select
                      {...field}
                      fullWidth
                      labelId="recordDegree"
                      label="10km 기준"
                      size="small"
                    >
                      {[
                        {
                          label: `A ${intl.formatMessage(
                            { id: 'teamingCriteria.record.fast' },
                            { minutes: 50 },
                          )}`,
                          value: RunningGroup.A,
                        },
                        {
                          label: `B ${intl.formatMessage(
                            { id: 'teamingCriteria.record.medium' },
                            { minutes1: 51, minutes2: 56 },
                          )}`,
                          value: RunningGroup.B,
                        },
                        {
                          label: `C ${intl.formatMessage(
                            { id: 'teamingCriteria.record.medium' },
                            { minutes1: 57, minutes2: 65 },
                          )}`,
                          value: RunningGroup.C,
                        },
                        {
                          label: `D ${intl.formatMessage(
                            { id: 'teamingCriteria.record.another' },
                            { minutes: 66 },
                          )}`,
                          value: RunningGroup.D,
                        },
                        {
                          label: `E ${intl.formatMessage({
                            id: 'teamingCriteria.record.none',
                          })}`,
                          value: RunningGroup.E,
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
            {/* 상세 기록 */}
            <Controller
              name="detailRecord"
              control={control}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    상세 기록
                  </Typography>
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="상세 기록을 적어주세요."
                  />
                </StyledInputLabel>
              )}
            />
            {/* 주로 달리는 장소 */}
            <Controller
              name="runningPlace"
              control={control}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    주로 달리는 장소
                  </Typography>
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="장소를 적어주세요."
                  />
                </StyledInputLabel>
              )}
            />
            {/* 함께 뛰었던 가이드러너 성함 */}
            <Controller
              name="guideName"
              control={control}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    함께 뛰었던 가이드러너 성함
                  </Typography>
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="당시 파트너 성함을 알려주세요."
                  />
                </StyledInputLabel>
              )}
            />
          </>
        )}
        {!isRunningExp && (
          <>
            {/* 프로그램을 알게 된 경로 */}
            <Controller
              name="howToKnow"
              control={control}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    프로그램을 알게 된 경로
                  </Typography>
                  <FormGroup>
                    {[
                      {
                        label: intl.formatMessage({
                          id: `signup.form.running.way.vi.1`,
                        }),
                        value: `vi.1`,
                      },
                      {
                        label: intl.formatMessage({
                          id: `signup.form.running.way.vi.2`,
                        }),
                        value: `vi.2`,
                      },
                      {
                        label: intl.formatMessage({
                          id: `signup.form.running.way.vi.3`,
                        }),
                        value: `vi.3`,
                      },
                    ].map((el) => (
                      <FormControlLabel
                        key={el.label}
                        control={
                          <Checkbox
                            checked={(field.value as string[])?.includes(
                              el.value as string,
                            )}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              if (!field.value) {
                                setValue('howToKnow', [selectedValue]);
                                return;
                              }

                              if (
                                (field.value as string[]).includes(
                                  selectedValue,
                                )
                              ) {
                                field.onChange(
                                  (field.value as string[]).filter(
                                    (value) => value !== selectedValue,
                                  ),
                                );
                                return;
                              }

                              field.onChange([...field.value, selectedValue]);
                            }}
                          />
                        }
                        value={el.value}
                        label={
                          <Typography whiteSpace="break-spaces">
                            {el.label}
                          </Typography>
                        }
                      />
                    ))}
                  </FormGroup>
                </StyledInputLabel>
              )}
            />
            {/* 참여 결심 계기를 알려주세요! */}
            <Controller
              name="motive"
              control={control}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    참여 결심 계기를 알려주세요!
                  </Typography>
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="참여 계기를 더 자세히 알려주세요"
                  />
                </StyledInputLabel>
              )}
            />
          </>
        )}
        {/* 이 외 희망사항 */}
        <Controller
          name="hopePrefs"
          control={control}
          render={({ field }) => (
            <StyledInputLabel multiline>
              <Typography component="h3" fontWeight={700}>
                이 외 희망사항
              </Typography>
              <TextField
                {...field}
                fullWidth
                placeholder="이 외 희망사항을 알려주세요"
              />
            </StyledInputLabel>
          )}
        />
      </Stack>
    </form>
  );
};

export default SpecViEdit;
