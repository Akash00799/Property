"use client";

import React from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { useAdminData } from "@/context/AdminDataContext";
import { PropertyPlot } from "@/types/property";

export default function NewProjectPage() {
  const { addProject } = useAdminData();

  const handleCreate = (data: PropertyPlot) => {
    addProject(data);
  };

  return <ProjectForm onSubmit={handleCreate} isEditing={false} />;
}
