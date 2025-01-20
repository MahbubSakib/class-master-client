import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useClassDetails from "../../hooks/useClassDetails";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";

const CheckoutForm = () => {
    const stripe = useStripe();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transectionId, setTransectionId] = useState('');
    const { id } = useParams();
    const { classDetails } = useClassDetails(id);
    const price = classDetails?.price;
    console.log(price);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            console.log('payment error:', error);
            setError(error.message);
        } else {
            console.log('payment methid:', paymentMethod);
            setError('');
        }

        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if(confirmError){
            console.log('confirm error');
        }
        else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transection id', paymentIntent.id);
                setTransectionId(paymentIntent.id)
            }
        }
    }
    return (
        <div className="border-2 border-gray-300 p-5 rounded-md">
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
                <button className="btn bg-primary px-8 mt-10" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="mt-5 text-red-600">{error}</p>
                {transectionId && <p className="text-green-600">Your Transection id: {transectionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;