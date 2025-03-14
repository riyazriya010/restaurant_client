import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import apiCalls from "../api/restaurant";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// interface RestaurantData {
//     name: string;
//     contact: string;
//     address: string
// }

function EditRestaurant() {
    const [searchParams] = useSearchParams();
    const [id, setId] = useState<string | ''>('')
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const getId = searchParams.get('id')
        if (getId) {
            console.log('getId: ',getId)
            setId(getId)
        }

        const getData = localStorage.getItem('restaurantData')
        console.log('getData: ',getData)
        if (getData) {
            const parsedData = JSON.parse(getData)
            setValue("name", parsedData.name);
            setValue("contact", parsedData.contact);
            setValue("address", parsedData.address);
        }
    }, [])

    const onSubmit = async (data: any) => {
        try {
            console.log('data ',data)
            console.log('id ',id)
            const response = await apiCalls.editRestaurant(id, data)
            console.log('response ',response)
            if (response) {
                toast.success('Restaurant Edited Successfully')
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        } catch (error: any) {
            console.log('error edit ', error)
        }
    }

    return (
        <>
            <ToastContainer
                autoClose={2000}
                pauseOnHover={false}
                transition={Slide}
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnFocusLoss={true}
            />
            <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-12 underline decoration-yellow-400 decoration-4">
                    🍽️ Edit Restaurant
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200 hover:border-yellow-400 transition duration-300"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Restaurant Name</label>
                        <input
                            type="text"
                            {...register("name",
                                {
                                    required: "Restaurant name is required",
                                    pattern: {
                                        value: /^[A-Za-z][A-Za-z0-9]*(?:\s[A-Za-z][A-Za-z0-9]*)*$/,
                                        message: "Name must start with a letter and contain only single spaces",
                                    },

                                })}
                            className="w-full p-3 border rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                        />
                        {typeof errors.name?.message === "string" && (
                            <p className="text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Contact (Phone)</label>
                        <input
                            type="text"
                            {...register("contact", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Please enter a valid phone number (10 digits)",
                                },
                            })}
                            className="w-full p-3 border rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                        />
                        {typeof errors.contact?.message === "string" && (
                            <p className="text-red-500 mt-1">{errors.contact.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Address</label>
                        <input
                            type="text"
                            {...register("address", {
                                required: "Address is required",
                                pattern: {
                                    value: /^[A-Za-z0-9\/]+(?:,\s?[A-Za-z0-9\/]+)*(?:\s[A-Za-z0-9\/]+)*$/,
                                    message: "Address must start with a letter and contain only single spaces",
                                },
                            })}
                            className="w-full p-3 border rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                        />
                        {typeof errors.address?.message === "string" && (
                            <p className="text-red-500 mt-1">{errors.address.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-white font-bold py-3 rounded-lg hover:bg-yellow-500 transition duration-300"
                    >
                    Save
                    </button>
                </form>
            </div>
        </>
    )
}

export default EditRestaurant
