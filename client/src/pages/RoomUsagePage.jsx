import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function RoomUsagePage() {
    const [room, setRooms] = useState([]);

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await axios.get('http://localhost:3000/usages', {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });
                setRooms(response.data);
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        }

        fetchRooms();
    }, []);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/usage/${id}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });

                setRooms(room.filter(room => room.id !== id));

                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        } catch (error) {
            console.error("errordelete", error);
            Swal.fire("Failed!", "There was an issue deleting the room usage.", "error");
        }
    }

    function formatBookingDate(bookingDate) {
        const date = new Date(bookingDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    return (
        <div className="w-full mt-10">
            <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-xl font-bold">List Room Usage</h2>
                <Link to="/add-usage" className="btn btn-info btn-sm">Add Room Usage</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th>No</th>
                            <th><b>Client Name</b></th>
                            <th><b>Room Name</b></th>
                            <th><b>Start - End Time</b></th>
                            <th><b>Booking Date</b></th>
                            <th><b>Quota Used</b></th>
                            <th><b>Action</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {room.map((room, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{room.client.name}</td>
                                <td>{room.room.roomName}</td>
                                <td>{room.startTime} - {room.endTime}</td>
                                <td>{formatBookingDate(room.bookingDate)}</td>
                                <td>{room.quotaUsed}</td>
                                <td className="flex gap-2">
                                    <Link to={`/edit-usage/${room.id}`} className="btn btn-xs btn-primary">Edit</Link>
                                    <button
                                        onClick={() => handleDelete(room.id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}