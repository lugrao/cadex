import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/core";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Button,
  ButtonGroup,
  IconButton,
  Textarea,
  Flex,
} from "@chakra-ui/core";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";

export default function Capitulo(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  function EditableControls({ isEditing, onSubmit, onCancel, onRequestEdit }) {
    return isEditing ? (
      <ButtonGroup display="flex" justifyContent="flex-end" size="sm" mt="15px">
        <IconButton icon="check" onClick={onSubmit} />
        <IconButton icon="close" onClick={onCancel} />
      </ButtonGroup>
    ) : (
      <ButtonGroup display="flex" justifyContent="flex-end" size="sm" mt="15px">
        <IconButton icon="edit" onClick={onRequestEdit} />
        <IconButton icon="delete" onClick={onCancel} />
      </ButtonGroup>
    );
  }

  return (
    <>
      <Box
        m="10px 7px"
        maxW="30rem"
        p={5}
        shadow="sm"
        borderWidth="1px"
        id={props.id}
      >
        <Heading fontSize="xs" color="#cccccc" mb="20px">
          {props.titulo}
        </Heading>
        <Text mt={4}>{props.contenido}</Text>
        <ButtonGroup
          display="flex"
          justifyContent="flex-end"
          size="sm"
          mt="15px"
        >
          <IconButton icon="edit" onClick={onOpen} />
          <IconButton icon="delete" />
        </ButtonGroup>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea value={props.contenido} size="xl" rows="10" />
            </ModalBody>

            <ModalFooter>
              <Button variantColor="green" mr={3} onClick={onClose}>
                Aceptar
              </Button>
              <Button 
              // variant="ghost" 
              onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* <Editable
          textAlign="center"
          defaultValue={props.contenido}
          isPreviewFocusable={false}
          submitOnBlur={false}
        >
          {(props) => (
            <>
              <EditablePreview />
              <EditableInput />
              <EditableControls {...props} />
            </>
          )}
        </Editable> */}
      </Box>
    </>
  );
}

function capituloViejo() {
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
