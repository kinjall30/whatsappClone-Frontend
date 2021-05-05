import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat.js';
import Sidebar from './Sidebar.js';
import Pusher from 'pusher-js';
import axios from './axios.js'

function App() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios.get("/messages/sync").then((response) => {
            //console.log(response.data);
            setMessages(response.data);
        });
    }, []);

    useEffect(() => {
        
        const pusher = new Pusher('73276000b79bdc9b1a40', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind(' inserted', (newMessage) => {
            // alert(JSON.stringify(newMessage));
            setMessages([...messages, newMessage])
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [messages]);

    console.log(messages);

  return (
    <div className="App">
    <h3>Made By Kinjal Prajapati</h3>
        <div className="app__body">
            <Sidebar />
            <Chat messages={messages} />
        </div>
        
    </div>
  );
}

export default App;
