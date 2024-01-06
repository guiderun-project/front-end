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

const SignupGuide: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [searchParams, setSearchparams] = useSearchParams();
  const methods = useForm();

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
              label={intl.formatMessage({ id: 'common.guide' })}
              disabled
              formType={FormType.Input}
            />
            <SignupFormBox
              required
              name="gender"
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
              required
              multiLine
              name="guideExperience"
              title={intl.formatMessage({
                id: 'signup.form.running.guide.experience',
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
              multiLine
              name="viNameRanWith"
              title={intl.formatMessage({
                id: 'signup.form.running.guide.experience.vi',
              })}
              label={intl.formatMessage({
                id: 'signup.form.running.guide.experience.vi.label',
              })}
              formType={FormType.Textarea}
            />
            <SignupFormBox
              multiLine
              name="viRecordRanWith"
              title={intl.formatMessage({
                id: 'signup.form.running.guide.experience.pace',
              })}
              label={intl.formatMessage({
                id: 'signup.form.running.guide.experience.pace.example',
              })}
              formType={FormType.Input}
            />
            <SignupFormBox
              multiLine
              name="viCountRanWith"
              title={intl.formatMessage({
                id: 'signup.form.running.guide.experience.count',
              })}
              label={intl.formatMessage({
                id: 'signup.form.running.guide.experience.count.example',
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
              required
              multiLine
              name="possibleViPaceGroup"
              title={intl.formatMessage({ id: 'signup.form.running.group' })}
              label={intl.formatMessage({
                id: 'signup.form.running.group.label',
              })}
              formType={FormType.Select}
              formValue={[
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
              ]}
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
        onSubmit={methods.handleSubmit(() => {
          setSearchparams({
            type: searchParams.get('type') ?? '',
            isCompleted: 'true',
          });
        })}
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

export default SignupGuide;
