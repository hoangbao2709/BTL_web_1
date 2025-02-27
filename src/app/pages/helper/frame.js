import React from 'react';
import './style/frame.css';

type FrameProps = {
    item: { img: string }[]; 
};

const Frame: React.FC<FrameProps> = ({ item }) => {
    let totalView: JSX.Element[] = []; 
    let oneView: JSX.Element[] = []; 

    const view = item.map((element, index) => {
        if (index % 4 === 0) {
            if (index !== 0) {
                totalView.push(
                    <ul className='flex mb-[50px]' key={`group-${index}`}>
                        {oneView}
                    </ul>
                );
                oneView = []; 
            }
        }

        oneView.push(
            <li
                className='shadow-2xl rounded-3xl overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#E0E3E7] relative h-[500px] w-full border border-[#e9e9e9] p-0 m-0 ml-[2%] mr-[2%]'
                key={`item-${index}`}
            >   <a href="">
                    <img
                        src={element.img}
                        alt="Framed"
                    />
                    <p className='font-bold absolute top-[4%] right-[4%] p-[3%] bg-[red] rounded-[50%] text-[white]'>{element.giam_gia}</p>
                    <div className='font-bold absolute bottom-[4%] mr-[5%] ml-[5%]'>
                        <p>{element.name}</p>
                        <p className='text-[red]'><label htmlFor="">{element.gia}</label> <label className='ml-[130px] text-[black]'>{element.gia_goc}</label></p>
                    </div>
                </a>
            </li>
        );

        return null;
    });

    if (oneView.length > 0) {
        totalView.push(
            <ul className='flex mb-[50px]' key={`group-last`}>
                {oneView}
            </ul>
        );
    }

    return (
        <div>
            {totalView}
        </div>
    );
};

export default Frame;