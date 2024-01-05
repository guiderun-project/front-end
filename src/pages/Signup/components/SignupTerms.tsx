import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useIntl, FormattedMessage } from 'react-intl';

import SignupContentBox from './SignupContentBox';
import SignupFormBox from './SignupFormBox';

import { FormType } from '@/types/form';

const SignupTerms = () => {
  const intl = useIntl();

  return (
    <SignupContentBox
      title={intl.formatMessage({ id: 'signup.terms' })}
      content={
        <Stack gap="2rem" width="100%">
          <SignupFormBox
            title={intl.formatMessage({ id: 'signup.terms.privacy.title' })}
            required
            multiLine
            formType={FormType.Radio}
            formValue={[
              {
                value: false,
                label: intl.formatMessage({ id: 'signup.radio.agree' }),
              },
              {
                value: true,
                label: intl.formatMessage({ id: 'signup.radio.disagree' }),
              },
            ]}
            content={
              <Card
                sx={{
                  width: '100%',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {Array(4)
                    .fill(0)
                    .map((_, idx) => (
                      <Typography
                        key={`signup.terms.privacy.${idx + 1}`}
                        whiteSpace="break-spaces"
                      >
                        <FormattedMessage
                          id={`signup.terms.privacy.${idx + 1}`}
                        />
                      </Typography>
                    ))}
                </CardContent>
              </Card>
            }
          />
          <SignupFormBox
            title={intl.formatMessage({ id: 'signup.terms.likeness.title' })}
            required
            multiLine
            formType={FormType.Radio}
            formValue={[
              {
                value: false,
                label: intl.formatMessage({ id: 'signup.radio.agree' }),
              },
              {
                value: true,
                label: intl.formatMessage({ id: 'signup.radio.disagree' }),
              },
            ]}
            content={
              <Card
                sx={{
                  width: '100%',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <Typography
                        key={`signup.terms.likeness.${idx + 1}`}
                        whiteSpace="break-spaces"
                      >
                        <FormattedMessage
                          id={`signup.terms.likeness.${idx + 1}`}
                        />
                      </Typography>
                    ))}
                </CardContent>
              </Card>
            }
          />
        </Stack>
      }
    />
  );
};

export default SignupTerms;
