import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Sala from "../components/Sala";
import Historia from "../components/Historia";
import SinData from "../components/SinData";
import useSwr from "swr";
import { useState, useEffect } from "react";

const sala = "principal";

const fetcher = (url) => fetch(url).then((res) => res.json());

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000/" : "https://cadex.now.sh/";

export default function Home() {
  const { data, error } = useSwr(`api/salas-en-inicio`, fetcher);

  const [salaActiva, setSalaActiva] = useState({
    salaURL: "prueba-3",
  });

  const salas = data;

  function cambiarHistoria(event) {
    setSalaActiva({
      salaURL: event.target.id,
    });
    // console.log(event.target.id);
  }

  // console.log(salaActiva);
  // console.log(data);

  if (error) return <SinData texto="Ocurrió algún error." />;
  if (!data) return <SinData texto="Cargando..." />;

  return (
    <Layout>
      <div id="app-container" className="app-container">
        <Nav sala="Principal" />
        <div id="salas-historia" className="salas-historia">
          <div id="salas" className="salas">
            {/* {salas.map((sala, index) => {
              return (
                <Sala
                  key={index}
                  salaNombre={sala.salaNombre}
                  capitulos={sala.historia}
                  urlSala={sala.salaURL}
                />
              );
            })} */}

            <ul>
              {salas.salasEnInicio.map((sala, index) => {
                return (
                  <li
                    key={index}
                    value={sala.salaURL}
                    id={sala.salaURL}
                    onClick={cambiarHistoria}
                  >
                    {sala.salaNombre}
                  </li>
                );
              })}
            </ul>
          </div>
          <Historia
            key={1}
            salaNombre={salaActiva.salaNombre}
            urlSala={salaActiva.salaURL}
          />
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
