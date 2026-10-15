import { DEMO_PROPERTIES } from "@/data/properties";
import PlotDetailContainer from "@/components/property/PlotDetailContainer";

export function generateStaticParams() {
  return DEMO_PROPERTIES.map((plot) => ({
    id: plot.id,
  }));
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const initialPlot = DEMO_PROPERTIES.find((p) => p.id === id || p.slug === id) || null;

  return <PlotDetailContainer id={id} initialPlot={initialPlot} />;
}
