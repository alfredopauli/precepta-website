import { useState, useEffect, useCallback, useRef } from "react";
import { getData } from "./api";
export default function useData(availableOnly = false) {
  const [data, setData] = useState({ teachers: [], classes: [] }),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const version = useRef(0);
  const reload = useCallback(async () => {
    const v = ++version.current;
    setLoading(true);
    setError("");
    try {
      const result = await getData(availableOnly);
      if (v === version.current) setData(result);
    } catch (e) {
      if (v === version.current) setError(e.message);
    } finally {
      if (v === version.current) setLoading(false);
    }
  }, [availableOnly]);
  useEffect(() => {
    reload();
    return () => {
      version.current++;
    };
  }, [reload]);
  return { ...data, loading, error, reload };
}
