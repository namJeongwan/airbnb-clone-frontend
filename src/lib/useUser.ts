import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export default function useUser() {
  const { isLoading, data, isError } = useQuery(["me"], getMe, {
    retry: false,
  });
  console.log(data);
  return {
    isUserLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
