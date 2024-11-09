const API_BASE_URL = 'https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod';

export async function getJobs(page: number = 0) {
  const response = await fetch(`${API_BASE_URL}/jobs?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
}

export async function searchJobs(jobTitle: string) {
  const response = await fetch(`${API_BASE_URL}/jobs/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobTitle }),
  });
  if (!response.ok) {
    throw new Error('Failed to search jobs');
  }
  return response.json();
} 