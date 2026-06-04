import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CropCard } from "@/components/crop-card";
import { SectionCard } from "@/components/section-card";
import coffee from "@/assets/crop-coffee.jpg";
import maize from "@/assets/crop-maize.jpg";
import tea from "@/assets/crop-tea.jpg";
import beans from "@/assets/crop-beans.jpg";

export const Route = createFileRoute("/crops")({
  head: () => ({ meta: [{ title: "Crop Monitoring · IHINGA AI" }] }),
  component: CropsPage,
});

const fields = [
  { name: "Arabica Coffee · A", image: coffee, stage: "Flowering · w14", health: 92, location: "Musanze", status: "Flowering" as const },
  { name: "Maize · C", image: maize, stage: "Vegetative · w6", health: 78, location: "Musanze", status: "Vegetative" as const },
  { name: "Tea · Plot 2", image: tea, stage: "Harvest", health: 88, location: "Nyamagabe", status: "Harvest" as const },
  { name: "Beans · B", image: beans, stage: "Emerging · d11", health: 71, location: "Musanze", status: "Emerging" as const },
  { name: "Arabica Coffee · D", image: coffee, stage: "Maturing · w22", health: 85, location: "Huye", status: "Maturing" as const },
  { name: "Maize · E", image: maize, stage: "Planted · d3", health: 64, location: "Nyagatare", status: "Planted" as const },
  { name: "Tea · Plot 5", image: tea, stage: "Vegetative", health: 81, location: "Karongi", status: "Vegetative" as const },
  { name: "Beans · G", image: beans, stage: "Flowering", health: 76, location: "Rubavu", status: "Flowering" as const },
];

function CropsPage() {
  return (
    <PageShell title="Crop Monitoring" subtitle="Every field, every stage — visualised in one place.">
      <SectionCard title={`${fields.length} active fields`} subtitle="Hover a card to inspect canopy health.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fields.map((f) => <CropCard key={f.name} {...f} />)}
        </div>
      </SectionCard>
    </PageShell>
  );
}