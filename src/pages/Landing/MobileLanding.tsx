import styled from '@emotion/styled';

import { Header } from './domains/mobile';

export const MobileLanding = () => {
  return (
    <Layout>
      <Header />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  height: 300vh;
`;
