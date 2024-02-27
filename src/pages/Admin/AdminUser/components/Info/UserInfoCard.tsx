import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { StyledSection } from '@/pages/Info/components/InfoDetail';
import infoApi from '@/apis/requests/info';

interface UserInfoCardProps {
  userId: string;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userId }) => {
  const { data: infoData } = useQuery({
    queryKey: ['personalInfoGet', userId],
    queryFn: () => infoApi.personalInfoGet({ userId }),
  });

  /**
   *
   */
  const getAge = () => {
    const age = infoData?.age ?? 0;

    if (age <= 19) {
      return '10대 이하';
    }
    if (age <= 59) {
      return `${age}대`;
    }
    return '60대 이상';
  };

  //
  //
  //
  return (
    <Card>
      <CardHeader
        title="개인 인적사항"
        titleTypographyProps={{
          fontWeight: 700,
        }}
      />
      <CardContent>
        <Stack component="div" gap="1rem">
          {/* 전화번호 */}
          <StyledSection>
            <Typography component="h3" fontWeight={700}>
              전화번호
            </Typography>
            <Typography sx={{ opacity: '0.5' }}>
              {infoData?.phoneNumber}
            </Typography>
          </StyledSection>
          {/* 나이 */}
          <StyledSection>
            <Typography component="h3" fontWeight={700}>
              연령대
            </Typography>
            <Typography sx={{ opacity: '0.5' }}>{getAge()}</Typography>
          </StyledSection>
          {/* 인스타 계정 */}
          <StyledSection>
            <Box display="flex" alignItems="center" gap="0.5rem">
              <Typography component="h3" fontWeight={700}>
                SNS
              </Typography>
            </Box>
            <a
              href={`https://instagram.com/${infoData?.snsId ?? ''}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: '#333',
              }}
            >
              <Typography fontWeight={500}>{infoData?.snsId ?? ''}</Typography>
            </a>
          </StyledSection>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
