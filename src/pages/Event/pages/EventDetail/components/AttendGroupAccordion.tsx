import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Stack, Typography } from '@mui/material';

import { StyledUserListBox } from '../panels/EventAttendPanel';

import { ApplyUserType } from '@/apis/types/event';
import { ApplyUserChip } from '@/components/shared';
import { TEAM_COLOR } from '@/constants/color';
import { RunningGroup } from '@/types/group';

interface AttendGroupAccordionProps {
  group: RunningGroup;
  attendedMemberOfVi: ApplyUserType[];
  attendedMemberOfGuide: ApplyUserType[];
  notAttendedMemberOfVi: ApplyUserType[];
  notAttendedMemberOfGuide: ApplyUserType[];
  isAttendMode?: boolean;
}

const StyledAccordionBox = styled.div<{ open: boolean; group: RunningGroup }>`
  display: block;
  width: 100%;
  border-radius: 0.5rem;
  ${({ open, group }) => {
    if (open) {
      return css`
        box-shadow: 0 0 0 2px ${TEAM_COLOR[group]} inset;
        background-color: #e6e7ee;
      `;
    }
  }}
`;

const StyledAccordionButton = styled.div<{
  open: boolean;
  group: RunningGroup;
}>`
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem 0;
  overflow: hidden;
  transition: all 0.1s ease-in;
  cursor: pointer;
  ${({ open, group }) => {
    if (open) {
      return css`
        color: ${TEAM_COLOR[group]};
        background-color: transparent;
        padding-top: 2rem;
        padding-bottom: 1.5rem;
      `;
    } else {
      return css`
        color: #fff;
        background-color: ${TEAM_COLOR[group]};
      `;
    }
  }}
`;

const StyledAccordionDetail = styled.div<{ open: boolean }>`
  min-height: 0;
  height: 0;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
  ${({ open }) => {
    if (open) {
      return css`
        height: auto;
        overflow: visible;
      `;
    } else {
      return css`
        height: 0px;
        visibility: hidden;
        overflow: hidden;
      `;
    }
  }}
`;

const StyledCloseButton = styled.button`
  border: none;
  outline: none;
  background-color: inherit;
  cursor: pointer;
  padding: 1.5rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
`;

const AttendGroupAccordion: React.FC<AttendGroupAccordionProps> = ({
  group,
  attendedMemberOfGuide,
  attendedMemberOfVi,
  notAttendedMemberOfGuide,
  notAttendedMemberOfVi,
}) => {
  const [open, setOpen] = React.useState(true);

  return (
    <StyledAccordionBox open={open} group={group}>
      <StyledAccordionButton
        role="button"
        tabIndex={0}
        open={open}
        group={group}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Typography
          fontWeight={700}
          color="inherit"
          fontSize="1.5rem"
          aria-label={`${group}그룹`}
        >
          {group}
        </Typography>
      </StyledAccordionButton>
      <StyledAccordionDetail open={open}>
        <Stack gap="1.25rem" alignItems="center" width="100%">
          <StyledUserListBox>
            {notAttendedMemberOfVi.map((member) => (
              <ApplyUserChip
                key={member.userId}
                type={member.type}
                name={member.name}
                group={member.recordDegree}
              />
            ))}
            {attendedMemberOfVi.map((member) => (
              <ApplyUserChip
                isAttend
                key={member.userId}
                type={member.type}
                name={member.name}
                group={member.recordDegree}
              />
            ))}
          </StyledUserListBox>
          <StyledUserListBox>
            {notAttendedMemberOfGuide.map((member) => (
              <ApplyUserChip
                key={member.userId}
                type={member.type}
                name={member.name}
                group={member.recordDegree}
              />
            ))}
            {attendedMemberOfGuide.map((member) => (
              <ApplyUserChip
                isAttend
                key={member.userId}
                type={member.type}
                name={member.name}
                group={member.recordDegree}
              />
            ))}
          </StyledUserListBox>
        </Stack>
        <StyledCloseButton aria-label="닫기" onClick={() => setOpen(false)}>
          <ExpandLessIcon aria-hidden fontSize="large" color="inherit" />
        </StyledCloseButton>
      </StyledAccordionDetail>
    </StyledAccordionBox>
  );
};

export default AttendGroupAccordion;
