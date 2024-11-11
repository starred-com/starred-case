'use client';

import { useJobs } from './hooks/use-jobs';
import { JobCard } from './components/job-card';
import { Search } from '@/components/ui/search';
import { JobCardSkeleton } from './components/job-card-skeleton';
import { JobsResponse } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DetailedJobCard } from './components/detailed-job-card';

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
    isFetchingNextPage,
    favorites,
    toggleFavorite,
    searchValue,
    handleSearch,
    clearSearch,
    lastElementRef,
  } = useJobs({ initialData });

  return (
    <div className="container mx-auto pt-12 px-4 space-y-12 min-h-screen">
      <header 
        className="space-y-6 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          Find Your Next Role
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Browse through opportunities that match your experience and interests
        </p>
        <div 
          className="w-full max-w-2xl mx-auto"
        >
          <Search 
            placeholder="Search jobs..." 
            onChange={handleSearch}
            onClear={clearSearch}
            value={searchValue}
          />
        </div>
      </header>

      {isError ? (
        <div className="text-center rounded-lg border border-destructive/50 p-4 bg-destructive/10 text-destructive">
          Error loading jobs. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className={cn(
            "h-[calc(100vh-16rem)] overflow-y-auto space-y-4 pr-4",
            "scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
          )}>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
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
              <div className="text-center rounded-lg border border-muted p-8 bg-card">
                <p className="text-muted-foreground">No jobs found</p>
              </div>
            )}
            {isFetchingNextPage && (
              <JobCardSkeleton />
            )}
          </div>
          
          <div className="hidden lg:block relative">
            <div className="sticky top-8">
              {selectedJob ? (
                <DetailedJobCard
                  title={selectedJob.job_title}
                  description={selectedJob.description}
                  company={selectedJob.company}
                  isFavorite={favorites.includes(selectedJob.id)}
                  onFavorite={() => toggleFavorite(selectedJob.id)}
                  onApply={() => window.alert('Apply functionality to be implemented')}
                />
              ) : (
                <div className="rounded-lg border border-muted p-8 bg-card text-center">
                  <p className="text-muted-foreground">Select a job to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
