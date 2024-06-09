import React from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Stack,
  Typography,
  Box,
  Collapse,
  Paper,
  TableRow,
  TableBody,
  Pagination,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  Button,
} from '@mui/material';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import { StyledCollapsBox } from '../AdminUser';

import adminApi from '@/apis/requests/admin';
import { EventListItemType } from '@/apis/types/admin';
import { EventModal, GroupChip } from '@/components/shared';

//
//
//

const MAX_EVENT_LENGTH = 10;

//
//
//

const AdminEvent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(-1);
  const [page, setPage] = React.useState(1);
  const { data: eventCount } = useSuspenseQuery({
    queryKey: ['adminEventListCountGet'],
    queryFn: () => adminApi.adminEventListCountGet(),
  });

  const maxPage = Math.ceil((eventCount ?? 0) / MAX_EVENT_LENGTH);
  const startIndex = (page - 1) * MAX_EVENT_LENGTH;

  const { data: eventList } = useQuery({
    queryKey: ['adminEventListGet', startIndex],
    queryFn: () =>
      adminApi.adminEventListGet({
        limit: MAX_EVENT_LENGTH,
        start: startIndex,
      }),
  });

  /**
   *
   */
  const renderApproveStatus = (status: boolean) => {
    switch (status) {
      case false:
        return (
          <Typography
            component="span"
            fontSize="0.75rem"
            fontWeight={700}
            color="#4BABB8"
          >
            대기중
          </Typography>
        );
      case true:
      default:
        return (
          <Typography
            component="span"
            fontSize="0.75rem"
            fontWeight={700}
            color="#0156D6"
          >
            승인
          </Typography>
        );
    }
  };

  //
  //
  //
  const Row: React.FC<{ eventData: EventListItemType }> = ({ eventData }) => {
    const [open, setOpen] = React.useState(false);

    //
    //
    //

    return (
      <>
        <TableRow
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            '.MuiTableCell-root': {
              padding: '0.75rem',
            },
            cursor: 'pointer',
          }}
        >
          <TableCell
            align="center"
            sx={{
              fontSize: '0.625rem',
              whiteSpace: 'break-spaces',
            }}
          >
            {`${eventData.update_date}\n${eventData.update_time}`}
          </TableCell>
          <TableCell>
            <Typography fontWeight={500} fontSize="0.625rem">
              {eventData.smallDate}
            </Typography>
            <Typography fontWeight={500} fontSize="0.875rem">
              {eventData.title}
            </Typography>
          </TableCell>
          <TableCell align="center">
            {eventData.organizer}{' '}
            <GroupChip type="text" group={eventData.pace} />
          </TableCell>
          <TableCell component="th" align="center">
            {renderApproveStatus(eventData.approval)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={5}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <StyledCollapsBox>
                <Stack
                  gap="0.75rem"
                  paddingLeft="4rem"
                  sx={{
                    caption: {
                      padding: 0,
                    },
                  }}
                >
                  <Box
                    component="caption"
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Typography
                      component="h3"
                      fontWeight={700}
                      fontSize="0.6875rem"
                    >
                      마지막 업데이트
                    </Typography>
                    <Typography fontSize="0.625rem" color="#666">
                      {`${eventData.update_date} ${eventData.update_time}`}
                    </Typography>
                  </Box>
                  <Box
                    component="caption"
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Typography
                      component="h3"
                      fontWeight={700}
                      fontSize="0.6875rem"
                    >
                      모집 희망인원
                    </Typography>
                    <Stack
                      direction="row"
                      gap="0.5rem"
                      alignItems="center"
                      color="#666"
                      sx={{
                        '.count': {
                          color: '#DE1313',
                        },
                      }}
                    >
                      <Typography fontSize="0.625rem">
                        총{' '}
                        <span className="count">{eventData.participation}</span>
                        명
                      </Typography>
                      <Typography fontSize="0.625rem">
                        시각장애러너{' '}
                        <span className="count">
                          {eventData.viParticipation}
                        </span>
                        명
                      </Typography>
                      <Typography fontSize="0.625rem">
                        가이드러너{' '}
                        <span className="count">
                          {eventData.guideParticipation}
                        </span>
                        명
                      </Typography>
                    </Stack>
                  </Box>
                  <Box component="div" display="flex" gap="1rem">
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => {
                        setSelectedEvent(eventData.eventId);
                        setIsDialogOpen(true);
                      }}
                      sx={{
                        padding: 0,
                      }}
                    >
                      <Typography
                        component="span"
                        fontWeight={500}
                        fontSize="0.875rem"
                        sx={{
                          textDecoration: 'underline',
                          textUnderlinePosition: 'under',
                        }}
                      >
                        이벤트 상세보기
                      </Typography>
                      <KeyboardArrowRightIcon fontSize="small" />
                    </Button>
                  </Box>
                </Stack>
              </StyledCollapsBox>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  //
  //
  //

  return (
    <Stack
      boxSizing="border-box"
      padding="2.5rem"
      paddingTop="4.5rem"
      gap="1.5rem"
      width="100%"
      maxWidth="31.875rem"
    >
      <Helmet>
        <title>이벤트 관리 - Admin - Guide run Project</title>
      </Helmet>
      <Box>
        <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
          이벤트 관리
        </Typography>
      </Box>
      {eventCount > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="회원 정보 테이블" sx={{ width: '100%' }}>
            <caption style={{ display: 'none' }}>
              이벤트 정보 테이블. 이벤트 정보 조회 및 승인 가능
            </caption>
            <TableHead>
              <TableRow
                sx={{
                  '.MuiTableCell-root': {
                    padding: '0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  },
                }}
              >
                <TableCell align="center">Time stamp</TableCell>
                <TableCell align="center">이벤트 제목</TableCell>
                <TableCell align="center">생성자</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: 'break-spaces',
                    lineHeight: '0.895rem',
                  }}
                >{`승인\n여부`}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventList?.map((event) => (
                <Row key={event.eventId} eventData={event} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack justifyContent="center" alignItems="center">
          <Typography fontSize="1.5rem" fontWeight={700}>
            이벤트가 존재하지 않습니다.
          </Typography>
        </Stack>
      )}
      {maxPage > 1 && (
        <Stack direction="row" justifyContent="center">
          <Pagination
            size="small"
            page={page}
            count={maxPage}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      )}
      <EventModal
        eventId={selectedEvent}
        isOpen={isDialogOpen}
        onModalClose={() => setIsDialogOpen(false)}
      />
    </Stack>
  );
};

export default AdminEvent;
