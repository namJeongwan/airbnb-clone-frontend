import {
  VStack,
  Button,
  Grid,
  HStack,
  Box,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"} spacing={-0.5}>
      <Box position="relative" overflow={"hidden"} mb="2" rounded={"3xl"}>
        <Image minH="280" h={"280"} src={imageUrl} />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          top={0}
          right={0}
          color="white"
        >
          <FaRegHeart size="20" />
        </Button>
      </Box>
      <Grid w={"100%"} gap={2} templateColumns={"5fr 1fr"}>
        <Text as="b" noOfLines={1} fontSize={"md"}>
          {name}
        </Text>
        <HStack
          _hover={{
            color: "red.300",
          }}
          justifyContent={"flex-end"}
        >
          <FaStar />
          <Text>{rating}</Text>
        </HStack>
      </Grid>

      <Text fontSize={"sm"} color={gray}>
        {city}, {country}
      </Text>
      <Text fontSize={"sm"} color={gray}>
        <Text as="b">₩{price}</Text> / 박
      </Text>
    </VStack>
  );
}
