import Head from "next/head";
import Link from "next/link";
import { siteMeta } from "../../blog.config";
import Layout from "./default";
import SyntaxHighlight from "../syntax-highlight";
import PublishedAt from "../utils/published-at";
import blogposts from "../../posts/index";
import NextPrevPost from "../next-prev-post";

function BlogPost({ path, meta, children }) {
  const currentPostIndex = blogposts
    .map(({ title }) => title)
    .indexOf(meta.title);
  const previousPost = blogposts[currentPostIndex + 1];
  const nextPost = blogposts[currentPostIndex - 1];

  return (
    <Layout pageTitle={meta.title} ogImage={meta.image}>
      <Head>
        <meta property="og:image" content={meta.image} />
      </Head>

      <SyntaxHighlight />
      <article className="h-entry">
        <img className="post-image" src={meta.image} alt={meta.title} />
        <header>
          <h1 className="p-name">{meta.title}</h1>

          <div>
            <PublishedAt date={meta.publishedAt} link={path} />

            <span
              className="p-author h-card"
              style={{ "marginLeft": "15px", "color": "white", "fontWeight": "bold" }}
            >
              {meta.author}
            </span>
          </div>
        </header>
        <div className="e-content">{children}</div>
        <footer>
          {(previousPost || nextPost) && (
            <div className="post-pagination">
              {previousPost && (
                <NextPrevPost
                  title={previousPost.title}
                  path={previousPost.path}
                  position="previous"
                />
              )}
              {nextPost && (
                <NextPrevPost
                  title={nextPost.title}
                  path={nextPost.path}
                  position="next"
                />
              )}
            </div>
          )}
        </footer>
      </article>
      <style jsx>{`
        .post-image {
          border-radius: 5px;
        }

        header {
          margin-bottom: 2em;
        }

        [rel="author"] {
          margin-left: 1em;
        }

        article {
          margin-bottom: 2em;
        }

        footer {
          margin-top: 2em;
        }

        .post-pagination {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      `}</style>
    </Layout>
  );
}

export default BlogPost;
