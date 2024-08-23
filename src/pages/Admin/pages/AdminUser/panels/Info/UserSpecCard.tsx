import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';

import infoApi from '@/apis/requests/info';
import GropuChip from '@/components/shared/GroupChip/GroupChip';
import { StyledDataSection } from '@/pages/Info/components/SpecGuideDetail';
import { DisabilityEnum, RunningGroup } from '@/types/group';
import { UserType } from '@/types/user';

interface UserSpecCardProps {
  userId: UserType['userId'];
  type: DisabilityEnum;
}

const ViSpecCard: React.FC<{ userId: UserType['userId'] }> = ({ userId }) => {
  const { data: viData, isLoading } = useQuery({
    queryKey: ['runningSpecViGet', userId],
    queryFn: () => infoApi.runningSpecViGet({ userId }),
  });

  //
  //
  //

  return (
    <Card>
      <CardHeader
        title="러닝 스펙"
        titleTypographyProps={{
          fontWeight: 700,
        }}
      />
      <CardContent>
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center">
            <CircularProgress size="2rem" />
          </Stack>
        ) : (
          <Stack component="div" gap="1rem">
            {/* 달리기 경험 */}
            <StyledDataSection>
              <Typography component="h3" fontWeight={700}>
                달리기 경험
              </Typography>
              <Typography component="span">
                {viData?.isRunningExp ? '유' : '무'}
              </Typography>
            </StyledDataSection>
            {viData?.isRunningExp ? (
              <>
                {/* 개인 기록 */}
                <StyledDataSection>
                  <Typography component="h3" fontWeight={700}>
                    개인 기록
                  </Typography>
                  <GropuChip type="text" group={viData.recordDegree} />
                </StyledDataSection>
                {/* 상세 기록 */}
                <StyledDataSection>
                  <Typography component="h3" fontWeight={700}>
                    상세 기록
                  </Typography>
                  <Typography component="span">
                    {viData.detailRecord}
                  </Typography>
                </StyledDataSection>
                {/* 주로 달리는 장소 */}
                <StyledDataSection>
                  <Typography component="h3" fontWeight={700}>
                    주로 달리는 장소
                  </Typography>
                  <Typography component="span">
                    {viData.runningPlace}
                  </Typography>
                </StyledDataSection>
                {/* 함께 뛰었던 가이드러너의 성함 */}
                <StyledDataSection multiLine>
                  <Typography component="h3" fontWeight={700}>
                    함께 뛰었던 가이드러너의 성함
                  </Typography>
                  <Typography component="span">{viData.guideName}</Typography>
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
                    {viData?.howToKnow?.map((know) => (
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
                  <Typography component="span">{viData?.motive}</Typography>
                </StyledDataSection>
              </>
            )}
            {/* 이 외 희망사항 */}
            <StyledDataSection multiLine>
              <Typography component="h3" fontWeight={700}>
                이 외 희망사항
              </Typography>
              <Typography component="span">{viData?.hopePrefs}</Typography>
            </StyledDataSection>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

const GuideSpecCard: React.FC<{ userId: UserType['userId'] }> = ({
  userId,
}) => {
  const { data: guideData, isLoading } = useQuery({
    queryKey: ['runningSpecGuideGet', userId],
    queryFn: () => infoApi.runningSpecGuideGet({ userId }),
    enabled: userId !== '',
  });
  return (
    <Card>
      <CardHeader
        title="러닝 스펙"
        titleTypographyProps={{
          fontWeight: 700,
        }}
      />

      <CardContent>
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center">
            <CircularProgress size="2rem" />
          </Stack>
        ) : (
          <Stack component="div" gap="1rem">
            <StyledDataSection>
              <Typography component="h3" fontWeight={700}>
                개인 기록
              </Typography>
              <GropuChip
                type="text"
                group={guideData?.recordDegree ?? RunningGroup.A}
              />
            </StyledDataSection>
            {/* 상세 기록 */}
            <StyledDataSection>
              <Typography component="h3" fontWeight={700}>
                상세 기록
              </Typography>
              <Typography component="span">
                {guideData?.detailRecord}
              </Typography>
            </StyledDataSection>
            {/* 주로 달리는 장소 */}
            <StyledDataSection>
              <Typography component="h3" fontWeight={700}>
                주로 달리는 장소
              </Typography>
              <Typography component="span">
                {guideData?.runningPlace}
              </Typography>
            </StyledDataSection>
            {/* 시각장애러너의 가이드러너 경험 */}
            <StyledDataSection>
              <Typography component="h3" fontWeight={700}>
                시각장애러너의 가이드러너 경험
              </Typography>
              <Typography component="span">
                {guideData?.isGuideExp ? '유' : '무'}
              </Typography>
            </StyledDataSection>
            {guideData?.isGuideExp ? (
              <>
                {/* 함께 뛰었던 시각장애러너의 성함 */}
                <StyledDataSection>
                  <Typography component="h3" fontWeight={700}>
                    시각장애러너 성함
                  </Typography>
                  <Typography component="span">{guideData.viName}</Typography>
                </StyledDataSection>
                {/* 당시 파트너의 페이스/1km를 적어주세요 */}
                <StyledDataSection>
                  <Typography component="h3" fontWeight={700}>
                    당시 파트너의 페이스
                  </Typography>
                  <Typography component="span">{guideData.viRecord}</Typography>
                </StyledDataSection>
                {/* 상세 경험을 알려주세요 */}
                <StyledDataSection>
                  <Typography component="h3" fontWeight={700}>
                    가이드 러너 상세 경험
                  </Typography>
                  <Typography component="span" whiteSpace="wrap">
                    {guideData.viCount}
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
                    {guideData?.howToKnow?.map((know) => (
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
                  <Typography component="span">{guideData?.motive}</Typography>
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
                  group={guideData?.guidingPace ?? RunningGroup.A}
                />
              </Typography>
            </StyledDataSection>
            {/* 이 외 희망사항 */}
            <StyledDataSection multiLine>
              <Typography component="h3" fontWeight={700}>
                기타 희망사항
              </Typography>
              <Typography component="span">{guideData?.hopePrefs}</Typography>
            </StyledDataSection>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

const UserSpecCard: React.FC<UserSpecCardProps> = ({ type, userId }) => {
  switch (type) {
    case DisabilityEnum.VI:
      return <ViSpecCard userId={userId} />;
    case DisabilityEnum.GUIDE:
      return <GuideSpecCard userId={userId} />;
  }
};

export default UserSpecCard;
