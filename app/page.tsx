import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { LayerLabels } from "@/components/scene/layer-labels";
import { LayerPager } from "@/components/scene/layer-pager";
import { LayersScene } from "@/components/scene/layers-scene";
import { LayerStack } from "@/components/scene/layer-stack";
import { LivePanel } from "@/components/scene/live-panel";
import { SceneCopy } from "@/components/scene/scene-copy";
import { WorksStrip } from "@/components/scene/works-strip";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FeaturedCase } from "@/components/sections/featured-case";
import { WorkList } from "@/components/sections/work-list";
import { byKind } from "@/content/projects";

export default function Home() {
  const [beergam, fonpack] = byKind("featured");

  return (
    <>
      <SiteNav />
      <main>
        <LayersScene>
          <SceneCopy />
          <LayerStack />
          <LayerLabels />
          <LivePanel />
          <WorksStrip />
          <LayerPager />
        </LayersScene>
        <div id="trabalhos">
          <FeaturedCase project={beergam} />
          <FeaturedCase project={fonpack} flip />
          <WorkList title="Outros trabalhos" projects={byKind("client")} />
          <WorkList title="Projetos próprios" projects={byKind("own")} />
        </div>
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
