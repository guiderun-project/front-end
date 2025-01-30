import styled from '@emotion/styled';
import { ClearOutlined } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  keyframes,
  Modal,
  Stack,
  Typography,
} from '@mui/material';

import { getFormattedSeason, Program, SeasonBox, YearBox } from './ProgramItem';

interface PropgramModalProps {
  open: boolean;
  onClose: VoidFunction;
  program: Program;
}

export const ProgramModal = ({
  open,
  program,
  onClose,
}: PropgramModalProps) => {
  const renderDescription = (title: string, data: string) => {
    return (
      <Typography
        color="#fff"
        fontSize="0.875rem"
        fontWeight={400}
        whiteSpace="break-spaces"
      >{`${title}: ${data}`}</Typography>
    );
  };

  const titleId = `program-${program.year}-${program.season}-title`;
  const descriptionId = `program-${program.year}-${program.season}-description`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <Container>
        <ImageBackground image={program.image} />
        <IconButton
          onClick={onClose}
          size="large"
          aria-label="닫기"
          sx={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 102,
          }}
        >
          <ClearOutlined fontSize="large" sx={{ color: '#fff' }} />
        </IconButton>
        <Stack gap="1.875rem" position="relative" zIndex={102}>
          <Stack gap="1rem">
            <Stack gap="0.5rem">
              <Stack direction="row" gap="0.5rem">
                <YearBox>{program.year}</YearBox>
                <SeasonBox season={program.season}>
                  {getFormattedSeason(program.season)}
                </SeasonBox>
              </Stack>
              <Typography
                component="h2"
                id={titleId}
                color="#FFF"
                fontSize="1.875rem"
                fontWeight={700}
              >
                {program.name}
              </Typography>
            </Stack>
            <Stack id={descriptionId} gap="0.1365rem">
              {renderDescription(
                '기간',
                `${program.period.start} ~ ${program.period.end}`,
              )}
              {renderDescription('내용', program.description)}
              {renderDescription('장소', program.location)}
              {renderDescription('코칭 스탭', program.staff)}
            </Stack>
          </Stack>
          <Divider aria-hidden color="#FFF" />
          {program.result && (
            <Stack gap="0.75rem">
              <Typography
                component="h2"
                color="#fff"
                fontSize="1.25rem"
                fontWeight={700}
              >
                동계 훈련 참여 결과
              </Typography>
              <Stack gap="0.625rem" paddingLeft="0.625rem">
                <Typography
                  fontSize="0.875rem"
                  color="#fff"
                  fontWeight={400}
                  whiteSpace="break-spaces"
                >
                  {program.result}
                </Typography>
                {program.link && (
                  <Typography
                    component="a"
                    target="_blank"
                    href={program.link}
                    color="#fff"
                    fontWeight={700}
                    fontSize="0.875rem"
                    sx={{
                      textDecoration: 'underline',
                      textUnderlinePosition: 'under',
                    }}
                  >
                    {program.linkLabel ?? '결과 바로 가기'}
                  </Typography>
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Container>
    </Modal>
  );
};

const FadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  width: 320px;
  height: 540px;
  padding: 3.75rem 1.25rem;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  z-index: 100;

  animation: ${FadeIn} 0.2s ease-in forwards;
`;

const ImageBackground = styled.div<{ image: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  -webkit-filter: blur(2px);
  z-index: 101;
`;
