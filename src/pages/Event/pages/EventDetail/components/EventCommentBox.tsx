import React from 'react';

import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import eventApi from '@/apis/requests/event';
import {
  EventCommentLikeCountGetResponse,
  EventCommentType,
} from '@/apis/types/event';
import { DisabilityChip } from '@/components/shared';
import { RootState } from '@/store/index';

//
//
//

interface EventCommentBoxProps {
  comment: EventCommentType;
  eventId: number;
}

//
//
//

const StyledEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
//
//
//

const EventCommentBox: React.FC<EventCommentBoxProps> = ({
  eventId,
  comment: { commentId, content, createdAt, name, type, userId },
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editContent, setEditContent] = React.useState(content);

  const queryClient = useQueryClient();

  const currentId = useSelector((state: RootState) => state.user.userId);
  const queryKey = ['eventCommentLikeCountGet', commentId];

  const { data: likeData } = useQuery({
    queryKey,
    queryFn: () => eventApi.eventCommentLikeCountGet({ commentId }),
  });

  const { mutate: handleLike } = useMutation({
    mutationKey: ['eventCommentLikePost', commentId],
    mutationFn: () => eventApi.eventCommentLikePost({ commentId }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previous = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (old: EventCommentLikeCountGetResponse) => ({
          ...old,
          like: old.isLiked ? old.likes - 1 : old.likes + 1,
          isLiked: !old.isLiked,
        }),
      );

      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: () => eventApi.eventCommentDelete({ commentId, eventId }),
    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
    },
    onError: () => {
      alert('에러가 발생했습니다. ');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['eventCommentGet', eventId] });
    },
  });

  const { mutate: handelEdit } = useMutation({
    mutationFn: () =>
      eventApi.eventCommentPatch({
        commentId,
        eventId,
        EventCommentPatchBody: { content: editContent },
      }),
    onSuccess: () => {
      alert('댓글이 수정되었습니다.');
    },
    onError: () => {
      alert('에러가 발생했습니다. ');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['eventCommentGet', eventId] });
      setIsEdit(false);
    },
  });

  const open = Boolean(anchorEl);
  const isWriter = userId === currentId;

  /**
   *
   */
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   *
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   *
   */
  const handleEditActiveClick = () => {
    setEditContent(content);
    setIsEdit(true);
    handleClose();
  };

  /**
   *
   */
  const handleDeleteClick = () => {
    handleClose();
    if (window.confirm('댓글을 정말 삭제하시겠습니까?')) {
      handleDelete();
    }
  };

  /**
   *
   */
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (window.confirm('댓글을 수정하시겠습니까?') && editContent.length) {
      handelEdit();
    }
  };

  /**
   *
   */
  const renderEdit = () => {
    return (
      <StyledEditForm onSubmit={handleEditSubmit}>
        <TextField
          multiline
          fullWidth
          required
          placeholder="댓글을 수정해주세요."
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <Stack direction="row" gap="0.25rem" justifyContent="flex-end">
          <Chip
            clickable
            color="primary"
            component="button"
            type="submit"
            label="수정"
          />
          <Chip
            clickable
            variant="outlined"
            component="button"
            label="취소"
            onClick={() => setIsEdit(false)}
          />
        </Stack>
      </StyledEditForm>
    );
  };

  /**
   *
   */
  const renderMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEditActiveClick}>수정하기</MenuItem>
        <MenuItem onClick={handleDeleteClick}>삭제하기</MenuItem>
      </Menu>
    );
  };

  //
  //
  //

  return (
    <Stack direction="row">
      <DisabilityChip component="avartar" variant="reserve" type={type} />
      <Stack gap="0.5rem" width="100%" padding="0 0.5rem">
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize="1.0625rem" fontWeight={700}>
            {name}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.25rem"
          >
            <Typography color="#999" fontSize="0.75rem">
              {createdAt}
            </Typography>
            {isWriter && (
              <>
                <IconButton
                  size="small"
                  aria-label="댓글 메뉴"
                  onClick={handleMenuClick}
                >
                  <MoreHorizIcon />
                </IconButton>
                {renderMenu()}
              </>
            )}
          </Stack>
        </Stack>
        {isEdit ? (
          renderEdit()
        ) : (
          <Typography fontSize="0.875rem" whiteSpace="break-spaces">
            {content}
          </Typography>
        )}
        {likeData ? (
          <Stack direction="row" alignItems="center">
            <IconButton
              size="small"
              onClick={() => handleLike()}
              aria-label="좋아요"
            >
              {likeData.isLiked ? (
                <FavoriteIcon
                  fontSize="small"
                  aria-label={`댓글의 인기도`}
                  aria-selected={likeData.isLiked}
                  sx={{
                    color: 'red',
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  aria-label={`댓글의 인기도`}
                  aria-selected={likeData.isLiked}
                  sx={{
                    color: '#666',
                  }}
                />
              )}
            </IconButton>
            <Typography fontSize="0.75rem">{likeData.likes}</Typography>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default EventCommentBox;
