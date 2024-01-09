import { Button, Stack } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SignupContentBox from './components/SignupContentBox';
import SignupFormBox from './components/SignupFormBox';
import SignupTerms from './components/SignupTerms';
import TeamingCriteria from './components/TeamingCriteria';

import { BROWSER_PATH } from '@/constants/path';
import { FormType } from '@/types/form';
import { RunningGroup } from '@/types/group';

//
//
//

export interface SignupViForm {
  name: string;
  gender: 'MAN' | 'WOMAN';
  phone: string;
  age: number;
  snsAccount: string;
  runningExperience: boolean;
  personalRecord: RunningGroup;
  detailRecord: string;
  runnigPlace: string;
  guideNameRanWith: string;
  howToKnow: string[];
  motive: string;
  hopePrefs: string;
  privacy: boolean;
  portraitRights: boolean;
}

//
//
//

const SignupVi: React.FC = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [searchParams, setSearchparams] = useSearchParams();
  const methods = useForm<SignupViForm>();

  /**
   *
   */
  const renderUserInfo = () => {
    return (
      <SignupContentBox
        title={intl.formatMessage({ id: 'signup.form.info.title' })}
        content={
          <Stack gap="2rem" width="100%" paddingTop="0.125rem">
            <SignupFormBox
              name="disability"
              title={intl.formatMessage({ id: 'signup.form.info.disability' })}
              label={intl.formatMessage({ id: 'common.vi' })}
              disabled
              formType={FormType.Input}
            />
            <SignupFormBox
              name="gender"
              required
              title={intl.formatMessage({ id: 'signup.form.info.gender' })}
              formType={FormType.Radio}
              formValue={[
                {
                  value: 'MAN',
                  label: intl.formatMessage({ id: 'common.gender.man' }),
                },
                {
                  value: 'WOMAN',
                  label: intl.formatMessage({ id: 'common.gender.woman' }),
                },
              ]}
            />
            <SignupFormBox
              required
              name="name"
              title={intl.formatMessage({ id: 'signup.form.info.name' })}
              label={intl.formatMessage({ id: 'signup.form.info.name.label' })}
              formType={FormType.Input}
            />
            <SignupFormBox
              required
              name="phone"
              title={intl.formatMessage({ id: 'signup.form.info.tel' })}
              label={intl.formatMessage({ id: 'signup.form.info.tel.label' })}
              formType={FormType.Input}
            />
            <SignupFormBox
              required
              name="age"
              title={intl.formatMessage({ id: 'signup.form.info.age' })}
              label={intl.formatMessage({ id: 'signup.form.info.age' })}
              formType={FormType.Select}
              formValue={[
                {
                  label: intl.formatMessage(
                    { id: 'signup.form.info.age.class' },
                    { age: 10 },
                  ),
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
                    { id: 'signup.form.info.age.class' },
                    { age: 60 },
                  )} ${intl.formatMessage({ id: 'common.up' })}`,
                  value: 60,
                },
              ]}
            />
            <SignupFormBox
              multiLine
              name="snsAccount"
              title={intl.formatMessage({ id: 'signup.form.info.sns' })}
              label={intl.formatMessage({ id: 'common.whelk' })}
              formType={FormType.Input}
            />
          </Stack>
        }
      />
    );
  };

  /**
   *
   */
  const renderRunningSpec = () => {
    return (
      <SignupContentBox
        title={intl.formatMessage({ id: 'signup.form.running.title' })}
        content={
          <Stack gap="2rem" width="100%">
            <SignupFormBox
              required
              name="runningExperience"
              title={intl.formatMessage({
                id: 'signup.form.running.experience',
              })}
              formType={FormType.Radio}
              formValue={[
                {
                  label: intl.formatMessage({ id: 'common.yes' }),
                  value: true,
                },
                {
                  label: intl.formatMessage({ id: 'common.no' }),
                  value: false,
                },
              ]}
            />
            <SignupFormBox
              required
              name="personalRecord"
              title={intl.formatMessage({ id: 'signup.form.running.record' })}
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
            <SignupFormBox
              multiLine
              name="detailRecord"
              title={intl.formatMessage({ id: 'signup.form.running.detail' })}
              label={intl.formatMessage({
                id: 'signup.form.running.detail.label',
              })}
              formType={FormType.Input}
            />
            <SignupFormBox
              multiLine
              name="runningPlace"
              title={intl.formatMessage({ id: 'signup.form.running.location' })}
              label={intl.formatMessage({
                id: 'signup.form.running.location.label',
              })}
              formType={FormType.Input}
            />
            <SignupFormBox
              multiLine
              name="howToKnow"
              title={intl.formatMessage({ id: 'signup.form.running.way' })}
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
            <SignupFormBox
              multiLine
              name="motive"
              title={intl.formatMessage({ id: 'signup.form.running.reason' })}
              label={intl.formatMessage({
                id: 'signup.form.running.reason.label',
              })}
              formType={FormType.Textarea}
            />
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
      <Stack gap="1rem">
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          color="secondary"
        >
          <FormattedMessage id="signup.form.submit" />
        </Button>
        <Button
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
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
      <form
        onSubmit={() => {
          setSearchparams({
            type: searchParams.get('type') ?? '',
            isCompleted: 'true',
          });
        }}
      >
        <Stack padding="5rem 0" gap="5rem">
          {renderUserInfo()}
          {renderRunningSpec()}
          <SignupTerms />
          <TeamingCriteria />
          {renderButton()}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default SignupVi;
