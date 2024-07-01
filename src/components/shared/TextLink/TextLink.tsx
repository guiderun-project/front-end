import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

//
//
//

interface TextLinkProps {
  label: string;
  type?: 'link' | 'button';
  to?: string;
  newTabs?: boolean;
  onClick?: () => void;
}

//
//
//

const TextLink: React.FC<TextLinkProps> = ({
  type = 'link',
  newTabs = false,
  to = '/',
  label,
  onClick,
}) => {
  if (type === 'button' && onClick) {
    return (
      <Stack
        role="button"
        direction="row"
        alignItems="center"
        color="#333"
        onClick={onClick}
      >
        <Typography
          component="span"
          fontSize="0.875rem"
          fontWeight={500}
          sx={{
            textDecoration: 'underline',
            textUnderlinePosition: 'under',
          }}
        >
          {label}
        </Typography>
        <KeyboardArrowRightIcon fontSize="small" aria-hidden />
      </Stack>
    );
  }

  return (
    <Link
      target={newTabs ? '_blank' : '_self'}
      to={to}
      style={{
        textDecoration: 'none',
        color: '#333',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        component="span"
        fontSize="0.875rem"
        fontWeight={500}
        sx={{
          textDecoration: 'underline',
          textUnderlinePosition: 'under',
        }}
      >
        {label}
      </Typography>
      <KeyboardArrowRightIcon fontSize="small" aria-hidden />
    </Link>
  );
};

export default TextLink;
