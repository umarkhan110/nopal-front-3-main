import HomeModule from "@/components/modules/home/HomeModule";
// import { getAllConfigDataRequest } from "@/config/api/server/menu.api";
import useHomeQuery from "@/hooks/use-home-query";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function Home() {
  // const configData = await getAllConfigDataRequest();
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(useHomeQuery())
  return (
    <>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeModule />
    </HydrationBoundary>
    </>
  );
}
