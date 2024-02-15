import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { StyledDataSection } from './SpecGuideDetail';

import { runningSpecViGetResponse } from '@/apis/types/info';
import { RunningGroup } from '@/types/group';

interface SpecViDetailProps {
  data: runningSpecViGetResponse;
}

const SpecViDetail: React.FC<SpecViDetailProps> = ({ data }) => {
  /**
   *
   */
  const getRecord = () => {
    const record = data.recordDegree;

    switch (record) {
      case RunningGroup.A:
        return '~50분';
      case RunningGroup.B:
        return '50~56분';
      case RunningGroup.C:
        return '58~65분';
      case RunningGroup.D:
        return '66분~';
      case RunningGroup.E:
      default:
        return '기록 없음';
    }
  };

  //
  //
  //

  return (
    <Stack component="div" gap="2rem">
      {/* 달리기 경험 */}
      <StyledDataSection>
        <Typography component="h3" fontWeight={700}>
          달리기 경험
        </Typography>
        <Typography component="span">
          {data.isRunningExp ? '유' : '무'}
        </Typography>
      </StyledDataSection>
      {data.isRunningExp ? (
        <>
          {/* 개인 기록 */}
          <StyledDataSection>
            <Typography component="h3" fontWeight={700}>
              개인 기록
            </Typography>
            <Box display="flex" gap="0.25rem" alignItems="center">
              <Typography component="span">
                {`Team `}
                <Typography component="span" fontWeight={700}>
                  {data.recordDegree}
                </Typography>
              </Typography>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                aria-hidden
              />
              <Typography component="span">{getRecord()}</Typography>
            </Box>
          </StyledDataSection>
          {/* 상세 기록 */}
          <StyledDataSection>
            <Typography component="h3" fontWeight={700}>
              상세 기록
            </Typography>
            <Typography component="span">{data.detailRecord}</Typography>
          </StyledDataSection>
          {/* 주로 달리는 장소 */}
          <StyledDataSection>
            <Typography component="h3" fontWeight={700}>
              주로 달리는 장소
            </Typography>
            <Typography component="span">{data.runningPlace}</Typography>
          </StyledDataSection>
          {/* 함께 뛰었던 가이드러너의 성함 */}
          <StyledDataSection multiLine>
            <Typography component="h3" fontWeight={700}>
              함께 뛰었던 가이드러너의 성함
            </Typography>
            <Typography component="span">{data.guideName}</Typography>
          </StyledDataSection>
        </>
      ) : (
        <>
          {/* 프로그램을 알게 된 경로 */}
          <StyledDataSection>
            <Typography component="h3" fontWeight={700}>
              프로그램을 알게 된 경로
            </Typography>
            <Stack gap="0.5rem">
              {data.howToKnow?.map((know) => (
                <Typography
                  key={know}
                  display="flex"
                  alignItems="center"
                  gap="1rem"
                >
                  <CheckBoxIcon aria-hidden />
                  <FormattedMessage id={`signup.form.running.way.${know}`} />
                </Typography>
              ))}
            </Stack>
          </StyledDataSection>
          {/* 참여 결심 계기를 알려주세요 */}
          <StyledDataSection multiLine>
            <Typography component="h3" fontWeight={700}>
              참여 결심 계기를 알려주세요
            </Typography>
            <Typography component="span">{data.motive}</Typography>
          </StyledDataSection>
        </>
      )}
      {/* 이 외 희망사항 */}
      <StyledDataSection multiLine>
        <Typography component="h3" fontWeight={700}>
          이 외 희망사항
        </Typography>
        <Typography component="span">{data.hopePrefs}</Typography>
      </StyledDataSection>
    </Stack>
  );
};

export default SpecViDetail;
