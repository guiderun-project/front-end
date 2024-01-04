import { createIntlCache, createIntl } from 'react-intl';

import enMessages from './messages/en.json';
import koMessages from './messages/ko.json';

import { Locale } from '@/types/locale';

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: 'ko',
    messages: koMessages,
  },
  cache,
);

const messages = {
  en: enMessages,
  ko: koMessages,
};

export const setLocale = (locale: Locale) => {
  intl.locale = locale;
  intl.messages = messages[locale];
};

export default intl;
