import { RootState } from '@/store/index';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const Withdraw: React.FC = () => {
  const { name } = useSelector((state: RootState) => state.user);
  return (
    <>
      <Helmet>
        <title>탈퇴하기</title>
      </Helmet>
    </>
  );
};

export default Withdraw;
