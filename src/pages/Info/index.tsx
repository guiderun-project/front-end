import { Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import InfoSection from './sections/InfoSection';
import SpecSection from './sections/SpecSection';
import TermsSection from './sections/TermsSection';

import { NotFound, PageLayout } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';

const Info = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get('type') ?? 'info';
  const mode = searchParams.get('mode') ?? 'detail';

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
            aria-label="제출 정보 선택"
            onChange={(_, newValue) => {
              setSearchParams({
                type: newValue,
              });
            }}
          >
            <Tab
              id="Tab-info"
              value="info"
              label="개인 인적사항"
              aria-controls="Tabpanel-info"
            />
            <Tab
              id="Tab-spec"
              value="spec"
              label="러닝 스펙"
              aria-controls="Tabpanel-spec"
            />
            <Tab
              id="Tab-terms"
              value="terms"
              label="약관동의"
              aria-controls="Tabpanel-terms"
            />
          </Tabs>
          {renderInfo()}
        </Stack>
        <Stack gap="1rem" alignItems="center">
          {mode === 'edit' ? (
            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              form="edit_form"
              sx={{
                maxWidth: '19.6875rem',
              }}
            >
              변경 내용 저장하기
            </Button>
          ) : (
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
          )}

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
      </Stack>
    </PageLayout>
  );
};

export default Info;
