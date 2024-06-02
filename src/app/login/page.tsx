"use client";
import { useState } from 'react';

const Login = () => {
    const [inputText, setInputText]=useState("")
    return (
        <div className='flex flex-col items-center bg-gray-100 pb-32 gap-2'>
            <div className='text-xl text-gray-600'>To-Do Lister</div>
            <div className='text-2xl'>LogIn</div>
            <div>
                <div>Email:</div>
                <input 
                className="text-xl rounded-md shadow-md"
                type="text" 
                placeholder='XXX@.com'
                value={inputText} 
                onChange={e=>setInputText(e.target.value)}
                />
            </div>
            <div>
                <div>Password:</div>
                <input 
                className="text-xl rounded-md shadow-md"
                type="text" 
                placeholder='XXXXXXXX' 
                value={inputText} 
                onChange={e=>setInputText(e.target.value)}
                />
            </div>
            
            <button className='bg-gray-600 text-white rounded-md py-1 px-1'>
                登入
            </button>
            <a href="#" className='text-blue-600 underline'>第一次使用To-Do Lister?</a>
        </div>
    );
}
export default Login;