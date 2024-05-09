import HomeModule from "@/components/modules/home/HomeModule";
import { getAllConfigDataRequest } from "@/config/api/server/menu.api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

     await queryClient.prefetchQuery({
      queryKey: ["configData"],
      queryFn: getAllConfigDataRequest,
    });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeModule />
      </HydrationBoundary>
    </>
  );
}
