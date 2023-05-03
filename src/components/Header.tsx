import { HStack, IconButton, Button, Box, useDisclosure, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUp";

export default function Header() {
    const{ isOpen:isLoginOpen, 
        onClose:onLoginClose, 
        onOpen:onLoginOpen
    } = useDisclosure();

    const{ isOpen:isSignUpOpen, 
        onClose:onSignUpClose, 
        onOpen:onSignUpOpen
    } = useDisclosure();

    const {
        colorMode,
        toggleColorMode,
    } = useColorMode();

    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun)

    return <HStack py={5} px={10} borderBottomWidth={1}
    justifyContent={"space-between"}>
        <Box color={logoColor}>
            <FaAirbnb size={"48"}/>
        </Box>
        <HStack spacing={"2"}>
            <IconButton 
            variant={"ghost"}
            aria-label="Toggle Dark Mode" 
            icon={<Icon/>}
            onClick={toggleColorMode}></IconButton>
            <Button onClick={onLoginOpen}>Log in</Button>
            <Button colorScheme="red" onClick={onSignUpOpen}>Sign up</Button>
        </HStack>
        <LoginModal isOpen={isLoginOpen} onClose={onLoginClose}/>
        <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/>
    </HStack>
}