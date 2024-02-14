import { NotFound, PageLayout } from '@/components/shared';
import { Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import InfoSection from './components/InfoSection';
import SpecSection from './components/SpecSection';
import TermsSection from './components/TermsSection';
import styled from '@emotion/styled';
import { BROWSER_PATH } from '@/constants/path';

const Info = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get('type') ?? 'info';

  /**
   *
   */
  const handlePageMove = (type: 'prev' | 'my') => () => {
    switch (type) {
      case 'my':
        navigate(BROWSER_PATH.MYPAGE);
        break;
      case 'prev':
      default:
        navigate(-1);
    }
  };

  /**
   *
   */
  const renderInfo = () => {
    switch (type) {
      case 'info':
        return <InfoSection />;
      case 'spec':
        return <SpecSection />;
      case 'terms':
        return <TermsSection />;
      default:
        return <NotFound />;
    }
  };

  return (
    <PageLayout>
      <Stack padding="5rem 0" gap="3.75rem">
        <Typography component="h1" fontSize="2rem">
          제출한 정보 확인하기
        </Typography>
        <Stack gap="2.5rem">
          <Tabs
            centered
            value={type}
            onChange={(_, newValue) => {
              setSearchParams({
                type: newValue,
              });
            }}
          >
            <Tab
              value="info"
              label="개인 인적사항"
              aria-controls="Tab-개인 인적사항"
            />
            <Tab value="spec" label="러닝 스펙" aria-controls="Tab-러닝 스펙" />
            <Tab value="terms" label="약관동의" aria-controls="Tab-약관동의" />
          </Tabs>
          {renderInfo()}
        </Stack>
      </Stack>
      <Stack gap="1rem" alignItems="center">
        <Button
          fullWidth
          variant="contained"
          size="large"
          role="link"
          onClick={handlePageMove('my')}
          sx={{
            maxWidth: '19.6875rem',
          }}
        >
          마이페이지
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          role="link"
          onClick={handlePageMove('prev')}
          sx={{
            maxWidth: '19.6875rem',
          }}
        >
          되돌아가기
        </Button>
      </Stack>
    </PageLayout>
  );
};

export default Info;
