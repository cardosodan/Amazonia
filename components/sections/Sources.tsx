import { productsWithStats } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Sources() {
  return (
    <section className="relative section-pad py-28 md:py-36">
      <SectionHeading
        kicker="Transparência"
        title="De onde vêm esses números"
        description="Cada preço aqui tem uma origem institucional rastreável — ainda que hoje só exista dentro de um PDF."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productsWithStats.map((product) => (
          <a
            key={product.id}
            href={product.source.url}
            target="_blank"
            rel="noreferrer noopener"
            className="panel group rounded-xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-mist-dim">
              <span className="h-2 w-2 rounded-full" style={{ background: product.accent }} />
              {product.name}
            </div>
            <p className="mt-3 font-display text-xl text-mist">{product.source.org}</p>
            <p className="mt-1 text-sm text-mist-dim">{product.source.label}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-mist-dim">
              <span>Atualização {product.source.updateFrequency}</span>
              <span className="text-gold opacity-0 transition-opacity group-hover:opacity-100">visitar →</span>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm text-mist-dim/80 leading-relaxed">
        <strong className="text-mist-dim">Fase 1 (este protótipo):</strong> os valores exibidos são
        dados ilustrativos, estruturados no mesmo formato em que chegariam de uma API real.{" "}
        <strong className="text-mist-dim">Fase 2:</strong> substituição por coleta automatizada dos
        boletins oficiais da CONAB, CEASA-AM e SEPROR-AM.
      </p>
    </section>
  );
}
