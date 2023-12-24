import { Card, CardContent, Stack, Typography } from '@mui/material';

import SignupContentBox from './SignupContentBox';
import SignupFormBox from './SignupFormBox';

import { FormType } from '@/types/form';

const SignupTerms = () => {
  return (
    <SignupContentBox
      title="약관 동의"
      content={
        <Stack gap="2rem" width="100%">
          <SignupFormBox
            title="개인정보 제공 및 활용 동의"
            required
            multiLine
            form={FormType.Radio}
            formValue={[
              { value: false, label: '비동의' },
              { value: true, label: '동의' },
            ]}
            content={
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <Typography whiteSpace="break-spaces">
                    1. 개인정보 수집, 이용 목적: <br /> 참가자를 대상으로 안내성
                    SMS 발송, 기타 행사를 위한 매칭 등 프로그램 진행을 위해 활용
                  </Typography>
                  <Typography whiteSpace="break-spaces">
                    2. 수집하려는 개인정보 항목: <br /> 인적사항(성함, 성별,
                    나이, 휴대폰 번호, 거주지, 기록, 가이드 러닝 경험 유무, SNS,
                    카카오톡 아이디)
                  </Typography>
                  <Typography whiteSpace="break-spaces">
                    3. 개인 정보의 보유 및 이용 기간: <br /> 앱 가입 시 부터
                    안내 시까지
                  </Typography>
                  <Typography whiteSpace="break-spaces">
                    4. 동의 거부 시 프로그램 참여가 불가한 점 양해 부탁드립니다.
                  </Typography>
                </CardContent>
              </Card>
            }
          />
          <SignupFormBox
            title="개인정보 제공 및 활용 동의"
            required
            multiLine
            form={FormType.Radio}
            formValue={[
              { value: false, label: '비동의' },
              { value: true, label: '동의' },
            ]}
            content={
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <Typography whiteSpace="break-spaces">
                    1. 수집 이용 및 제공의 목적 : <br />
                    SNS 업로드를 통한 홍보 및 기타 채널을 통한 홍보
                  </Typography>
                  <Typography whiteSpace="break-spaces">
                    2. 초상권 보유 및 이용기간 : <br />
                    홍보한 게시물 삭제시까지
                  </Typography>
                  <Typography whiteSpace="break-spaces">
                    3. 초상권 2차 사용 : <br />
                    온라인 및 오프라인 홍보물 제작 및 게시
                  </Typography>
                  <Typography whiteSpace="break-spaces">
                    4. 초상권 활용 동의에 거부할 권리가 있으며, 거부 시 교육
                    홍보물 제작에서 제외되거나 모자이크 처리됩니다.
                  </Typography>
                  <Typography whiteSpace="break-spaces">
                    5. 인격을 침해하지 않는 범위 내에서 저작물에 대한 편집 및
                    후보정이 이루어질 예정입니다.
                  </Typography>
                </CardContent>
              </Card>
            }
          />
        </Stack>
      }
    />
  );
};

export default SignupTerms;
