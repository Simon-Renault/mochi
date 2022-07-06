const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
	images: {
		domains: ["s3.us-west-2.amazonaws.com"],
	},
});
