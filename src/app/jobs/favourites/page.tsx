import Favourites from "@/features/favourites";
import { getFavouriteJobs } from "@/lib/api/server";
import { getServerSession } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function FavouritesPage() {
  const session = await getServerSession();

  if (!session) {
    throw new Error("User not logged in");
  }

  const favourites = await getFavouriteJobs(session.id);

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
