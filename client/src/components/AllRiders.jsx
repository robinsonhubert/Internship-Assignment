import React, { useEffect, useState } from "react";
import axios from "axios";

const AllRiders = () => {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    getAllRiders();
  }, []);

  const getAllRiders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1"); // Assuming the backend API endpoint is "/api/v1"

      if (response.status === 200) {
        setRiders(response.data);
      }
    } catch (error) {
      console.error("Error retrieving riders:", error);
    }
  };

  return (
    <div>
      <p>All Riders List:</p>
      <ul>
        {riders.map((rider) => (
          <li key={rider.Id}>{rider.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllRiders;
