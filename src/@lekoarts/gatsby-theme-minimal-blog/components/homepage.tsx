/** @jsx jsx */
import { jsx } from 'theme-ui';
import { HeadFC, Link } from 'gatsby';
import Layout from './layout';
import Title from './title';
import Listing from './listing';
import List from './list';
import useMinimalBlogConfig from '../hooks/use-minimal-blog-config';
import useSiteMetadata from '../hooks/use-site-metadata';
import replaceSlashes from '../utils/replaceSlashes';
import { visuallyHidden } from '../styles/utils';
import Seo from './seo';
import Hero from '../texts/hero.mdx';
import Bottom from '../texts/bottom.mdx';
import usePosts from '../hooks/use-post';

export type MBHomepageProps = {
	posts: {
		slug: string;
		title: string;
		date: string;
		excerpt: string;
		description: string;
		timeToRead?: number;
		tags?: {
			name: string;
			slug: string;
		}[];
	}[];
};
// { posts }: MBHomepageProps
const Homepage = () => {
	const { basePath, blogPath } = useMinimalBlogConfig();
	const { siteTitle } = useSiteMetadata();
	const posts = usePosts();

	return (
		<Layout>
			<h1 sx={visuallyHidden}>{siteTitle}</h1>
			<section sx={{ mb: [5, 5, 6], p: { fontSize: [1, 2, 3] }, variant: `section_hero` }}>
				<Hero />
			</section>
			<Title text="최근 게시글">
				<Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>모든 글 보기</Link>
			</Title>
			<Listing posts={posts.nodes} showTags={true} />
			<List>
				<Bottom />
			</List>
		</Layout>
	);
};

export default Homepage;

export const Head: HeadFC = () => <Seo />;
