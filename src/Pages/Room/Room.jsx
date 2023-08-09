import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSocket } from '../../Provider/SocketProvide';

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
            <h1>This is my room</h1>
            <h4>{
                remoteSocketId ? `${remoteSocketEmail} joined` : 'No one in the room'
            }</h4>
            {
                remoteSocketId && <button onClick={handleCallUser}>Call</button>
            }
            {
                myStream && <ReactPlayer
                    url={myStream}
                    playing
                    muted
                    height='300px'
                    width={400}
                />
            }
        </div>
    );
};

export default Room;