import { SiteNav } from "@/components/layout/site-nav";
import { LayerLabels } from "@/components/scene/layer-labels";
import { LayerPager } from "@/components/scene/layer-pager";
import { LayersScene } from "@/components/scene/layers-scene";
import { LayerStack } from "@/components/scene/layer-stack";
import { LivePanel } from "@/components/scene/live-panel";
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
          <LayerLabels />
          <LivePanel />
          <WorksStrip />
          <LayerPager />
        </LayersScene>
      </main>
    </>
  );
}
