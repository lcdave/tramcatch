import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TestApi() {
  const [stationboards, setStationboards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "http://transport.opendata.ch/v1/stationboard?station=Muttenz,Zum%20Park&limit=10"
      )
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setStationboards(response.data.stationboard);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>is loading...</div>
      ) : (
        <div>
          {stationboards.map((station) => (
            <div>Abfahrt: {station.stop.departure}</div>
          ))}
        </div>
      )}
    </div>
  );
}
