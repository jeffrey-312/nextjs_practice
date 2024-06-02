// 打 back-end
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

function getTodoAdd(add_URL:string,taskName:string){
    const [post, setPost]=useState(null);
    useEffect(()=>{
        axios.get(add_URL).then((response)=>{
            setPost(response.data);
        });
    },[]);

    if(!post) return null;

    return post;
}

function getTodoDelete(delete_URL:string){
    const [post, setPost]=useState('');
    useEffect(()=>{
        axios.get(delete_URL).then((response)=>{
            setPost(response.data);
        });
    },[]);

    if(!post) return '';

    return post;
}

export  {getTodoAdd,getTodoDelete};

