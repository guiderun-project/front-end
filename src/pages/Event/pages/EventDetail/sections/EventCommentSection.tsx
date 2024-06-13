import React from 'react';

import {
  Chip,
  CircularProgress,
  Pagination,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import EventCommentBox from '../components/EventCommentBox';

import eventApi from '@/apis/requests/event';
import { DisabilityChip } from '@/components/shared';
import { RootState } from '@/store/index';

//
//
//

interface EventCommentSectionProps {
  eventId: number;
}

//
//
//

const MAX_COMMENT_LENGTH = 4;

//
//
//

const EventCommentSection: React.FC<EventCommentSectionProps> = ({
  eventId,
}) => {
  const [page, setPage] = React.useState(1);
  const [content, setContent] = React.useState('');
  const userData = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  const { data: commentCount, isLoading } = useQuery({
    queryKey: ['eventCommentCountGet', eventId],
    queryFn: () => eventApi.eventCommentCountGet({ eventId }),
  });

  const maxPage = Math.ceil((commentCount ?? 0) / MAX_COMMENT_LENGTH);
  const startIndex = (page - 1) * MAX_COMMENT_LENGTH;

  const { data: commentList } = useQuery({
    queryKey: ['eventCommentGet', eventId],
    queryFn: () => eventApi.eventCommentGet({ eventId, start: startIndex }),
    enabled: Boolean(commentCount),
  });

  const { mutate: handleCommentPost } = useMutation({
    mutationFn: () =>
      eventApi.eventCommentPost({ eventId, EventCommentPostBody: { content } }),
    onSuccess: () => {
      alert('댓글이 게시되었습니다.');
      setContent('');
    },
    onError: () => {
      alert('에러가 발생했습니다. ');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['eventCommentGet', eventId] });
    },
  });

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (window.confirm('댓글을 등록하시겠습니까? ')) {
      handleCommentPost();
    }
  };

  //
  //
  //

  return (
    <Stack gap="1.25rem">
      <Typography fontWeight={700} fontSize="1.5rem">
        댓글
      </Typography>
      <Stack direction="row">
        <DisabilityChip
          component="avartar"
          variant="reserve"
          type={userData.type}
        />
        <Stack width="100%">
          <Typography
            paddingLeft="0.5rem"
            fontSize="1.0625rem"
            fontWeight={700}
          >
            {userData.name}
          </Typography>
          <Stack
            direction="row"
            component="form"
            alignItems="center"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              required
              variant="standard"
              placeholder="이벤트를 이야기 해주세요!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              InputProps={{
                style: {
                  height: '4rem',
                },
              }}
            />
            <Chip
              clickable
              component="button"
              type="submit"
              variant="filled"
              label="게시"
              sx={{
                height: '2.5rem',
                borderRadius: '11111rem',
                color: '#FFF',
                backgroundColor: '#999',
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      {isLoading ? (
        <Stack alignItems="center">
          <CircularProgress size={20} />
        </Stack>
      ) : commentList?.length ? (
        commentList.map((comment) => (
          <EventCommentBox
            key={comment.commentId}
            eventId={eventId}
            comment={comment}
          />
        ))
      ) : null}
      {commentCount && (
        <Stack direction="row" justifyContent="center">
          <Pagination
            size="small"
            page={page}
            count={maxPage}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default EventCommentSection;
