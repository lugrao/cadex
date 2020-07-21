import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
  Icon,
  Heading,
  Stack,
} from "@chakra-ui/core";

export default function Nav({ usuario, cargando }) {
  return (
    <div>
      <Box>
        <Accordion defaultIndex={[1]} allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionHeader bg="white">
                  <Box flex="1" textAlign="left">
                    <Heading as="h1" size="sm">
                      Cadex
                    </Heading>
                  </Box>
                  <Icon size="12px" name={isExpanded ? "minus" : "add"} />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Stack spacing={30}>
                    <Link href="index">
                      <a>Inicio</a>
                    </Link>
                    {!cargando &&
                      (usuario ? (
                        <Link href="api/auth/logout">
                          <a>Logout</a>
                        </Link>
                      ) : (
                        <Link href="api/auth/login">
                          <a>Login</a>
                        </Link>
                      ))}
                    {usuario && (
                      <div className="usuario">
                        <p>{usuario.name}</p>
                        <img src={usuario.picture} />
                      </div>
                    )}
                  </Stack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Box>
    </div>
  );
}

//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS
//AGREGAR LINKS A USUARIO Y DEM'AS

function NavVieja({ usuario, cargando }) {
  return (
    <nav id="navbar">
      <h1>Cadex</h1>
      <Link href="index">
        <a>Inicio</a>
      </Link>
      {!cargando &&
        (usuario ? (
          <Link href="api/auth/logout">
            <a>Logout</a>
          </Link>
        ) : (
          <Link href="api/auth/login">
            <a>Login</a>
          </Link>
        ))}
      {usuario && (
        <div className="usuario">
          <p>{usuario.name}</p>
          <img src={usuario.picture} />
        </div>
      )}
      <style jsx>{`
        .usuario {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .usuario p {
          justify-self: right;
          padding-right: 10px;
        }
        img {
          width: 40px;
        }
      `}</style>
    </nav>
  );
}
