import React from 'react';
import './style/frame.css';

type FrameProps = {
    item: { img: string }[]; 
};

const Frame: React.FC<FrameProps> = ({ item, index, max_index }) => {
    let totalView: JSX.Element[] = []; 
    let oneView: JSX.Element[] = []; 

    const view = item.slice(index, index + max_index ).map((element, idx) => {
        if (idx % 4 === 0) {
            if (idx !== 0) {
                totalView.push(
                    <ul className='flex mb-[50px]' key={`group-${idx}`}>
                        {oneView}
                    </ul>
                );
                oneView = []; 
            }
        }
        oneView.push(
            <li
                className='min-h-[520px] shadow-2xl rounded-3xl overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#E0E3E7] relative fix w-[280px] border border-[#e9e9e9] p-0 m-0 ml-[25px] mr-[25px]'
                key={`item-${index}`}
            >   <a href="">
                    <div className='h-[400px] overflow-hidden'>
                        <img
                            src={element.img}
                            alt="Framed"
                        />
                    </div>
                    <p className='font-bold absolute top-[4%] right-[4%] p-[3%] bg-[red] rounded-[50%] text-[white]'>{element.giam_gia}</p>
                    <div className='absolute top-[75%] left-0 right-0 p-3'> 
                        <div className='mt-2 relative'>
                            <p className='font-bold h-[50px] mb-[10px]'>{element.name}</p>
                            <p className='text-[red] text-[20px] absolute top-100'>
                                <label className='absolute left-0'>{element.gia}</label>
                                <label className='absolute ml-[10px] text-[black] left-[180px]'>{element.gia_goc}</label>
                            </p>
                        </div>
                    </div>
                </a>
            </li>
        );
        return null;
    });

    if (oneView.length > 0) {
        totalView.push(
            <ul className='flex mb-[50px] w-[100%]' key={`group-last`}>
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