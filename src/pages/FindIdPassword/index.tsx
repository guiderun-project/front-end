import React from 'react';

import { Stack, Tab, Tabs, Typography } from '@mui/material';

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
        return <>아이디 찾기</>;
      case FindTabEnum.Pw:
        return <>비밀번호 찾기</>;
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
      <Stack gap="2.5rem">
        <Tabs
          role="tablist"
          centered
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
        >
          <Tab
            id="tab-find-id"
            role="tab"
            value={FindTabEnum.Id}
            label="아이디 찾기"
          />
          <Tab
            id="tab-find-pw"
            role="tab"
            value={FindTabEnum.Pw}
            label="비밀번호 재설정"
          />
        </Tabs>
        {renderPanel()}
      </Stack>
    </Stack>
  );
};

export default FindIdPassword;
