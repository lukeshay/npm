/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/no-unsafe-call */

import type { NextWebVitalsMetric } from "next/app";

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric): void => {
  // @ts-expect-error - this is added by Google analytics
  window.gtag("event", name, {
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js Custom Metric",
    event_label: id,
    non_interaction: true,
    value: Math.round(name === "CLS" ? value * 1000 : value),
  });
};
