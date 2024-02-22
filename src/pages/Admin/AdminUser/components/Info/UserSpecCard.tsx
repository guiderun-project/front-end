import GropuChip from '@/components/shared/GroupChip/GroupChip';
import { StyledDataSection } from '@/pages/Info/components/SpecGuideDetail';
import {
  GUIDE_SPEC_DATA,
  VI_SPEC_DATA,
} from '@/pages/Info/sections/SpecSection';
import { DisabilityEnum, RunningGroup } from '@/types/group';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Divider } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import { CardContent } from '@mui/material';
import { Card, CardHeader } from '@mui/material';
import { FormattedMessage } from 'react-intl';

interface UserSpecCardProps {
  userId: string;
  type: DisabilityEnum;
}

const UserSpecCard: React.FC<UserSpecCardProps> = ({ type }) => {
  /**
   *
   */
  const getRecord = () => {
    const record = GUIDE_SPEC_DATA.recordDegree;

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
    const guidingPace = GUIDE_SPEC_DATA.guidingPace;

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
  switch (type) {
    case DisabilityEnum.VI:
      return (
        <Card>
          <CardHeader
            title="러닝 스펙"
            titleTypographyProps={{
              fontWeight: 700,
            }}
          />
          <CardContent>
            <Stack component="div" gap="1rem">
              {/* 달리기 경험 */}
              <StyledDataSection>
                <Typography component="h3" fontWeight={700}>
                  달리기 경험
                </Typography>
                <Typography component="span">
                  {VI_SPEC_DATA.isRunningExp ? '유' : '무'}
                </Typography>
              </StyledDataSection>
              {VI_SPEC_DATA.isRunningExp ? (
                <>
                  {/* 개인 기록 */}
                  <StyledDataSection>
                    <Typography component="h3" fontWeight={700}>
                      개인 기록
                    </Typography>
                    <GropuChip type="text" group={VI_SPEC_DATA.recordDegree} />
                  </StyledDataSection>
                  {/* 상세 기록 */}
                  <StyledDataSection>
                    <Typography component="h3" fontWeight={700}>
                      상세 기록
                    </Typography>
                    <Typography component="span">
                      {VI_SPEC_DATA.detailRecord}
                    </Typography>
                  </StyledDataSection>
                  {/* 주로 달리는 장소 */}
                  <StyledDataSection>
                    <Typography component="h3" fontWeight={700}>
                      주로 달리는 장소
                    </Typography>
                    <Typography component="span">
                      {VI_SPEC_DATA.runningPlace}
                    </Typography>
                  </StyledDataSection>
                  {/* 함께 뛰었던 가이드러너의 성함 */}
                  <StyledDataSection multiLine>
                    <Typography component="h3" fontWeight={700}>
                      함께 뛰었던 가이드러너의 성함
                    </Typography>
                    <Typography component="span">
                      {VI_SPEC_DATA.guideName}
                    </Typography>
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
                      {VI_SPEC_DATA.howToKnow?.map((know) => (
                        <Typography
                          key={know}
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <CheckBoxIcon aria-hidden />
                          <FormattedMessage
                            id={`signup.form.running.way.${know}`}
                          />
                        </Typography>
                      ))}
                    </Stack>
                  </StyledDataSection>
                  {/* 참여 결심 계기를 알려주세요 */}
                  <StyledDataSection multiLine>
                    <Typography component="h3" fontWeight={700}>
                      참여 결심 계기를 알려주세요
                    </Typography>
                    <Typography component="span">
                      {VI_SPEC_DATA.motive}
                    </Typography>
                  </StyledDataSection>
                </>
              )}
              {/* 이 외 희망사항 */}
              <StyledDataSection multiLine>
                <Typography component="h3" fontWeight={700}>
                  이 외 희망사항
                </Typography>
                <Typography component="span">
                  {VI_SPEC_DATA.hopePrefs}
                </Typography>
              </StyledDataSection>
            </Stack>
          </CardContent>
        </Card>
      );
    case DisabilityEnum.GUIDE:
      return (
        <Card>
          <CardHeader
            title="러닝 스펙"
            titleTypographyProps={{
              fontWeight: 700,
            }}
          />
          <CardContent>
            <Stack component="div" gap="1rem">
              <StyledDataSection>
                <Typography component="h3" fontWeight={700}>
                  개인 기록
                </Typography>
                <GropuChip type="text" group={GUIDE_SPEC_DATA.recordDegree} />
              </StyledDataSection>
              {/* 상세 기록 */}
              <StyledDataSection>
                <Typography component="h3" fontWeight={700}>
                  상세 기록
                </Typography>
                <Typography component="span">
                  {GUIDE_SPEC_DATA.detailRecord}
                </Typography>
              </StyledDataSection>
              {/* 주로 달리는 장소 */}
              <StyledDataSection>
                <Typography component="h3" fontWeight={700}>
                  주로 달리는 장소
                </Typography>
                <Typography component="span">
                  {GUIDE_SPEC_DATA.runningPlace}
                </Typography>
              </StyledDataSection>
              {/* 시각장애러너의 가이드러너 경험 */}
              <StyledDataSection>
                <Typography component="h3" fontWeight={700}>
                  시각장애러너의 가이드러너 경험
                </Typography>
                <Typography component="span">
                  {GUIDE_SPEC_DATA.isGuideExp ? '유' : '무'}
                </Typography>
              </StyledDataSection>
              {GUIDE_SPEC_DATA.isGuideExp ? (
                <>
                  {/* 함께 뛰었던 시각장애러너의 성함 */}
                  <StyledDataSection>
                    <Typography component="h3" fontWeight={700}>
                      시각장애러너 성함
                    </Typography>
                    <Typography component="span">
                      {GUIDE_SPEC_DATA.viName}
                    </Typography>
                  </StyledDataSection>
                  {/* 당시 파트너의 페이스/1km를 적어주세요 */}
                  <StyledDataSection>
                    <Typography component="h3" fontWeight={700}>
                      당시 파트너의 페이스
                    </Typography>
                    <Typography component="span">
                      {GUIDE_SPEC_DATA.viRecord}
                    </Typography>
                  </StyledDataSection>
                  {/* 상세 경험을 알려주세요 */}
                  <StyledDataSection>
                    <Typography component="h3" fontWeight={700}>
                      가이드 러너 상세 경험
                    </Typography>
                    <Typography component="span" whiteSpace="wrap">
                      {GUIDE_SPEC_DATA.viCount}
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
                      {GUIDE_SPEC_DATA.howToKnow?.map((know) => (
                        <Typography
                          key={know}
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <CheckBoxIcon aria-hidden />
                          <FormattedMessage
                            id={`signup.form.running.way.${know}`}
                          />
                        </Typography>
                      ))}
                    </Stack>
                  </StyledDataSection>
                  {/* 참여 결심 계기를 알려주세요! */}
                  <StyledDataSection multiLine>
                    <Typography component="h3" fontWeight={700}>
                      참여 결심 계기를 알려주세요!
                    </Typography>
                    <Typography component="span">
                      {GUIDE_SPEC_DATA.motive}
                    </Typography>
                  </StyledDataSection>
                </>
              )}
              {/* 가이드가 가능한 페이스 그룹 */}
              <StyledDataSection>
                <Typography component="h3" fontWeight={700}>
                  가이드가 희망 페이스 그룹
                </Typography>
                <Typography component="span">
                  <GropuChip
                    type="avatar"
                    group={GUIDE_SPEC_DATA.guidingPace}
                  />
                </Typography>
              </StyledDataSection>
              {/* 이 외 희망사항 */}
              <StyledDataSection multiLine>
                <Typography component="h3" fontWeight={700}>
                  기타 희망사항
                </Typography>
                <Typography component="span">
                  {GUIDE_SPEC_DATA.hopePrefs}
                </Typography>
              </StyledDataSection>
            </Stack>
          </CardContent>
        </Card>
      );
  }
};

export default UserSpecCard;
