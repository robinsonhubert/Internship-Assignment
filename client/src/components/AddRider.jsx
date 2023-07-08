import React, { useState } from "react";
import axios from "axios";
import { FormControl, FormGroup, InputLabel, Input, Button, Typography } from "@mui/material";

const AddRider = () => {
  const [riderData, setRiderData] = useState({
    Id: "",
    Name: "",
    Email: "",
    Position: "",
    NRIC: "",
    Status: "",
    Image: null,
  });

  const handleInputChange = (event) => {
    if (event.target.name === "Image") {
      setRiderData({ ...riderData, [event.target.name]: event.target.files[0] });
    } else {
      setRiderData({ ...riderData, [event.target.name]: event.target.value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Id", riderData.Id);
    formData.append("Name", riderData.Name);
    formData.append("Email", riderData.Email);
    formData.append("Position", riderData.Position);
    formData.append("NRIC", riderData.NRIC);
    formData.append("Status", riderData.Status);
    formData.append("Image", riderData.Image);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        // Rider added successfully
        console.log("Rider added:", response.data);
        // Reset the form inputs
        setRiderData({
          Id: "",
          Name: "",
          Email: "",
          Position: "",
          NRIC: "",
          Status: "",
          Image: null,
        });
      }
    } catch (error) {
      console.error("Error adding rider:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormGroup>
        <Typography variant="h4">Add Rider</Typography>
        <FormControl>
          <InputLabel>Id:</InputLabel>
          <Input name="Id" value={riderData.Id} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <InputLabel>Name:</InputLabel>
          <Input name="Name" value={riderData.Name} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <InputLabel>Email:</InputLabel>
          <Input name="Email" value={riderData.Email} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <InputLabel>Position:</InputLabel>
          <Input name="Position" value={riderData.Position} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <InputLabel>NRIC:</InputLabel>
          <Input name="NRIC" value={riderData.NRIC} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <InputLabel>Status:</InputLabel>
          <Input name="Status" value={riderData.Status} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <Input accept="image/*" multiple type="file" name="Image" onChange={handleInputChange} />
          <Button type="submit">Upload Image</Button>
        </FormControl>
      </FormGroup>
    </form>
  );
};

export default AddRider;
