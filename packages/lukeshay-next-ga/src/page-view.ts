/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/no-unsafe-call */

import { GOOGLE_ANALYTICS_ID } from './google-analytics-id';

export const pageView = (url: string): void => {
  setTimeout(() => {
    // @ts-expect-error - this is added by Google analytics
    window.gtag('config', GOOGLE_ANALYTICS_ID, {
      page_path: url,
      page_title: document.title,
    });
  }, 0);
};
