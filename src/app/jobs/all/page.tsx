import Jobs from "@/features/jobs";
import { getJobs } from "@/lib/api/server";

export const dynamic = "force-dynamic";

export default async function AllJobsPage() {
  const initialData = await getJobs(0);

  return <Jobs initialData={initialData} />;
}
