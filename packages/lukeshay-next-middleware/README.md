# @lukeshay/next-ga

Adds Google Analytics to your Next.js application. For it to work, you need the environment variable `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to be set.

To set up, you need `<GoogleAnalytics />` to be added to your document component in the `Head`. Then add `useAppInit()` in your app component. To record web vitals, you can export `reportWebVitals` from your app component.

## Example

`pages/_document.js`:

```javascriptreact
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GoogleAnalytics } from '@lukeshay/next-ga';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <GoogleAnalytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

`pages/_app.js`:

```javascriptreact
import { useAppInit, reportWebVitals } from '@lukeshay/next-ga';

export default function MyApp() {
  GoogleAnalytics.useAppInit();
  ...
};

export reportWebVitals;
```
