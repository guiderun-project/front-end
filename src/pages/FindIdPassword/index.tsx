import React from 'react';

import { Stack, Tab, Tabs, Typography } from '@mui/material';

import FindIdSection from './sections/FindIdSection';
import FindPwSection from './sections/FindPwSection';

export enum FindTabEnum {
  Id = 'id',
  Pw = 'pw',
}

const FindIdPassword: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(FindTabEnum.Id);

  /**
   *
   */
  const renderPanel = () => {
    switch (selectedTab) {
      case FindTabEnum.Id:
        return <FindIdSection />;
      case FindTabEnum.Pw:
        return <FindPwSection />;
      default:
        return <>잘못된 페이지 접근</>;
    }
  };

  //
  //
  //

  return (
    <Stack
      boxSizing="border-box"
      alignItems="center"
      paddingTop="5rem"
      gap="3.75rem"
    >
      <Typography component="h1" fontSize="2rem" fontWeight="2rem">
        아이디/비밀번호 찾기
      </Typography>
      <Stack gap="2.5rem" width="19.6875rem">
        <Tabs
          role="tablist"
          variant="fullWidth"
          centered
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
        >
          <Tab
            id="tab-find-id"
            role="tab"
            value={FindTabEnum.Id}
            label="아이디 찾기"
            aria-selected={FindTabEnum.Id === selectedTab}
            aria-controls="tabpanel-find-id"
          />
          <Tab
            id="tab-find-pw"
            role="tab"
            value={FindTabEnum.Pw}
            label="비밀번호 재설정"
            aria-controls="tabpanel-find-pw"
          />
        </Tabs>
        {renderPanel()}
      </Stack>
    </Stack>
  );
};

export default FindIdPassword;
