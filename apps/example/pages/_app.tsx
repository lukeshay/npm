import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Head>
      <title>{"Router Example"}</title>
      <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
    </Head>

    <MantineProvider
      theme={{
        colorScheme: "light",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Component {...pageProps} />
    </MantineProvider>
  </>
);

export default App;
