import { HStack, Divider, VStack, Button, Box, Text } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "c143a4c1353741c1579ad78a6d346e74",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();
  console.log(params);
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          fontSize="xs"
          as="b"
          textTransform={"uppercase"}
          color={"gray.500"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as={"a"}
          href={
            "https://github.com/login/oauth/authorize?client_id=57c19b04fbc0a0a972fb&scope=read:user,user:email,repo"
          }
          leftIcon={<FaGithub />}
          w={"100%"}
        >
          Continue with Github
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
          w={"100%"}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
