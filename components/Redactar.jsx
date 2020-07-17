import { useState } from "react";

export default function Redactar(props) {
  const [escribir, setEscribir] = useState(false);
  const [contenido, setContenido] = useState({ contenido: "", idUsuario: "" });
  const [textAreaValue, setTextAreaValue] = useState("");
  const [pocosCaracteres, setPocosCaracteres] = useState(false);

  function desplegarTextArea() {
    setEscribir(!escribir);
  }
  // console.log(props.usuario.sub);

  function actualizarContenido(event) {
    setContenido({
      contenido: event.target.value,
      idUsuario: props.usuario ? props.usuario.sub : "",
    });
    setTextAreaValue(event.target.value);
  }

  function publicar() {
    if (contenido.contenido.length > 9) {
      fetch(`/api/publicar/${props.urlSala}`, {
        method: "post",
        body: JSON.stringify(contenido),
      });

      setEscribir(false);
      setTextAreaValue("");
      setPocosCaracteres(false);
    } else {
      setPocosCaracteres(true);
    }
  }

  return (
    <div id="redactar" className="redactar">
      <textarea
        placeholder="Escribí el siguiente capítulo..."
        rows={escribir ? "4" : "1"}
        maxLength="300"
        className={pocosCaracteres ? "form-control is-invalid" : "form-control"}
        name="contenido"
        onClick={!escribir ? desplegarTextArea : null}
        onChange={actualizarContenido}
        value={textAreaValue}
      ></textarea>
      {pocosCaracteres && (
        <div className="pocos-caracteres">
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
  );
}
