/** @jsx jsx */
import { jsx, Link } from 'theme-ui';
import useSiteMetadata from '../hooks/use-site-metadata';

const Footer = () => {
	const { siteTitle } = useSiteMetadata();

	return (
		<footer
			sx={{
				boxSizing: `border-box`,
				display: `flex`,
				justifyContent: `space-between`,
				mt: [6],
				color: `secondary`,
				a: {
					variant: `links.secondary`,
				},
				flexDirection: [`column`, `column`, `row`],
				variant: `dividers.top`,
			}}
		>
			<div sx={{ display: 'flex', alignItems: 'center' }}>
				&copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved.
				<img
					sx={{ width: '120px', ml: 3 }}
					id="hits"
					src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Ftruebrary&count_bg=%238CC7BB&title_bg=%238CC7BB&icon=leaflet.svg&icon_color=%23FFFFFF&title=TODAY&edge_flat=false"
				/>
			</div>
			<div>
				<Link
					aria-label="Link to the theme's GitHub repository"
					href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-minimal-blog"
				>
					Theme
				</Link>
				by
				<Link
					aria-label="Link to the theme author's website"
					href="https://www.lekoarts.de?utm_source=minimal-blog&utm_medium=Theme"
				>
					LekoArts
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
