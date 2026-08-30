"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 768px), (pointer: coarse)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Sinaliza telas pequenas / touch para reduzir custo de GPU no 3D.
 * Usado para baixar DPR, desligar efeitos e simplificar geometria no mobile.
 */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
