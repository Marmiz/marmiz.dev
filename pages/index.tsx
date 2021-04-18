import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { META_TITLE } from "../lib/constants";
import Post from "../types/post";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  // Keeping heroPost in case later we want to utilize it.
  // So far all content is displayed equally.
  let heroPost: Post | undefined;
  const morePosts = allPosts;
  return (
    <>
      <Layout>
        <Head>
          <title>{"Home | Marmiz" || META_TITLE}</title>
        </Head>
        <Container>
          <Intro title="Blog" withSide={true} />
          {heroPost ? (
            <HeroPost
              title={heroPost?.title}
              coverImage={heroPost?.coverImage}
              date={heroPost?.date}
              author={heroPost?.author}
              slug={heroPost?.slug}
              excerpt={heroPost?.excerpt}
            />
          ) : null}
          {morePosts.length > 0 && (
            <MoreStories posts={morePosts} withH2={false} />
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
