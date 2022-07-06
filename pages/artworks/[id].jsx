import Head from "next/head";
import { getDatabase, getPage, getBlocks } from "../../lib/notion";
import { drawingDatabaseId } from "../index";
import RenderPage, { Text } from "@lib/notionPage";
import PageSection from "@components/PageSection";
import css from "../index.module.scss";

export default function Post({ page, blocks }) {
    if (!page || !blocks) {
        return <div />;
    }

    return (
        <>
            <Head>
                <title>{page.properties.Name.title[0].plain_text}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PageSection>
                    <h1>
                        <Text text={page.properties.Name.title} />
                    </h1>

                    <div className={css.image_container}>
                        <img src={page.properties.Image.files[0].file.url} />
                    </div>
                </PageSection>
                <PageSection>
                    <div className={css.artwork_page}>
                        <div> {RenderPage(blocks)}</div>
                        <div>
                            <div className={css.details}> </div>
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
