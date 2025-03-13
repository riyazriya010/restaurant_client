import { useEffect, useState } from 'react'
import './App.css'
// import axios from "axios";
import apiCalls from './api/restaurant';

interface RestaurantData {
  _id: any
  name: string;
  contact: string;
  address: string
}

function App() {

  const [data, setData] = useState<RestaurantData[] | []>([])

  useEffect(() => {
    console.log('enter useEffet')
    const fetchData = async () => {
      try {
        console.log('enter function')
        const response = await apiCalls.getAllRestaurants()
        console.log('response ', response)
        const resData = (response as { data: { data: any } })?.data?.data;
        setData(resData)
      } catch (error: any) {
        console.log('fetch error: ', error)
      }
    }
    fetchData()
  }, [])

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 underline decoration-yellow-400 decoration-4">🍽️ Explore Top Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl">
        {data && data.map((restaurant: any, index: any) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between min-h-[200px] hover:shadow-2xl transition duration-300 border border-gray-200 hover:border-yellow-400"
            onClick={handleClick}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center capitalize">{restaurant.name}</h2>
            <p className="text-gray-700 text-lg text-center mt-3">📞 {restaurant.contact}</p>
            <p className="text-gray-600 text-center mt-5">📍 {restaurant.address}</p>
            <div className="mt-4 text-center text-yellow-500 font-medium">🌟 Popular Choice</div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
