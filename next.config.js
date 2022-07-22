const { withPlaiceholder } = require("@plaiceholder/next");
const path = require("path");

module.exports = withPlaiceholder({
	images: {
		domains: [
			"s3.us-west-2.amazonaws.com",
			"cdn.shopify.com",
			"a.storyblok.com",
		],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles/shared")],
		prependData: `@import "shared.scss";`,
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
});
