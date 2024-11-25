import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { PaceGroupList } from '@/components/shared';

const TeamingCriteria: React.FC = () => {
  return (
    <Stack gap="1rem" paddingLeft="0.5rem">
      <Typography component="h2" fontWeight={700} fontSize="1.5rem">
        <FormattedMessage id="teamingCriteria.title" />
      </Typography>
      <Stack width="100%" gap="1rem">
        <Stack component="ul" gap="0.5rem" paddingLeft="0.5rem">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <Typography
                component="li"
                key={`teamingCriteria.content.${idx + 1}`}
                style={{ listStyleType: 'square', listStylePosition: 'inside' }}
              >
                <FormattedMessage id={`teamingCriteria.content.${idx + 1}`} />
              </Typography>
            ))}
        </Stack>
        {/*팀 매칭 표*/}
        <PaceGroupList />
      </Stack>
    </Stack>
  );
};

export default TeamingCriteria;
