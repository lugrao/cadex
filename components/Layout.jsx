import Head from "next/head"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <Head>
        <title>cadex</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/toiletpaper.svg" />
      </Head>
      <CSSReset />
      <main id="main">{children}</main>
    </ThemeProvider>
  )
}
