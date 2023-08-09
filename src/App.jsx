import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import { useSocket } from './Provider/SocketProvide';


function App() {

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const room = form.room.value;

    console.log(email, room)

    socket.emit('room:join', { email, room });

  }, [])

  const handleJoinRoom = useCallback( (data) => {
    const {email , room } = data;
    navigate(`/room/${room}`);
  }, [navigate])

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);

    return () =>{
      socket.off('room:join', handleJoinRoom)
    }
  }, [])
  

  return (
    <>

      <h1 className="lobby">Welcome to our Lobby</h1>

      <form className='form' onSubmit={handleSubmit}>

        <h1 className="">Enter your email & room id</h1>

        <div>

          <label htmlFor="email">Email: </label>

          <input type="email" name='email' required />

        </div>

        <br />

        <div>

          <label htmlFor="room">Room id: </label>

          <input type="text" name='room' required />

        </div>

        <input className='join' type="submit" value="Join your meeting" />

      </form>
    </>
  )
}

export default App
