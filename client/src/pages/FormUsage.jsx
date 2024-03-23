import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormUsage() {
    const [client, setClient] = useState([]);
    const [room, setRooms] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        clientId: "1",
        roomId: "1",
        startTime: "",
        endTime: "",
        bookingDate: "",
        quotaUsed: "",
    });
    console.log(formData);

    useEffect(() => {
        if (id) {
            const fetchDataUsage = async () => {
                try {
                    const { data } = await axios({
                        method: "get",
                        url: `http://localhost:3000/usage/${id}`,
                        headers: {
                            Authorization: "Bearer " + localStorage.access_token,
                        },
                    });

                    setFormData(data);
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops",
                        text: error.response.data.message,
                    });
                }
            };
            fetchDataUsage();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await axios.put(`http://localhost:3000/usage/${id}`, formData, {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });
                Swal.fire({
                    title: "Update Success",
                    icon: "success"
                });
                navigate("/usage")
            } else {
                await axios.post(`http://localhost:3000/usage`, formData, {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });
                Swal.fire({
                    title: "Create Success",
                    icon: "success"
                });
                navigate("/usage")
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            });
        }
    };

    useEffect(() => {
        async function fetchClient() {
            try {
                const response = await axios.get('http://localhost:3000/clients', {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });
                setClient(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }

        fetchClient();
    }, []);

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await axios.get('http://localhost:3000/rooms', {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });
                setRooms(response.data);
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        }

        fetchRooms();
    }, []);

    return (
        <>
            <div tabIndex="-1" aria-hidden="true" className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {id ? "Edit Room Usage" : "Add Room Usage"}
                            </h3>
                            <Link to={"/usage"} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </Link>
                        </div>

                        {/* <!-- body --> */}
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="clientId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client Name<span className="text-red-600">*</span></label>
                                    <select
                                        id="clientId"
                                        name="clientId"
                                        value={formData.clientId}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option disabled>Select Client Name</option>
                                        {client &&
                                            client.map((el) => {
                                                return (
                                                    <option key={el.id} value={el.id}>
                                                        {el.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="roomId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Name<span className="text-red-600">*</span></label>
                                    <select
                                        id="roomId"
                                        name="roomId"
                                        value={formData.roomId}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option disabled>Select Room Name</option>
                                        {room &&
                                            room.map((el) => {
                                                return (
                                                    <option key={el.id} value={el.id}>
                                                        {el.roomName}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time <span className="text-red-600">*</span></label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        id="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="startTime" required=""></input>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time <span className="text-red-600">*</span></label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        id="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="endTime" required=""></input>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="bookingDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Booking Date<span className="text-red-600">*</span></label>
                                    <input
                                        type="date"
                                        name="bookingDate"
                                        id="bookingDate"
                                        value={formData.bookingDate}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="bookingDate" required=""></input>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="quotaUsed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quota Used<span className="text-red-600">*</span></label>
                                    <input
                                        type="number"
                                        name="quotaUsed"
                                        id="quotaUsed"
                                        value={formData.quotaUsed}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="quotaUsed" required=""></input>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-primary mt-4">
                                {id ? "Update Room Usage" : "Add Room Usage"}
                            </button>
                            <Link to="/usage" className="btn btn-ghost mt-4 ml-2">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}