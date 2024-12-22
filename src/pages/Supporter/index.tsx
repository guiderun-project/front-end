import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import BlackSticker from '@/assets/certificate_sticker_black.png';
import WhiteSticker from '@/assets/certificate_sticker_white.png';
import Logo from '@/assets/Logo.png';
import { PageLayout, PageTitle, TitleHeader } from '@/components/shared';
import { addDoc, collection } from 'firebase/firestore';
import { firebaseDB } from '../../firebase';
import { DownloadIcon } from '@/assets/svg';

const images = [
  { src: BlackSticker, name: 'certificate_sticker_black.png' },
  { src: WhiteSticker, name: 'certificate_sticker_white.png' },
];

const Supporter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  const isCorrectEmail =
    email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleDownloadImage = async () => {
    if (!isCorrectEmail && agree) {
      alert('잘못된 이메일입니다.');
      return;
    }

    try {
      setIsLoading(true);
      await addDoc(collection(firebaseDB, 'emails'), {
        agree,
        email,
      });
    } catch (_) {
      alert('이메일 주소 저장에 문제가 발생했습니다. ');
    } finally {
      images.forEach(({ src, name }) => {
        const link = document.createElement('a');
        link.href = src;
        link.download = name; // 이미지 이름을 지정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageTitle title="서포터즈" />
      <TitleHeader title="인증스티커 다운로드" />
      <Stack marginTop="7.5rem" marginBottom="5rem" gap="2.5rem">
        <Stack alignItems="center">
          <img src={Logo} alt="가이드런 로고" width={121} height={83} />
        </Stack>
        <h1>
          <Typography
            role="text"
            fontSize="1.5rem"
            lineHeight="2.25rem"
            textAlign="center"
            whiteSpace="break-spaces"
          >
            가이드런프로젝트의
            <br />
            2025년 동계 훈련 프로그램을
            <br />
            후원해주셔서 감사합니다.
          </Typography>
        </h1>
        <Stack gap="1.25rem">
          <p>
            <Typography
              role="text"
              textAlign="center"
              whiteSpace="break-spaces"
              lineHeight="1.375rem"
            >
              후원자분들께 프로그램 운영 예산 사용 내역을 <br />
              메일과 보고회를 통해 공유할 예정입니다.
            </Typography>
          </p>
          <p>
            <Typography
              role="text"
              fontWeight={600}
              textAlign="center"
              whiteSpace="break-spaces"
              lineHeight="1.5rem"
            >
              가이드런프로젝트의 소식을 받아보길
              <br />
              희망하시는 후원자께서는 이메일을 알려주세요 🤗
            </Typography>
          </p>
          <Stack alignItems="center">
            <TextField
              autoComplete="off"
              error={!isCorrectEmail}
              helperText={!isCorrectEmail && '올바른 이메일을 입력해주세요'}
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: '100%',
                maxWidth: '19.6875rem',
              }}
            />
          </Stack>
          <Stack alignItems="center">
            <Accordion
              defaultExpanded
              elevation={0}
              sx={{
                width: '100%',
                maxWidth: '19.6875rem',
                background: '#F8F9FF',
                border: 'none',
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ padding: 0, margin: 0 }}
              >
                <Typography
                  component="h3"
                  fontWeight={700}
                  fontSize="1.0625rem"
                >
                  개인정보 제공 및 활용 동의
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack gap="1rem">
                  <Stack gap="0.5rem">
                    <Stack
                      component="ol"
                      gap="0.5rem"
                      sx={{ listStyleType: 'decimal' }}
                    >
                      <Typography
                        component="li"
                        whiteSpace="break-spaces"
                        fontSize="0.875rem"
                      >
                        <span role="text">
                          개인정보 수집, 이용 목적 :<br />
                          2025년 가이드런프로젝트 동계 12주 프로그램
                          <br />
                          후원자를 대상으로 안내 메일 발송
                        </span>
                      </Typography>
                      <Typography component="li" fontSize="0.875rem">
                        수집하려는 개인정보 항목 : 이메일 주소
                      </Typography>
                      <Typography
                        component="li"
                        whiteSpace="break-spaces"
                        fontSize="0.875rem"
                      >
                        <span role="text">
                          개인 정보의 보유 및 이용 기간 :<br />
                          2024년 12월 16일 ~ 2025년 3월 31일
                        </span>
                      </Typography>
                    </Stack>
                    <Typography
                      fontWeight={500}
                      fontSize="0.875rem"
                      color="#004EE9"
                      whiteSpace="break-spaces"
                    >
                      *메일 제출 및 활용 동의는 필수가 아닙니다.
                      <br />
                      관련 문의 |{' '}
                      <a
                        href="mailto:guiderunproject@gmail.com"
                        style={{
                          textDecoration: 'underline',
                          color: '#004EE9',
                        }}
                      >
                        guiderunproject@gmail.com
                      </a>
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end">
                    <FormControlLabel
                      control={
                        <Radio
                          size="small"
                          checked={agree}
                          onChange={() => setAgree(!agree)}
                        />
                      }
                      label={
                        <Typography fontSize="0.875rem">동의합니다.</Typography>
                      }
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
        <Stack alignItems="center">
          <Button
            disabled={isLoading}
            size="large"
            color="guide"
            variant="contained"
            sx={{ width: '100%' }}
            onClick={handleDownloadImage}
          >
            <Stack direction="row" gap="0.5rem" alignItems="center">
              <Typography fontSize="0.9375rem">인증 스티커 다운로드</Typography>
              <DownloadIcon />
            </Stack>
          </Button>
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default Supporter;
