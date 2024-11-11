import { useState } from "react";
import { Job } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { addToFavourites, removeFromFavourites } from "@/lib/api/client";
import { useToast } from "@/hooks/use-toast";

export const useFavourites = ({
  initialFavouriteIds,
}: {
  initialFavouriteIds: number[];
}) => {
  const { toast } = useToast();
  const [favouriteIds, setFavouriteIds] = useState(initialFavouriteIds);

  const addFavouriteMutation = useMutation({
    mutationFn: (jobId: number) => addToFavourites(jobId),
    onSuccess: (favouriteIds: number[]) => {
      setFavouriteIds(favouriteIds);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add job to favourites",
      });
    },
  });

  const removeFavouriteMutation = useMutation({
    mutationFn: (jobId: number) => removeFromFavourites(jobId),
    onSuccess: (favouriteIds: number[]) => {
      setFavouriteIds(favouriteIds);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove job from favourites",
      });
    },
  });

  const toggleFavourite = (jobId: number) => {
    const isCurrentlyFavourited = favouriteIds.some((id) => id === jobId);

    if (isCurrentlyFavourited) {
      removeFavouriteMutation.mutate(jobId);
    } else {
      addFavouriteMutation.mutate(jobId);
    }
  };

  return {
    favouriteIds,
    toggleFavourite,
    isLoading:
      addFavouriteMutation.isPending || removeFavouriteMutation.isPending,
    isError: addFavouriteMutation.isError || removeFavouriteMutation.isError,
  };
};
