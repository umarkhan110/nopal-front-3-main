import HomeModule from "@/components/modules/home/HomeModule";
import { getAllConfigDataRequest } from "@/config/api/server/menu.api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

    const data = await queryClient.fetchQuery({
      queryKey: ["configData"],
      queryFn: getAllConfigDataRequest,
    });
    console.log("Prefetch Query Result:", data);
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeModule configData={data}/>
      </HydrationBoundary>
    </>
  );
}
