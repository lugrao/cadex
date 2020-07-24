import { useState, useEffect } from "react";
import { Textarea, Box, Button, useToast } from "@chakra-ui/core";

export default function Redactar(props) {
  const [escribir, setEscribir] = useState(false);
  const toast = useToast();
  const [contenido, setContenido] = useState({ contenido: "", idUsuario: "" });
  const [textAreaValue, setTextAreaValue] = useState("");
  const [pocosCaracteres, setPocosCaracteres] = useState(false);

  useEffect(() => {
    if (pocosCaracteres) {
      toast({
        title: "Mínimo 10 caracteres",
        description: "Dale que vos tenés talento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        setPocosCaracteres(false);
      }, 5000);
    }
  }, [pocosCaracteres]);

  function desplegarTextArea() {
    setEscribir(!escribir);
  }

  function actualizarContenido(event) {
    setContenido({
      contenido: event.target.value,
      idUsuario: props.usuario ? props.usuario.sub : "",
    });
    setTextAreaValue(event.target.value);
    if (pocosCaracteres) setPocosCaracteres(false);
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
      <Box
        display="grid"
        gridTemplateRows="3fr 1fr"
        m="10px 7px"
        maxW="30rem"
        p={5}
        // shadow="sm"
        // borderWidth="1px"
        id={props.id}
      >
        <Textarea
          size="md"
          h="7rem"
          focusBorderColor="yellow.500"
          placeholder="Escribí el siguiente capítulo..."
          isInvalid={pocosCaracteres ? "true" : "false"}
          rows={escribir ? "4" : "2"}
          maxLength="300"
          className={
            pocosCaracteres ? "form-control is-invalid" : "form-control"
          }
          name="contenido"
          onClick={!escribir ? desplegarTextArea : null}
          onChange={actualizarContenido}
          value={textAreaValue}
        ></Textarea>

        <Button
          mt="7px"
          variantColor="yellow"
          id="btn-publicar"
          className="btn btn-warning"
          onClick={publicar}
        >
          Publicar
        </Button>
      </Box>
    </div>
  );
}
