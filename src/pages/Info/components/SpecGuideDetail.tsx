import styled from '@emotion/styled';
import { css } from '@emotion/react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { runningSpecGuideGetResponse } from '@/apis/types/info';
import { RunningGroup } from '@/types/group';

interface SpecGuideDetailProps {
  data: runningSpecGuideGetResponse;
}

//
//
//

export const StyledDataSection = styled.section<{ multiLine?: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  ${({ multiLine }) =>
    multiLine &&
    css`
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
    `}
`;

//
//
//

const SpecGuideDetail: React.FC<SpecGuideDetailProps> = ({ data }) => {
  /**
   *
   */
  const getRecord = () => {
    const record = data.recordDegree;

    switch (record) {
      case RunningGroup.A:
        return '~45분';
      case RunningGroup.B:
        return '46~52분';
      case RunningGroup.C:
        return '53~59분';
      case RunningGroup.D:
        return '60분~';
      case RunningGroup.E:
      default:
        return '기록 없음';
    }
  };

  /**
   *
   */
  const getGuidingPace = () => {
    const guidingPace = data.guidingPace;

    switch (guidingPace) {
      case RunningGroup.A:
        return `${guidingPace} ~50분 기록을 가진 시각장애러너`;
      case RunningGroup.B:
        return `${guidingPace} 51~56분 기록을 가진 시각장애러너`;
      case RunningGroup.C:
        return `${guidingPace} 57~65분 기록을 가진 시각장애러너`;
      case RunningGroup.D:
        return `${guidingPace} 66분~ 기록을 가진 시각장애러너`;
      case RunningGroup.E:
      default:
        return `${guidingPace} 기록이 없는 시각장애러너`;
    }
  };

  //
  //
  //

  return (
    <Stack component="div" gap="2rem">
      {/* 개인기록 */}
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
      {/* 시각장애러너의 가이드러너 경험 */}
      <StyledDataSection>
        <Typography component="h3" fontWeight={700}>
          시각장애러너의 가이드러너 경험
        </Typography>
        <Typography component="span">
          {data.isGuideExp ? '유' : '무'}
        </Typography>
      </StyledDataSection>
      {data.isGuideExp ? (
        <>
          {/* 함께 뛰었던 가이드러너의 성함 */}
          <StyledDataSection multiLine>
            <Typography component="h3" fontWeight={700}>
              함께 뛰었던 가이드러너의 성함
            </Typography>
            <Typography component="span">{data.viName}</Typography>
          </StyledDataSection>
          {/* 당시 파트너의 페이스/1km를 적어주세요 */}
          <StyledDataSection multiLine>
            <Typography component="h3" fontWeight={700}>
              당시 파트너의 페이스/1km를 적어주세요
            </Typography>
            <Typography component="span">{data.viRecord}</Typography>
          </StyledDataSection>
          {/* 상세 경험을 알려주세요 */}
          <StyledDataSection multiLine>
            <Typography component="h3" fontWeight={700}>
              상세 경험을 알려주세요
            </Typography>
            <Typography component="span" whiteSpace="wrap">
              {data.viCount}
            </Typography>
          </StyledDataSection>
        </>
      ) : (
        <>
          {/* 프로그램을 알게 된 경로 */}
          <StyledDataSection multiLine>
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
          {/* 참여 결심 계기를 알려주세요! */}
          <StyledDataSection multiLine>
            <Typography component="h3" fontWeight={700}>
              참여 결심 계기를 알려주세요!
            </Typography>
            <Typography component="span">{data.motive}</Typography>
          </StyledDataSection>
        </>
      )}
      {/* 가이드가 가능한 페이스 그룹 */}
      <StyledDataSection multiLine>
        <Typography component="h3" fontWeight={700}>
          가이드가 가능한 페이스 그룹
          <Typography component="span" fontWeight={400}>
            (10km 기준)
          </Typography>
        </Typography>
        <Typography component="span">{getGuidingPace()}</Typography>
      </StyledDataSection>
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

export default SpecGuideDetail;
