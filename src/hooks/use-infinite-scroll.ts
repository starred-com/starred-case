import { useCallback, useEffect, useRef } from 'react';
import { QueryKey, useInfiniteQuery} from '@tanstack/react-query';

interface UseInfiniteScrollOptions<TData> {
  queryKey: QueryKey;
  queryFn: (pageParam: number) => Promise<TData>;
  getNextPageParam: (lastPage: TData, allPages: TData[]) => number | undefined;
  initialData?: {
    pages: TData[];
    pageParams: number[];
  };
  enabled?: boolean;
}

export function useInfiniteScroll<TData>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialData,
  enabled = true,
}: UseInfiniteScrollOptions<TData>) {
  const observerRef = useRef<IntersectionObserver>();
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => queryFn(pageParam),
    getNextPageParam,
    initialData,
    enabled,
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = lastElementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    lastElementRef,
  };
} 