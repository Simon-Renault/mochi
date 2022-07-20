export interface IImage {
	src: string;
	altText: string;
	blurDataURL?: string;
	width: number;
	height: number;
}

export interface IPost {
	cover: IImage;
	title: string;
	id: string;
	path: string;
}

export interface IDrawing {
	cover: IImage;
	title: string;
	id: string;
	path: string;
	minPrice: string;
	maxPrice: string;
	descriptionHtml: string;
	description: string;
}

export interface IVariant {
	id: string;
	type: "original" | "print";
	size: "medium" | "large" | "small";
	currentlyNotInStock: boolean;
	availableForSale: boolean;
	price: {
		amount: string;
		currencyCode: string;
	};
}
