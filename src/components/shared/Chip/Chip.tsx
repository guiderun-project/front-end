import styled from '@emotion/styled';

interface ChipProps {
  children: React.ReactNode;
  bgColor?: string;
  color?: string;
}

//
//
//

const StyledChip = styled.span<{ bgColor?: string; color?: string }>`
  height: 1.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: 'pretendard', sans-serif;
  font-size: 0.625rem; //10px
  font-weight: 700;
  background-color: ${({ bgColor }) => bgColor ?? 'grey'};
  color: ${({ color }) => color ?? '#000'};
`;

//
//
//

const Chip: React.FC<ChipProps> = ({ bgColor, color, children }) => {
  return (
    <StyledChip bgColor={bgColor} color={color}>
      {children}
    </StyledChip>
  );
};

export default Chip;
