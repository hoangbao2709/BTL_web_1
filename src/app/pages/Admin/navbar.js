import avt from "./image/Avatar.png";
import audience from "./image/audience.png";
import home from "./image/Home-simple-door.png";
import post from "./image/post.png";
import report from "./image/Reports.png";
import schedule from "./image/schedule.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Radius from "./image/Radius.png";
import thang from "./image/thang.png";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Input } from "./../../BackEnd/input"

export function Navbar() {
    const location = useLocation();
    const [showHtml, setShowHtml] = useState(false);
    const [showHtmlBottom, setShowHtmlBottom] = useState(false);
    const pathSegments = location.pathname.split('/');
    const [isActive, setInputSegment] = useState(pathSegments[pathSegments.length - 1]);

    const handleClick = () => {
        setShowHtml(!showHtml);
    };

    const handleClickBottom = () => {
        setShowHtmlBottom(!showHtmlBottom);
    };
    let href = "";
    if(isActive === "admin"){
        href = "admin/";
    }
    

    const navigate = useNavigate();
    return (
        <div className="w-[292px] bg-[#161A23] h-screen font-">
            <header>
                <div className="flex mt-[20px] justify-center">
                    <img className="h-[50px] w-[50px] mr-[20px] object-cover" src={avt}></img>
                    <div>
                        <p className="text-[#8A8C91] text-base">PRODUCT MANAGER</p>
                        <p className="text-[#D0D1D3] text-14">Andrew Smith</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-[80%] mt-[20px] border-b-[5px] border-[#2D2F39] rounded-full"></div>
                </div>
            </header>
            <div className="container mx-auto px-7 text-[#D0D1D3]">
                <ul>
                    <li className="flex py-4">
                        <label>Main</label>
                    </li>
                    <li>
                        <a
                            href={href + "dashboard"}
                            className={`my-1 flex py-4 w-full pl-4 rounded-lg hover:bg-[#2D2F39] cursor-pointer ${isActive === "dashboard" ? 'bg-[#2D2F39] text-[#62fcaf]' : ''}`}
                        >
                            <img className="pr-4 w-[36px]" src={home}></img>
                            <p>Dashboard</p>
                        </a>
                    </li>
                    <li>
                        <a 
                            href={href + "audience"}
                            className={`my-1 flex py-4 relative w-full pl-4 rounded-lg hover:bg-[#2D2F39] cursor-pointer ${isActive === "audience" ? 'bg-[#2D2F39] text-[#62fcaf]' : ''}`}>
                            <img className="pr-4 w-[36px]" src={audience}></img>
                            <p>Audience</p>
                        </a>

                        {isActive !== "audience" && (
                            <button className="pr-4 absolute right-0 text-sm font-medium text-gray-900 dark:text-gray-400 dark:hover:bg-black"
                                onClick={handleClick}
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        )}{isActive === "audience" && (

                            <button className="pr-4 absolute right-0 text-sm font-medium text-gray-900 dark:text-gray-400 dark:hover:bg-black"
                                onClick={handleClick}
                            >
                                <FontAwesomeIcon icon={faChevronUp} />
                            </button>
                        )}
                    </li>
                    {isActive === "audience" && (
                        <div className="flex justify-center">
                            <img className="h-[20px] w-[20px] mr-[20px] object-cover" src={avt}></img>
                            <div>
                                <p className="text-[#8A8C91] text-[15px]">PRODUCT MANAGER</p>
                                <p className="text-[#D0D1D3] text-[15px]">Andrew Smith</p>
                            </div>
                        </div>
                    )}
                    <li>
                        <a href={href + "post"} className={`my-1 flex py-4 w-full pl-4 rounded-lg hover:bg-[#2D2F39] cursor-pointer ${isActive === "post" ? 'bg-[#2D2F39] text-[#62fcaf]' : ''} `}>
                            <img className="pr-4 w-[36px]" src={post}></img>
                            <p>Post</p>
                        </a>
                    </li>

                    <li >
                        <a href={href + "input"} className={`my-1 cursor-pointer ${isActive === "input" ? 'bg-[#2D2F39] text-[#62fcaf]' : ''} `}>
                            {isActive !== "input" && (
                                <a className="flex py-4 bg-[none] w-full pl-4 rounded-lg content-center hover:bg-[#2D2F39] cursor-pointer">
                                    <FontAwesomeIcon className="pr-4 pt-1" icon={faRightToBracket} />
                                    <p>Add Item</p>
                                </a>
                            )}
                            {isActive === "input" && (
                                <a onClick={() => navigate(-1)} className="flex py-4 bg-[none] w-full pl-4 rounded-lg content-center hover:bg-[#2D2F39] cursor-pointer">
                                    <FontAwesomeIcon className="pr-4 pt-1" icon={faRightToBracket} />
                                    <p>Add Item</p>
                                </a>
                            )}
                        </a>
                    </li>
                    <li>
                        <a href={href + "schedules"} className={`my-1 flex py-4 w-full pl-4 rounded-lg hover:bg-[#2D2F39] cursor-pointer ${isActive === "schedules" ? 'bg-[#2D2F39] text-[#62fcaf]' : ''} `}>
                            <img className="pr-4 w-[36px]" src={schedule}></img>
                            <p>Schedules</p>
                        </a>
                    </li>
                    <li>
                        <a href={href + "income"} className={`my-1 flex py-4 w-full bg-[none] relative pl-4 rounded-lg hover:bg-[#2D2F39] cursor-pointer ${isActive === "income" ? 'bg-[#2D2F39] text-[#62fcaf]' : ''} `} onClick={() => {
                            handleClickBottom();
                        }}> <img className="pr-4 w-[36px]" src={report}></img>
                            <p>Income</p>
                            {isActive !== "income" && (
                                <button className="pr-4 absolute bg-[none] hover:bg-[#2D2F39] right-0 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    onClick={handleClickBottom}
                                >
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </button>
                            )}{isActive === "income" && (
                                <button className="pr-4 absolute bg-[none] hover:bg-[#2D2F39] right-0 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    onClick={handleClickBottom}
                                >
                                    <FontAwesomeIcon icon={faChevronUp} />
                                </button>
                            )}</a>
                    </li>
                    {isActive === "income" && (
                        <div className="flex relative ml-[20px]">
                            <div className="overflow-hidden h-[150px]">
                                <img src={thang} className="w-[8px]"></img>
                            </div>
                            <ul className="absolute">
                                <li className="mt-[15px] flex relative">
                                    <img src={Radius} className="w-[53px]"></img>
                                    <a className="absolute left-[60px] top-[3px] rounded-lg cursor-pointer hover:bg-[#2D2F39] p-[10px]"> Earnings</a>
                                </li>
                                <li className="mt-[15px] flex relative">
                                    <img src={Radius} className="w-[53px]"></img>
                                    <a className="absolute left-[60px] top-[3px] rounded-lg cursor-pointer hover:bg-[#2D2F39] p-[10px]">  Refunds</a>
                                </li>
                                <li className="mt-[15px] flex relative">
                                    <img src={Radius} className="w-[53px]"></img>
                                    <a className="absolute left-[60px] top-[3px] rounded-lg cursor-pointer hover:bg-[#2D2F39] p-[10px]">  Declines</a>
                                </li>
                                <li className="mt-[15px] flex relative">
                                    <img src={Radius} className="w-[53px]"></img>
                                    <a className="absolute left-[60px] top-[3px] rounded-lg cursor-pointer hover:bg-[#2D2F39] p-[10px]">  Payouts</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}