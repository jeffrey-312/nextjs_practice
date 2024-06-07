"use client"
import { useEffect, useState } from 'react';
import Task from '@/components_main/Maintask';
import Popup from '@/components_main/Popup';
import Popup2 from '@/components_main/Popup2';
import Dailytasks from '@/components_main/Dailytasks';
import Subtasks from '@/components_main/Subtasks';
import SearchResults from '@/components_main/SearchResult';

export default function Maintask({ maintask }) {
    const [tasks, setTasks] = useState(maintask || []);
    const [expandedTasks, setExpandedTasks] = useState({});
    const [expandedSubtasks, setExpandedSubtasks] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [dailytasks, setDailytasks] = useState(maintask || []);
    const [subtasks, setSubtasks] = useState(maintask || []);
  
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);
  
    const handleSearch = async () => {
      const date = searchDate.trim() || 'none';
      const keyword = searchKeyword.trim() || 'none';
  
      try {
        const response = await fetch('http://35.189.180.59:40000/search_task/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: '46e3dfd8-b530-4cc3-8e26-ef709e4b3938',
            date: date,
            keyword: keyword
          })
        });
        const data = await response.json();
        if (data.msg === 'success') {
          setSearchResult(data);
          setIsSearchResultOpen(true);
        }
      } catch (error) {
        console.error('Error searching task:', error);
      }
    };
  
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://35.189.180.59:40000/get_todolist/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: '46e3dfd8-b530-4cc3-8e26-ef709e4b3938' })
          });
          const data = await response.json();
          setTasks(data.maintask);
          setDailytasks(data.dailytask);
          setSubtasks(data.subtask);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);
  
    const toggleTask = (name) => {
      setExpandedTasks(prev => ({
        ...prev,
        [name]: !prev[name]
      }));
    };
  
    const toggleSubtask = (parentName, name) => {
      setExpandedSubtasks(prev => ({
        ...prev,
        [parentName]: {
          ...prev[parentName],
          [name]: !prev[parentName]?.[name]
        }
      }));
    };
  
    const handleAddTask = async (taskData) => {
      try {
        const response = await fetch('http://35.189.180.59:40000/add_maintask/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id : "46e3dfd8-b530-4cc3-8e26-ef709e4b3938" ,
                              name : taskData.name ,
                              start : taskData.start.replace("T", " ") ,
                              end : taskData.end.replace("T", " ") ,
                              state : "processing" ,
                              description : taskData.description })
        });
        const data = await response.json();
        if (data.msg === 'success') {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };
  
    const handleAddDailyTask = async (taskData) => {
      try {
        const response = await fetch('http://35.189.180.59:40000/add_small_task/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id : "46e3dfd8-b530-4cc3-8e26-ef709e4b3938" ,
                              name : taskData.name ,
                              end : taskData.end.replace("T", " ") ,
                              state : "processing" ,
                              belong : taskData.belong ,
                              description : taskData.description })
        });
        const data = await response.json();
        if (data.msg === 'dailytask add successful' || data.msg === 'subtask add successful'){
          window.location.reload();
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };
  
    return (
      <div className="container bg-slate-100">
        <div className="maintask">
            <div>user name</div>{/* 要放入uasrname */}
            <button  className='bg-gray-400 text-white rounded-md w-1/2'  onClick={() => setIsPopupOpen(true)} >Add Maintask</button>
            <h1>Maintask</h1>
            {tasks && tasks.map(task => (
                task && task.name && (
                <Task
                    key={task.name}
                    task={task}
                    expandedTasks={expandedTasks}
                    toggleTask={toggleTask}
                    expandedSubtasks={expandedSubtasks}
                    toggleSubtask={toggleSubtask}
                />
                )
            ))}
            {isPopupOpen && (
                <Popup
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleAddTask}
                />
            )}
            {isPopup2Open && (
                <Popup2
                onClose={() => setIsPopup2Open(false)}
                onSubmit={handleAddDailyTask}
                tasks={tasks}
                />
            )}
        </div>
  
        <div className="search bg-slate-300 ">
          <h1>Search Tasks</h1>
          <input
            type="text"
            placeholder="Keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button className='bg-gray-400 text-white rounded-md w-1/4' onClick={handleSearch} >Search</button>
        </div>
  
        <div className="dailytask bg-gray-300">
          <h1>-------Today's task-------</h1>
          <button className='bg-gray-400 text-white rounded-md w-1/2' onClick={() => setIsPopup2Open(true)} >Add Task</button>
          <h1>Dailytask</h1>
          {dailytasks && dailytasks.map(task => (
            task && task.name && (
              <Dailytasks
                key={task.name}
                task={task}
                expandedTasks={expandedTasks}
                toggleTask={toggleTask}
              />
            )
          ))}
        </div>
  
        <div className="subtask">
          <h1>Subtask</h1>
          {subtasks && subtasks.map(task => (
            task && task.name && (
              <Subtasks
                key={task.name}
                task={task}
                expandedTasks={expandedTasks}
                toggleTask={toggleTask}
              />
            )
          ))}
        </div>
  
        {isSearchResultOpen && (
          <SearchResults
            searchResult={searchResult}
            onClose={() => setIsSearchResultOpen(false)}
            toggleTask={toggleTask}
          />
        )}
  
        <style jsx>{`
          .container {
            display: grid;
            grid-template-areas:
              'maintask search search'
              'maintask dailytask dailytask'
              'maintask subtask subtask';
              
            grid-gap: 10px;
            padding: 20px;
          }
          .maintask {
            grid-area: maintask;
            width: 80%;
          }
          .search {
            grid-area: search;
            width: 80%;
          }
          .dailytask {
            grid-area: dailytask;
            width: 80%;
          }
          .subtask {
            grid-area: subtask;
            width: 80%;
          }
        `}</style>
      </div>
    );
  }
  
  
  