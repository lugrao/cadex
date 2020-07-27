import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Historia from "../components/Historia";
import SinData from "../components/SinData";
import useSwr from "swr";
import { useState } from "react";
import { useFetchUser } from "../lib/user";
import { Grid, Spinner } from "@chakra-ui/core";

const sala = "principal";

const fetcher = (url) => fetch(url).then((res) => res.json());

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000/" : "https://cadex.now.sh/";

export default function Home() {
  const { data, error } = useSwr(`api/salas-en-inicio`, fetcher);
  const { user, loading } = useFetchUser();
  const [salaActiva, setSalaActiva] = useState({
    salaURL: "prueba-3",
  });
  const salas = data;

  function cambiarHistoria(event) {
    setSalaActiva({
      salaURL: event.target.value,
    });
  }

  if (error) return <SinData texto="Ocurrió algún error." />;
  if (!data)
    return (
      <Layout>
        <Spinner
          thickness="4px"
          speed="0.25s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          margin="2rem auto"

        />
      </Layout>
    );

  return (
    <Layout>
      <Grid gap={20} justifyContent="center">
        <Nav
          sala="Principal"
          usuario={user}
          cargando={loading}
          salas={salas}
          salaURL={salaActiva.salaURL}
          salasEnInicio={salas.salasEnInicio}
          cambiarHistoria={cambiarHistoria}
        />
        <Historia
          key={1}
          salaNombre={salaActiva.salaNombre}
          urlSala={salaActiva.salaURL}
          usuario={user}
        />
        <Footer />
      </Grid>
    </Layout>
  );
}
