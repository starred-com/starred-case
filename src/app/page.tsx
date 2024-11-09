'use client';

import { useState, useEffect } from 'react';
import JobCard, { Job } from '@/components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    const response = await fetch(`https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod/jobs?page=${page}`);
    const data = await response.json();
    setJobs(data);
  };

  const handleSearch = async () => {
    const response = await fetch('https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod/jobs/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobTitle: searchQuery }),
    });
    const data = await response.json();
    setJobs(data);
  };

  const toggleFavorite = (jobId: number) => {
    setFavorites(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Starred Job Search</h1>
      
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search jobs..."
          className="p-2 border border-border-layer-1 rounded mr-2"
        />
        <button 
          onClick={handleSearch}
          className="bg-background-interactive-primary text-foreground-interactive-primary px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid gap-4">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isFavorite={favorites.includes(job.id)}
            onFavoriteToggle={toggleFavorite}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="bg-background-interactive-secondary text-foreground-interactive-secondary px-4 py-2 rounded"
        >
          Previous
        </button>
        <button 
          onClick={() => setPage(p => p + 1)}
          className="bg-background-interactive-secondary text-foreground-interactive-secondary px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
} 