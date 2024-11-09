import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Job, JobsResponse } from '@/types';
import { getJobs, searchJobs } from '@/lib/api/client';

interface UseJobsProps {
  initialData?: JobsResponse;
}

export const useJobs = ({ initialData }: UseJobsProps = {}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Job[]>([]);

  const handleSearch = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (value.trim()) {
      const results = await searchJobs(value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, []);

  // Fetch jobs with infinite scroll (only when not searching)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['jobs'],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getJobs(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.currentPage < lastPage.pagination.lastPage) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
    initialData: initialData ? {
      pages: [initialData],
      pageParams: [0],
    } : undefined,
    enabled: !searchValue, // Only enable when not searching
  });

  // Favorites management
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jobFavorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const toggleFavorite = useCallback((jobId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
      localStorage.setItem('jobFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Use search results if available, otherwise use infinite scroll data
  const jobs = searchValue ? searchResults : (data?.pages.flatMap(page => page.data) ?? []);

  // Set initial selected job
  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs, selectedJob]);

  return {
    jobs,
    selectedJob,
    setSelectedJob,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage: searchValue ? false : hasNextPage,
    isFetchingNextPage,
    favorites,
    toggleFavorite,
    searchValue,
    handleSearch,
  };
};
