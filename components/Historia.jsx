import { useEffect, useState } from "react";
import useSwr from "swr";
import Redactar from "./Redactar";
import Capitulo from "./Capitulo";
import { Spinner, Grid } from "@chakra-ui/core";

const fetcher = (url) => fetch(url).then((res) => res.json());
// const dev = process.env.NODE_ENV !== "production";
// const url = dev ? "http://localhost:3000/" : "https://cadex.now.sh/";

export default function Historia(props) {
  const { data, error, revalidate } = useSwr(
    `api/sala/${props.salaUrl}`,
    fetcher,
    {
      refreshInterval: 1,
    }
  );
  const [historia, setHistoria] = useState(data);
  const [idHistoria, setIdHistoria] = useState("");

  useEffect(() => {
    setHistoria(data);
    if (data) {
      setIdHistoria(data._id);
      props.actualizarSalaNombre(data.salaNombre);
      console.log(data.salaNombre)
    }
  }, [data]);

  if (error) return <p>Hubo algún error.</p>;
  if (!data)
    return (
      <Spinner
        display="grid"
        thickness="4px"
        speed="0.25s"
        emptyColor="gray.200"
        color="yellow.400"
        size="xl"
        margin="7rem auto 30rem"
      />
    );
  return (
    <Grid maxW="30rem" mt="4rem" gridTemplateColumns="minmax(10rem, 30rem)">
      {historia &&
        historia.historia.map((capitulo, index) => {
          return (
            <Capitulo
              key={index}
              idCapitulo={capitulo._id}
              idHistoria={idHistoria}
              titulo={index}
              contenido={capitulo.contenido}
              idUsuario={capitulo.idUsuario}
              usuario={props.usuario}
            />
          );
        })}
      <Redactar urlSala={props.salaUrl} usuario={props.usuario} />
    </Grid>
  );
}
