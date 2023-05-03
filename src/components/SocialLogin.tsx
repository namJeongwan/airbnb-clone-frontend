import { HStack, Divider, VStack, Button, Box, Text } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
    return <Box mb={4}>
    <HStack my={8}>
        <Divider />
        <Text 
        fontSize="xs" 
        as="b"
        textTransform={"uppercase"}
        color={"gray.500"}>
            Or
        </Text>
        <Divider />
    </HStack>
    <VStack>
        <Button 
        leftIcon={<FaGithub/>} 
        colorScheme={"telegram"}
        w={"100%"}>
            Continue with Github
        </Button>
        <Button 
        leftIcon={<FaComment/>} 
        colorScheme={"yellow"}
        w={"100%"}>
            Continue with Kakao
        </Button>
    </VStack>
</Box>
}