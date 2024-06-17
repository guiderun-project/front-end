import { EventGetResponse } from '@/apis/types/event';

interface EventDetailStatusSectionProps {
  eventData: EventGetResponse;
  eventId: number;
}

const EventDetailStatusSection: React.FC<
  EventDetailStatusSectionProps
> = () => {
  return <>EventDetailStatusSection</>;
};

export default EventDetailStatusSection;
