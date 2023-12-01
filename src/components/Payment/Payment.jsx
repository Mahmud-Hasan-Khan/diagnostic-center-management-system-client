import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK);

const Payment = ({ _id, title, discountPrice, handleBookNow }) => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm handleBookNow={handleBookNow} discountPrice={discountPrice} _id={_id} title={title} ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

Payment.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    discountPrice: PropTypes.number.isRequired,
    handleBookNow: PropTypes.func.isRequired
}

export default Payment;
