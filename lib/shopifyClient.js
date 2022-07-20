import { GraphQLClient } from "graphql-request";
import { gql } from "@apollo/client";

export const shopifyClientQL = async (query, variables) => {
	const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
	const token = process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN;
	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {
			"X-Shopify-Storefront-Access-Token": token,
		},
	});
	return await graphQLClient.request(query, variables);
};

// Use client.query and pass your query as `data`
export const getProducts = async () => {
	const query = gql`
		query getProducts {
			products(first: 20) {
				edges {
					node {
						id
						handle
						title
						description
						descriptionHtml
						priceRange {
							maxVariantPrice {
								amount
								currencyCode
							}
							minVariantPrice {
								amount
								currencyCode
							}
						}
						images(first: 1) {
							edges {
								node {
									url
									altText
									width
									height
								}
							}
						}
					}
				}
			}
		}
	`;
	const variables = {};
	return await shopifyClientQL(query, variables);
};

// Use client.query and pass your query as `data`
export const getProduct = async (id) => {
	const query = gql`
		query getProduct($handle: String!) {
			product(handle: $handle) {
				id
				handle
				title
				description
				descriptionHtml
				priceRange {
					maxVariantPrice {
						amount
						currencyCode
					}
					minVariantPrice {
						amount
						currencyCode
					}
				}
				images(first: 1) {
					edges {
						node {
							url
							altText
							width
							height
						}
					}
				}
			}
		}
	`;
	const variables = { handle: id };
	return await shopifyClientQL(query, variables);
};

// Use client.query and pass your query as `data`
export const getVariants = async (id) => {
	const query = gql`
		query getProduct($handle: String!) {
			product(handle: $handle) {
				id
				variants(first: 20) {
					edges {
						node {
							id
							currentlyNotInStock
							availableForSale
							priceV2 {
								amount
								currencyCode
							}
							selectedOptions {
								name
								value
							}
						}
					}
				}
			}
		}
	`;
	const variables = { handle: id };
	return await shopifyClientQL(query, variables);
};
