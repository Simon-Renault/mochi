export interface AboutStoryblok {
  text?: string;
  _uid: string;
  component: "about";
  [k: string]: any;
}

export interface ArticleCardStoryblok {
  article?: string;
  _uid: string;
  component: "article_card";
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}

export interface ArtworkStoryblok {
  cover?: AssetStoryblok;
  text?: any;
  _uid: string;
  component: "artwork";
  [k: string]: any;
}


export interface BlogpostStoryblok {
  cover?: AssetStoryblok;
  content?: any;
  _uid: string;
  component: "blogpost";
  [k: string]: any;
}

export interface BorderStoryblok {
  elevated?: boolean;
  _uid: string;
  component: "border";
  [k: string]: any;
}

export interface GalleryStoryblok {
  drawings?: any[];
  _uid: string;
  component: "gallery";
  [k: string]: any;
}


export interface GreetingsStoryblok {
  name?: string;
  greeting?: string;
  cover?: AssetStoryblok;
  _uid: string;
  component: "greetings";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: any[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface SectionStoryblok {
  content?: any[];
  elevated?: boolean;
  borders?: ("top" | "bottom")[];
  _uid: string;
  component: "section";
  [k: string]: any;
}
