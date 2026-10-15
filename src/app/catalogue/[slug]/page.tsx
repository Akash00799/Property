import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectCatalogueBySlug, getAllProjectCatalogueSlugs } from "@/data/projectsCatalogue";
import ProjectCatalogueClient from "./ProjectCatalogueClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectCatalogueSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectCatalogueBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Catalogue Not Found | TERRA FIRMA",
    };
  }

  return {
    title: `${project.title} — Official Township Catalogue | TERRA FIRMA Jaipur`,
    description: `${project.tagline}. Detailed architectural master plan, plot typologies, connectivity, and JDA statutory approvals for ${project.location.locality}, ${project.location.city}.`,
  };
}

export default async function DedicatedCataloguePage({ params }: Props) {
  const resolvedParams = await params;
  const project = getProjectCatalogueBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return <ProjectCatalogueClient project={project} />;
}
