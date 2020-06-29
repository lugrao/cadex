import { useState } from "react";
import Link from "next/link";

export default function Sala(props) {
  const [desplegada, setDesplegada] = useState(false);
  function desplegarSala() {
    desplegada ? setDesplegada(false) : setDesplegada(true);
  }
  return (
    <div>
      <h5 onClick={desplegarSala}>Sala: {props.salaNombre}</h5>
      {desplegada && (
        <div>
          {props.capitulos.map((capitulo, index) => {
            return (
              index < 3 && (
                <div>
                  <p>{capitulo.contenido}</p>
                </div>
              )
            );
          })}
          <p>
            <Link href={props.urlSala}>
              <a>Ir a la sala</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
