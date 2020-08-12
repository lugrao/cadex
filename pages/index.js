import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Historia from "../components/Historia";
import { useState, useEffect } from "react";
import { useFetchUser } from "../lib/user";
import { Grid, Heading, Link, IconButton } from "@chakra-ui/core";

export default function Inicio({ sala, existeSala }) {
  const enInicio = !sala;
  const { user, loading } = useFetchUser();
  const [mensajeDeLoginEnviado, setMensajeDeLoginEnviado] = useState(false);
  const [scrollear, setScrollear] = useState(false);
  const [salaActiva, setSalaActiva] = useState({
    salaURL: "prueba-3",
    salaNombre: null,
  });

  useEffect(() => {
    if (sala) setSalaActiva({ salaURL: sala, salaNombre: null });
  }, [sala]);

  useEffect(() => {
    setScrollear(false);
  }, [scrollear]);

  function scrollearHaciaAbajo() {
    setScrollear(true);
  }

  function actualizarMensajeDeLogin() {
    setMensajeDeLoginEnviado(true);
  }

  function actualizarSalaNombre(nombre) {
    setSalaActiva({
      salaURL: salaActiva.salaURL,
      salaNombre: nombre,
    });
  }

  function actualizarSalaUrl(event) {
    setSalaActiva({
      salaURL: event.target.value,
      salaNombre: false,
    });
  }

  return (
    <Layout>
      <IconButton
        size="sm"
        variant="outline"
        aria-label="Ir hacia abajo."
        icon="arrow-down"
        position="fixed"
        bottom="10px"
        right="10px"
        zIndex="1"
        onClick={scrollearHaciaAbajo}
      />
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
        {(existeSala || enInicio) && (
          <Historia
            enInicio={enInicio}
            existeSala={existeSala}
            salaNombre={salaActiva.salaNombre}
            salaUrl={salaActiva.salaURL}
            usuario={user}
            actualizarSalaNombre={actualizarSalaNombre}
            actualizarMensajeDeLogin={actualizarMensajeDeLogin}
            mensajeDeLoginEnviado={mensajeDeLoginEnviado}
            scrollear={scrollear}
          />
        )}
        {!existeSala && !enInicio && (
          <Heading size="sm" mt="7rem">
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
