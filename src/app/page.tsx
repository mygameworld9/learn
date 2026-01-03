import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/projects';
import { getRecentLearnings } from '@/lib/learnings';
import ProjectCard from '@/components/ProjectCard';
import LearningCard from '@/components/LearningCard';

/**
 * Home Page - Server Component
 *
 * Sections:
 * - Hero: Main introduction with CTA buttons
 * - Featured Projects: Grid of featured project cards
 * - Learning Zone: Recent learning entries
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const recentLearnings = getRecentLearnings(4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Hi, I'm a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Developer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Building things with code. Exploring AI, web development, and game dev.
            Welcome to my portfolio and learning journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 w-full sm:w-auto"
            >
              View Projects
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-200 w-full sm:w-auto"
            >
              About Me
            </Link>
          </div>
        </div>

        {/* Decorative gradient blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View All
              <span className="ml-1">&rarr;</span>
            </Link>
          </div>

          {/* Projects Grid */}
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p>No featured projects yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Zone Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Recent Learnings
            </h2>
            <Link
              href="/learnings"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View All
              <span className="ml-1">&rarr;</span>
            </Link>
          </div>

          {/* Learnings Grid */}
          {recentLearnings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentLearnings.map((learning) => (
                <LearningCard key={learning.id} learning={learning} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p>No learnings documented yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
