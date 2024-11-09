import Jobs from "@/features/jobs";
import { getJobs } from "@/lib/api/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialData = await getJobs(0); // SSR first page

  return (
    <main className="min-h-screen p-8">
      <Jobs initialData={initialData} />
    </main>
  );
} 