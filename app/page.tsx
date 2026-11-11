import { SiteNav } from "@/components/layout/site-nav";
import { LayersScene } from "@/components/scene/layers-scene";
import { LayerStack } from "@/components/scene/layer-stack";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <LayersScene>
          <div />
          <LayerStack />
        </LayersScene>
      </main>
    </>
  );
}
