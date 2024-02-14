import { permissionGetResponse } from '@/apis/types/info';
import styled from '@emotion/styled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
} from '@mui/material';
import { Box } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

//
//
//

const TERMS_INFO: permissionGetResponse = {
  privacy: true,
  portraitRights: false,
};

//
//
//

const StyledTermsBox = styled.div`
  display: flex;
  gap: 2.5rem;
`;

//
//
//

const TermsSection = () => {
  return (
    <Stack gap="2.5rem">
      <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
        약관 동의
      </Typography>
      <Stack gap="2rem">
        <Stack gap="0.5rem">
          <StyledTermsBox>
            <Typography component="h4" fontWeight={700}>
              <Badge color="error" variant="dot">
                개인정보 제공 및 활용 동의
              </Badge>
            </Typography>
            <Typography color="#333" fontWeight={500}>
              {TERMS_INFO.privacy ? '동의' : '비동의'}
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
            <Typography component="h4" fontWeight={700}>
              <Badge color="error" variant="dot">
                초상권 활용 동의
              </Badge>
            </Typography>
            <Typography color="#333" fontWeight={500}>
              {TERMS_INFO.privacy ? '동의' : '비동의'}
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
      <Box display="flex" justifyContent="flex-end">
        <Button
          sx={{
            display: 'flex',
            gap: '0.125rem',
          }}
        >
          <Typography
            sx={{
              textDecoration: 'underline',
            }}
          >
            동의 내용 변경하기
          </Typography>
          <span aria-hidden>&gt;</span>
        </Button>
      </Box>
    </Stack>
  );
};

export default TermsSection;
