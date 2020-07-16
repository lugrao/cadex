import { useEffect, useState } from "react";
import Link from "next/link";
import useSwr from "swr";
import Redactar from "./Redactar";
import Capitulo from "./Capitulo";

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
  if (!data) return <p>Elegí una historia de acá a la izquierda.</p>;
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
            />
          );
        })}
      <Redactar urlSala={props.urlSala} />
      <p>
        <Link href={props.urlSala}>
          <a>Ir a la sala</a>
        </Link>
      </p>
    </div>
  );
}