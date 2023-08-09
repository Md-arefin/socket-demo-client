import './App.css'


function App() {


  return (
    <>

      <h1 className="lobby">Welcome to our Lobby</h1>
      <form className='form'>
      <h1 className="">Enter your email & room id</h1>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id='email' required />
        </div>
        <br />
        <div>
          <label htmlFor="room">Room id: </label>
          <input type="text" id='room' required />
        </div>
      </form>
    </>
  )
}

export default App
