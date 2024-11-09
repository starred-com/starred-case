import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Job, JobsResponse } from '@/types';
import { getJobs, searchJobs } from '@/lib/api';

interface UseJobsProps {
  initialData?: JobsResponse;
}

export const useJobs = ({ initialData }: UseJobsProps = {}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  // Fetch jobs with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['jobs', searchValue],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => 
      searchValue ? searchJobs(searchValue) : getJobs(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.currentPage < lastPage.pagination.lastPage) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
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

  // Flatten jobs from all pages
  const jobs = data?.pages.flatMap(page => page.data) ?? [];

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
    hasNextPage,
    isFetchingNextPage,
    favorites,
    toggleFavorite,
    searchValue,
    handleSearch,
  };
};
