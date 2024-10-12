import { type HTMLAttributes } from 'react';

import styled from '@emotion/styled';

interface HidenTextProps extends HTMLAttributes<HTMLSpanElement> {
  content: string;
  as?: React.ElementType;
}

const StyledContent = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
`;

const HidenText: React.FC<HidenTextProps> = ({ content, as }) => {
  return <StyledContent as={as}>{content}</StyledContent>;
};

export default HidenText;
