import { Stack, Typography } from '@mui/material';

import { DisabilityChip, TitleContentRow } from '@/components/shared';
import { DisabilityEnum } from '@/types/group';

//
//
//

interface RecruitCountBoxProps {
  title: string;
  viNum: number;
  guideNum: number;
}

//
//
//

const RecruitCountBox: React.FC<RecruitCountBoxProps> = ({
  title,
  viNum,
  guideNum,
}) => {
  return (
    <TitleContentRow
      title={title}
      alignItems="flex-start"
      content={
        <Stack gap="0.5rem">
          <Stack direction="row" alignItems="center" gap="0.25rem">
            <DisabilityChip component="chip" type={DisabilityEnum.VI} />
            <Typography component="span" fontSize="0.875rem">
              <span style={{ color: '#DE1313' }}>{viNum}</span>명
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="0.25rem">
            <DisabilityChip component="chip" type={DisabilityEnum.GUIDE} />
            <Typography component="span" fontSize="0.875rem">
              <span style={{ color: '#DE1313' }}>{guideNum}</span>명
            </Typography>
          </Stack>
        </Stack>
      }
    />
  );
};

export default RecruitCountBox;
