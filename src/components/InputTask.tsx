"use client"
import { useEffect, useState } from 'react';
export default function InputTask(){
    const [inputText, setInputText]=useState("")//預設是沒有內容，內容改變時更新
    
    return (
        <div className='flex gap-2'>
            <input 
            className="text-xl rounded-md shadow-md"//rounded邊角、shadow陰影
            type="text" 
            placeholder='enter task' //提示輸入內容
            value={inputText} //預設沒有內容
            onChange={e=>setInputText(e.target.value)}
            />
            <button className='text-l shadow-md text-white bg-blue-600 rounded-md px-3 py-1'>ADD</button>
            {/* <button className='text-l shadow-md text-white bg-orange-600 rounded-md px-3 py-1'>Clear</button> */}
        </div>
    )
}