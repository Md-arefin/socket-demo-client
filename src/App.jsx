import { useCallback, useState } from 'react'
import './App.css'


function App() {

  // const [email, setEmail] = useState('');
  // const [room, setRoom] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const room = form.room.value;

    console.log(email, room)
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
