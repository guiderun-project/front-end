import React from 'react';

import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import SpecGuideDetail from '../components/SpecGuideDetail';
import SpecGuideEdit from '../components/SpecGuideEdit';
import SpecViDetail from '../components/SpecViDetail';
import SpecViEdit from '../components/SpecViEdit';

import {
  runningSpecGuideGetResponse,
  runningSpecViGetResponse,
} from '@/apis/types/info';
import { RootState } from '@/store/index';
import { DisabilityEnum, RunningGroup } from '@/types/group';

//
//
//

export const VI_SPEC_DATA: runningSpecViGetResponse = {
  isRunningExp: true,
  recordDegree: RunningGroup.A,
  detailRecord: '48분 50초',
  runningPlace: '남산 둘레길',
  guideName: '고길동',
  howToKnow: ['vi.1', 'vi.2'],
  motive: '재밌어보여서!',
  hopePrefs: '감사합니다~',
};

export const GUIDE_SPEC_DATA: runningSpecGuideGetResponse = {
  recordDegree: RunningGroup.A,
  detailRecord: '42분 20초',
  isGuideExp: true,
  runningPlace: '집 앞 공원',
  viName: '김둘리',
  viRecord: '5:30 ~ 6:00',
  viCount: '1년',
  howToKnow: ['guide.1'],
  motive:
    '함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!함께 하고 싶습니다!',
  guidingPace: RunningGroup.C,
  hopePrefs:
    '화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!화이팅!!',
};

//
//
//

const SpecSection: React.FC = () => {
  const type = useSelector((state: RootState) => state.user.type);

  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get('mode') ?? 'detail';

  /**
   *
   */
  const handleEditClick = () => {
    searchParams.set('mode', 'edit');
    setSearchParams(searchParams.toString());
  };

  /**
   *
   */
  const Loading: React.FC = () => {
    return (
      <Stack alignItems="center" justifyContent="center">
        <CircularProgress size="2.5rem" />
      </Stack>
    );
  };

  /**
   *
   */
  const renderData = () => {
    switch (mode) {
      case 'detail':
        switch (type) {
          case DisabilityEnum.GUIDE:
            return <SpecGuideDetail />;
          case DisabilityEnum.VI:
            return <SpecViDetail />;
        }
        break;
      case 'edit':
        switch (type) {
          case DisabilityEnum.GUIDE:
            return <SpecGuideEdit />;
          case DisabilityEnum.VI:
            return <SpecViEdit />;
        }
    }
  };

  return (
    <Stack
      component="div"
      role="tabpanel"
      id="Tabpanel-spec"
      gap="2.5rem"
      aria-labelledby="Tab-spec"
    >
      <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
        러닝 스펙
      </Typography>
      <React.Suspense fallback={<Loading />}>{renderData()}</React.Suspense>
      {mode === 'detail' && (
        <Box display="flex" justifyContent="flex-end">
          <Button
            sx={{
              display: 'flex',
              gap: '0.125rem',
            }}
            onClick={handleEditClick}
          >
            <Typography
              fontSize="0.875rem"
              sx={{
                textDecoration: 'underline',
                textUnderlinePosition: 'under',
              }}
            >
              러닝 스펙 수정하기
            </Typography>
            <span aria-hidden>&gt;</span>
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default SpecSection;
