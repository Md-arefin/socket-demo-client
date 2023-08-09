import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../../Provider/SocketProvide';

const Room = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [remoteSocketEmail, setRemoteSocketEmail] = useState(null);

    const handleUserJOined = useCallback(({ email, id }) => {
        console.log(`email joined ${email}`)
        setRemoteSocketId(id);
        setRemoteSocketEmail(email);
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
                remoteSocketId ? `${remoteSocketEmail} joined` : ''
            }</h4>
        </div>
    );
};

export default Room;