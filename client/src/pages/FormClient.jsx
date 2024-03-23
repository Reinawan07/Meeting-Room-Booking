import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormClient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        credit: "",
    });
    console.log(formData);

    useEffect(() => {
        if (id) {
            const fetchDataClient = async () => {
                try {
                    const { data } = await axios({
                        method: "get",
                        url: `http://localhost:3000/client/${id}`,
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
            fetchDataClient();
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

                await axios.put(`http://localhost:3000/client/${id}`, formData, {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });
                Swal.fire({
                    title: "Update Client Success",
                    icon: "success"
                });
                navigate("/client")
            } else {
                await axios.post(`http://localhost:3000/client`, formData, {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });
                Swal.fire({
                    title: "Create Client Success",
                    icon: "success"
                });
                navigate("/client")
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


    return (
        <>
            <div tabIndex="-1" aria-hidden="true" className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {id ? "Edit Client" : "Add Client"}
                            </h3>
                            <Link to={"/client"} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <span className="text-red-600">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@....com" required=""></input>
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span className="text-red-600">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="your_name" required=""></input>
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone <span className="text-red-600">*</span></label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="your_phone" required=""></input>
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="credit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credit<span className="text-red-600">*</span></label>
                                    <input
                                        type="number"
                                        name="credit"
                                        id="credit"
                                        value={formData.credit}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="your_credit" required=""></input>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-primary mt-4">
                                {id ? "Update Client" : "Add Client"}
                            </button>
                            <Link to="/client" className="btn btn-ghost mt-4 ml-2">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}