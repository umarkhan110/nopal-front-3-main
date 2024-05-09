import { getAllConfigDataRequest } from "@/config/api/server/menu.api";
import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
function useHomeQuery() {
  return useQuery({
    queryFn: async () => getAllConfigDataRequest(),
    queryKey: ["configData"],
  });
}
export default useHomeQuery;
