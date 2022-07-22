import Page from "@components/storyblok/Page";
import HomeGreetings from "@components/sections/HomeGreetings";
import Section from "@components/storyblok/Section";
import Gallery from "./Gallery";
import AboutMe from "./sections/AboutMe";
import ArticleCard from "./ArticleCard";
import DrawingCard from "./DrawingCard";

export const Components = {
	page: Page,
	greetings: HomeGreetings,
	section: Section,
	gallery: Gallery,
	about: AboutMe,
	article_card: ArticleCard,
	drawing_card: DrawingCard,
};

const Component = ({ blok }) => {
	if (typeof Components[blok.component] !== "undefined") {
		const Component = Components[blok.component];
		return <Component blok={blok} />;
	}
	return <div>no component defined</div>;
};

export default Component;
