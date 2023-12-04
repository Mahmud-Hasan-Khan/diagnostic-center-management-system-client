import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-hot-toast";
import { useState } from "react";

const UpdateTest = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const navigate = useNavigate();

    // data Load Using TanStack Query
    const { data: test = {}, refetch } = useQuery({
        queryKey: ['test', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/test/${id}`);
            return res.data;
        }
    })

    const [selectedTestAppointmentDate1, setSelectedTestAppointmentDate1] = useState(null);
    const [selectedTestAppointmentDate2, setSelectedTestAppointmentDate2] = useState(null);
    const [selectedTestAppointmentDate3, setSelectedTestAppointmentDate3] = useState(null);

    const handleUpdateTest = (e) => {
        e.preventDefault();

        // get data from user input
        const form = e.target;
        const title = form.testTitle.value;
        const image = form.image.value;
        const price = form.price.value;
        const priceNumber = parseInt(price);
        const shortDescription = form.shortDescription.value;
        const slots1 = form.slots1.value;
        const slots2 = form.slots2.value;
        const slots3 = form.slots3.value;


        const updateTest = {
            image, title, priceNumber, shortDescription,
            availableDates: [
                {
                    date: selectedTestAppointmentDate1.toISOString().split('T')[0],
                    slots: parseInt(slots1, 10),
                },
                {
                    date: selectedTestAppointmentDate2.toISOString().split('T')[0],
                    slots: parseInt(slots2, 10),
                },
                {
                    date: selectedTestAppointmentDate3.toISOString().split('T')[0],
                    slots: parseInt(slots3, 10),
                },
            ],
        }
        // console.log(updateTest);

        const toastId = toast.loading('Updating Test...');

        // send New added job data to server
        axiosSecure.patch(`/updateTest/${test._id}`, updateTest)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success('Test Updated Successful', { id: toastId });
                    form.reset();
                    refetch()
                    navigate('/dashboard/manageAllTest')
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    const setMinDate = () => {
        return new Date(); // Returns the current date
    };

    return (
        <>
            <Helmet>
                <title>Update A Test | Admin Dashboard</title>
            </Helmet>
            <div>
                <div className='py-4 lg:py-10 w-full'>
                    <div className="bg-white px-4 lg:px-20 py-4 lg:py-6 m-4 lg:mx-28  shadow-2xl rounded-xl">
                        <SectionTitle heading="Update A Test" subheading="Update Existing Test"></SectionTitle>
                        <form onSubmit={handleUpdateTest}>

                            {/* form test Title and image row */}
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="text-lg font-medium ">Test Name</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="text" name="testTitle" required defaultValue={test?.title} className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="text-lg font-medium">Test Price</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="text" name="price" required defaultValue={test?.price} className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>

                            {/* form Category & salary Range row */}
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control md:w-full">
                                    <label className="label">
                                        <span className="text-lg font-medium">Test Image</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="url" name="image" defaultValue={test?.image} required className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>

                            {/* Available Appointment Date and Slot  */}
                            <div className="md:flex justify-between gap-4 mb-8 border p-1 rounded">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-medium">Available Date</span>
                                    </label>
                                    <label className="rounded">
                                        <DatePicker
                                            selected={selectedTestAppointmentDate1}
                                            onChange={(date) => setSelectedTestAppointmentDate1(date)}
                                            className="input input-bordered w-full"
                                            placeholderText="Click Here to Select Date" required
                                            minDate={setMinDate()}
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-medium">Available Slot</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="number" name="slots1" placeholder="Input Slot Number" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            {/* Available Appointment Date and Slot #2  */}
                            <div className="md:flex justify-between gap-4 mb-8 border p-1 rounded">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-medium">Available Date</span>
                                    </label>
                                    <label className="rounded">
                                        <DatePicker
                                            selected={selectedTestAppointmentDate2}
                                            onChange={(date) => setSelectedTestAppointmentDate2(date)}
                                            className="input input-bordered w-full"
                                            placeholderText="Click Here to Select Date" required
                                            minDate={setMinDate()}
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-medium">Available Slot</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="number" name="slots2" placeholder="Input Slot Number" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            {/* Available Date and Slot #3 */}
                            <div className="md:flex justify-between gap-4 mb-8 border p-1 rounded">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-medium">Available Date</span>
                                    </label>
                                    <label className="rounded">
                                        <DatePicker
                                            selected={selectedTestAppointmentDate3}
                                            onChange={(date) => setSelectedTestAppointmentDate3(date)}
                                            className="input input-bordered w-full"
                                            placeholderText="Click Here to Select Date"
                                            required
                                            minDate={setMinDate()}  // Set maxDate to the current date
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-medium">Applicants Slot</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="number" name="slots3" placeholder="Input Slot Number" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>

                            {/* form Short description */}
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="text-lg font-medium">Test Description</span>
                                    </label>
                                    <label className="rounded">
                                        <textarea type="text" name="shortDescription" defaultValue={test?.shortDescription} required className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>

                            <input type="submit" value="Update Test" className="btn-block btn bg-[#e00000d8] text-xl font-medium text-white py-3 rounded-lg hover:bg-[#e00000] hover:shadow-lg" style={{ textTransform: "none" }} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateTest;
