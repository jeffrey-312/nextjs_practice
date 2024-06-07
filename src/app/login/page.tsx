"use client";
import { useState } from 'react';
import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';
import { useRouter } from 'next/navigation'; // 從 next/navigation 引入 useRouter

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // 初始化 useRouter

    const handleLogin = async () => {
        try {
            const response = await fetch('http://35.189.180.59:40000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password//加hash MD5
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.msg === "success") {
                console.log("登入成功:", data);
                localStorage.setItem('user_id', data.user_id);
                alert('登入成功');
                router.push("/todos");
            } else {
                alert('請輸入正確的帳號密碼');
                console.log("登入失敗:", data.msg);
                // 根據 data.msg 的內容進行相應的提示或處理
            }
        } catch (error) {
            console.error("發生錯誤:", error);
        }
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
            
            <div className='w-80 flex justify-between'>
                <div>
                    <a href="/forgetpassword" className='text-green-800 underline'>忘記密碼?</a>
                </div>
                <div>
                    <a href="/signup" className='text-blue-600 underline '>第一次使用To-Do Lister?</a>
                </div>
                
            </div>
        </div>
    );
};

export default Login;

// "use client";
// import { useState } from 'react';
// import axios from 'axios'; // 引入 Axios
// import EmailInput from '@/components/EmailInput';
// import PasswordInput from '@/components/PasswordInput';

// const Login: React.FC = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://35.189.180.59:40000/login', {
//                 email: email,
//                 password: password
//             });

//             const data = response.data;
//             if (data.msg === "success") {
//                 console.log("登入成功:", data);
//                 localStorage.setItem('user_id', data.user_id);
//                 // 你可以在這裡進行進一步的操作，比如導航到其他頁面
//             } else {
//                 console.log("登入失敗:", data.msg);
//                 // 根據 data.msg 的內容進行相應的提示或處理
//             }
//         } catch (error) {
//             console.error("發生錯誤:", error);
//         }
//     };

//     return (
//         <div className='flex flex-col items-center bg-gray-100 pb-32 gap-2'>
//             <div className='text-xl text-gray-600'>To-Do Lister</div>
//             <div className='text-2xl'>Log In</div>
//             <EmailInput email={email} setEmail={setEmail} />
//             <PasswordInput password={password} setPassword={setPassword} />
//             <button 
//                 className='bg-gray-600 text-white rounded-md py-2 px-4 w-80'
//                 onClick={handleLogin}
//             >
//                 登入
//             </button>
//             <div className='w-80 text-right'>
//                 <a href="#" className='text-blue-600 underline'>第一次使用To-Do Lister?</a>
//             </div>
//         </div>
//     );
// };

// export default Login;





// "use client";
// import { useState } from 'react';
// import EmailInput from '@/components/EmailInput';
// import PasswordInput from '@/components/PasswordInput';


// const Login: React.FC = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleLogin = () => {//按下登入要做的動作
//         console.log("Email:", email);
//         console.log("Password:", password);
//     };

//     return (
//         <div className='flex flex-col items-center bg-gray-100 pb-32 gap-2'>
//             <div className='text-xl text-gray-600'>To-Do Lister</div>
//             <div className='text-2xl'>Log In</div>
//             <EmailInput email={email} setEmail={setEmail} />
//             <PasswordInput password={password} setPassword={setPassword} />
//             <button 
//                 className='bg-gray-600 text-white rounded-md py-2 px-4 w-80'
//                 onClick={handleLogin}
//             >
//                 登入
//             </button>
//             <div className='w-80 text-right'>
//                 <a href="#" className='text-blue-600 underline'>第一次使用To-Do Lister?</a>
//             </div>
//         </div>
//     );
// };

// export default Login;

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