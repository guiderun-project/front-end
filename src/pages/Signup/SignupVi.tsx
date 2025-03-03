import React from 'react';

import {
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import {
  useForm,
  FormProvider,
  Controller,
  FieldErrors,
} from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SignupContentBox from './components/SignupContentBox';
import SignupFormBox, { StyledInputLabel } from './components/SignupFormBox';
import SignupTerms from './components/SignupTerms';

import authApi from '@/apis/requests/auth';
import { ViSignupPostRequest } from '@/apis/types/auth';
import { PageTitle } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { setAccessToken } from '@/store/reducer/auth';
import { updateInfo } from '@/store/reducer/user';
import { FormType } from '@/types/form';
import {
  DisabilityEnum,
  GenderEnum,
  RoleEnum,
  RunningGroup,
} from '@/types/group';

const SignupVi: React.FC = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [searchParams, setSearchparams] = useSearchParams();
  const methods = useForm<ViSignupPostRequest>();

  const isRunngingExp = methods.watch('isRunningExp');

  const handleIdCheck = async () => {
    const accountId = methods.getValues().accountId;
    authApi
      .checkDuplicatedPost({ accountId })
      .then((isUnique) => {
        if (isUnique) {
          if (
            window.confirm(
              intl.formatMessage({ id: 'signup.form.info.id.check.success' }),
            )
          ) {
            setIsChecked(true);
            methods.setValue('accountId', methods.getValues().accountId);
          }
          return;
        }
        alert(intl.formatMessage({ id: 'signup.form.info.id.check.failed' }));
      })
      .catch((err) => alert(err.message));
  };

  /**
   *
   */
  const handleSubmit = async (data: ViSignupPostRequest) => {
    if (!isChecked || !isPasswordConfirm) {
      if (!isChecked) {
        alert('아이디 중복 확인이 필요합니다.');
      }
      if (!isPasswordConfirm) {
        alert('아이디 중복 확인이 필요합니다.');
      }
      return;
    }
    try {
      setIsSubmitting(true);
      const { userId, accessToken } = await authApi.viSignupPost(data);
      dispatch(
        updateInfo({ type: DisabilityEnum.GUIDE, role: RoleEnum.Wait, userId }),
      );
      dispatch(setAccessToken(accessToken));
      setSearchparams({
        type: searchParams.get('type') ?? '',
        isCompleted: 'true',
      });
    } catch (e) {
      setIsSubmitting(false);
      if (
        axios.isAxiosError<{
          errorCode: string;
          message: string;
        }>(e) &&
        e.response
      ) {
        alert(e.response.data.message);
        return;
      }
      alert('에러가 발생했습니다. ');
    }
  };

  /**
   *
   */
  const handleInvalid = (errors: FieldErrors<ViSignupPostRequest>) => {
    Object.keys(errors).forEach((key) => {
      alert(errors[key as keyof FieldErrors<ViSignupPostRequest>]?.message);
    });
  };

  /**
   *
   */
  const renderUserInfo = () => {
    return (
      <SignupContentBox
        title={intl.formatMessage({ id: 'signup.form.info.title' })}
        content={
          <Stack gap="2rem" width="100%" paddingTop="0.125rem">
            <Box
              component="div"
              display="grid"
              gridTemplateColumns="1fr 3fr"
              alignItems="center"
              padding="0.25rem"
              gap="1rem"
            >
              {/* 이름 */}
              <Typography fontWeight={700} color="#666">
                <FormattedMessage id="signup.form.info.disability" />
              </Typography>
              <Typography>
                <FormattedMessage id="common.vi" />
              </Typography>
            </Box>
            {/* 성별 */}
            <SignupFormBox
              required
              name="gender"
              title={intl.formatMessage({ id: 'signup.form.info.gender' })}
              formType={FormType.Radio}
              formValue={[
                {
                  value: GenderEnum.M,
                  label: intl.formatMessage({ id: 'common.gender.man' }),
                },
                {
                  value: GenderEnum.W,
                  label: intl.formatMessage({ id: 'common.gender.woman' }),
                },
              ]}
            />
            {/* 아이디 */}
            <Controller
              name="accountId"
              control={methods.control}
              defaultValue=""
              rules={{
                required: '아이디는 필수 입력입니다.',
                minLength: 1,
                maxLength: 15,
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: '아이디는 영문으로 1자 이상 15자 미만이어야 합니다.',
                },
              }}
              render={({ field, fieldState }) => (
                <StyledInputLabel multiLine>
                  <Typography
                    color={fieldState.invalid ? 'error' : 'default'}
                    whiteSpace="break-spaces"
                    fontWeight={700}
                  >
                    <Badge color="error" variant="dot">
                      <FormattedMessage id="signup.form.info.id" />
                    </Badge>
                  </Typography>
                  <Box
                    width="100%"
                    component="div"
                    display="flex"
                    gap="1rem"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      type="id"
                      disabled={isChecked}
                      placeholder={intl.formatMessage({
                        id: 'signup.form.info.id.label',
                      })}
                      onChange={(e) => {
                        field.onChange(e);
                        methods.trigger('accountId');
                      }}
                    />
                    <Chip
                      clickable
                      component="button"
                      variant="outlined"
                      disabled={
                        isChecked ||
                        fieldState.invalid ||
                        field.value?.length === 0
                      }
                      label={intl.formatMessage({
                        id: 'signup.form.info.id.check',
                      })}
                      onClick={handleIdCheck}
                      sx={{
                        border: '1px solid #333',
                        padding: '0.625rem 1rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                      }}
                    />
                  </Box>
                  {fieldState.invalid && (
                    <Typography color="error" fontSize="0.75rem">
                      <FormattedMessage id="signup.form.info.id.error" />
                    </Typography>
                  )}
                </StyledInputLabel>
              )}
            />
            {/* 비밀번호 */}
            <Controller
              name="password"
              control={methods.control}
              rules={{
                required: '비밀번호는 필수 입력입니다.',
                minLength: 8,
                maxLength: 32,
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/,
                  message:
                    '영문, 특수문자(!@#$%^&*?_), 숫자를 포함하여 8자 이상 32자 미만 입력해주세요.',
                },
              }}
              render={({ field, fieldState }) => (
                <Stack gap="1rem">
                  <StyledInputLabel multiLine={false}>
                    <Typography
                      color={fieldState.invalid ? 'error' : 'default'}
                      whiteSpace="break-spaces"
                      fontWeight={700}
                    >
                      <Badge color="error" variant="dot">
                        <FormattedMessage id="signup.form.info.password" />
                      </Badge>
                    </Typography>
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      type="password"
                      placeholder={intl.formatMessage({
                        id: 'signup.form.info.password.label',
                      })}
                      onChange={(e) => {
                        field.onChange(e);
                        methods.trigger('password');
                      }}
                    />
                  </StyledInputLabel>
                  {fieldState.invalid && (
                    <Typography color="error" fontSize="0.75rem">
                      <FormattedMessage id="signup.form.info.password.error" />
                    </Typography>
                  )}
                </Stack>
              )}
            />
            {/* 비밀번호 확인 */}
            <Stack gap="0.5rem">
              <StyledInputLabel multiLine={false}>
                <Badge color="error" variant="dot">
                  <Typography
                    color={!isPasswordConfirm ? 'error' : 'default'}
                    whiteSpace="normal"
                    fontWeight={700}
                  >
                    <FormattedMessage id="signup.form.info.password.confirm" />
                  </Typography>
                </Badge>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  placeholder={intl.formatMessage({
                    id: 'signup.form.info.password.label',
                  })}
                  onChange={(e) => {
                    if (methods.getValues().password === e.target.value) {
                      setIsPasswordConfirm(true);
                      return;
                    }
                    setIsPasswordConfirm(false);
                  }}
                />
              </StyledInputLabel>
              {!isPasswordConfirm && (
                <Typography color="error" fontSize="0.75rem">
                  <FormattedMessage id="signup.form.info.password.confirm.error" />
                </Typography>
              )}
            </Stack>
            <SignupFormBox
              required
              name="name"
              title={intl.formatMessage({ id: 'signup.form.info.name' })}
              label={intl.formatMessage({ id: 'signup.form.info.name.label' })}
              formType={FormType.Input}
            />
            {/* 전화번호 */}
            <SignupFormBox
              required
              name="phoneNumber"
              title={intl.formatMessage({ id: 'signup.form.info.tel' })}
              label={intl.formatMessage({ id: 'signup.form.info.tel.label' })}
              formType={FormType.Number}
              openBox={
                <Controller
                  name="isOpenNumber"
                  control={methods.control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Box
                      component="div"
                      display="flex"
                      width="100%"
                      justifyContent="flex-end"
                    >
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
              }
            />
            {/* 나이 */}
            <SignupFormBox
              required
              name="age"
              title={intl.formatMessage({ id: 'signup.form.info.age' })}
              label={intl.formatMessage({ id: 'signup.form.info.age' })}
              formType={FormType.Select}
              formValue={[
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
                  label: intl.formatMessage(
                    { id: 'signup.form.info.age.class.over' },
                    { age: 60 },
                  ),
                  value: 60,
                },
              ]}
            />
            {/* SNS */}
            <SignupFormBox
              multiLine
              name="snsId"
              title={intl.formatMessage({ id: 'signup.form.info.sns' })}
              label={intl.formatMessage({ id: 'signup.form.info.sns.label' })}
              prefix={intl.formatMessage({ id: 'common.whelk' })}
              formType={FormType.Input}
              openBox={
                <Controller
                  name="isOpenSns"
                  control={methods.control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Box
                      component="div"
                      display="flex"
                      width="100%"
                      justifyContent="flex-end"
                    >
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
              }
            />
          </Stack>
        }
      />
    );
  };

  /**
   * 러닝 스펙
   */
  const renderRunningSpec = () => {
    return (
      <SignupContentBox
        title={intl.formatMessage({ id: 'signup.form.running.title' })}
        content={
          <Stack gap="2rem" width="100%">
            {/* 러닝 경험 유무 */}
            <SignupFormBox
              required
              name="isRunningExp"
              title={intl.formatMessage({
                id: 'signup.form.running.experience',
              })}
              formType={FormType.BooleanRadio}
              formValue={[
                {
                  label: intl.formatMessage({ id: 'common.have' }),
                  value: true,
                },
                {
                  label: intl.formatMessage({ id: 'common.have.not' }),
                  value: false,
                },
              ]}
            />
            {isRunngingExp !== undefined && isRunngingExp && (
              <>
                {/* 달리기 기록 */}
                <SignupFormBox
                  required={methods.watch('isRunningExp')}
                  name="recordDegree"
                  title={intl.formatMessage({
                    id: 'signup.form.running.record',
                  })}
                  label={intl.formatMessage({
                    id: 'signup.form.running.record.label',
                  })}
                  formType={FormType.Select}
                  formValue={[
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
                  ]}
                />
                {/* 상세 기록 */}
                <SignupFormBox
                  multiLine
                  name="detailRecord"
                  title={intl.formatMessage({
                    id: 'signup.form.running.detail',
                  })}
                  label={intl.formatMessage({
                    id: 'signup.form.running.detail.label',
                  })}
                  formType={FormType.Input}
                />
                {/* 상세 기록 */}
                <SignupFormBox
                  multiLine
                  name="guideName"
                  title={intl.formatMessage({
                    id: 'signup.form.running.vi.guide.name',
                  })}
                  label="당시 파트너 성함을 입력해주세요"
                  formType={FormType.Input}
                />
                {/* 주로 뛰는 장소 */}
                <SignupFormBox
                  multiLine
                  name="runningPlace"
                  title={intl.formatMessage({
                    id: 'signup.form.running.location',
                  })}
                  label={intl.formatMessage({
                    id: 'signup.form.running.location.label',
                  })}
                  formType={FormType.Input}
                />
              </>
            )}
            {isRunngingExp !== undefined && !isRunngingExp && (
              <>
                {/* 프로그램을 알게 된 경로 */}
                <SignupFormBox
                  multiLine
                  name="howToKnow"
                  title={intl.formatMessage({
                    id: 'signup.form.running.way',
                  })}
                  formType={FormType.CheckBox}
                  formValue={[
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
                  ]}
                />
                {/* 참여 동기 */}
                <SignupFormBox
                  multiLine
                  name="motive"
                  title={intl.formatMessage({
                    id: 'signup.form.running.reason',
                  })}
                  label={intl.formatMessage({
                    id: 'signup.form.running.reason.label',
                  })}
                  formType={FormType.Textarea}
                />
              </>
            )}
            {/* 이 외 희망사항 */}
            <SignupFormBox
              multiLine
              name="hopePrefs"
              title={intl.formatMessage({ id: 'signup.form.running.request' })}
              label={intl.formatMessage({
                id: 'signup.form.running.request.label',
              })}
              formType={FormType.Textarea}
            />
          </Stack>
        }
      />
    );
  };

  /**
   *
   */
  const renderButton = () => {
    return (
      <Stack gap="1rem" alignItems="center">
        <Button
          fullWidth
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
        >
          {isSubmitting ? (
            <CircularProgress color="inherit" />
          ) : (
            <FormattedMessage id="signup.form.submit" />
          )}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => navigate(BROWSER_PATH.SIGNUP)}
        >
          <FormattedMessage id="signup.form.back" />
        </Button>
      </Stack>
    );
  };

  //
  //
  //

  return (
    <FormProvider {...methods}>
      <PageTitle title="회원 정보 입력(VI)" />
      <form onSubmit={methods.handleSubmit(handleSubmit, handleInvalid)}>
        <Stack padding="5rem 0" gap="3.75rem">
          <Typography component="h1" fontSize="2rem" fontWeight={400}>
            기본 정보 입력하기
          </Typography>
          {renderUserInfo()}
          {renderRunningSpec()}
          <SignupTerms />
          {renderButton()}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default SignupVi;
