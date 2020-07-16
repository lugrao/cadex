import Link from "next/link";

export default function Nav({ user, loading }) {
  console.log(user);
  return (
    <nav id="navbar">
      <h1>Cadex</h1>
      <Link href="index">
        <a>Inicio</a>
      </Link>
      {!loading &&
        (user ? (
          <Link href="api/auth/logout">
            <a>Logout</a>
          </Link>
        ) : (
          <Link href="api/auth/login">
            <a>Login</a>
          </Link>
        ))}
      {user && <div className="usuario">
        <p>{user.name}</p>
        <img src={user.picture} /></div>}
      <style jsx>{`
        .usuario {
          display:grid;
          grid-template-columns: 1fr 1fr;
        }
        .usuario p {
          justify-self:right;
          padding-right: 10px;
        }
        img{
          width:40px;
        }
      `}</style>
    </nav>
  );
}
