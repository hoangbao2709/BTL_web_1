import { useState } from 'react';
import React from 'react';
import Input from "../../BackEnd/input";
import Navbar from "./navbar";
import Post from "./../../BackEnd/post";
import { Routes, Route } from 'react-router-dom';
import Edit from "./../../BackEnd/edit";

export default function Admin() {
    return (
        <div className="flex w-[100%]">
            <Navbar/>
            <div className='w-full'>
                <Routes>
                    <Route index element={<div className='w-full'>Admin Dashboard</div>} />
                    <Route path="/input" element={<Input />} />
                    <Route path="/post/:Status?" element={<Post />} />
                    <Route path="/post/edit/:number?" element={<Edit />} />
                </Routes>
            </div>
        </div>
    );
}