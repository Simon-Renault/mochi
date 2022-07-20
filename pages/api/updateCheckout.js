import { shopifyClientQL } from "@lib/shopifyClient";
import { gql } from "@apollo/client";

export const createCheckoutMutation = gql`
	mutation checkoutCreate($input: CheckoutCreateInput!) {
		checkoutCreate(input: $input) {
			checkout {
				id
				webUrl
			}
		}
	}
`;

export default async function handler(req, res) {
	try {
		const variables = {
			input: {
				lineItems: JSON.parse(req.body).lines,
			},
		};

		const data = await shopifyClientQL(createCheckoutMutation, variables);

		res.status(200).json({
			webUrl: data.checkoutCreate.checkout.webUrl,
		});
	} catch (e) {
		res.status(500).json({ error: e });
	}
}
