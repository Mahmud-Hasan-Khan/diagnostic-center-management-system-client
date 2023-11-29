import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container/Container";
import { useLoaderData } from "react-router-dom";
import "./TestDetails.css"
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TestDetails = () => {
    const { image, title, shortDescription, price, availableDates } = useLoaderData();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    // const [availableSlots, setAvailableSlots] = useState(0);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // You may want to reset the selected time when the date changes
        setSelectedTime("");
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };


    // const updateAvailableSlots = () => {
    //     // Find the selected date object
    //     const selectedDateObj = availableDates.find(
    //         (dateObj) =>
    //             new Date(dateObj.date).getDate() === selectedDate.getDate() &&
    //             new Date(dateObj.date).getMonth() === selectedDate.getMonth() &&
    //             new Date(dateObj.date).getFullYear() === selectedDate.getFullYear()
    //     );

    //     // If the selected date object is found
    //     if (selectedDateObj && selectedDateObj.slots > 0) {
    //         // Update the available slots on the frontend
    //         setAvailableSlots((prevSlots) => prevSlots - 1);

    //         // Update the available slots on the backend
    //         axiosSecure
    //             .patch(`/workingAllTests/${selectedDateObj._id}/decrementSlot`, updateAvailableSlots)
    //             .then((res) => {
    //                 if (res.status === 200) {
    //                     // Backend update successful
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     } else {
    //         // Handle the case where no slots are available for the selected date
    //         console.error("No available slots for the selected date.");
    //     }
    // };



    const handleBookNow = () => {
        // Implement your booking logic here with selectedDate and selectedTime
        if (user && user?.email) {
            const UpcomingAppointment = {
                testTitle: title,
                PaymentAmount: '',
                appointmentDate: selectedDate,
                appointmentTime: selectedTime,
                reportStatus: 'Pending',
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
                <div className="card w-[700px] mx-auto py-4">
                    <div className="mx-auto flex items-center justify-center">
                        <div className="border shadow-lg rounded-lg">
                            <div>
                                <img className="object-cover w-full" src={image} alt="" />
                            </div>
                            <div className="mt-4">
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
                            <div className="mt-4">
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
                                    {/* ... Add more options as needed */}
                                </select>
                            </div>
                            <div className="flex items-center justify-between px-4 pt-2">
                                <p>{shortDescription} </p>
                            </div>
                            <div className="divider"></div>
                            <div className="px-4">
                                <p>{price} </p>
                            </div>
                            <div className="flex justify-center pt-4 pb-6">
                                <button
                                    onClick={handleBookNow}
                                    className="bg-[#e00000d9] hover:bg-[#e00000] flex items-center text-white font-medium rounded p-2 w-fit"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TestDetails;
