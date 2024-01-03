/** @jsx jsx */
import { Link, withPrefix } from 'gatsby';
import { jsx } from 'theme-ui';
import replaceSlashes from '../utils/replaceSlashes';
import useSiteMetadata from '../hooks/use-site-metadata';
import useMinimalBlogConfig from '../hooks/use-minimal-blog-config';

const HeaderTitle = () => {
	const { siteTitle } = useSiteMetadata();
	const { basePath } = useMinimalBlogConfig();

	return (
		<Link
			to={replaceSlashes(`/${basePath}`)}
			aria-label={`${siteTitle} - Back to home`}
			sx={{ color: `heading`, textDecoration: `none` }}
		>
			<div sx={{ my: 0, fontWeight: `semibold`, fontSize: [3, 6] }}>
				<span sx={{ pr: 2 }}> {siteTitle}</span>
				<img
					sx={{ transform: 'scaleX(-1) translateY(10px)' }}
					src="https://cdn2.iconfinder.com/data/icons/ancient-greece-13/496/laurel-wreath-ceremonial-heraldry-honor-1024.png"
					width="37"
				/>
				{/* <img sx={{ transform: 'scaleX(-1) translateY(10px)' }} src={withPrefix(`/favicon.ico`)} width="37" /> */}
			</div>
		</Link>
	);
};

export default HeaderTitle;
