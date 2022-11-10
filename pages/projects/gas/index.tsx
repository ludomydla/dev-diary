import React, { useCallback, useEffect, useState } from "react";
import Dashboard from '../../../components/Dashboard';
import Loader from '../../../components/Loader';
import { call } from '../../../lib/fetcher';
import { GasRecord } from '../../../lib/types';

export default function Gas() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [gasRecords, setGasRecords] = useState<GasRecord[]>([]);

  const sortByTime = (a: GasRecord, b: GasRecord) => {
    return b.distance - a.distance
  }

  const fetchGasRecords = useCallback(async () => {
    console.log('fetchGasRecords')
    const jsonData = await call.gas.GET();
    jsonData.sort(sortByTime)
    setGasRecords(jsonData);
  }, []);

  useEffect(() => {
    try {
      fetchGasRecords();
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const showAppropriateComponent = () => {
    if (isLoading) return <Loader />;
    if (isError) return <p className="error">Oops... There was an error</p>;
    if (gasRecords && gasRecords.length > 0) return <Dashboard data={gasRecords} />;
  };

  return (
    <div className="page">
      {showAppropriateComponent()}
    </div>
  );
}
