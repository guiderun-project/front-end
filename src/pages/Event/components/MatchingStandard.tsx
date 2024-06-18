import styled from '@emotion/styled';

import { PaceGroupList } from '@/components/shared';

//
//
//

const StyledList = styled.ul`
  box-sizing: border-box;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style-type: square;

  & li {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`;

//
//
//

const MatchingStandard: React.FC = () => {
  return (
    <StyledList>
      <li>
        클래스 참여 시, 배정된 팀을 기준으로 파트너 매칭이 이루어지며, 함께
        운동하시던 파트너와 다시 함께 훈련을 희망하신다면 우선적으로 매칭
        합니다.
      </li>
      <PaceGroupList />
      <li>
        일반적으로 가이드러너가 시각장애러너보다 1.5배 빠른 조깅이 가능한 경우
        안정된 훈련이 가능합니다.
      </li>
      <li>
        미리 매칭이 공지 되었을지라도 상황에 따라 현장에서 변동될 수 있습니다.
      </li>
      <li>
        미성년자 러너의 경우, 서브 파트너 주자로 성인 러너(보호자 가능)와 함께
        될 수 있으면 동성 파트너로만 매칭합니다.
      </li>
      <li>추가적인 문의사항이 있는 경우, 운영진에게 언제든지 알려주세요 :)</li>
    </StyledList>
  );
};

export default MatchingStandard;
