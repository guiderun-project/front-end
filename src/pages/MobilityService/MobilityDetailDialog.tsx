import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { TransportSupport } from '.';

interface MobilityDetailDialogProps {
  transportService: TransportSupport;
  onClose: VoidFunction;
}

const MobilityDetailDialog = ({
  transportService,
  onClose,
}: MobilityDetailDialogProps) => {
  return (
    <Dialog open fullWidth onClose={onClose} maxWidth="xl">
      <DialogTitle>{transportService.name} 이동 지원 연락처</DialogTitle>
      <DialogContent>
        <Stack gap="0.5rem">
          <Stack gap="0.25rem">
            <Typography component="h2" variant="subtitle1" fontWeight={700}>
              {transportService.mobilityCenter.name}
            </Typography>
            <Stack gap="0.5rem">
              {transportService.mobilityCenter.contacts.map(
                (contact, index) => (
                  <Typography
                    key={index}
                    component="a"
                    href={`tel:${contact.number}`}
                    aria-label={`${transportService.mobilityCenter.name}: ${
                      contact.desc ? `${contact.desc} ` : ''
                    }${contact.number}으로 전화 걸기`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {`${contact.desc ? `${contact.desc} ` : ''}${
                      contact.number
                    }`}
                  </Typography>
                ),
              )}
            </Stack>
          </Stack>
          {transportService.ktx.length > 0 && (
            <Stack gap="0.25rem">
              <Typography component="h2" variant="subtitle1" fontWeight={700}>
                KTX 연락처
              </Typography>
              {transportService.ktx.map((ktx, index) => (
                <Typography
                  key={index}
                  component="a"
                  href={`tel:${ktx.number}`}
                  aria-label={`${ktx.name} - ${ktx.number}으로 전화 걸기`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {ktx.name} - {ktx.number}
                </Typography>
              ))}
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MobilityDetailDialog;
