/** @jsx jsx */
import { jsx, Heading, Flex } from 'theme-ui';
import { HeadFC, Link } from 'gatsby';
import Layout from './layout';
import Listing from './listing';
import useMinimalBlogConfig from '../hooks/use-minimal-blog-config';
import replaceSlashes from '../utils/replaceSlashes';
import Seo from './seo';
import usePosts from '../hooks/use-post';

export type MBBlogProps = {
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

const Blog = () => {
	const { tagsPath, basePath } = useMinimalBlogConfig();
	const posts = usePosts();

	return (
		<Layout>
			<Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
				<Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
					Blog
				</Heading>
				<Link
					sx={(t) => ({ ...t.styles?.a, variant: `links.secondary`, marginY: 2 })}
					to={replaceSlashes(`/${basePath}/${tagsPath}`)}
				>
					모든 카테고리 보기
				</Link>
			</Flex>
			<Listing posts={posts.nodes} sx={{ mt: [4, 5] }} />
		</Layout>
	);
};

export default Blog;

export const Head: HeadFC = () => <Seo title="Blog" />;
