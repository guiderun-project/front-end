import styled from '@emotion/styled';

import {
  Description,
  GuideRun,
  Header,
  ProgramList,
  Together,
} from './domains/mobile';

export const MobileLanding = () => {
  return (
    <Layout>
      <Header />
      <Description />
      <ProgramList />
      <Together />
      <GuideRun />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  height: 300vh;
`;
