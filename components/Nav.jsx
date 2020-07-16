import Link from "next/link";

export default function Nav({ user, loading }) {
  return (
    <nav id="navbar">
      <h1>Cadex</h1>
      <Link href="index">
        <a>Inicio</a>
      </Link>
      {!loading &&
        (user ? (
          <p>usuario conectado</p>
        ) : (
          <Link href="api/auth/login">
            <a>Login</a>
          </Link>
        ))}
    </nav>
  );
}
