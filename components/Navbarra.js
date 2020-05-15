import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { useState } from "react";

export default function Navbarra(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div id="navbar-0"></div>

      <Navbar id="navbarra" color="f0a500" light expand="md">
        <NavbarBrand>
          <b>Cadex</b>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
                <NavLink href="/"><a>Inicio</a></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/NuevaHistoria">
                Nueva historia
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            sala: <b>{props.sala ? props.sala : "..."}</b>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

function Navbarr(props) {
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
