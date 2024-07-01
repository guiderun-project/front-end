import React from 'react';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  TextField,
  Typography,
  RadioGroup,
  Badge,
} from '@mui/material';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { StyledInputLabel } from './InfoEdit';

import infoApi from '@/apis/requests/info';
import { RunningSpecGuidePatchRequest } from '@/apis/types/info';
import { RootState } from '@/store/index';
import { RunningGroup } from '@/types/group';

//
//
//

const SpecGuideEdit: React.FC = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const userId = useSelector((state: RootState) => state.user.userId);
  const { data } = useSuspenseQuery({
    queryKey: ['runningSpecGuideGet', userId],
    queryFn: () => infoApi.runningSpecGuideGet({ userId }),
  });
  const { handleSubmit, control, setValue, watch, setFocus } =
    useForm<RunningSpecGuidePatchRequest>({
      defaultValues: data,
    });
  const [searchParams, setSearchParams] = useSearchParams();
  const isGuideExp = watch('isGuideExp');

  /**
   *
   */
  const onSubmit = async (data: RunningSpecGuidePatchRequest) => {
    if (data && window.confirm('저장하시겠습니까?')) {
      try {
        await infoApi.runningSpecGuidePatch(data);
        alert('저장되었습니다. ');
        queryClient.invalidateQueries({ queryKey: ['runningSpecGuideGet'] });
        searchParams.set('mode', 'detail');
        setSearchParams(searchParams.toString());
      } catch (err) {
        alert('오류가 발생했습니다. ');
      }
    }
  };

  //
  //
  //
  React.useEffect(() => {
    setFocus('recordDegree');
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
        {/* 개인 기록 */}
        <Controller
          name="recordDegree"
          control={control}
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
                  inputRef={field.ref}
                  fullWidth
                  labelId="recordDegree"
                  label="10km 기준"
                  size="small"
                >
                  {[
                    {
                      label: `A ${intl.formatMessage(
                        { id: 'teamingCriteria.record.fast' },
                        { minutes: 45 },
                      )}`,
                      value: RunningGroup.A,
                    },
                    {
                      label: `B ${intl.formatMessage(
                        { id: 'teamingCriteria.record.medium' },
                        { minutes1: 45, minutes2: 52 },
                      )}`,
                      value: RunningGroup.B,
                    },
                    {
                      label: `C ${intl.formatMessage(
                        { id: 'teamingCriteria.record.medium' },
                        { minutes1: 53, minutes2: 59 },
                      )}`,
                      value: RunningGroup.C,
                    },
                    {
                      label: `D ${intl.formatMessage(
                        { id: 'teamingCriteria.record.another' },
                        { minutes: 60 },
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
        {/* 시각장애러너의 가이드러너 경험 */}
        <Controller
          name="isGuideExp"
          control={control}
          render={({ field }) => (
            <StyledInputLabel multiline>
              <Typography component="h3" fontWeight={700}>
                <Badge color="error" variant="dot">
                  시각장애러너의 가이드러너 경험
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
                  control={<Radio />}
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
        {isGuideExp && (
          <>
            {/* 함께 뛰었던 시각장애러너의 성함 */}
            <Controller
              name="viName"
              control={control}
              rules={{
                required: isGuideExp,
              }}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    <Badge color="error" variant="dot">
                      함께 뛰었던 시각장애러너의 성함
                    </Badge>
                  </Typography>
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="당시 파트너 성함을 알려주세요."
                  />
                </StyledInputLabel>
              )}
            />
            {/* 당시 파트너의 페이스를 적어주세요 */}
            <Controller
              name="viRecord"
              control={control}
              rules={{
                required: isGuideExp,
              }}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    <Badge color="error" variant="dot">
                      당시 파트너의 페이스를 적어주세요
                    </Badge>
                  </Typography>
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="1km 기준 페이스를 알려주세요."
                  />
                </StyledInputLabel>
              )}
            />
            {/* 상세 경험을 알려주세요 */}
            <Controller
              name="viCount"
              control={control}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    상세 경험을 알려주세요
                  </Typography>
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="가이드러너로 활동한 기간 등"
                  />
                </StyledInputLabel>
              )}
            />
          </>
        )}
        {!isGuideExp && (
          <>
            {/* 프로그램을 알게된 경로 */}
            <Controller
              name="howToKnow"
              control={control}
              render={({ field }) => (
                <StyledInputLabel multiline>
                  <Typography component="h3" fontWeight={700}>
                    프로그램을 알게된 경로
                  </Typography>
                  <FormGroup>
                    {[
                      {
                        label: intl.formatMessage({
                          id: `signup.form.running.way.guide.1`,
                        }),
                        value: `guide.1`,
                      },
                      {
                        label: intl.formatMessage({
                          id: `signup.form.running.way.guide.2`,
                        }),
                        value: `guide.2`,
                      },
                      {
                        label: intl.formatMessage({
                          id: `signup.form.running.way.guide.3`,
                        }),
                        value: `guide.3`,
                      },
                      {
                        label: intl.formatMessage({
                          id: `signup.form.running.way.guide.4`,
                        }),
                        value: `guide.4`,
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
        {/* 가이드가 가능한 페이스 그룹 */}
        <Controller
          name="guidingPace"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <StyledInputLabel multiline>
              <Typography component="h3" fontWeight={700}>
                <Badge color="error" variant="dot">
                  가이드가 가능한 페이스 그룹
                </Badge>
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel id="guidingPace">10km 기준</InputLabel>
                <Select
                  {...field}
                  fullWidth
                  labelId="guidingPace"
                  label="10km 기준"
                  size="small"
                >
                  {[
                    {
                      value: RunningGroup.A,
                      label: intl.formatMessage(
                        { id: 'signup.form.running.group.first' },
                        { group: 'A', minutes: 50 },
                      ),
                    },
                    {
                      value: RunningGroup.B,
                      label: intl.formatMessage(
                        { id: 'signup.form.running.group.medium' },
                        { group: 'B', minutes1: 51, minutes2: 56 },
                      ),
                    },
                    {
                      value: RunningGroup.C,
                      label: intl.formatMessage(
                        { id: 'signup.form.running.group.medium' },
                        { group: 'C', minutes1: 57, minutes2: 65 },
                      ),
                    },
                    {
                      value: RunningGroup.D,
                      label: intl.formatMessage(
                        { id: 'signup.form.running.group.another' },
                        { group: 'D', minutes: 66 },
                      ),
                    },
                    {
                      value: RunningGroup.E,
                      label: intl.formatMessage(
                        { id: 'signup.form.running.group.last' },
                        { group: 'E' },
                      ),
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

export default SpecGuideEdit;
