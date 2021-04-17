import Layout from "../components/layout";
import Head from "next/head";
import Container from "../components/container";
import { META_TITLE } from "../lib/constants";
import Intro from "../components/intro";
import { getContentBySlug } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";
import ContentType from "../types/content";
import PostBody from "../components/post-body";

type Props = {
  contentPage: ContentType;
};

const About = ({ contentPage }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{contentPage.title || META_TITLE}</title>
        </Head>
        <Container>
          <Intro title="About" withSide={false} />
          <PostBody content={contentPage.content} />
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const post = getContentBySlug("about", ["title", "content"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      contentPage: {
        ...post,
        content,
      },
    },
  };
}

export default About;
