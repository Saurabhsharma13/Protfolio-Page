import { useState, useEffect } from 'react';
import { GH } from '../data/constants';

export function useGitHub() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://api.github.com/users/${GH}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GH}/repos?per_page=100&sort=updated`).then(r => r.json()),
    ])
      .then(([p, r]) => {
        if (cancelled) return;
        setProfile(p);
        setRepos(r.filter(repo => !repo.fork));
        setLoading(false);
      })
      .catch(e => {
        if (cancelled) return;
        setError(e.message);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { profile, repos, loading, error };
}
