import { useState } from 'react';
import React from 'react';
import { Input } from "./../../BackEnd/input";
import { Post } from "./../../BackEnd/post";
import { Navbar } from "./navbar";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Edit } from "./../../BackEnd/edit";

import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";

export function Admin() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const [isActive, setIsActive] = useState(Array(6).fill(false));
    const [additem, setAdditem] = useState(false);
    const [inputSegment, setInputSegment] = useState(pathSegments[pathSegments.length - 1]);

    return (
        
        <div className="flex w-[100%]">
            <Navbar/>
            <Routes>
                <Route path="/" element={<div className=' w-full '></div>} />
                <Route path="input" element={<Input />} />  
                <Route path="/post/:Status?" element={<Post />} />
                <Route path="/post/edit/:number?" element={<Edit />} />
            </Routes>
        </div>
    );
}