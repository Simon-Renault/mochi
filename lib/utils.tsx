import { getPlaiceholder } from "plaiceholder";
import { IDrawing, IImage, IPost } from "./types";

export const extractImage = async (url: string): Promise<IImage> => {
	const { base64, img } = await getPlaiceholder(url, {
		size: 10,
	});

	return {
		...img,
		blurDataURL: base64,
	};
};

export const formatDrawing = async (drawing: any): Promise<IDrawing> => {
	const { Image, Name } = drawing.properties;
	const cover = await extractImage(Image.files[0].file.url);

	return {
		cover,
		id: drawing.id,
		path: `/artwork/${drawing.id}`,
		title: Name.title[0].plain_text,
	};
};

export const formatPosts = async (post: any): Promise<IPost> => {
	const { Image, Name } = post.properties;
	const cover = await extractImage(Image.files[0].file.url);

	return {
		cover,
		id: post.id,
		path: `/article/${post.id}`,
		title: Name.title[0].plain_text,
	};
};
