import { useEffect, useState } from "react";
import useSwr from "swr";
import Redactar from "./Redactar";
import Capitulo from "./Capitulo";
import { Spinner } from "@chakra-ui/core";

const fetcher = (url) => fetch(url).then((res) => res.json());

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000/" : "https://cadex.now.sh/";

export default function Historia(props) {
  const { data, error, revalidate } = useSwr(
    `api/historia/${props.urlSala}`,
    fetcher,
    {
      refreshInterval: 1,
    }
  );

  const [historia, setHistoria] = useState(data);
  const [idHistoria, setIdHistoria] = useState("");

  useEffect(() => {
    setHistoria(data);
    if (data) setIdHistoria(data._id);
  });

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
    <div id={idHistoria} className="historia">
      {historia &&
        historia.historia.map((capitulo, index) => {
          return (
            <Capitulo
              key={index}
              id={capitulo._id}
              titulo={index}
              contenido={capitulo.contenido}
              idUsuario={capitulo.idUsuario}
              usuario={props.usuario}
            />
          );
        })}
      <Redactar urlSala={props.urlSala} usuario={props.usuario} />
      {/* <p>
        <Link href={props.urlSala}>
          <a>Ir a la sala</a>
        </Link>
      </p> */}
      <style jsx>{`
        margin-top: 3.5rem;
      `}</style>
    </div>
  );
}
