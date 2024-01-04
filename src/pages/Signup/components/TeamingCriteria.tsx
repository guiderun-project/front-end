import styled from '@emotion/styled';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useIntl, FormattedMessage } from 'react-intl';

import SignupContentBox from './SignupContentBox';

//
//
//

const StyledRunGroupBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

//
//
//

const TeamingCriteria: React.FC = () => {
  const intl = useIntl();

  return (
    <SignupContentBox
      title={intl.formatMessage({ id: 'teamingCriteria.title' })}
      content={
        <Stack width="100%" gap="1.5rem">
          <Stack gap="1rem">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <Typography key={`teamingCriteria.content.${idx + 1}`}>
                  <FormattedMessage id={`teamingCriteria.content.${idx + 1}`} />
                </Typography>
              ))}
          </Stack>
          <Card>
            <CardContent
              aria-lable={intl.formatMessage({ id: 'teamingCriteria.title' })}
              sx={{
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '2.5rem',
              }}
            >
              <Stack
                gap="1.5rem"
                aria-lable={intl.formatMessage({ id: 'teamingCriteria.vi' })}
              >
                <Typography fontWeight={800}>
                  <FormattedMessage id="common.vi" />
                </Typography>
                <Stack>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>A</Typography>
                    <Typography>
                      <FormattedMessage
                        id="teamingCriteria.record.fast"
                        values={{
                          minutes: 50,
                        }}
                      />
                    </Typography>
                  </StyledRunGroupBox>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>B</Typography>
                    <Typography>
                      <FormattedMessage
                        id="teamingCriteria.record.medium"
                        values={{
                          minutes1: 51,
                          minutes2: 56,
                        }}
                      />
                    </Typography>
                  </StyledRunGroupBox>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>C</Typography>
                    <Typography>
                      <FormattedMessage
                        id="teamingCriteria.record.medium"
                        values={{
                          minutes1: 57,
                          minutes2: 65,
                        }}
                      />
                    </Typography>
                  </StyledRunGroupBox>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>D</Typography>
                    <Typography>
                      <FormattedMessage
                        id="teamingCriteria.record.another"
                        values={{
                          minutes: 66,
                        }}
                      />
                    </Typography>
                  </StyledRunGroupBox>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>E</Typography>
                    <Typography>
                      <FormattedMessage id="teamingCriteria.record.none" />
                    </Typography>
                  </StyledRunGroupBox>
                </Stack>
              </Stack>
              <Stack
                gap="1.5rem"
                aria-lable={intl.formatMessage({ id: 'teamingCriteria.guide' })}
              >
                <Typography fontWeight={800}>
                  <FormattedMessage id="common.guide" />
                </Typography>
                <Stack>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>A</Typography>
                    <Typography>
                      <FormattedMessage
                        id="teamingCriteria.record.fast"
                        values={{
                          minutes: 45,
                        }}
                      />
                    </Typography>
                  </StyledRunGroupBox>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>B</Typography>
                    <Typography>
                      <FormattedMessage
                        id="teamingCriteria.record.medium"
                        values={{
                          minutes1: 46,
                          minutes2: 52,
                        }}
                      />
                    </Typography>
                  </StyledRunGroupBox>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>C</Typography>
                    <Typography>
                      <FormattedMessage
                        id="teamingCriteria.record.medium"
                        values={{
                          minutes1: 53,
                          minutes2: 59,
                        }}
                      />
                    </Typography>
                  </StyledRunGroupBox>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>D</Typography>
                    <Typography>
                      <FormattedMessage
                        id="teamingCriteria.record.another"
                        values={{
                          minutes: 60,
                        }}
                      />
                    </Typography>
                  </StyledRunGroupBox>
                  <StyledRunGroupBox>
                    <Typography fontWeight={700}>E</Typography>
                    <Typography>
                      <FormattedMessage id="teamingCriteria.record.none" />
                    </Typography>
                  </StyledRunGroupBox>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      }
    />
  );
};

export default TeamingCriteria;
