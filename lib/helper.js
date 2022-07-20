export const addProductToCart = async (lines) => {
	const body = JSON.stringify({
		lines,
	});

	const res = await fetch("/api/createCheckout", {
		method: "POST",
		body,
	});

	return await res.json();
};
