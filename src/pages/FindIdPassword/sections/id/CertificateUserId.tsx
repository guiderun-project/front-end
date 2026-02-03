import React from 'react';

import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import InputBox from '../../components/InputBox';

import authApi from '@/apis/requests/auth';
import {
  CheckCertificationTokenPostRequest,
  GetCertificationTokenIdPostRequest,
} from '@/apis/types/auth';

const CertificateUserId: React.FC = () => {
  const getTokenMethod = useForm<GetCertificationTokenIdPostRequest>();
  const checkTokenMethod = useForm<CheckCertificationTokenPostRequest>();

  const { mutate: getTokenMutate, isSuccess: isSuccessGetToken } = useMutation({
    mutationKey: ['getCertificationTokenIdPost'],
    mutationFn: (data: GetCertificationTokenIdPostRequest) =>
      authApi.getCertificationTokenIdPost(data),
    onSuccess: () => {
      alert('인증번호가 전송되었습니다.');
    },
    onError: (e) => {
      getTokenMethod.reset(undefined, { keepValues: true });
      if (e.response) {
        const code = e.response.data?.errorCode ?? '';
        if (code === '1009') {
          alert('전화번호가 존재하지 않습니다.');
          return;
        }
      }
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const { mutate: checkTokenMutate } = useMutation({
    mutationKey: ['findIdToken'],
    mutationFn: (data: CheckCertificationTokenPostRequest) =>
      authApi.checkCertificationTokenPost(data),
    onSuccess: () => {
      alert('인증되었습니다. ');
    },
    onError: (e) => {
      checkTokenMethod.reset(undefined, { keepValues: true });
      if (e.response) {
        const code = e.response.data?.errorCode ?? '';
        if (code === '1007') {
          alert('다른 인증번호를 입력했습니다. 다시 입력해주세요.');
          return;
        }
      }
      alert(e.status + '에러가 발생했습니다');
    },
  });

  /**
   *
   */
  const handlePhoneNumberSubmit = (
    data: GetCertificationTokenIdPostRequest,
  ) => {
    getTokenMutate(data);
  };

  /**
   *
   */
  const handleTokenSubmit = (data: CheckCertificationTokenPostRequest) => {
    checkTokenMutate(data);
  };

  //
  //
  //

  return (
    <Stack gap="1.5rem">
      <FormProvider {...getTokenMethod}>
        <form onSubmit={getTokenMethod.handleSubmit(handlePhoneNumberSubmit)}>
          <InputBox
            autoFocus
            id="phoneNum"
            label="휴대전화번호"
            placeholder={`휴대 전화번호 입력 ('-'제외)`}
            submitButtonLabel="인증번호 전송"
            inputProps={{
              inputMode: 'decimal',
              pattern: '[0-9]*',
            }}
          />
        </form>
      </FormProvider>
      {isSuccessGetToken && (
        <FormProvider {...checkTokenMethod}>
          <form onSubmit={checkTokenMethod.handleSubmit(handleTokenSubmit)}>
            <InputBox
              autoFocus
              id="number"
              label="인증번호"
              placeholder="인증번호 입력"
              submitButtonLabel="확인"
              inputProps={{
                inputMode: 'decimal',
                pattern: '[0-9]*',
              }}
            />
          </form>
        </FormProvider>
      )}
    </Stack>
  );
};

export default CertificateUserId;
