"use client";

import { useState, type FormEvent } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    // Peça de portfólio: sem backend real ainda — a Fase 2 troca isto por uma chamada de API.
    console.info("[Índice Amazônia] captura de alerta de preço:", email);
    setStatus("sent");
    setEmail("");
  }

  return (
    <footer className="relative section-pad pt-28 pb-12">
      <div className="panel rounded-2xl p-8 sm:p-12 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-gold mb-3">
          Alertas de preço
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-mist max-w-xl mx-auto">
          Quer saber quando o açaí ou a castanha mudarem de preço?
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="email-alert">
            Seu e-mail
          </label>
          <input
            id="email-alert"
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="flex-1 rounded-full border border-mist/15 bg-void/40 px-5 py-3 text-sm text-mist placeholder:text-mist-dim/60 outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-void transition-opacity hover:opacity-90"
          >
            Quero receber
          </button>
        </form>
        <p className="mt-3 text-xs text-mist-dim/70" role="status">
          {status === "sent"
            ? "Recebido — em breve os alertas ficam ativos de verdade. Obrigado!"
            : "Peça de portfólio: a captura não envia e-mails reais ainda."}
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 text-xs text-mist-dim/70 sm:flex-row">
        <p>Índice Amazônia — dados regionais como experiência, não como planilha.</p>
        <p>
          Um projeto <span className="text-gold">DCodes</span> · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
