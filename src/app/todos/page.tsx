"use client";
import { title } from 'process';
import { useState } from 'react';
import React from 'react';
import Title from '@/components/Title';
import InputTask from '@/components/InputTask';
import Task from '@/components/Task';
import {getTodoAdd} from '../../service/service'

import axios, { AxiosResponse } from 'axios';


const Todos = () => {
    const [inputText, setInputText]=useState("");//預設是沒有內容，內容改變時更新
    const [tasks, setTasks]=useState(["read book", "jogging", "homework"]);

    // 新增任務的函數
    const addTask = () => {
        // 確認輸入文字不為空
        if (inputText.trim()) {
            // 更新任務清單，新增輸入文字
            setTasks([...tasks, inputText]);
            // 清空輸入框
            setInputText("");
        }
    };

    return (  
        <div className='flex flex-col items-center gap-2 pt-8 bg-blue-200 pb-32'>
            <Title />
            <InputTask 
                inputText={inputText} 
                setInputText={setInputText} 
                addTask={addTask} 
            />
            <div className='py-2'></div>
            {tasks.map((task,index)=>(
                <Task key={index} content={task}/>
            ))}
        </div>
    );
}
export default Todos;
