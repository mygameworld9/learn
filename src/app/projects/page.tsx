import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

/**
 * Projects List Page - Displays all projects in a responsive grid
 * Server Component for optimal performance
 */
export default function ProjectsPage() {
  const projects = getAllProjects();
  const projectCount = projects.length;

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">All Projects</h1>
          <p className="text-lg text-slate-400">
            共 {projectCount} 个项目
          </p>
        </header>

        {/* TODO P4: 筛选器组件位置 */}
        {/* <CategoryFilter categories={getAllProjectCategories()} /> */}

        {/* Projects Grid */}
        <section aria-label="Projects list">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">
                暂无项目
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
