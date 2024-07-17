import { Button, Frog } from 'frog';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const app = new Frog();

const FrameComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const wallet = 'your_wallet_address_here'; // Replace with actual wallet address
  const apiUrl = wallet ? `https://build.top/api/stats?wallet=${wallet}` : '';

  useEffect(() => {
    const fetchData = async () => {
      if (!apiUrl) {
        setError('Wallet address is not defined');
        setLoading(false);
        return;
      }
      console.log(`Fetching data from URL: ${apiUrl}`);
      try {
        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ color: 'white', display: 'flex', flexDirection: 'column', fontSize: 20 }}>
      <div>Build Score: {data.build_score}</div>
      <div>Build Budget: {data.build_budget}</div>
      <div>Nominations Received: {data.nominations_received}</div>
      <div>Nominations Given: {data.nominations_given}</div>
      <Button value="refresh" onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
};

app.frame('/', (c) => {
  return c.res({
    image: <FrameComponent />,
  });
});
