import styled from '@emotion/styled';

import { GuiderunCopyright } from '@/assets/svg';

export const Copyright = () => {
  return (
    <Container>
      <GuiderunCopyright aria-lable="(c)Guiderun Project All Right Reserved." />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  background-color: #000;
  padding: 1.5rem 1.25rem;
`;
