const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const storyblokToTypescript = require("storyblok-generate-ts");
const { exec } = require("child_process");

const httpsOptions = {
	key: fs.readFileSync("./certificates/localhost.key"),
	cert: fs.readFileSync("./certificates/localhost.crt"),
};
app.prepare().then(() => {
	exec("yarn run types", () => {});
	storyblokToTypescript({
		componentsJson: require("./components.167481.json"), // pull components with storyblok
		path: __dirname + "/typings/components-schema.ts", // make sure path exists
		titlePrefix: "",
		titleSuffix: "_storyblok",
	});
	createServer(httpsOptions, (req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	}).listen(3000, (err) => {
		if (err) throw err;
		console.log("> Server started on https://localhost:3000");
	});
});
