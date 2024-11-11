'use client';

import { useJobs } from './hooks/use-jobs';
import { JobCard } from './components/job-card';
import { Search } from '@/components/ui/search';
import { JobCardSkeleton } from './components/job-card-skeleton';
import { JobsResponse } from '@/types';

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
    hasNextPage,
    isFetchingNextPage,
    lastElementRef,
    favorites,
    toggleFavorite,
    searchValue,
    handleSearch,
    clearSearch,
  } = useJobs({ initialData });

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="w-full max-w-2xl mx-auto">
        <Search 
          placeholder="Search jobs..." 
          onChange={handleSearch}
          onClear={clearSearch}
          value={searchValue}
        />
      </div>

      {isError ? (
        <div className="text-center text-red-500">
          Error loading jobs. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[calc(100vh-200px)] overflow-y-auto space-y-4 pr-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            ) : jobs.length > 0 ? (
              jobs.map((job, index) => (
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
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No jobs found
              </div>
            )}
            {isFetchingNextPage && (
              <JobCardSkeleton />
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
