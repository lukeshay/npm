import { GOOGLE_ANALYTICS_ID } from './google-analytics-id';

export function pageView(url: string) {
  setTimeout(() => {
    // @ts-expect-error
    window.gtag('config', GOOGLE_ANALYTICS_ID, {
      page_path: url,
      page_title: document.title,
    });
  }, 0);
}
