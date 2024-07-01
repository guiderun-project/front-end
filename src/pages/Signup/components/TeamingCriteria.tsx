import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { PaceGroupList } from '@/components/shared';

const TeamingCriteria: React.FC = () => {
  return (
    <Stack gap="1rem">
      <Typography component="h2" fontWeight={700} fontSize="1.5rem">
        <FormattedMessage id="teamingCriteria.title" />
      </Typography>
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
        {/*팀 매칭 표*/}
        <PaceGroupList />
      </Stack>
    </Stack>
  );
};

export default TeamingCriteria;
