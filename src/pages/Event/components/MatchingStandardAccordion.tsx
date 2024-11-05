import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

import MatchingStandard from './MatchingStandard';

const MatchingStandardAccordion: React.FC = () => {
  return (
    <Accordion
      elevation={0}
      sx={{
        background: '#F8F9FF',
        border: 'none',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary expandIcon={<ArrowDropDownIcon />} sx={{ padding: 0 }}>
        <Typography component="h3" fontWeight={700} fontSize="1.0625rem">
          매칭 기준
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: '#F1F3FF',
        }}
      >
        <MatchingStandard />
      </AccordionDetails>
    </Accordion>
  );
};

export default MatchingStandardAccordion;
