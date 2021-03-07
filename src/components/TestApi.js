import React, { useState, useEffect } from "react";
import axios from "axios";
import Timestamp from "react-timestamp";

export default function TestApi() {
  const [stationboards, setStationboards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState("");
  const [station, setStation] = useState("");
  const [apiURLBase, setApiURLBase] = useState(
    "http://transport.opendata.ch/v1/stationboard?station="
  );

  const getStations = () => {
    let url = apiURLBase + place + "," + station + "&limit=10";
    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setStationboards(response.data.stationboard);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {loading ? (
        <div>is loading...</div>
      ) : (
        <div>
          <input
            type="text"
            name="place"
            placeholder="Ort"
            onChange={(e) => setPlace(encodeURIComponent(e.target.value))}
          />
          <input
            type="text"
            name="station"
            placeholder="Haltestelle"
            onChange={(e) => setStation(encodeURIComponent(e.target.value))}
          />
          <button onClick={getStations}>Senden</button>
          {stationboards.map((station, index) => (
            <div key={index}>
              <div>
                Abfahrt:{" "}
                <Timestamp relative date={station.stop.departureTimestamp} />
              </div>
              <div>Richtung: {station.to}</div>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
