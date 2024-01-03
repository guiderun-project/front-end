import styled from '@emotion/styled';

interface PagelayoutProps {
  children?: React.ReactNode;
}

//
//
//

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: lightgray;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const StyledContentContainer = styled.div`
  position: relative;
  max-width: 48rem;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding: 0 1.875rem;
  background-color: #fff;
`;

//
//
//

const PageLayout: React.FC<PagelayoutProps> = ({ children }) => {
  return (
    <StyledContainer>
      <StyledContentContainer>{children}</StyledContentContainer>
    </StyledContainer>
  );
};

export default PageLayout;
