import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
}

interface UseJobsProps {
  page?: number;
  searchQuery?: string;
}

const API_BASE_URL = 'https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod';

export const useJobs = ({ page = 1, searchQuery }: UseJobsProps = {}) => {
  const queryClient = useQueryClient();

  // Fetch jobs
  const jobsQuery = useQuery<Job[], Error>({
    queryKey: ['jobs', page] as const,
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/jobs?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return response.json();
    },
    enabled: !searchQuery,
  });

  // Search jobs
  const searchMutation = useMutation<Job[], Error, string>({
    mutationFn: async (jobTitle: string) => {
      const response = await fetch(`${API_BASE_URL}/jobs/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle }),
      });
      if (!response.ok) {
        throw new Error('Failed to search jobs');
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['jobs', page], data);
    },
  });

  // Manage favorites
  const favoritesQuery = useQuery<number[], Error>({
    queryKey: ['favorites'] as const,
    queryFn: () => {
      const stored = localStorage.getItem('jobFavorites');
      return stored ? JSON.parse(stored) : [];
    },
  });

  const toggleFavoriteMutation = useMutation<number[], Error, number>({
    mutationFn: async (jobId: number) => {
      const currentFavorites = favoritesQuery.data ?? [];
      const newFavorites = currentFavorites.includes(jobId)
        ? currentFavorites.filter((id) => id !== jobId)
        : [...currentFavorites, jobId];
      
      localStorage.setItem('jobFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    },
    onSuccess: (newFavorites) => {
      queryClient.setQueryData(['favorites'], newFavorites);
    },
  });

  return {
    // Jobs data and status
    jobs: jobsQuery.data ?? [],
    isLoading: jobsQuery.isLoading,
    error: jobsQuery.error,

    // Search functionality
    searchJobs: searchMutation.mutate,
    isSearching: searchMutation.isPending,
    searchError: searchMutation.error,

    // Favorites functionality
    favorites: favoritesQuery.data ?? [],
    toggleFavorite: toggleFavoriteMutation.mutate,
    isTogglingFavorite: toggleFavoriteMutation.isPending,
  };
};
