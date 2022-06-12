const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);

const stripePayment = async (req, res) => {
	const { purchase, total_amount, shipping_fee } = req.body;
	const calculateOrderAmount = () => {
		return total_amount + shipping_fee;
	};
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(),
		currency: "usd",
	});
	res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripePayment;
