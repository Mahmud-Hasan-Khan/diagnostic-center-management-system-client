import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddTest = () => {
    const axiosSecure = useAxiosSecure();

    const [selectedTestAppointmentDate1, setSelectedTestAppointmentDate1] = useState(null);
    const [selectedTestAppointmentDate2, setSelectedTestAppointmentDate2] = useState(null);
    const [selectedTestAppointmentDate3, setSelectedTestAppointmentDate3] = useState(null);

    const handleAddATest = (e) => {
        e.preventDefault();

        // get data from user input
        const form = e.target;
        const title = form.testTitle.value;
        const image = form.image.value;
        const price = form.price.value;
        const shortDescription = form.shortDescription.value;
        const slots1 = form.slots1.value;
        const slots2 = form.slots2.value;
        const slots3 = form.slots3.value;


        const newTest = {
            image, title, price, shortDescription,
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
        console.log(newTest);

        const toastId = toast.loading('Adding a new Test...');

        // send New added job data to server
        axiosSecure.post('/addATest', newTest)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('New Test Added Successful', { id: toastId });
                    form.reset();
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
        <div className="">
            <Helmet>
                <title>Add A Test | Admin Dashboard</title>
            </Helmet>
            <div>
                <div className='py-4 lg:py-10 w-full'>
                    <div className="bg-white px-4 lg:px-20 py-4 lg:py-6 m-4 lg:mx-28  shadow-2xl rounded-xl">
                        <SectionTitle heading="Add A Test" subheading="New Test"></SectionTitle>
                        <form onSubmit={handleAddATest}>

                            {/* form test Title and image row */}

                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="text-lg font-medium ">Test Name</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="text" name="testTitle" required placeholder="Test Title" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="text-lg font-medium">Test Price</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="text" name="price" required placeholder="Test Price" className="input input-bordered w-full" />
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
                                        <input type="url" name="image" placeholder="Test Banner Image URL" required className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>

                            {/* Available Appointment Date and Slot  */}
                            <div className="md:flex justify-between gap-4 mb-8 border p-1 rounded">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-medium">Appointment Date</span>
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
                                        <span className="text-lg font-medium">Applicants Slot</span>
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
                                        <span className="text-lg font-medium">Appointment Date</span>
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
                                        <span className="text-lg font-medium">Applicants Slot</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="number" name="slots2" placeholder="Input Slot Number" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            {/* Available Appointment Date and Slot #3 */}
                            <div className="md:flex justify-between gap-4 mb-8 border p-1 rounded">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg font-medium">Appointment Date</span>
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


                            {/* form Short description and job Applicants row */}
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="text-lg font-medium">Test Description</span>
                                    </label>
                                    <label className="rounded">
                                        <textarea type="text" name="shortDescription" placeholder="Test Description" required className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>

                            <input type="submit" value="Add A Test" className="btn-block btn bg-[#e00000] text-xl font-medium text-white py-3 rounded-lg hover:bg-[#ff9416] hover:shadow-lg mb-2" style={{ textTransform: "none" }} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTest;