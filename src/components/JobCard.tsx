export interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
}

interface JobCardProps {
  job: Job;
  isFavorite: boolean;
  onFavoriteToggle: (jobId: number) => void;
}

const JobCard = ({ job, isFavorite, onFavoriteToggle }: JobCardProps) => {
  return (
    <div className="border border-border-layer-1 rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold text-foreground-static-dark-title">{job.title}</h2>
      <h3 className="text-md text-foreground-static-dark-body mb-2">{job.company}</h3>
      <p className="text-foreground-static-dark-body">{job.description}</p>
      <button 
        onClick={() => onFavoriteToggle(job.id)}
        className="mt-2 text-foreground-interactive-primary"
      >
        {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
      </button>
    </div>
  );
};

export default JobCard; 