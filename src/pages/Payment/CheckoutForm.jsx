import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useClassDetails from "../../hooks/useClassDetails";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CheckoutForm = () => {
    const stripe = useStripe();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transectionId, setTransectionId] = useState('');
    const { id } = useParams();
    const { classDetails } = useClassDetails(id);
    const price = classDetails?.price;
    const navigate = useNavigate();
    console.log(price);

    useEffect(() => {
        if (price) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Error creating payment intent:', err);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            console.log('Payment method error:', paymentMethodError);
            setError(paymentMethodError.message);
            return;
        }

        setError('');

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('Confirm error:', confirmError);
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded:', paymentIntent);
            setTransectionId(paymentIntent.id);

            // Save payment and enrollment info to the backend
            const paymentData = {
                transactionId: paymentIntent.id,
                email: user?.email,
                classId: id, // Class ID from useParams
                className: classDetails?.title, // Class name or title
                price: classDetails?.price,
            };

            try {
                const response = await axiosSecure.post('/save-payment', paymentData);
                if (response.data.success) {
                    console.log('Payment and enrollment saved successfully:', response.data);
                    // Redirect to enrolled classes page
                    navigate('/dashboard/myEnrollClass')
                }
            } catch (error) {
                console.error('Error saving payment and enrollment info:', error);
            }
        }
    };


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