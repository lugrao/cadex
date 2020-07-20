import Link from "next/link";

export default function Nav({ usuario, cargando }) {
  
  return (
    <nav id="navbar">
      <h1>Cadex</h1>
      <Link href="index">
        <a>Inicio</a>
      </Link>
      {!cargando &&
        (usuario ? (
          <Link href="api/auth/logout">
            <a>Logout</a>
          </Link>
        ) : (
          <Link href="api/auth/login">
            <a>Login</a>
          </Link>
        ))}
      {usuario && (
        <div className="usuario">
          <p>{usuario.name}</p>
          <img src={usuario.picture} />
        </div>
      )}
      <style jsx>{`
        .usuario {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .usuario p {
          justify-self: right;
          padding-right: 10px;
        }
        img {
          width: 40px;
        }
      `}</style>
    </nav>
  );
}
