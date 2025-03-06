import React from 'react';
import './style/frame.css';

type FrameProps = {
    item: { img: string[]; page: string; id: string; giam_gia: number; name: string; gia: number; gia_goc: number }[]; 
    index: number; 
    max_index: number; 
};

const Frame: React.FC<FrameProps> = ({ item, index, max_index }) => {
    let totalView: JSX.Element[] = []; 
    let oneView: JSX.Element[] = []; 

    function formatPrice(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    }

    const getImg = (img: string[]) => {
        const result = img.filter(ele => {
            const fileName = ele.split('/');
            const pathParts = fileName[fileName.length - 1].split("_");
            return pathParts.includes("isReview");
        });
        return result;
    };

    const view = item.slice(index, index + max_index).map((element, idx) => {
        const imgs = getImg(element.img); // Lấy ảnh có chứa "isReview"

        if (idx % 4 === 0 && idx !== 0) {
            totalView.push(
                <ul className='flex mb-[50px]' key={`group-${idx}`}>
                    {oneView}
                </ul>
            );
            oneView = []; 
        }

        const imgSrc = imgs.length > 0 ? imgs[0] : ''; 

        oneView.push(
            <li
                className='min-h-[520px] bg-white shadow-2xl rounded-3xl overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#E0E3E7] relative fix w-[280px] border border-[#e9e9e9] p-0 m-0 ml-[25px] mr-[25px]'
                key={`item-${element.id}`}
            >   
                <a href={`/Product/${element.page}/${element.id}`} className=''>
                    <div className='h-[400px] overflow-hidden'>
                        <img
                            src={imgSrc}
                            alt="Framed"
                        />
                    </div>
                    <p className='font-bold absolute top-[3%] right-[4%] px-[3%] py-[5%] bg-[red] rounded-[50%] text-[white]'> -{element.giam_gia}%</p>
                    <div className='absolute top-[75%] left-0 right-0 p-3 '> 
                        <div className='mt-2 relative'>
                            <p className='font-bold h-[50px] mb-[10px]'>{element.name}</p>
                            <p className='text-[red] text-[20px]'>
                                <label className='absolute left-0'>{formatPrice(element.gia)}</label>
                                <label className='absolute ml-[10px] text-[black] left-[150px]'>{formatPrice(element.gia_goc)}</label>
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
            <ul className='flex mb-[50px] w-[1400px]' key={`group-last`}>
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