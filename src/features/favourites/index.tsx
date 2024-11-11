"use client";

import { useFavourites } from "./hooks/use-favourites";
import { JobCard } from "@/components/ui/job-card";
import { SearchHeader } from "@/components/ui/search-header";
import { JobCardSkeleton } from "@/components/ui/job-card-skeleton";
import { cn } from "@/lib/utils";
import { DetailedJobCard } from "@/components/ui/detailed-job-card";
import { Job } from "@/types";
import { Confetti } from "@/components/ui/confetti";
import { useConfetti } from "@/hooks/use-confetti";
import { toast } from "@/hooks/use-toast";

const Favourites = ({ initialData }: { initialData: { data: Job[] } }) => {
  const { jobs, selectedJob, setSelectedJob, isLoading, isError } =
    useFavourites({ initialData });
  const { isVisible, trigger } = useConfetti({ duration: 7000 });

  return (
    <div className="relative container mx-auto px-4 pt-12 space-y-12 h-screen overflow-hidden">
      <SearchHeader
        searchValue=""
        onSearch={() => {}}
        onClearSearch={() => {}}
      />

      {isError ? (
        <div className="text-center rounded-lg border border-destructive/50 p-4 bg-destructive/10 text-destructive">
          Error loading favourite jobs. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-[calc(100vh-20rem)]">
          <div
            className={cn(
              "overflow-y-auto space-y-4 pr-4",
              "scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
            )}
          >
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.job_title}
                  description={job.description}
                  company={job.company}
                  isFavorite={true}
                  onClick={() => setSelectedJob(job)}
                  isSelected={selectedJob?.id === job.id}
                />
              ))
            ) : (
              <div className="text-center rounded-lg border border-muted p-8 bg-card">
                <p className="text-muted-foreground">No favourite jobs found</p>
              </div>
            )}
          </div>

          <div className="hidden lg:block relative">
            <div className="sticky top-8">
              {selectedJob ? (
                <DetailedJobCard
                  title={selectedJob.job_title}
                  description={selectedJob.description}
                  company={selectedJob.company}
                  isFavorite={true}
                  onApply={() => {
                    toast({
                      variant: "default",
                      title: "Wow! You're hired",
                    });
                    trigger();
                  }}
                />
              ) : (
                <div className="rounded-lg border border-muted p-8 bg-card text-center">
                  <p className="text-muted-foreground">
                    Select a job to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Confetti isVisible={isVisible} />
    </div>
  );
};

export default Favourites;
