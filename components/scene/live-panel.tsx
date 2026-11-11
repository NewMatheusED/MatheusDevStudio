"use client";

import { useEffect } from "react";

/**
 * Dá vida ao painel da pilha: o faturamento sobe e, de vez em quando, um servidor
 * fica amarelo e volta. Não desenha nada; só mexe nos elementos de LayerStack.
 */
export function LivePanel() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const revenue = document.getElementById("fat");
    const pods = document.querySelectorAll(".scene .pod");
    let total = 48210;

    const timer = setInterval(() => {
      total += 90 + Math.round(Math.random() * 240);
      if (revenue) revenue.textContent = `R$ ${total.toLocaleString("pt-BR")}`;
      const pod = pods[Math.floor(Math.random() * pods.length)];
      pod?.classList.add("warn");
      setTimeout(() => pod?.classList.remove("warn"), 1400);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  return null;
}
