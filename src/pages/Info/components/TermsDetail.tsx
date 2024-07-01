import styled from '@emotion/styled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Stack,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';

import { PermissionGetResponse } from '@/apis/types/info';

//
//
//

interface TermsDetailProps {
  data: PermissionGetResponse;
}

//
//
//

export const StyledTermsBox = styled.section`
  display: flex;
  gap: 2.5rem;
`;

//
//
//

const TermsDetail: React.FC<TermsDetailProps> = ({ data }) => {
  return (
    <Stack gap="2rem">
      <Helmet>
        <title>약관 동의 내역 조회 - Guide run Project</title>
      </Helmet>
      <Stack gap="0.5rem">
        <StyledTermsBox>
          <Typography component="h3" fontWeight={700}>
            <Badge color="error" variant="dot">
              개인정보 제공 및 활용 동의
            </Badge>
          </Typography>
          <Typography color="#333" fontWeight={500}>
            {data.privacy ? '동의' : '비동의'}
          </Typography>
        </StyledTermsBox>
        <Accordion
          elevation={0}
          sx={{
            background: '#F8F9FF',
            border: 'none',
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Typography>동의내용 자세히 보기</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <Typography
                  key={`signup.terms.privacy.${idx + 1}`}
                  whiteSpace="break-spaces"
                >
                  <FormattedMessage id={`signup.terms.privacy.${idx + 1}`} />
                </Typography>
              ))}
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack gap="0.5rem">
        <StyledTermsBox>
          <Typography component="h3" fontWeight={700}>
            <Badge color="error" variant="dot">
              초상권 활용 동의
            </Badge>
          </Typography>
          <Typography color="#333" fontWeight={500}>
            {data.portraitRights ? '동의' : '비동의'}
          </Typography>
        </StyledTermsBox>
        <Accordion
          elevation={0}
          sx={{
            background: '#F8F9FF',
            border: 'none',
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Typography>동의내용 자세히 보기</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <Typography
                  key={`signup.terms.likeness.${idx + 1}`}
                  whiteSpace="break-spaces"
                >
                  <FormattedMessage id={`signup.terms.likeness.${idx + 1}`} />
                </Typography>
              ))}
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  );
};

export default TermsDetail;
