import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function RoomPage() {
    const [room, setRooms] = useState([]);

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
                await axios.delete(`http://localhost:3000/room/${id}`, { 
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });

                setRooms(room.filter(room => room.id !== id));

                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        } catch (error) {
            console.error("errordelete", error);
            Swal.fire("Failed!", "There was an issue deleting the room.", "error");
        }
    }

    return (
        <div className="w-full mt-10">
            <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-xl font-bold">List Rooms</h2>
                <Link to="/add-room" className="btn btn-info btn-sm">Add Room</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th>No</th>
                            <th><b>Room Name</b></th>
                            <th><b>Cost Per Hour</b></th>
                            <th><b>Action</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {room.map((room, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{room.roomName}</td>
                                <td>{room.costPerHour}</td>
                                <td className="flex gap-2">
                                    <Link to={`/edit-room/${room.id}`} className="btn btn-xs btn-primary">Edit</Link>
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
