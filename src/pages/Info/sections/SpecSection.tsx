import { Box, Button, Typography, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import SpecGuideDetail from '../components/SpecGuideDetail';
import SpecGuideEdit from '../components/SpecGuideEdit';
import SpecViDetail from '../components/SpecViDetail';
import SpecViEdit from '../components/SpecViEdit';

import {
  runningSpecGuideGetResponse,
  runningSpecViGetResponse,
} from '@/apis/types/info';
import { DisabilityEnum, RunningGroup } from '@/types/group';

//
//
//

const VI_SPEC_DATA: runningSpecViGetResponse = {
  isRunningExp: true,
  recordDegree: RunningGroup.A,
  detailRecord: '48분 50초',
  runningPlace: '남산 둘레길',
  guideName: '고길동',
  howToKnow: ['vi.1', 'vi.2'],
  motive: '재밌어보여서!',
  hopePrefs: '감사합니다~',
};

const GUIDE_SPEC_DATA: runningSpecGuideGetResponse = {
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

const SpecSection = () => {
  const type = DisabilityEnum.VI;

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

  const renderData = () => {
    switch (mode) {
      case 'detail':
        switch (type as DisabilityEnum) {
          case DisabilityEnum.GUIDE:
            return <SpecGuideDetail data={GUIDE_SPEC_DATA} />;
          case DisabilityEnum.VI:
            return <SpecViDetail data={VI_SPEC_DATA} />;
        }
      case 'edit':
        switch (type as DisabilityEnum) {
          case DisabilityEnum.GUIDE:
            return <SpecGuideEdit defaultValues={GUIDE_SPEC_DATA} />;
          case DisabilityEnum.VI:
            return <SpecViEdit defaultValues={VI_SPEC_DATA} />;
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
      {renderData()}
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
              sx={{
                textDecoration: 'underline',
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
