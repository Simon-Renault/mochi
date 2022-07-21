// Databses
export const drawingDatabaseId = process.env.NOTION_DRAWING_DATABASE_ID;
export const blogPostsDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

//Nav & Ui
export const NAV_ITEMS = [
	{
		id: 0,
		navTitle: "Home",
		url: "/",
	},
	{
		id: 1,
		navTitle: "Blog",
		url: "/blog",
	},
	{
		id: 2,
		navTitle: "Gallery",
		url: "/artworks",
	},
	{
		id: 3,
		navTitle: "About",
		url: "/about",
	},
];

//Shop
export const PRINT_VARIANTS = {
	small: {
		title: "Small",
		dimensions: "21 x 29.7cm",
		message:
			"Perfect as a present or to display in a small space. Fine details can only be discovered up close.",
	},
	medium: {
		title: "Medium",
		dimensions: "29.7 x 42cm",
		message:
			"The artwork as it was intended to be seen. Perfect for all room size",
	},
	large: {
		title: "Large",
		dimensions: "42 x 59.4cm",
		message:
			"Larger print to appreciate the details from afar. Suits best medium to large rooms.",
	},
};
//User
export const USER = {
	FullName: "Simon Renault",
	FirstName: "Simon",
	LastName: "Renault",
	email: "simon.renault.pro@gmail.com",
	phone: "+44 (0) 7902 817057",
};
