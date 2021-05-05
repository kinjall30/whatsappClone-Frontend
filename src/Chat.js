import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import './Chat.css';
import { IconButton } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios.js';

function Chat({ messages }) {
    const [input, setInput] = useState("");

    const sendMessage = async(e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            message: input,
            name: "MySelf",
            timestamp: "Right now!",
            received: false,
        });

        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Night Out</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
            {messages.map((message) =>(
                <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp}
                    </span>
                </p>
            ))}
            </div>
        
            
            <div className="chat__footer">
                <IconButton>
                    <EmojiEmotionsIcon />
                </IconButton>
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                    
                </form>
                <MicIcon />
            </div>
            
        </div>
    )
}

export default Chat
