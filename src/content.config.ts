import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional().nullable(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			draft: z.coerce.boolean().default(true),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
		}),
});

const portfolio = defineCollection({
	loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: image().optional(),
			technologies: z.array(z.string()).optional(),
			tags: z.array(z.string()).optional(),
			liveUrl: z.string().url().optional(),
			repoUrl: z.string().url().optional(),
			role: z.string().optional(),
			completedDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			featured: z.boolean().default(false),
			draft: z.coerce.boolean().default(true),
		}),
});

export const collections = { blog, portfolio };
