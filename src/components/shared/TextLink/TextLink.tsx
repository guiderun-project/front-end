import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

//
//
//

interface TextLinkProps {
  to: string;
  label: string;
  newTabs?: boolean;
}

//
//
//

const TextLink: React.FC<TextLinkProps> = ({ newTabs = false, to, label }) => {
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
