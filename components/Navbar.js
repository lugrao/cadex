import Link from "next/link";

export default function Navbar(props) {
  return (
    <div>
      <div id="navbar-0"></div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <span id="navbar-titulo" className="navbar-brand mb-0 h1">
          Cadex
        </span>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link href="/">
                <a class="nav-link">
                  Inicio <span class="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/NuevaHistoria">
                <a class="nav-link">Nueva historia</a>
              </Link>
            </li>
          </ul>
        </div>
        <span className="navbar-text">
          sala: <b>{props.sala ? props.sala : "..."}</b>
        </span>
      </nav>
    </div>
  );
}
