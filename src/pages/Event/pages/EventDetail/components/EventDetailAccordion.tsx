import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

interface EventDetailAccordianProps {
  detail: string;
}

const EventDetailAccordian: React.FC<EventDetailAccordianProps> = ({
  detail,
}) => {
  return (
    <Accordion
      defaultExpanded
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
          훈련 상세
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          padding="1rem"
          border="1px solid #D9D9D9"
          borderRadius="0.5rem"
          sx={{ backgroundColor: '#FFF' }}
        >
          <Typography
            fontSize="0.8125rem"
            lineHeight="1.25rem"
            whiteSpace="break-spaces"
          >
            {detail}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default EventDetailAccordian;
