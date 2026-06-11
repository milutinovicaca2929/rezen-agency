import { ComingSoonCard } from '@/components/sections/ComingSoonCard';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { StaggerReveal } from '@/components/ui/StaggerReveal';
import { comingSoonProjects, portfolioProjects } from '@/lib/portfolio';

export function PortfolioGrid() {
  return (
    <StaggerReveal className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {portfolioProjects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i + 1} />
      ))}
      {comingSoonProjects.map((project, i) => (
        <ComingSoonCard
          key={project.slug}
          project={project}
          index={portfolioProjects.length + i + 1}
        />
      ))}
    </StaggerReveal>
  );
}
