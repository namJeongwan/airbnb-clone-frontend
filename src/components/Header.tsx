import {
  HStack,
  IconButton,
  Button,
  Box,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Avatar,
  MenuButton,
  MenuList,
  Menu,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUp";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { isUserLoading, user, isLoggedIn } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();

  const onLogOut = async () => {
    // Toast Log Out Popup
    const toastId = toast({
      title: "Login out",
      description: "Login out..",
      status: "loading",
      position: "bottom-right",
      isClosable: true,
    });

    // Log out
    await logOut();

    // retry fetch
    queryClient.refetchQueries(["me"]);

    // Toast Update
    toast.update(toastId, {
      status: "success",
      title: "Done",
      description: "See you later..",
    });
  };

  return (
    <Stack
      py={5}
      px={40}
      borderBottomWidth={1}
      justifyContent={"space-between"}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 3,
        md: 4,
      }}
    >
      <Box color={logoColor}>
        <FaAirbnb size={"48"} />
      </Box>
      <HStack spacing={"2"}>
        <IconButton
          variant={"ghost"}
          aria-label="Toggle Dark Mode"
          icon={<Icon />}
          onClick={toggleColorMode}
        ></IconButton>
        {!isUserLoading && !isLoggedIn ? (
          <>
            <Button onClick={onLoginOpen}>Log in</Button>
            <Button colorScheme="red" onClick={onSignUpOpen}>
              Sign up
            </Button>
          </>
        ) : (
          <Menu>
            <MenuButton>
              <Avatar src={user?.avatar} name={user?.username} size={"md"} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onLogOut}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
