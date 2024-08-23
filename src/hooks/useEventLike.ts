import { useMutation, useQueryClient } from '@tanstack/react-query';

import eventApi from '@/apis/requests/event';
import { EventLikeCountGetResponse } from '@/apis/types/event';
import { Event } from '@/types/event';

interface UseEventLikeProps {
  eventId: Event['eventId'];
}

const useEventLike = ({ eventId }: UseEventLikeProps) => {
  const queryClient = useQueryClient();

  const queryKey = ['eventLikeCountGet', eventId];

  const method = useMutation({
    mutationKey: ['eventLikePost', eventId],
    mutationFn: () => eventApi.eventLikePost({ eventId }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previous = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: EventLikeCountGetResponse) => ({
        ...old,
        like: old.isLiked ? old.likes - 1 : old.likes + 1,
        isLiked: !old.isLiked,
      }));

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

  const handleLike = () => {
    method.mutate();
  };

  return { ...method, handleLike };
};

export default useEventLike;
