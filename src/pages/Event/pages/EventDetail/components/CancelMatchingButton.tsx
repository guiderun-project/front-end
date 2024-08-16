import type { PropsWithChildren } from 'react';

import styled from '@emotion/styled';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton, useTheme } from '@mui/material';

import { DisabilityEnum } from '@/types/group';

interface CancelMatchingButtonProps extends PropsWithChildren {
  userId: string;
  visible: boolean;
  type: DisabilityEnum;
}

const StyledContainer = styled.div`
  position: relative;
`;

const StyledCancelButton = styled(IconButton)`
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  background-color: white;
  padding: 2px;
  z-index: 111;

  &:hover {
    background-color: white;
  }
`;

const CancelMatchingButton: React.FC<CancelMatchingButtonProps> = ({
  visible,
  children,
  type,
}) => {
  const theme = useTheme();

  //
  //
  //

  return (
    <StyledContainer>
      {visible && (
        <StyledCancelButton
          size="small"
          aria-label="매칭 취소"
          sx={
            type === DisabilityEnum.GUIDE
              ? { color: theme.palette.guide.main }
              : { color: theme.palette.vi.main }
          }
        >
          <HighlightOffIcon fontSize="small" />
        </StyledCancelButton>
      )}
      {children}
    </StyledContainer>
  );
};

export default CancelMatchingButton;
