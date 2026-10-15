"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";
import { useAdminData } from "@/context/AdminDataContext";
import { PropertyPlot } from "@/types/property";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { projects, updateProject } = useAdminData();

  const projectId = params?.id as string;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto space-y-4 my-8">
        <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
        <h2 className="font-serif text-xl font-bold text-[#07140F]">
          Project Not Found
        </h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          The requested project ID <code className="bg-stone-100 px-1 py-0.5 rounded font-mono font-bold">{projectId}</code> does not exist or may have been deleted.
        </p>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#07140F] text-[#DFBE82] text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects List</span>
        </Link>
      </div>
    );
  }

  const handleUpdate = (updatedData: PropertyPlot) => {
    updateProject(projectId, updatedData);
  };

  return (
    <ProjectForm
      initialData={project}
      onSubmit={handleUpdate}
      isEditing={true}
    />
  );
}
