import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KvfVjR29ouTNcS8hKVVWmVdh26RhDkw6HK8lggKQ0bE1h1lHRiCWUyUwXh4gSOLre9oJKSkQzePUNFOBUuU5mSh00SNTliKQl"
);

function CheckoutButton({ handleClick }) {
  //   const handleClick = async () => {
  //     const stripe = await stripePromise;

  //     const res = await fetch(
  //       "http://localhost:8201/api/v1/admin/stripe-route/create-checkout-session",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId: userId,
  //           couponId: couponId,
  //         }),
  //       }
  //     );

  //     const data = await res.json();

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: data.id,
  //     });

  //     if (result.error) {
  //       console.error("Stripe checkout error:", result.error.message);
  //     }
  //   };

  return (
    <button onClick={handleClick} className="thm-btn w-100 text-center">
      Checkout
    </button>
  );
  //   return <button onClick={handleClick}>Pay ₹50</button>;
}

export default function App({ handleClick }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutButton handleClick={handleClick} />
    </Elements>
  );
}
