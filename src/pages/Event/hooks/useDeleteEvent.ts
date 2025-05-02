import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import { BROWSER_PATH } from '@/constants/path';

const useDeleteEvent = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['eventDelete'],
    mutationFn: (eventId: number) => eventApi.eventDelete({ eventId }),
    onSuccess: () => {
      alert('삭제되었습니다. 메인 페이지로 이동합니다.');
      navigate(BROWSER_PATH.MAIN);
    },
    onError: () => {
      alert('에러가 발생했습니다.');
    },
  });

  const hanleDeleteEvent = (eventId: number) => {
    if (window.confirm('이벤트를 삭제하시겠습니까?')) {
      mutation.mutate(eventId);
    }
  };

  return { ...mutation, deleteEvent: hanleDeleteEvent };
};

export default useDeleteEvent;
