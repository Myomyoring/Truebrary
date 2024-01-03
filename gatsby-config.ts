import type { GatsbyConfig, PluginRef } from 'gatsby';
import adapter from 'gatsby-adapter-netlify';

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

const config: GatsbyConfig = {
	siteMetadata: {
		siteTitle: `Truebrary`,
		siteTitleAlt: `묘묘링 | Study Library`,
		siteHeadline: `묘묘링 | Study Library`,
		siteUrl: `https://truebrary.netlify.app/`,
		siteDescription: `묘묘링 `,
		siteImage: `/banner.jpg`,
		siteLanguage: `ko`,
		author: `@Myomyoring`,
	},
	trailingSlash: `always`,
	adapter: adapter(),
	plugins: [
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				trackingIds: [`G-72462ERY2E`],
				pluginConfig: {
					head: true,
				},
			},
		},
		{
			resolve: `@lekoarts/gatsby-theme-minimal-blog`,
			options: {
				navigation: [
					{
						title: `Blog`,
						slug: `/blog`,
					},
					{
						title: `About`,
						slug: `/about`,
					},
				],
				externalLinks: [
					{
						name: `Category`,
						url: `https://truebrary.netlify.app//tags`,
					},
					{
						name: `Github`,
						url: `https://github.com/Myomyoring`,
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-robots-txt`,
			options: {
				host: `https://truebrary.netlify.app/`,
				sitemap: `https://truebrary.netlify.app/sitemap-index.xml`,
				policy: [{ userAgent: '*', allow: '/' }],
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				output: `/`,
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `묘묘링 | Study Library`,
				short_name: `Truebrary`,
				description: `묘묘링의 성장을 기록하는 도서관`,
				start_url: `/`,
				background_color: `#fff`,
				display: `standalone`,
				icons: [
					{
						src: `/android-chrome-192x192.png`,
						sizes: `192x192`,
						type: `image/png`,
					},
					{
						src: `/android-chrome-512x512.png`,
						sizes: `512x512`,
						type: `image/png`,
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						serialize: ({
							query: { site, allPost },
						}: {
							query: { allPost: IAllPost; site: { siteMetadata: ISiteMetadata } };
						}) =>
							allPost.nodes.map((post) => {
								const url = site.siteMetadata.siteUrl + post.slug;
								const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;

								return {
									title: post.title,
									date: post.date,
									excerpt: post.excerpt,
									url,
									guid: url,
									custom_elements: [{ 'content:encoded': content }],
								};
							}),
						query: `{
  allPost(sort: {date: DESC}) {
    nodes {
      title
      date(formatString: "YYYY년 MM월 D일")
      excerpt
      slug
    }
  }
}`,
						output: `rss.xml`,
						title: `Truebrary`,
					},
				],
			},
		},
		// You can remove this plugin if you don't need it
		shouldAnalyseBundle && {
			resolve: `gatsby-plugin-webpack-statoscope`,
			options: {
				saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
				saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
				open: false,
			},
		},
	].filter(Boolean) as Array<PluginRef>,
};

export default config;

interface IPostTag {
	name: string;
	slug: string;
}

interface IPost {
	slug: string;
	title: string;
	defer: boolean;
	date: string;
	excerpt: string;
	contentFilePath: string;
	html: string;
	timeToRead: number;
	wordCount: number;
	tags: Array<IPostTag>;
	banner: any;
	description: string;
	canonicalUrl: string;
}

interface IAllPost {
	nodes: Array<IPost>;
}

interface ISiteMetadata {
	siteTitle: string;
	siteTitleAlt: string;
	siteHeadline: string;
	siteUrl: string;
	siteDescription: string;
	siteImage: string;
	author: string;
}
