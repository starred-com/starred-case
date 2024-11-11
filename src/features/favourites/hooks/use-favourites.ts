import { useState } from "react";
import { Job } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { getFavouriteJobs } from "@/lib/api/client";
import { useToast } from "@/hooks/use-toast";

export const useFavourites = ({
  initialData,
}: {
  initialData: { data: Job[] };
}) => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState(initialData.data);

  const favouriteJobsMutation = useMutation({
    mutationKey: ["favourites"],
    // mutationFn: getFavouriteJobs,
    mutationFn: () => {
      return Promise.resolve([]);
    },
    onSuccess: (data) => {
      setJobs(data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load favourite jobs",
      });
    },
  });

  return {
    jobs,
    selectedJob,
    setSelectedJob,
    isLoading: favouriteJobsMutation.isPending,
    isError: favouriteJobsMutation.isError,
    mutate: favouriteJobsMutation.mutate,
  };
};
