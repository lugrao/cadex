const Toast = {
  pocosCaracteres: {
    title: "Mínimo 5 caracteres",
    description: "Dale que vos tenés talento.",
    status: "error",
    duration: 3000,
    isClosable: true,
  },
  muchosCaracteres: {
    title: "Máximo 400 caracteres",
    description: "Tu talento excede el límite del capítulo.",
    status: "warning",
    duration: 4000,
    isClosable: true,
  },
  pronto: {
    title: "Todavía no se inventó del todo esta parte",
    description: "Esperemos que pronto.",
    status: "warning",
    duration: 5000,
    isClosable: true,
  }
};

export default Toast;
