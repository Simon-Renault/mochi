import Head from "next/head";
import { getDatabase, getPage, getBlocks } from "../../lib/notion";
import { drawingDatabaseId } from "../index";
import RenderPage from "@lib/notionPage";
import PageSection from "@components/PageSection";
import BuySection from "@components/shop/BuySection";
import css from "./artworks.module.scss";

export default function Post({ page, blocks }) {
    if (!page || !blocks) {
        return <div />;
    }

    const title = page.properties.Name.title[0].plain_text;

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PageSection className={css.top}>
                    <div className={css.artwork_title}>
                        <p className={css.id}>01 - 10</p>
                        <div className={css.artwork_title_inner}>
                            <h1 className={css.title}>{title}</h1>
                            <p className={css.date}>2020</p>
                        </div>
                    </div>
                    <div className={css.banner}>
                        <div className={css.image_container}>
                            <img
                                src={page.properties.Image.files[0].file.url}
                            />
                        </div>
                    </div>
                </PageSection>

                <PageSection className={css.content}>
                    <div className={css.artwork_page}>
                        {RenderPage(blocks)}

                        <div className={css.sidebar}>
                            <BuySection />
                        </div>
                    </div>
                </PageSection>
            </main>
        </>
    );
}

export const getStaticPaths = async () => {
    const database = await getDatabase(drawingDatabaseId);
    return {
        paths: database.map((page) => ({ params: { id: page.id } })),
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const { id } = context.params;
    const page = await getPage(id);
    const blocks = await getBlocks(id);

    // Retrieve block children for nested blocks (one level deep), for example toggle blocks
    // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
    const childBlocks = await Promise.all(
        blocks
            .filter((block) => block.has_children)
            .map(async (block) => {
                return {
                    id: block.id,
                    children: await getBlocks(block.id),
                };
            })
    );
    const blocksWithChildren = blocks.map((block) => {
        // Add child blocks if the block should contain children but none exists
        if (block.has_children && !block[block.type].children) {
            block[block.type]["children"] = childBlocks.find(
                (x) => x.id === block.id
            )?.children;
        }
        return block;
    });

    return {
        props: {
            page,
            blocks: blocksWithChildren,
        },
        revalidate: 1,
    };
};
