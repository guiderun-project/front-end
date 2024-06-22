import React from 'react';

type FilterType = {
  approval?: 0 | 1;
  gender?: 0 | 1;
  team?: 0 | 1;
  time?: 0 | 1;
  type?: 0 | 1;
};

//
//
//

const INITIAL_FILTER = {
  approval: undefined,
  gender: undefined,
  team: undefined,
  time: undefined,
  type: undefined,
};

//
//
//

const useUserFilter = () => {
  const [filter, setFilter] = React.useState<FilterType>(INITIAL_FILTER);

  const resetFilter = () => {
    setFilter(INITIAL_FILTER);
  };

  const handleFilterChange = (selectedFilter: keyof FilterType) => () => {
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

export default useUserFilter;
