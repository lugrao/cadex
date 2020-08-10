import { useEffect, useState } from "react";
import useSwr from "swr";
import Redactar from "./Redactar";
import Capitulo from "./Capitulo";
import {
  Alert,
  AlertIcon,
  Heading,
  Link,
  Spinner,
  Grid,
  useToast,
} from "@chakra-ui/core";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Historia(props) {
  const toast = useToast();
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
    }

    if (data && !props.usuario)
      toast({
        position: "bottom-left",
        render: () => (
          <Alert status="info">
            <AlertIcon />
            Logueate para editar o eliminar los capítulos que escribiste.
          </Alert>
        ),
        duration: 3500,
      });
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
      {!props.existeSala && !props.enInicio && (
        <Heading size="sm" mt="4rem" justifySelf="center">
          Esta sala no existe, pero podés
          <Link href="NuevaHistoria" color="yellow.600">
            {" "}
            crearla
          </Link>
          .
        </Heading>
      )}

      {props.salaNombre !== null && historia && (
        <>
          {historia.historia.map((capitulo, index) => {
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
        </>
      )}
    </Grid>
  );
}
