// library
import { useQuery } from "@tanstack/react-query";

// auth-func
import { getUser } from "./user-func";

// key
import { USER_KEY } from "../../constants/queryKey";

export const useUser = () => {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: () => getUser(),
  });
};
