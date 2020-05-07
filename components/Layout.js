import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>cadex 0.0.2</title>
      </Head>
      <main id="main">{children}</main>
    </div>
  );
}
