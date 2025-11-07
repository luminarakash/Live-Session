import { useEffect, useState } from "react";
import { fetchPeople } from "../api/swapi";

export default function usePeople(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPeople(page)
      .then((d) => { if (!cancelled) setData(d); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page]);

  return { page, setPage, data, loading, error };
}
