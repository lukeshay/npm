import React from 'react';
import { GOOGLE_ANALYTICS_ID } from './google-analytics-id';

export interface GoogleAnalyticsProps {}

export function GoogleAnalytics(_: GoogleAnalyticsProps) {
  return (
    <React.Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_ID}');
              `,
        }}
      />
    </React.Fragment>
  );
}