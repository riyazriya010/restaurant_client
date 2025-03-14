import { useEffect, useState } from 'react'
import apiCalls from '../api/restaurant'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface RestaurantData {
    _id: any
    name: string;
    contact: string;
    address: string
}

function Restaurants() {

    const [data, setData] = useState<RestaurantData[] | []>([])
    const navigate = useNavigate()

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

    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = (data: any) => {

        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Edit",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            denyButtonColor: "#3085d6",
            cancelButtonColor: "#6c757d",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiCalls.deleteRestaurant(data.id)
                console.log('response delet ', response)
                if (response) {
                    fetchData()
                    Swal.fire("Deleted!", "Your restaurant has been deleted.", "success");
                }
            } else if (result.isDenied) {
                navigate(`/edit-restaurant?id=${data.id}`)
                localStorage.setItem('restaurantData', JSON.stringify(data))
            }
        });
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-12 underline decoration-yellow-400 decoration-4">🍽️ Explore Top Restaurants</h1>

                <div className="w-full max-w-7xl flex justify-start mb-3">
                    <button
                        onClick={() => navigate('/add-restaurant')}
                        className="px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
                    >
                        ➕ Add Restaurant
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl">
                    {data && data.map((restaurant: any, index: any) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between min-h-[200px] hover:shadow-2xl transition duration-300 border border-gray-200 hover:border-yellow-400"
                            onClick={() => handleClick(restaurant)}
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

export default Restaurants
