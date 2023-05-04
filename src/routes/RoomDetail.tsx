import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoomReviews, getRoom } from "../api";
import { IRoomDetail, IRoomReview } from "../type";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  VStack,
  Text,
  Avatar,
  Container,
} from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading: isRoomLoading, data: roomData } = useQuery<IRoomDetail>(
    [`room`, roomPk],
    getRoom
  );

  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IRoomReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews);

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton h={"43px"} w={"50%"} isLoaded={!isRoomLoading}>
        <Heading>{roomData?.name}</Heading>
      </Skeleton>
      <Grid
        overflow={"hidden"}
        rounded={"lg"}
        mt={8}
        gap={3}
        h={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {/*data?.photos.slice(0, 5)*/}
        {[0, 1, 2, 3, 4].map((photo, index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow="hidden"
            key={roomData?.photos[index].pk}
          >
            <Skeleton isLoaded={!isRoomLoading} h={"100%"}>
              <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src={roomData?.photos[index].file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack mt={10} width={"40%"} justifyContent={"space-between"}>
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isRoomLoading} height={"30px"}>
            <Heading fontSize={"xl"}>
              House hosted by {roomData?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isRoomLoading} height={"30px"}>
            <HStack justifyContent={"flex-start"} w={"100%"}>
              <Text>
                {roomData?.toilets} toilet{roomData?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>·</Text>
              <Text>
                {roomData?.rooms} rooms{roomData?.rooms === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar size={"lg"} src={roomData?.owner.avatar} />
      </HStack>

      <Box mt={10}>
        <Skeleton isLoaded={!isReviewsLoading && !isRoomLoading} width={"40%"}>
          <Heading fontSize={"2xl"}>
            <HStack>
              <FaStar />
              <Text>{roomData?.rating}</Text>
              <Text>·</Text>
              <Text>
                {reviewsData?.length} review
                {reviewsData?.length === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Heading>
        </Skeleton>
        <Container maxW={"container.lg"} marginX={"none"} marginTop={"15"}>
          <Grid templateColumns={"1fr 1fr"} gap={"10"}>
            {reviewsData?.map((review, index) => (
              <VStack key={index} alignItems={"flex-start"}>
                <HStack spacing={1}>
                  <Avatar size={"md"} src={review.user.avatar} />
                  <VStack alignItems={"flex-start"} spacing={0}>
                    <Heading fontSize={"md"}>{review?.user.name}</Heading>
                    <HStack>
                      <FaStar size={"12px"} />
                      <Text>{review.rating}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text>{review.payload}</Text>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
