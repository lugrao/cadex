import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Historia from "../components/Historia";
import { useState, useEffect } from "react";
import { useFetchUser } from "../lib/user";
import { Grid, Heading, Link } from "@chakra-ui/core";

export default function Inicio({ sala, existeSala }) {
  const enInicio = !sala;
  const { user, loading } = useFetchUser();
  const [salaActiva, setSalaActiva] = useState({
    salaURL: "prueba-3",
    salaNombre: null,
  });

  useEffect(() => {
    if (sala) setSalaActiva({ salaURL: sala, salaNombre: null });
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
      salaNombre: null,
    });
  }

  return (
    <Layout>
      <Grid gap={20} justifyContent="center">
        <Nav
          enInicio={enInicio}
          existeSala={existeSala}
          salaNombre={salaActiva.salaNombre}
          salaURL={salaActiva.salaURL}
          usuario={user}
          cargandoUsuario={loading}
          cambiarHistoria={actualizarSalaUrl}
        />
        <Historia
          enInicio={enInicio}
          existeSala={existeSala}
          salaNombre={salaActiva.salaNombre}
          salaUrl={salaActiva.salaURL}
          usuario={user}
          actualizarSalaNombre={actualizarSalaNombre}
        />
        {!salaActiva.salaNombre && !enInicio && (
          <Heading size="sm">
            Esta sala no existe, pero podés
            <Link href="NuevaHistoria" color="yellow.600">
              {" "}
              crearla
              {salaActiva.salaNombre}
            </Link>
            .
          </Heading>
        )}
        {/* <Footer /> */}
      </Grid>
    </Layout>
  );
}
