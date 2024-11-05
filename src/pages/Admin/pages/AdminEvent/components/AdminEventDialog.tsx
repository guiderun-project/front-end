import React from 'react';

import { ClearOutlined } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  Divider,
  IconButton,
  Tab,
  Typography,
  DialogActions,
  Tabs,
  Stack,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import EventStatusText from './EventStatusText';
import AdminEventApplyPanel from '../panels/AdminEventApplyPanel';
import AdminEventResultPanel from '../panels/AdminEventResultPanel';

import adminApi from '@/apis/requests/admin';
import eventApi from '@/apis/requests/event';
import {
  ApplyUserChip,
  DisabilityChip,
  EventChip,
  GroupChip,
  TitleContentRow,
} from '@/components/shared';
import { Event } from '@/types/event';
import { DisabilityEnum } from '@/types/group';

//
//
//

interface AdminEventDialogProps extends DialogProps {
  eventId: Event['eventId'];
  approval: Event['isApprove'];
  onClose: () => void;
}

type TabType = 'status' | 'result';

//
//
//

const AdminEventDialog: React.FC<AdminEventDialogProps> = ({
  eventId,
  approval,
  onClose,
  ...props
}) => {
  const [tab, setTab] = React.useState<TabType>('status');

  const queryClient = useQueryClient();

  const { data: eventData, isLoading: isEventGetLoading } = useQuery({
    queryKey: ['eventGet', eventId],
    queryFn: () => eventApi.eventGet({ eventId }),
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      adminApi.adminApprovalEventPostRequest({ eventId, approval: !approval }),
    onSuccess: () => {
      alert(approval ? '거부 처리되었습니다. ' : '승인되었습니다');
    },
    onError: () => {
      alert('에러가 발생했습니다');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [eventId] });
    },
  });

  const { mutate: eventDeleteMutate } = useMutation({
    mutationFn: () => eventApi.eventDelete({ eventId }),
    onSuccess: () => {
      alert('삭제되었습니다');
      onClose();
    },
    onError: () => {
      alert('에러가 발생했습니다');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminEventListGet'] });
    },
  });

  /**
   *
   */
  const handleUserApprove = () => {
    if (
      window.confirm(
        approval
          ? '이벤트를 승인 거절하시겠습니까? '
          : '이벤트를 승인하시겠습니까?',
      )
    ) {
      mutate();
    }
  };

  /**
   *
   */
  const handleEventdelete = () => {
    if (window.confirm('이벤트를 삭제하시겠습니까?')) {
      eventDeleteMutate();
    }
  };

  /**
   *
   */
  const renderTitle = () => {
    if (isEventGetLoading || !eventData) {
      return (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      );
    }
    return (
      <Stack gap="0.5rem">
        <Stack direction="row" alignItems="center" gap="0.5rem">
          <EventChip variant="full" type={eventData.type} />
          <Typography
            component="h1"
            fontSize="1.25rem"
            fontWeight={700}
            whiteSpace="break-spaces"
          >
            {eventData.name}
          </Typography>
        </Stack>
        <Stack
          boxSizing="border-box"
          direction="row"
          paddingLeft="2.75rem"
          alignItems="center"
          gap="1rem"
        >
          <Chip
            clickable
            component="button"
            variant="outlined"
            label={approval ? '이벤트 승인 거부' : '이벤트 승인'}
            deleteIcon={<HighlightOffIcon />}
            onDelete={handleUserApprove}
            onClick={handleUserApprove}
            sx={{
              height: '2.5rem',
              borderRadius: '10000rem',
              borderColor: '#111',
              color: '#111',
              fontWeight: 600,
            }}
          />
          <EventStatusText status={approval} />
        </Stack>
      </Stack>
    );
  };

  /**
   *
   */
  const renderDetail = () => {
    if (!eventData) return null;

    return (
      <Stack gap="0.5rem" padding="0 1rem">
        <Stack
          boxSizing="border-box"
          direction="row"
          padding="0.5rem 0"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography component="h2" fontSize="1.0625rem" fontWeight={700}>
            주최자
          </Typography>
          <Stack direction="row" gap="0.5rem">
            <ApplyUserChip
              type={eventData.organizerType}
              name={eventData.organizer}
            />
            <GroupChip type="avatar" group={eventData.organizerPace} />
          </Stack>
        </Stack>
        <Stack boxSizing="border-box" gap="1.75rem">
          <TitleContentRow
            title="일시"
            content={
              <Stack direction="row" alignItems="center" gap="0.5rem">
                <Typography fontSize="0.9375rem">{eventData.date}</Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography fontSize="0.9375rem">
                  {eventData.startTime}~{eventData.endTime}
                </Typography>
              </Stack>
            }
          />
          <TitleContentRow
            title="장소"
            content={
              <Typography fontSize="0.9375rem">{eventData.place}</Typography>
            }
          />
          <TitleContentRow
            multiline
            title="모집 희망 인원"
            alignItems="flex-start"
            content={
              <Stack direction="row" alignItems="center" gap="1rem">
                <Stack
                  direction="row"
                  gap="0.25rem"
                  alignItems="center"
                  fontSize="0.875rem"
                >
                  <DisabilityChip
                    component="chip"
                    variant="reserve"
                    type={DisabilityEnum.VI}
                  />
                  <span style={{ color: '#DE1313' }}>~{eventData.minNumV}</span>
                  <Typography component="span">명</Typography>
                </Stack>
                <Stack
                  direction="row"
                  gap="0.25rem"
                  alignItems="center"
                  fontSize="0.875rem"
                >
                  <DisabilityChip
                    component="chip"
                    variant="reserve"
                    type={DisabilityEnum.GUIDE}
                  />
                  <span style={{ color: '#DE1313' }}>~{eventData.minNumG}</span>
                  <Typography component="span">명</Typography>
                </Stack>
              </Stack>
            }
          />
          <TitleContentRow
            title="모집 기간"
            content={
              <Typography>
                {eventData.recruitStartDate}~{eventData.recruitEndDate}
              </Typography>
            }
          />
          <TitleContentRow
            multiline
            alignItems="flex-start"
            title="이벤트 상세"
            content={
              <Box
                boxSizing="border-box"
                width="100%"
                border="1px solid #d9d9d9"
                borderRadius="1rem"
                padding="1.25rem 1rem"
                whiteSpace="break-spaces"
              >
                {eventData.details}
              </Box>
            }
          />
        </Stack>
      </Stack>
    );
  };

  /**
   * TODO: a11y 적용
   */
  const renderTabs = () => {
    return (
      <Tabs
        centered
        variant="fullWidth"
        role="tablist"
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
      >
        <Tab value="status" label="신청 현황" />
        <Tab value="result" label="이벤트 결과" />
      </Tabs>
    );
  };

  /**
   *
   */
  const renderPanel = () => {
    switch (tab) {
      case 'result':
        return <AdminEventResultPanel eventId={eventId} />;
      case 'status':
      default:
        return <AdminEventApplyPanel eventId={eventId} />;
    }
  };

  //
  //
  //

  return (
    <Dialog
      {...props}
      keepMounted={false}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '22rem',
            maxHeight: '70vh',
            padding: '5rem 1.25rem',
            gap: '2.5rem',
          },
        },
        '.MuiDialog-paper': {
          background: '#F8F9FF',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="닫기"
        size="large"
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        <ClearOutlined fontSize="large" />
      </IconButton>
      <DialogContent
        sx={{
          padding: 0,
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Stack gap="2.5rem">
          {renderTitle()}
          {renderDetail()}
          <Stack gap="1rem">
            {renderTabs()}
            {renderPanel()}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="primary"
          onClick={handleEventdelete}
        >
          이벤트 삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminEventDialog;
