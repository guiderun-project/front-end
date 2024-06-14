import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { GroupChip } from '../GroupChip';

import { RunningGroup } from '@/types/group';

//
//
//

const StyledRunGroupBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledContentBox = styled.section`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  width: 100%;
  padding: 1.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  background-color: #fff;
`;

//
//
//

const PaceGroupList: React.FC = () => {
  const intl = useIntl();
  return (
    <StyledContentBox>
      <Stack gap="1.5rem">
        <Typography component="h3" fontWeight={800}>
          <FormattedMessage id="common.vi" />
        </Typography>
        <Stack gap="1rem">
          <StyledRunGroupBox>
            <GroupChip group={RunningGroup.A} type="text" />
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
            <GroupChip group={RunningGroup.B} type="text" />
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
            <GroupChip group={RunningGroup.C} type="text" />
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
            <GroupChip group={RunningGroup.D} type="text" />
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
            <GroupChip group={RunningGroup.E} type="text" />
            <Typography>
              <FormattedMessage id="teamingCriteria.record.none" />
            </Typography>
          </StyledRunGroupBox>
        </Stack>
      </Stack>
      <Stack gap="1.5rem">
        <Typography component="h3" fontWeight={800}>
          <FormattedMessage id="common.guide" />
        </Typography>
        <Stack gap="1rem">
          <StyledRunGroupBox>
            <GroupChip group={RunningGroup.A} type="text" />
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
            <GroupChip group={RunningGroup.B} type="text" />
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
            <GroupChip group={RunningGroup.C} type="text" />
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
            <GroupChip group={RunningGroup.D} type="text" />
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
            <GroupChip group={RunningGroup.E} type="text" />
            <Typography>
              <FormattedMessage id="teamingCriteria.record.none" />
            </Typography>
          </StyledRunGroupBox>
        </Stack>
      </Stack>
    </StyledContentBox>
  );
};

export default PaceGroupList;
