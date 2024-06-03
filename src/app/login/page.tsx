"use client";
import { useState } from 'react';
import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';


const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {//按下登入要做的動作
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className='flex flex-col items-center bg-gray-100 pb-32 gap-2'>
            <div className='text-xl text-gray-600'>To-Do Lister</div>
            <div className='text-2xl'>Log In</div>
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} />
            <button 
                className='bg-gray-600 text-white rounded-md py-2 px-4 w-80'
                onClick={handleLogin}
            >
                登入
            </button>
            <div className='w-80 text-right'>
                <a href="#" className='text-blue-600 underline'>第一次使用To-Do Lister?</a>
            </div>
        </div>
    );
};

export default Login;

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     return (
//         <div className='flex flex-col items-center bg-gray-100 pb-32 gap-2'>
//             <div className='text-xl text-gray-600'>To-Do Lister</div>
//             <div className='text-2xl'>Log In</div>
//             <div className='w-80'>
//                 <div className='text-left mb-1'>Email:</div>
//                 <input 
//                     className="text-xl rounded-md shadow-md w-full p-2 mb-4"
//                     type="email" 
//                     placeholder='XXX@email.com'
//                     value={email} 
//                     onChange={e => setEmail(e.target.value)}
//                 />
//             </div>
//             <div className='w-80'>
//                 <div className='text-left mb-1'>Password:</div>
//                 <input 
//                     className="text-xl rounded-md shadow-md w-full p-2 mb-4"
//                     type="password" 
//                     placeholder='XXXXXXXX' 
//                     value={password} 
//                     onChange={e => setPassword(e.target.value)}
//                 />
//             </div>
//             <button className='bg-gray-600 text-white rounded-md py-2 px-4 w-80'>
//                 登入
//             </button>
//             <div className='w-80 text-right'>
//                 <a href="#" className='text-blue-600 underline'>第一次使用To-Do Lister?</a>
//             </div>
//         </div>
//     );
// }
// export default Login;