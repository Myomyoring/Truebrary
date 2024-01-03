/** @jsx jsx */
import * as React from 'react';
import { jsx, Box } from 'theme-ui';
import { Link } from 'gatsby';
import ItemTags from './item-tags';

type BlogListItemProps = {
	post: {
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
	};
	showTags?: boolean;
};

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
	<Box mb={4}>
		{post.tags && showTags && (
			<div>
				<ItemTags tags={post.tags} />
			</div>
		)}
		<Link to={post.slug} sx={(t) => ({ ...t.styles?.a, fontSize: [1, 2, 3], fontWeight: `semibold`, color: `text` })}>
			{post.title}
		</Link>
		<p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: 17 }}>{post.excerpt}</p>
		<p sx={{ fontSize: 13 }}>{post.date}</p>
	</Box>
);

export default BlogListItem;
