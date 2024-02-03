import { Button, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import Header from './components/Header';

const SignupIntro: React.FC = () => {
  const [, setSearchparams] = useSearchParams();

  /**
   *
   */
  const handleTypeSelect = (type: 'vi' | 'guide') => () => {
    setSearchparams({ type });
  };

  //
  //
  //

  return (
    <Stack
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      gap="2.5rem"
    >
      <Header>
        <FormattedMessage id="signup.intro.title" />
      </Header>
      <Typography variant="h3" fontWeight={700}>
        <FormattedMessage id="signup.intro.introduce" />
      </Typography>
      <Stack gap="1rem" width="100%">
        <Button
          variant="contained"
          size="large"
          color="vi"
          fullWidth
          onClick={handleTypeSelect('vi')}
        >
          <FormattedMessage id="signup.intro.vi" />
        </Button>
        <Button
          variant="contained"
          size="large"
          color="guide"
          fullWidth
          onClick={handleTypeSelect('guide')}
        >
          <FormattedMessage id="signup.intro.guide" />
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignupIntro;
