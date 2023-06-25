import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TextField from '@mui/material/TextField';

const SearchBar = () => {
    const searchMenu = (event) => {
        const searchString = event.target.value;
        console.log(searchString)
    };
    return (
        <div>
            <TextField fullWidth id="filled-basic" placeholder={'Search Menu'} onChange={searchMenu} sx={{bgcolor: "white"}}/>
        </div>
    );
}
export default SearchBar;