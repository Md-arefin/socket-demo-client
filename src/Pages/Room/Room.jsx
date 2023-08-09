import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSocket } from '../../Provider/SocketProvide';
import Peer from '../Services/Peer';
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
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });

        const offer = await Peer.getOffer();
        socket.emit('user:call', { to: remoteSocketId, offer});

        setMyStream(stream);
    }, [])

    const handleIncomingCall = useCallback(({ from, offer }) =>{
        console.log((`Incoming cal`, from , offer))
    },[])

    useEffect(() => {
        socket.on('user:joined', handleUserJOined);
          socket.on("incoming:call", handleIncomingCall);

        return () => {
            socket.off('user:joined', handleUserJOined);
            socket.off("incoming:call", handleIncomingCall);

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
                        muted
                        height={700}
                        width={700}
                    />
                }
            </div>
        </div>
    );
};

export default Room;