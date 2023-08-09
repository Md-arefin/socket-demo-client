import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSocket } from '../../Provider/SocketProvide';
import './room.css';

const Room = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [remoteSocketEmail, setRemoteSocketEmail] = useState(null);
    const [myStream, setMyStream] = useState();

    const handleUserJOined = useCallback(({ email, id }) => {
        console.log(`email joined ${email}`)
        setRemoteSocketId(id);
        setRemoteSocketEmail(email);
    }, [])

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMyStream(stream);
    }, [])

    useEffect(() => {
        socket.on('user:joined', handleUserJOined);

        return () => {
            socket.off('user:joined', handleUserJOined);
        }
    }, [])
    return (
        <div>
            <h1 className='center'>This is my room</h1>
            <h4 className='center'>{
                remoteSocketId ? `${remoteSocketEmail} joined` : 'No one in the room'
            }</h4>
            <div className='center' >
            {
                remoteSocketId && <button onClick={handleCallUser}>Call</button>
            }
            </div>
            <div className='center-1'>
                {
                    myStream && <ReactPlayer 
                        url={myStream}
                        playing
                        // muted
                        height={700}
                        width={700}
                    />
                }
            </div>
        </div>
    );
};

export default Room;