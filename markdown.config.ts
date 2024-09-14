import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from "remark-toc";
import rehypeToc from "rehype-toc";

export default {
  remarkPlugins: [[remarkToc, { tight: true, ordered: true }]],
  rehypePlugins: [
    rehypeSlug,
			rehypeAutolinkHeadings,
    [
      rehypeToc,
      {
        headings: ["h2"],
        cssClasses: {
          toc: "toc-post", 
          link: "toc-link", 
        },
      },
    ],
  ],
};
