import { useEffect } from 'react';

import { Helmet } from 'react-helmet-async';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const getTitle = (title: string) => {
    return `${title} | Guiderun Project`;
  };

  useEffect(() => {
    document.title = getTitle(title);
  }, [title, getTitle]);

  return (
    <Helmet>
      <title>{getTitle(title)}</title>
    </Helmet>
  );
};

export default PageTitle;
