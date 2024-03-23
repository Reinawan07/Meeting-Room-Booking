import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ClientPage() {
    const [client, setClient] = useState([]);

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
                await axios.delete(`http://localhost:3000/client/${id}`, { 
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });

                setClient(client.filter(client => client.id !== id));

                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        } catch (error) {
            console.error("errordelete", error);
            Swal.fire("Failed!", "There was an issue deleting the client.", "error");
        }
    }

    return (
        <div className="w-full mt-10">
            <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-xl font-bold">List Clients</h2>
                <Link to="/add-client" className="btn btn-info btn-sm">Add Client</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th>No</th>
                            <th><b>Name</b></th>
                            <th><b>Email</b></th>
                            <th><b>Phone</b></th>
                            <th><b>Credit</b></th>
                            <th><b>Action</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {client.map((client, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>{client.credit}</td>
                                <td className="flex gap-2">
                                    <Link to={`/edit-client/${client.id}`} className="btn btn-xs btn-primary">Edit</Link>
                                    <button 
                                onClick={() => handleDelete(client.id)} 
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
