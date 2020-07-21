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
} from "@chakra-ui/core";
import Head from "next/head";

export default function Nav() {
  return (
    <div>
      <Box>
        <Accordion allowToggle={true}>
          <AccordionItem defaultIsOpen={false}>
            {({ isExpanded }) => (
              <>
                <AccordionHeader>
                  <Box flex="1" textAlign="left">
                    <Heading as="h1" size="sm">Cadex</Heading>
                  </Box>
                  <Icon size="12px" name={isExpanded ? "minus" : "add"} />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Box>
    </div>
  );
}

// export default function Nav({ usuario, cargando }) {

//   return (
//     <nav id="navbar">
//       <h1>Cadex</h1>
//       <Link href="index">
//         <a>Inicio</a>
//       </Link>
//       {!cargando &&
//         (usuario ? (
//           <Link href="api/auth/logout">
//             <a>Logout</a>
//           </Link>
//         ) : (
//           <Link href="api/auth/login">
//             <a>Login</a>
//           </Link>
//         ))}
//       {usuario && (
//         <div className="usuario">
//           <p>{usuario.name}</p>
//           <img src={usuario.picture} />
//         </div>
//       )}
//       <style jsx>{`
//         .usuario {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//         }
//         .usuario p {
//           justify-self: right;
//           padding-right: 10px;
//         }
//         img {
//           width: 40px;
//         }
//       `}</style>
//     </nav>
//   );
// }
