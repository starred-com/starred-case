'use client';

import { useState } from 'react';
import { useJobs } from './hooks/useJobs';
import { JobCard } from './components/job-card';
import { Search } from '@/components/ui/search';
import { Job, JobsResponse } from '@/types';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface JobsProps {
  initialData: JobsResponse;
}

const Jobs = ({ initialData }: JobsProps) => {
  const {
    jobs,
    selectedJob,
    setSelectedJob,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    favorites,
    toggleFavorite,
    searchValue,
    handleSearch,
  } = useJobs({ initialData });

  const { lastElementRef } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasMore: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  return (
    <div className="container mx-auto space-y-6">
      <div className="w-full max-w-2xl mx-auto">
        <Search 
          placeholder="Search jobs..." 
          onChange={handleSearch}
          value={searchValue}
        />
      </div>

      {isError ? (
        <div className="text-center text-red-500">
          Error loading jobs. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[calc(100vh-200px)] overflow-y-auto space-y-4 pr-4">
            {jobs.map((job, index) => (
              <div
                key={job.id}
                ref={index === jobs.length - 1 ? lastElementRef : undefined}
              >
                <JobCard
                  title={job.job_title}
                  description={job.description}
                  company={job.company}
                  isFavorite={favorites.includes(job.id)}
                  onFavorite={() => toggleFavorite(job.id)}
                  onClick={() => setSelectedJob(job)}
                  isSelected={selectedJob?.id === job.id}
                />
              </div>
            ))}
            {isFetchingNextPage && (
              <div className="text-center py-4">Loading more...</div>
            )}
          </div>
          
          <div className="hidden md:block">
            {selectedJob && (
              <div className="sticky top-4">
                <JobCard
                  title={selectedJob.job_title}
                  description={selectedJob.description}
                  company={selectedJob.company}
                  isFavorite={favorites.includes(selectedJob.id)}
                  onFavorite={() => toggleFavorite(selectedJob.id)}
                  onApply={() => window.alert('Apply functionality to be implemented')}
                  isDetailed
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
