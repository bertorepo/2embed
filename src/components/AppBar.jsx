import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { NavLink as CustomLink, Link as RouterLink } from "react-router-dom";

import logoImage from "../assets/images/logo.png";
import { useAdminContext } from "../hooks/use-admin-context";
import CustomButton from "./CustomButton";

const navLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Library",
    path: "/library",
  },
];

const NavLink = ({ children }) => {
  return (
    <Link
      as={"li"}
      px={2}
      py={1}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("", "cyan.600"),
        color: useColorModeValue("", "gray.900"),
        rounded: "md",
      }}
    >
      {children}
    </Link>
  );
};

function AppBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, authenticateUser, signOut } = useAdminContext();

  const isActiveStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#00A3C4" : "",
      color: isActive ? "#000" : "",
      borderRadius: "4px",
    };
  };

  return (
    <>
      <Box bg="blackAlpha.600" px={4} w={"auto"}>
        <Container maxW="8xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />

            <HStack spacing={8} alignItems={"center"}>
              <RouterLink to="/">
                <Box cursor={"pointer"}>
                  <Flex alignItems={"center"} gap={3}>
                    <Image
                      boxSize="30px"
                      objectFit="cover"
                      objectPosition="center"
                      src={logoImage}
                      alt="logo"
                    />
                    <Text
                      color={useColorModeValue("", "cyan.600")}
                      fontSize="md"
                    >
                      2Embed
                    </Text>
                  </Flex>
                </Box>
              </RouterLink>

              {/* navlinks */}
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
                sx={{
                  listStyleType: "none",
                }}
              >
                {navLinks.map((link) => {
                  return (
                    <CustomLink
                      key={link.label}
                      to={link.path}
                      style={isActiveStyle}
                      replace
                    >
                      <NavLink>{link.label}</NavLink>
                    </CustomLink>
                  );
                })}
              </HStack>

              {/* logo */}
            </HStack>

            {currentUser.isSignedIn && (
              <Flex
                alignItems={"center"}
                sx={{
                  listStyleType: "none",
                }}
                columnGap={3}
              >
                <CustomLink to="/admin" style={isActiveStyle}>
                  <NavLink>Admin</NavLink>
                </CustomLink>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>

                  <MenuList>
                    <MenuItem>Account</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={signOut}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            )}

            {!currentUser.isSignedIn && (
              <Flex
                alignItems={"center"}
                sx={{
                  listStyleType: "none",
                }}
                columnGap={3}
              >
                <CustomLink to="/authenticate" style={isActiveStyle}>
                  <NavLink>Login</NavLink>
                </CustomLink>
              </Flex>
            )}
          </Flex>

          {isOpen && (
            <Box pb={4} display={{ md: "none" }}>
              <Stack
                sx={{
                  listStyleType: "none",
                }}
                as={"nav"}
                spacing={4}
              >
                {navLinks.map((link) => (
                  <CustomLink
                    key={link.label}
                    to={link.path}
                    style={isActiveStyle}
                  >
                    <NavLink>{link.label}</NavLink>
                  </CustomLink>
                ))}
              </Stack>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

export default AppBar;
