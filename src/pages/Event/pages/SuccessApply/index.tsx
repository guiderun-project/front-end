import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { PageTitle, TitleHeader } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { Event } from '@/types/event';

//
//
//
interface SuccessApplyProps {
  eventId: Event['eventId'];
}

//
//
//

const SuccessApply: React.FC<SuccessApplyProps> = ({ eventId }) => {
  return (
    <>
      <PageTitle title="이벤트 신청 완료" />
      <TitleHeader title="참여 여부 조사" />
      <Stack
        boxSizing="border-box"
        alignItems="center"
        justifyContent="space-between"
        paddingTop="5rem"
        sx={{
          height: 'calc(100vh - 207px)',
        }}
      >
        <Typography
          fontSize="2.5rem"
          lineHeight="2.983125rem"
          whiteSpace="break-spaces"
          textAlign="center"
        >
          {`참여 신청서가\n제출되었습니다 :)`}
        </Typography>
        <Stack width="100%" alignItems="center" gap="1rem">
          <Button
            fullWidth
            replace
            size="large"
            variant="contained"
            component={Link}
            to={`${BROWSER_PATH.EVENT.APPLY_DETAIL}/${eventId}`}
          >
            내가 제출한 정보 확인하기
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            component={Link}
            to={BROWSER_PATH.MYPAGE}
            replace
          >
            마이페이지
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default SuccessApply;
