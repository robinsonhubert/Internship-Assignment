import React, { useState } from "react";
import axios from "axios";
import { BASEURL } from '../constants/BaseUrl';
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, InputLabel, Input, Button, Typography, styled } from "@mui/material";
import { Image } from 'mui-image'


const Container = styled(FormGroup)`
    width: 50%;
    margin: 2% auto 0 auto;
    & > div {
        margin-top: 30px;
    }
`

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

    const navigate = useNavigate();

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
            const response = await axios.post(`${BASEURL}/api/v1/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                navigate('/all');
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
        <form>
            <Container>
                <Typography variant="h4" align="center">Add Rider</Typography>
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
                </FormControl>
                {riderData.Image && (
                    <FormControl>
                        <Image src={URL.createObjectURL(riderData.Image)} alt="Uploaded Image" style={{ width: '100px',height:'100px', marginTop: '10px' }} />
                    </FormControl>
                )}
                <FormControl>
                    <Button variant="contained"  onClick={handleFormSubmit}>Add Rider</Button>
                </FormControl>
            </Container>
        </form>
    );
};

export default AddRider;
