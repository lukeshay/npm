import { NextWebVitalsMetric } from 'next/app';

export const reportWebVitals = ({ id, name, label, value }: NextWebVitalsMetric) => {
  // @ts-expect-error
  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js Custom Metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  });
};
