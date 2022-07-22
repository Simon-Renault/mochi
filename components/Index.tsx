import Page from "@components/storyblok/Page";
import HomeGreetings from "@components/sections/HomeGreetings";
import Section from "@components/storyblok/Section";

export const Components = {
	page: Page,
	greetings: HomeGreetings,
	section: Section,
};

const Component = ({ blok }) => {
	if (typeof Components[blok.component] !== "undefined") {
		const Component = Components[blok.component];
		return <Component blok={blok} />;
	}
	return <div>no component defined</div>;
};

export default Component;
