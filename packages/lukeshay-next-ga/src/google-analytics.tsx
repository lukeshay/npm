import React from "react";
import type { FC } from "react";

import { GOOGLE_ANALYTICS_ID } from "./google-analytics-id";

export type GoogleAnalyticsProps = {};

export const GoogleAnalytics: FC<never> = () => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${
        GOOGLE_ANALYTICS_ID ?? ""
      }`}
    />
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_ID ?? ""}');
              `,
      }}
    />
  </>
);
