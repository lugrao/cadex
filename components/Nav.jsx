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

import {
  Grid,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Select,
} from "@chakra-ui/core";

export default function Nav(props, { usuario, cargando }) {
  return (
    <Grid
      pos="fixed"
      w="100%"
      h="3rem"
      alignItems="center"
      templateColumns="1fr 1fr 1fr"
      gap="15px"
      bg="black"
    >
      <Heading as="h1" size="lg" color="white" bg="black" marginLeft="20px">
        Cadex
      </Heading>
      <Select
        maxW="200px"
        size="sm"
        marginRight="30px"
        onChange={props.cambiarHistoria}
        value={props.salaURL}
      >
        {props.salasEnInicio &&
          props.salasEnInicio.map((sala, index) => {
            return (
              <option key={index} value={sala.salaURL}>
                {sala.salaNombre}
              </option>
            );
          })}
      </Select>
      <Menu>
        {({ isOpen }) => (
          <React.Fragment>
            <MenuButton
              justifySelf="end"
              marginRight="10px"
              size="sm"
              maxW="100px"
              isActive={isOpen}
              as={Button}
              rightIcon="chevron-down"
            >
              {isOpen ? "tac" : "tuc"}
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="index">
                  <a>Inicio</a>
                </Link>
              </MenuItem>
              <MenuItem>
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
              </MenuItem>
            </MenuList>
          </React.Fragment>
        )}
      </Menu>
    </Grid>
  );
}

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
