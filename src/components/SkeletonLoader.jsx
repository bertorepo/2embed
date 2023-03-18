import { Skeleton } from "@chakra-ui/react";

function SkeletonLoader({ isLoaded, children }) {
  return <Skeleton>{children}</Skeleton>;
}

export default SkeletonLoader;
