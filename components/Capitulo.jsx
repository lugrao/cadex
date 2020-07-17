import { useState } from "react";

export default function Capitulo(props) {
  const [textoEditable, setTextoEditable] = useState(false);
  const [pocosCaracteres, setPocosCaracteres] = useState(false);

  function eliminar(event) {
    const idCapitulo = event.target.parentElement.parentElement.id;
    const idHistoria =
      event.target.parentElement.parentElement.parentElement.id;
    const capitulo = {
      idHistoria: idHistoria,
      idCapitulo: idCapitulo,
    };

    fetch(`/api/eliminar-capitulo/`, {
      method: "post",
      body: JSON.stringify(capitulo),
    });
  }

  function activarModoEditable() {
    setTextoEditable(!textoEditable);
  }

  function actualizarCapitulo(event) {
    const idCapitulo = event.target.parentElement.parentElement.id;
    const idHistoria =
      event.target.parentElement.parentElement.parentElement.id;
    const capitulo = {
      idHistoria: idHistoria,
      idCapitulo: idCapitulo,
      contenido: event.target.parentElement.previousSibling.innerText,
    };
    if (capitulo.contenido.length > 9) {
      fetch(`/api/editar-capitulo`, {
        method: "post",
        body: JSON.stringify(capitulo),
      });
      setTextoEditable(!textoEditable);
      setPocosCaracteres(false);
    } else {
      setPocosCaracteres(true);
    }
  }

  return (
    <div
      className={textoEditable ? "capitulo editable" : "capitulo"}
      id={props.id}
    >
      <h6>{props.titulo}</h6>
      <p contentEditable={textoEditable}>{props.contenido}</p>
      {props.usuario && props.usuario.sub === props.idUsuario && (
        <div className="botones-capitulo">
          {pocosCaracteres && (
            <div className="pocos-caracteres">Mínimo 10 caracteres.</div>
          )}
          <button
            className={textoEditable ? "btn-capitulo" : "escondido"}
            onClick={actualizarCapitulo}
          >
            aceptar
          </button>
          <button className="btn-capitulo" onClick={activarModoEditable}>
            editar
          </button>
          <button className="btn-capitulo" onClick={eliminar}>
            eliminar
          </button>
        </div>
      )}
      <style jsx>{`
        #div-oculto {
          display: none;
        }
      `}</style>
    </div>
  );
}
