import { isAxiosError } from 'axios';
import * as XLSX from 'xlsx';

import adminApi from '@/apis/requests/admin';
import infoApi from '@/apis/requests/info';
import { ErrorType } from '@/apis/types/error';
import { Event } from '@/types/event';

const downloadUserDataByExcel = async () => {
  try {
    const data = await infoApi.userInfoAllGet();

    const guideSheet = XLSX.utils.json_to_sheet(data.guideInfo);
    const viSheet = XLSX.utils.json_to_sheet(data.viInfo);

    const userDataBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(userDataBook, guideSheet, 'Guide');
    XLSX.utils.book_append_sheet(userDataBook, viSheet, 'Vi');

    XLSX.writeFile(userDataBook, 'Guiderun-user-list.xlsx');
  } catch (error) {
    if (isAxiosError<ErrorType>(error)) {
      alert(error.response?.data.message);
    }
  }
};

const downloadAttendGuideDataByExcel = async (
  eventName: Event['name'],
  eventId: Event['eventId'],
) => {
  try {
    const data = await adminApi.adminEventGuide1365IdGet({ eventId });

    const guideSheet = XLSX.utils.json_to_sheet(
      data
        // .filter((guide) => !!guide.id1365)
        .map((guide) => ({
          이름: guide.name,
          전화번호: guide.phone,
          생년월일: guide.birth,
          '1365': guide.id1365,
        })),
    );

    const userDataBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(userDataBook, guideSheet, '가이드');

    XLSX.writeFile(userDataBook, `${eventName}-1365.xlsx`);
  } catch (error) {
    if (isAxiosError<ErrorType>(error)) {
      alert(error.response?.data.message);
    }
  }
};

export { downloadUserDataByExcel, downloadAttendGuideDataByExcel };
