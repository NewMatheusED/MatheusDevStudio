"use client";

import { layers } from "@/content/layers";
import { useSceneStep } from "./layers-scene";
import { TechChips } from "./tech-chips";

/**
 * Os cinco blocos de texto da cena. Todos ficam no HTML (para busca e para quem
 * chega antes do JavaScript); só o da etapa atual é visível e alcançável por teclado.
 */
export function SceneCopy() {
  const step = useSceneStep();
  const block = (n: number) => ({ className: "copy", "data-testid": `copy-${n}`, inert: n !== step });

  return (
    <div className="copy-box">
      <div {...block(0)}>
        <h1 className="display">Construo o produto inteiro. Da infraestrutura à tela.</h1>
        <p>
          Sou o Matheus, desenvolvedor fullstack. Faço sites e sistemas sob medida, do servidor ao que aparece na
          tela.
        </p>
        <div className="copy-actions">
          <a className="btn" href="#trabalhos">
            Ver trabalhos
          </a>
          <a className="btn btn-ghost" href="#contato">
            Falar comigo
          </a>
        </div>
      </div>

      {layers.map((layer, i) => (
        <div key={layer.id} {...block(i + 1)}>
          <h2 className="display">{layer.title}</h2>
          <p>{layer.body}</p>
          <TechChips techs={layer.techs} />
        </div>
      ))}

      <div {...block(4)}>
        <h2 className="display">Junto, vira produto no ar.</h2>
        <p>Foi assim, camada por camada, que participei da construção do Beergam.</p>
      </div>
    </div>
  );
}
