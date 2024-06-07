import { useMutation, useQueryClient } from '@tanstack/react-query';

import infoApi from '@/apis/requests/info';
import { UserProfileGetResponse } from '@/apis/types/info';

interface UseLikeParams {
  userId: string;
}

const useLike = ({ userId }: UseLikeParams) => {
  const queryClient = useQueryClient();

  const method = useMutation({
    mutationKey: ['likePost', userId],
    mutationFn: () => infoApi.likePost({ userId }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['userProfileGet', userId],
      });

      const previous = queryClient.getQueryData(['userProfileGet', userId]);

      queryClient.setQueryData(
        ['userProfileGet', userId],
        (old: UserProfileGetResponse) => ({
          ...old,
          like: old.like + 1,
          isLiked: !old.isLiked,
        }),
      );

      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['userProfileGet', userId], context?.previous);
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfileGet', userId] });
    },
  });

  return method;
};

export default useLike;
