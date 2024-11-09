export interface Job {
  id: number;
  job_title: string;
  description: string;
  company: string;
}

export interface JobsResponse {
  pagination: {
    currentPage: number;
    firstPage: number;
    lastPage: number;
  };
  data: Job[];
} 