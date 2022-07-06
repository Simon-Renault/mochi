export interface IImage {
	src: string;
	blurDataURL: string;
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
}
