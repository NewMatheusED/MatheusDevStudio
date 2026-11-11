import { SiteNav } from "@/components/layout/site-nav";
import { LayerPager } from "@/components/scene/layer-pager";
import { LayersScene } from "@/components/scene/layers-scene";
import { LayerStack } from "@/components/scene/layer-stack";
import { SceneCopy } from "@/components/scene/scene-copy";
import { WorksStrip } from "@/components/scene/works-strip";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <LayersScene>
          <SceneCopy />
          <LayerStack />
          <WorksStrip />
          <LayerPager />
        </LayersScene>
      </main>
    </>
  );
}
