/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/no-unsafe-call */

export type Event = {
  action: string;
  category?: string;
  label?: string;
  value?: string;
};

export const event = ({ action, category, label, value }: Event): void => {
  // @ts-expect-error - this is added by Google analytics
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
