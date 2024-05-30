import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, Flex,Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
const links = [
  {
    to: "/",
    label: "HOME",
  },
  {
    to: "/about",
    label: "ABOUT",
  },
  {
    to: "/contact",
    label: "CONTACT",
  },
  {
    to: "/tickets",
    label: "TICKETS",
  },
  {
    to: "/login",
    label: "LOGIN",
  },
];
export default function Navbar() {
  const {logout,authDetails} = useContext(AuthContext);
  return (
    <Flex
      align="center"
      justify="space-around"
      background="gray.200"
      padding={4}
    >
      {links?.map((link) => (
        <ChakraLink
          as={ReactRouterLink}
          key={link.to}
          to={link.to}
          color="gray.900"
        >
          {link.label}
        </ChakraLink>
      ))}
      {authDetails.isLoggedIn ?(<Button colorScheme="red" variant="outline" onClick={logout}>
        LOGOUT
      </Button>):null
      
      }
    </Flex>
  );
}
