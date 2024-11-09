import Jobs from "@/features/jobs";
import { getInitialJobs } from '@/lib/api/server';

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialData = await getInitialJobs(); // SSR first page

  return (
    <main className="min-h-screen p-8">
      <Jobs initialData={initialData} />
    </main>
  );
} 