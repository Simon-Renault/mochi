import { gql } from "@apollo/client";

export const createCheckoutMutation = gql``;

export default async function handler(req, res) {
	try {
		const variables = {
			input: {
				lineItems: JSON.parse(req.body).lines,
			},
		};

		const data = "test";

		res.status(200).json({
			webUrl: data,
		});
	} catch (e) {
		res.status(500).json({ error: e });
	}
}
