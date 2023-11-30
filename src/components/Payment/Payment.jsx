
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useState } from 'react';


// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK);

const Payment = ({ _id, title, price, handleBookNow }) => {

    const [discountPrice, setDiscountPrice] = useState(price);

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

    return (
        <div>
            <h5> Payable Amount : ${discountPrice}</h5>
            <div className="card w-auto">
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
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm discountPrice={discountPrice} _id={_id} title={title} ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
