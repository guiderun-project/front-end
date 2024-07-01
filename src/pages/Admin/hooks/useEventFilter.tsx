import React from 'react';

import { EventFilterType } from '@/apis/types/admin';

const INITIAL_FILTER: EventFilterType = {
  time: undefined,
  name: undefined,
  organizer: undefined,
  approval: undefined,
};

const useEventFilter = () => {
  const [filter, setFilter] = React.useState(INITIAL_FILTER);

  const resetFilter = () => {
    setFilter(INITIAL_FILTER);
  };

  const handleFilterChange = (selectedFilter: keyof EventFilterType) => () => {
    if (filter[selectedFilter] === 1) {
      setFilter((prev) => ({ ...prev, [selectedFilter]: 0 }));
      return;
    }
    if (filter[selectedFilter] === 0) {
      setFilter((prev) => ({ ...prev, [selectedFilter]: undefined }));
      return;
    }
    setFilter((prev) => ({ ...prev, [selectedFilter]: 1 }));
  };

  return { filter, resetFilter, handleFilterChange };
};

export default useEventFilter;
