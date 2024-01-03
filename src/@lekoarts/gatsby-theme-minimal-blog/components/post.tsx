/** @jsx jsx */
import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { jsx, Heading } from 'theme-ui';
import Layout from './layout';
import ItemTags from './item-tags';
import Seo from './seo';
import PostFooter from './post-footer';
import Giscus from '@giscus/react';

export type MBPostProps = {
	post: {
		slug: string;
		title: string;
		date: string;
		tags?: {
			name: string;
			slug: string;
		}[];
		description?: string;
		canonicalUrl?: string;
		excerpt: string;
		timeToRead?: number;
		banner?: {
			childImageSharp: {
				resize: {
					src: string;
				};
			};
		};
	};
};

const px = [`16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.1) 0px ${v} ${v} 0px`);

const Post: React.FC<React.PropsWithChildren<PageProps<MBPostProps>>> = ({ data: { post }, children }) => (
	<Layout>
		{post.tags && (
			<span>
				<ItemTags tags={post.tags} />
			</span>
		)}
		<Heading as="h1" variant="styles.h1">
			{post.title}
		</Heading>
		<span sx={{ mt: 2, a: { color: `secondary` }, fontSize: [1, 1, 1] }}>
			<time>{`${post.date.split('.').reverse().join('.')}`}</time>
		</span>
		<section
			sx={{
				my: 5,
				'.gatsby-resp-image-wrapper': {
					my: [4, 4, 5],
					borderRadius: `4px`,
					boxShadow: shadow.join(`, `),
					'.gatsby-resp-image-image': {
						borderRadius: `4px`,
					},
				},
				variant: `layout.content`,
			}}
		>
			{children}
		</section>
		<PostFooter post={post} />
		<Giscus
			id="comments"
			repo="Myomyoring/Myomyoring.github.io"
			repoId="R_kgDOJcvsxw"
			category="Comments"
			categoryId="DIC_kwDOJcvsx84CbEZK"
			mapping="pathname"
			term="Welcome to @giscus/react component!"
			reactionsEnabled="1"
			emitMetadata="0"
			inputPosition="top"
			theme="preferred_color_scheme"
			lang="ko"
			loading="lazy"
		/>
	</Layout>
);

export default Post;

export const Head: HeadFC<MBPostProps> = ({ data: { post } }) => (
	<Seo
		title={post.title}
		description={post.description ? post.description : post.excerpt}
		image={post.banner ? post.banner?.childImageSharp?.resize?.src : undefined}
		pathname={post.slug}
		canonicalUrl={post.canonicalUrl}
	/>
);
