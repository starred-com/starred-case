import Favourites from "@/features/favourites";
import { getFavouriteJobs } from "@/lib/api/server";
import { Job } from "@/types";

export const dynamic = "force-dynamic";

export default async function FavouritesPage() {
  //   const favourites = await getFavouriteJobs();
  const favourites: Job[] = [];
  const initialData = {
    data: favourites,
    pagination: {
      currentPage: 0,
      firstPage: 0,
      lastPage: 0,
    },
  };

  return <Favourites initialData={initialData} />;
}
