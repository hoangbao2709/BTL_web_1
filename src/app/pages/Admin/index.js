import { useState } from 'react';
import React from 'react';
import { Input } from "./../../BackEnd/input";
import { Navbar } from "./navbar";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';


export function Admin() 
    {const navigate = useNavigate();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const [isActive, setIsActive] = useState(Array(6).fill(false));
    const [additem, setAdditem] = useState(false);
    const [inputSegment, setInputSegment] = useState(pathSegments[pathSegments.length - 1]);
    console.log(inputSegment);
    navigate(-1);
    return (
        
        <div className="flex w-[100%]">
            <Navbar/>
            <Routes>
                <Route path="/" element={<div className=' w-full '></div>} />
                <Route path="input" element={<Input />} />
            </Routes>
        </div>
    );
}