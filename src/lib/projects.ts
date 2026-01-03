import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/types';

/**
 * Directory containing project MDX files
 */
const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content', 'projects');

/**
 * Parse a single MDX file and return a Project object
 * @param fileName - The MDX file name (e.g., 'my-project.mdx')
 * @returns Project object with frontmatter data and content
 */
function parseProjectFile(fileName: string): Project {
  const filePath = path.join(PROJECTS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Use slug from frontmatter if available, otherwise derive from filename
  const slug = data.slug || fileName.replace(/\.mdx$/, '');

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || '',
    techStack: data.techStack || [],
    description: data.description || '',
    coverImage: data.coverImage || '',
    githubUrl: data.githubUrl,
    demoUrl: data.demoUrl,
    featured: data.featured || false,
    content,
  };
}

/**
 * Sort projects by date in descending order (newest first)
 * @param projects - Array of projects to sort
 * @returns Sorted array of projects
 */
function sortProjectsByDate(projects: Project[]): Project[] {
  return projects.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Get all projects from the content/projects directory
 * @returns Array of all projects sorted by date (descending)
 */
export function getAllProjects(): Project[] {
  // Check if directory exists
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    console.warn(`Projects directory not found: ${PROJECTS_DIRECTORY}`);
    return [];
  }

  const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

  const projects = mdxFiles.map((fileName) => {
    try {
      return parseProjectFile(fileName);
    } catch (error) {
      console.error(`Error parsing project file ${fileName}:`, error);
      return null;
    }
  });

  // Filter out any null values from parsing errors
  const validProjects = projects.filter((project): project is Project => project !== null);

  return sortProjectsByDate(validProjects);
}

/**
 * Get a single project by its slug
 * @param slug - The project slug (filename without extension or frontmatter slug)
 * @returns Project object or null if not found
 */
export function getProjectBySlug(slug: string): Project | null {
  // Check if directory exists
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    console.warn(`Projects directory not found: ${PROJECTS_DIRECTORY}`);
    return null;
  }

  // First, try to find the file directly by slug
  const directFilePath = path.join(PROJECTS_DIRECTORY, `${slug}.mdx`);
  if (fs.existsSync(directFilePath)) {
    try {
      return parseProjectFile(`${slug}.mdx`);
    } catch (error) {
      console.error(`Error parsing project file ${slug}.mdx:`, error);
      return null;
    }
  }

  // If not found by filename, search through all projects for matching slug in frontmatter
  const allProjects = getAllProjects();
  return allProjects.find((project) => project.slug === slug) || null;
}

/**
 * Get featured projects (limited to 6)
 * @returns Array of featured projects sorted by date (descending), max 6 items
 */
export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter((project) => project.featured === true);

  // Return at most 6 featured projects
  return featuredProjects.slice(0, 6);
}

/**
 * Get all unique project categories
 * @returns Array of unique category strings
 */
export function getAllProjectCategories(): string[] {
  const allProjects = getAllProjects();
  const categories = new Set(allProjects.map((project) => project.category));
  return Array.from(categories).sort();
}

/**
 * Get projects by category
 * @param category - The category to filter by
 * @returns Array of projects in the specified category, sorted by date
 */
export function getProjectsByCategory(category: string): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.category === category);
}

/**
 * Get all project slugs (useful for static path generation)
 * @returns Array of slug strings
 */
export function getAllProjectSlugs(): string[] {
  const allProjects = getAllProjects();
  return allProjects.map((project) => project.slug);
}
