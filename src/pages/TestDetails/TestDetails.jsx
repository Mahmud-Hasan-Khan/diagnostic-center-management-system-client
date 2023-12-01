import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container/Container";
import { useLoaderData } from "react-router-dom";
import "./TestDetails.css"
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";
import Payment from "../../components/Payment/Payment";

const TestDetails = () => {
    const { _id, title, image, shortDescription, price, availableDates } = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [availableSlots, setAvailableSlots] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(price);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
        // handleBookNow();
    };
    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // You may want to reset the selected time when the date changes
        setSelectedTime("");
        setAvailableSlots(0);

        // Find the selected date object
        const selectedDateObj = availableDates.find(
            (dateObj) =>
                moment(dateObj.date).isSame(date, 'day')
        );

        // If the selected date object is found, update the available slots
        if (selectedDateObj) {
            setAvailableSlots(selectedDateObj.slots);
        }

    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    // const updateAvailableSlots = (id) => {

    //     // Update the available slots on the backend
    //     axiosSecure
    //         .patch(`/updateSlot/${id}/decrementSlot`)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 // Backend update successful
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    const handleApplyCoupon = (e) => {
        e.preventDefault();

        const form = e.target;
        const couponCode = form.couponCode.value;
        console.log(couponCode);
        if (form.couponCode.value === 'MEDICARE05') {
            const newPrice = price - (price * 0.05);
            setDiscountPrice(newPrice);
        }
    }

    const handleBookNow = () => {
        // Implement your booking logic here with selectedDate and selectedTime
        if (user && user?.email) {
            const UpcomingAppointment = {
                email: user.email,
                testTitle: title,
                PaymentAmount: discountPrice,
                appointmentDate: selectedDate,
                appointmentTime: selectedTime,
                reportStatus: 'Pending',
                testStatus: 'Pending'
            }
            if (selectedDate && selectedTime) {
                axiosSecure.post('/upcomingAppointments', UpcomingAppointment)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.insertedId) {
                            // updateAvailableSlots();
                            toast.success(`You have successfully booked for ${title} ${selectedDate.toLocaleDateString()} at ${selectedTime}`);
                            // refetch cart to update the cart item
                            // refetch();
                        }
                    })
            } else {
                toast.error("Please select both date and time before booking.");
            }
        }
        console.log(selectedDate, selectedTime);
    };
    const availableDateValues = availableDates.map((dateObj) => new Date(dateObj.date));

    return (
        <div>
            <Helmet>
                <title>MediCare | Test Details</title>
            </Helmet>
            <Container>
                <div className="card mx-auto py-4">
                    <div className="flex mx-auto flex-col lg:flex-row  items-center justify-evenly gap-6">
                        <div
                            className="card w-96 h-[450px] bg-base-100 border-y-2 border-[#05d6f7] shadow-xl"
                        >
                            <figure>
                                <img
                                    src={image}
                                    alt="instructor"
                                    className="rounded-xl h-full object-fill w-full transition-transform duration-500"
                                />
                            </figure>
                            <div className="lg:pl-5 px-2 py-4 lg:py-2 w-96 my-auto space-y-1">
                                <div className="flex justify-between">
                                    <h2 className="card-title text-[#05d6f7]">{title}</h2>
                                    <p className="text-orange-500 font-semibold">Only at: ${price}</p>
                                </div>
                                <p><span className="font-medium">Description:</span> {shortDescription}</p>
                                <div className="bg-base-200 rounded py-1">
                                    <p className="text-center">Available Dates & Slots</p>
                                    <div className="grid grid-cols-3 gap-2 place-items-center text-center">
                                        {availableDates.map((date) => (
                                            <p className="text-sm p-1 border bg-lime-100 rounded" key={date.date}>
                                                {moment(date.date).format("MMM Do YYYY")} Slots: {date.slots}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card w-96 h-[450px] bg-base-100 border-y-2 border-[#05d6f7] shadow-xl">
                            <div className="mt-4 mx-auto">
                                {/* Display calendar with available dates */}
                                <Calendar
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    tileDisabled={({ date }) => !availableDateValues.some(
                                        (availableDate) =>
                                            availableDate.getDate() === date.getDate() &&
                                            availableDate.getMonth() === date.getMonth() &&
                                            availableDate.getFullYear() === date.getFullYear()
                                    )}
                                />
                            </div>
                            <div className="flex items-center mt-4 gap-2">
                                <div className="flex-1">
                                    <label className="font-medium">Select Time:</label>
                                    <select
                                        value={selectedTime}
                                        onChange={handleTimeChange}
                                        className="border rounded p-2 w-full"
                                    >
                                        <option value="" disabled>
                                            Select Time
                                        </option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="02:00 PM">02:00 PM</option>
                                    </select>
                                </div>
                                <div className="flex-1 ">
                                    <p>Available Slot: {availableSlots}</p>
                                </div>
                            </div>

                            <div className="px-4">
                                <div className="flex justify-center pt-4 pb-6">
                                    {
                                        !selectedDate || !selectedTime ? <button
                                            onClick={openModal}
                                            className="bg-[#e00000d9] hover:bg-[#e00000] flex items-center text-white font-medium rounded p-2 w-fit" disabled
                                        >
                                            Select date and time for booking
                                        </button> : <button
                                            onClick={openModal}
                                            className="bg-orange-500 hover:bg-[#e00000] flex items-center text-white font-medium rounded p-2 w-fit"
                                        >
                                            Book Now
                                        </button>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Modal */}
                <dialog id="my_modal_5" className={`modal ${isModalOpen ? "modal-open" : ""}`}>
                    <div className="modal-box w-full">

                        {/* apply coupon */}
                        <div className="card w-auto">
                            <h5> Payable Amount : ${discountPrice}</h5>
                            <div className='flex items-center justify-between'>
                                <h2 className="text-2xl font-medium">Have coupon?</h2>
                                <h2 className="text-2xl font-medium text-white bg-[#e00000] rounded-s-badge p-1 ">Get 5% Discount</h2>
                            </div>
                            <form onSubmit={handleApplyCoupon}>
                                <div className="form-control p-6">
                                    <label className="input-group flex items-center justify-between">
                                        <input type="text" name='couponCode' placeholder="Coupon code" className="rounded-lg p-3 border border-red-300" />
                                        <input type="submit" value="Apply Coupon" className="btn bg-[#f97316] text-xl font-medium text-white p-3 rounded-lg hover:bg-[#ff9416] hover:shadow-lg mt-[1px] " style={{ textTransform: "none" }} />
                                    </label>
                                </div>
                            </form>
                        </div>
                        <Payment _id={_id} title={title} discountPrice={discountPrice} handleBookNow={handleBookNow} ></Payment>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={closeModal}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </Container>
        </div>
    );
};

export default TestDetails;


