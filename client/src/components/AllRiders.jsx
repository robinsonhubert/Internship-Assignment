import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from '../constants/BaseUrl';
import { Table, TableBody, TableCell, TableHead, TableRow, styled, Typography, Container } from "@mui/material";
import { Image } from 'mui-image'


const StyleTable = styled(Table)`
    width: 90%;
    margin: 50px auto 0 auto;
`
const THead = styled(TableRow)`
    background: #000;
    & > th {
        color: #fff
    }
`
const TBody = styled(TableRow)`
    & > td {
        font-size:20px;
    }
`


const AllRiders = () => {
    const [riders, setRiders] = useState([]);

    useEffect(() => {
        getAllRiders();
    }, []);

    const getAllRiders = async () => {
        try {
            const response = await axios.get(`${BASEURL}/api/v1`); // Assuming the backend API endpoint is "/api/v1"

            if (response.status === 200) {
                setRiders(response.data);
            }
        } catch (error) {
            console.error("Error retrieving riders:", error);
        }
    };
    const getStatusLabel = (status) => {
        return status ? "Active" : "Not Active";
    };

    return (
        <div>
            <Container>
            <Typography variant="h4" align="center" style={{paddingTop:'40px'}}>Add Rider</Typography>
            <StyleTable>
                <TableHead>
                    <THead>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>NRIC</TableCell>
                        <TableCell>Image</TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                    {riders.map((rider) => (
                        <TBody>
                            <TableCell>{rider.Id}</TableCell>
                            <TableCell>{rider.Name}</TableCell>
                            <TableCell>{rider.Email}</TableCell>
                            <TableCell>{rider.Position}</TableCell>
                            <TableCell>{getStatusLabel(rider.Status)}</TableCell>
                            <TableCell>{rider.NRIC}</TableCell>
                            <TableCell><Image src={rider.Image} style={{width: 100, height: 100}}/></TableCell>
                        </TBody>
                    ))}
                </TableBody>
            </StyleTable>
            </Container>
        </div>
    );
};

export default AllRiders;
