'use client';
import Image from 'next/image';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Spotlight } from './ui/Spotlight';
import { projectColorClasses, type Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const Icon = project.icon;
    const c = projectColorClasses[project.color];

    return (
        <div className="snap-start flex-shrink-0 w-[300px] sm:w-[360px]">
            <Spotlight
                className={`h-full flex flex-col rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-all duration-300 group hover:-translate-y-1 shadow-sm ${c.borderHover} ${c.borderHoverDark} ${c.shadowHover}`}
            >
                {/* Cover */}
                <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                    {project.coverImage ? (
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 300px, 360px"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                    ) : (
                        <div
                            className={`absolute inset-0 bg-linear-to-br ${c.gradientFrom} ${c.gradientVia} ${c.gradientTo} flex items-center justify-center`}
                        >
                            <Icon size={64} strokeWidth={1.25} className="text-white/90 drop-shadow-lg" />
                        </div>
                    )}

                    {project.featured && (
                        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wide text-stone-900 dark:text-stone-100 shadow-md">
                            <Star size={10} className="fill-amber-400 text-amber-400" />
                            Featured
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6 relative z-10">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 mb-2">
                        {project.title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 flex-1 leading-relaxed">
                        {project.hook}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-stone-100 dark:border-stone-800">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1 text-xs font-medium ${c.text} hover:underline`}
                            >
                                <ExternalLink size={12} /> Live
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            >
                                <Github size={12} /> Code
                            </a>
                        )}
                        {!project.liveUrl && !project.githubUrl && (
                            <span className="text-xs font-mono text-stone-400 dark:text-stone-600">
                                Private repo
                            </span>
                        )}
                    </div>
                </div>
            </Spotlight>
        </div>
    );
}
