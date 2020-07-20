import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>cadex 0.1.0</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <main id="main">{children}</main>
    </div>
  );
}
