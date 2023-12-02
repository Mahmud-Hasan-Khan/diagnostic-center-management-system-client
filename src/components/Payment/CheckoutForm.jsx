import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useAllTests from "../../hooks/useAllTests";

const CheckoutForm = ({ title, discountPrice, handleBookNow }) => {
    const [, refetch] = useAllTests();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();

    useEffect(() => {
        if (discountPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: discountPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, discountPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        } else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                handleBookNow()

                //now save the payment in the database
                const payment = {
                    email: user.email,
                    price: discountPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    testName: title,
                    // menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                // console.log(res.data);
                if (res.data?.insertedId) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        text: 'Payment Done Successfully',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/')
                }
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {
                transactionId && <p className="text-cyan-600">Appointment Successfully Booked!</p>
            }

            {
                transactionId && <p className="text-green-500">Your Transaction id: {transactionId}</p>
            }
        </form>
    );
};

CheckoutForm.propTypes = {
    title: PropTypes.string.isRequired,
    discountPrice: PropTypes.number.isRequired,
    handleBookNow: PropTypes.func.isRequired
}

export default CheckoutForm;