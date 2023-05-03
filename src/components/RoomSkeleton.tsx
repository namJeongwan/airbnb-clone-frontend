import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton rounded="2xl" height="280" mb="7" />
      <SkeletonText w="50%" noOfLines={2} mb={6} />
      <SkeletonText w="20%" noOfLines={1} />
    </Box>
  );
}
