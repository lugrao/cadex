import Head from "next/head";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <Head>
        <title>cadex 0.1.0</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CSSReset />
      <main id="main">{children}</main>
    </ThemeProvider>
  );
}
