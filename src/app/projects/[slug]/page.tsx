import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaFolder, FaArrowLeft } from 'react-icons/fa';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import TechStackIcon from '@/components/TechStackIcon';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all project pages
 * Enables static site generation for all projects
 */
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

/**
 * Project Detail Page
 * Displays full project information with MDX content rendering
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Handle 404 if project not found
  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="mb-12">
          {/* Back Link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
          >
            <FaArrowLeft size={14} />
            <span>Back to Projects</span>
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-6">
            {project.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
            {/* Date */}
            <div className="flex items-center gap-2">
              <FaCalendarAlt size={14} className="text-cyan-400" />
              <time dateTime={project.date}>
                {new Date(project.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <FaFolder size={14} className="text-cyan-400" />
              <span>{project.category}</span>
            </div>
          </div>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors"
                  >
                    <TechStackIcon tech={tech} size={18} />
                    <span className="text-sm text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg text-white font-medium transition-all"
              >
                <FaGithub size={20} />
                <span>View on GitHub</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-medium transition-all"
              >
                <FaExternalLinkAlt size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </header>

        {/* Divider */}
        <hr className="border-gray-800 mb-12" />

        {/* Main Content - MDX Rendered */}
        <main className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-code:text-cyan-300 prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg
          prose-blockquote:border-l-cyan-400 prose-blockquote:text-gray-400 prose-blockquote:italic
          prose-ul:text-gray-300 prose-ol:text-gray-300
          prose-li:marker:text-cyan-400
          prose-img:rounded-lg prose-img:border prose-img:border-gray-700
        ">
          <MDXRemote source={project.content} />
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            <FaArrowLeft size={14} />
            <span>Back to Projects</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
