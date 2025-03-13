import { useEffect } from 'react'
import './App.css'
import axios from "axios";

function App() {

  useEffect(() => {
    console.log('enter useEffet')
    const fetchData = async () => {
      try {
        console.log('enter function')
        const response = await axios.get('https://restaurant-server-k5jh.onrender.com/user-service/getAll/restaurant')
        console.log('response ', response)
      } catch (error: any) {
        console.log('fetch error: ', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="bg-blue-500 text-white p-4 text-center">
        Tailwind is working!
      </div>
    </>
  )
}

export default App
