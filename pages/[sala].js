import { useRouter } from "next/router";
import Inicio from "./index";
import useSwr from "swr";
import { useEffect, useState } from "react";
import { Grid, Spinner } from "@chakra-ui/core";
import Layout from "../components/Layout";
import Nav from "../components/Nav";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Sala() {
  const router = useRouter();
  const sala = router.query.sala;
  const [existeSala, setExisteSala] = useState(false);
  const { data, error } = useSwr(`api/salas`, fetcher);

  useEffect(() => {
    if (data) {
      setExisteSala(chequearSiExisteSala(data.URLsDeSalas));
    }
  }, [data]);

  function chequearSiExisteSala(salas) {
    let haySala = false;
    salas.forEach((salaUrl) => {
      if (salaUrl === sala) {
        haySala = true;
        return haySala;
      }
    });
    return haySala;
  }

  if (error) return <h5>Ocurrió algún error.</h5>;
  if (!data)
    return (
      <Layout>
        <Grid gap={20} justifyContent="center">
          <Nav />
          <Spinner
            display="grid"
            thickness="4px"
            speed="0.25s"
            emptyColor="gray.200"
            color="yellow.400"
            size="xl"
            margin="7rem auto 30rem"
          />
        </Grid>
      </Layout>
    );

  return <Inicio sala={sala} existeSala={existeSala} />;
}
