import { ImageLoaderProps } from "next/image";

export const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
	console.log(src);
	return `${src}/m/${width}x0/filters:quality(${quality || 10})`;
};

export const RELATIONS = ["page.featuredDrawings", "page.featuredArticles"];
