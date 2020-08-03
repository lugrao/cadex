import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Historia from "../components/Historia";
import { useState, useEffect } from "react";
import { useFetchUser } from "../lib/user";
import { Grid, Heading, Link } from "@chakra-ui/core";

export default function Inicio({ sala }) {
  const enInicio = !sala;
  const { user, loading } = useFetchUser();
  const [salaActiva, setSalaActiva] = useState({
    salaURL: "prueba-3",
    salaNombre: "",
  });

  useEffect(() => {
    if (sala) setSalaActiva({ salaURL: sala });
  }, [sala]);

  function actualizarSalaNombre(nombre) {
    setSalaActiva({
      salaURL: salaActiva.salaURL,
      salaNombre: nombre,
    });
  }

  function actualizarSalaUrl(event) {
    setSalaActiva({
      salaURL: event.target.value,
    });
  }

  return (
    <Layout>
      <Grid gap={20} justifyContent="center">
        <Nav
          enInicio={enInicio}
          salaNombre={salaActiva.salaNombre}
          salaURL={salaActiva.salaURL}
          cambiarHistoria={actualizarSalaUrl}
          usuario={user}
          cargandoUsuario={loading}
        />
        <Historia
          enSala={sala}
          key={1}
          actualizarSalaNombre={actualizarSalaNombre}
          salaNombre={salaActiva.salaNombre}
          salaUrl={salaActiva.salaURL}
          usuario={user}
        />
        {!salaActiva.salaNombre && (
          <Heading size="sm">
            Esta sala no existe, pero podés
            <Link href="NuevaHistoria" color="yellow.600">
              {" "}
              crearla
            </Link>
            .
          </Heading>
        )}
        {/* <Footer /> */}
      </Grid>
    </Layout>
  );
}
