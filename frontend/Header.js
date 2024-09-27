import { useState, useEffect } from 'react';

export const useFetchDataWithErrorHandling = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
};
```

```javascript
import React from 'react';
import { useFetchDataWithErrorHandling } from './hooks/useFetchDataWithErrorHandling';

const FarmDataComponent = ({ apiUrl }) => {
  const { data, error, isLoading } = useFetchDataWithErrorHandling(apiUrl);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error encountered: {error}</div>;

  return (
    <div>
      {data && data.map(farm => (
        <div key={farm.id}>{farm.name}</div>
      ))}
    </div>
  );
};

export default FarmDataComponent;