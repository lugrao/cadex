import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>cadex 0.1.0</title>
      </Head>
      <main id="main">{children}</main>
    </div>
  );
}
