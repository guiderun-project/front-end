import { isAxiosError } from 'axios';
import * as XLSX from 'xlsx';

import infoApi from '@/apis/requests/info';
import { ErrorType } from '@/apis/types/error';

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

export { downloadUserDataByExcel };
