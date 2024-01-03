import { graphql, useStaticQuery } from 'gatsby';

type Props = {
	posts: {
		slug: string;
		title: string;
		date: string;
		excerpt: string;
		description: string;
		tags?: {
			name: string;
			slug: string;
		}[];
	}[];
};

const usePosts = () => {
	const data = useStaticQuery<Props>(graphql`
		query {
			posts: allPost(sort: { date: DESC }) {
				nodes {
					slug
					title
					date(formatString: "YYYY년 MM월 DD일")
					excerpt
					description
					tags {
						name
						slug
					}
				}
			}
		}
	`);

	return data.posts;
};

export default usePosts;
