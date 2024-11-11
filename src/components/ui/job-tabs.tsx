'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function JobTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname === '/jobs/favourites' ? 'favourites' : 'all';

  return (
    <Tabs value={currentTab} onValueChange={(value) => router.push(`/jobs/${value}`)}>
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="all">All Jobs</TabsTrigger>
        <TabsTrigger value="favourites">Favourites</TabsTrigger>
      </TabsList>
    </Tabs>
  );
} 