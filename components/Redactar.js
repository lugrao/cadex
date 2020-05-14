import { useState } from "react";
import Router from "next/router";

export default function Redactar(props) {
  const [escribir, setEscribir] = useState(false);
  const [contenido, setContenido] = useState({ contenido: "" });
  const [textAreaValue, setTextAreaValue] = useState("");
  const [pocosCaracteres, setPocosCaracteres] = useState(false);

  function desplegarTextArea() {
    !escribir ? setEscribir(true) : setEscribir(false);
  }

  function actualizarContenido(event) {
    setContenido({
      contenido: event.target.value,
    });
    setTextAreaValue(event.target.value);
  }

  function publicar() {
    if (contenido.contenido.length > 9) {
      props.alPublicar(contenido);
      setEscribir(false);
      setTextAreaValue("");
      setPocosCaracteres(false);
    } else {
      setPocosCaracteres(true);
    }
  }

  return (
    <div id="redactar" className="form">
      <div>
        <textarea
          placeholder="Escribí el siguiente capítulo, a ver..."
          rows={escribir ? "4" : "1"}
          maxLength="300"
          className={
            pocosCaracteres ? "form-control is-invalid" : "form-control"
          }
          name="contenido"
          onClick={!escribir ? desplegarTextArea : null}
          onChange={actualizarContenido}
          value={textAreaValue}
        ></textarea>
        {pocosCaracteres && (
          <div className="invalid-feedback">
            Mínimo 10 caracteres. Dale que vos tenés talento.
          </div>
        )}
        {escribir && (
          <button
            id="btn-publicar"
            className="btn btn-warning"
            onClick={publicar}
          >
            Publicar
          </button>
        )}
      </div>
    </div>
  );
}
