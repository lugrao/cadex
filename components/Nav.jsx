import Link from "next/link";

export default function Nav(props) {
  return (
    <nav id="navbar">
      <h1>Cadex</h1>
      <Link href="index">
        <a>Inicio</a>
      </Link>
      <Link href="api/auth/login">
        <a>Login</a>
      </Link>
    </nav>
  );
}
