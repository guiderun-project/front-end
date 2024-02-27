import React from 'react';

import styled from '@emotion/styled';
import {
  Badge,
  Card,
  CardContent,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import {
  permissionGetResponse,
  permissionPatchRequest,
} from '@/apis/types/info';
import infoApi from '@/apis/requests/info';

//
//
//

interface TermsEditProps {
  defaultValues: permissionGetResponse;
}

//
//
//

const StyledInputLabel = styled(InputLabel)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.25rem 0;
  color: #333;
`;

//
//
//

const TermsEdit: React.FC<TermsEditProps> = ({ defaultValues }) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { handleSubmit, control, setFocus } = useForm<permissionPatchRequest>({
    defaultValues,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   *
   */
  const onSubmit = async (data: permissionPatchRequest) => {
    if (data && window.confirm('저장하시겠습니까?')) {
      try {
        await infoApi.permissionPatch(data);
        alert('저장되었습니다. ');
        queryClient.invalidateQueries({ queryKey: ['permissionGet'] });
        searchParams.set('mode', 'detail');
        setSearchParams(searchParams.toString());
      } catch (err) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  //
  //
  //
  React.useEffect(() => {
    setFocus('privacy');
  }, [setFocus]);

  //
  //
  //

  //
  //
  //
  return (
    <form id="edit_form" onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title>약관 동의 수정 - Guide run Project</title>
      </Helmet>
      <Stack gap="2rem" width="100%">
        <Controller
          name="privacy"
          control={control}
          render={({ field }) => (
            <StyledInputLabel>
              <Typography
                component="h3"
                whiteSpace="break-spaces"
                fontWeight={700}
              >
                <Badge color="error" variant="dot">
                  개인정보 제공 및 활용 동의
                </Badge>
              </Typography>
              <Card
                sx={{
                  width: '100%',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {Array(4)
                    .fill(0)
                    .map((_, idx) => (
                      <Typography
                        key={`signup.terms.privacy.${idx + 1}`}
                        whiteSpace="break-spaces"
                      >
                        <FormattedMessage
                          id={`signup.terms.privacy.${idx + 1}`}
                        />
                      </Typography>
                    ))}
                </CardContent>
              </Card>
              <RadioGroup
                {...field}
                onChange={(e) => field.onChange(e.target.value === 'true')}
                sx={{
                  width: '100%',
                  padding: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'space-between',
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio inputRef={field.ref} />}
                  label={intl.formatMessage({ id: 'signup.radio.agree' })}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={intl.formatMessage({ id: 'signup.radio.disagree' })}
                />
              </RadioGroup>
            </StyledInputLabel>
          )}
        />
        <Controller
          name="portraitRights"
          control={control}
          render={({ field }) => (
            <StyledInputLabel>
              <Typography
                component="h3"
                whiteSpace="break-spaces"
                fontWeight={700}
              >
                <Badge color="error" variant="dot">
                  초상권 활용 동의
                </Badge>
              </Typography>
              <Card
                sx={{
                  width: '100%',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <Typography
                        key={`signup.terms.likeness.${idx + 1}`}
                        whiteSpace="break-spaces"
                      >
                        <FormattedMessage
                          id={`signup.terms.likeness.${idx + 1}`}
                        />
                      </Typography>
                    ))}
                </CardContent>
              </Card>
              <RadioGroup
                {...field}
                onChange={(e) => field.onChange(e.target.value === 'true')}
                sx={{
                  width: '100%',
                  padding: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'space-between',
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label={intl.formatMessage({ id: 'signup.radio.agree' })}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={intl.formatMessage({ id: 'signup.radio.disagree' })}
                />
              </RadioGroup>
            </StyledInputLabel>
          )}
        />
      </Stack>
    </form>
  );
};

export default TermsEdit;
