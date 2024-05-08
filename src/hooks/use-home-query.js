import { getAllConfigDataRequest } from "@/config/api/server/menu.api";
import { useQuery } from "@tanstack/react-query";
function useHomeQuery() {
  const queryKey = ["configData"];
  const queryFn = async () => {
    return getAllConfigDataRequest().then((result) => result);
  };
  return { queryKey, queryFn };
}
export default useHomeQuery;
