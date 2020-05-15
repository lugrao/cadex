import Layout from "../components/Layout";
import Navbarra from "../components/Navbarra";
import Footer from "../components/Footer";
import SinData from "../components/SinData";
import { useState } from "react";
import useSwr from "swr";
import _ from "lodash";
import Router from "next/router";

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000/" : "https://cadex.now.sh/";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NuevaHistoria() {
  const [nombreDeSala, setNombreDeSala] = useState("");
  const [urlDeSala, setUrlDeSala] = useState("");
  const [urlNoDisponible, setUrlNoDisponible] = useState(false);

  const { data, error } = useSwr(`${url}api/historias`, fetcher);
  if (error) return <SinData texto="Ocurrió algún error." error={error} />;
  if (!data) return <SinData texto="Cargando..." />;

  function actualizarNombreDeSala(event) {
    const sala = event.target.value;
    const urlDeSala = _.kebabCase(_.deburr(sala)).toLowerCase();
    setNombreDeSala(sala);
    setUrlDeSala(urlDeSala);
    chequearUrl(urlDeSala);
  }

  function chequearUrl(urlDeUsuario) {
    setUrlNoDisponible(false);
    const urlsDeDb = data.URLsDeSalas;
    urlsDeDb.forEach((url) => {
      if (url === urlDeUsuario) {
        return setUrlNoDisponible(true);
      }
    });
  }

  function crearNuevaHistoria() {
    if (urlDeSala) {
      fetch(`${url}api/nueva-historia/`, {
        method: "post",
        body: JSON.stringify({ sala: urlDeSala }),
      });
      Router.push(`/${urlDeSala}`);
    } else {
      return setUrlNoDisponible(true);
    }
    
  }

  return (
    <Layout>
      <div id="app" className="container">
        <Navbarra sala="Nueva historia"/>
        <div className="capitulo">
          <h4>Empezá una nueva historia</h4>
          <p>
            Creá una <b>sala</b> y pasale el link a quien quieras.
          </p>
          <label>Nombre de la sala:</label>
          <br />
          <input
            type="text"
            value={nombreDeSala}
            onChange={actualizarNombreDeSala}
            className={
              urlNoDisponible ? "form-control is-invalid" : "form-control"
            }
          ></input>
          {urlNoDisponible && (
            <div className="invalid-feedback">Nombre no disponible.</div>
          )}
          <br />
          <p>
            La URL de tu sala será{" "}
            <b>
              cadex.now.sh/
              <b
                style={urlNoDisponible ? { color: "red" } : { color: "green" }}
              >
                {urlDeSala}
              </b>
            </b>
          </p>
          {/* <br /> */}
          <button id="btn-crear-sala" className="btn btn-warning" onClick={!urlNoDisponible && crearNuevaHistoria}>
            Crear
          </button>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
