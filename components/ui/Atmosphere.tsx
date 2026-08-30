// Poeira dourada + vinheta, sempre presentes (CSS puro) — garante atmosfera
// mesmo antes do 3D carregar ou em quedas de frame. Posições/tempos fixos
// (não Math.random) para não variar a cada render.
const MOTES = [
  { left: "6%", size: 3, duration: 14, delay: 0 },
  { left: "14%", size: 2, duration: 18, delay: 3 },
  { left: "23%", size: 4, duration: 16, delay: 6 },
  { left: "34%", size: 2, duration: 20, delay: 1 },
  { left: "44%", size: 3, duration: 15, delay: 8 },
  { left: "55%", size: 2, duration: 19, delay: 4 },
  { left: "63%", size: 4, duration: 17, delay: 10 },
  { left: "72%", size: 2, duration: 13, delay: 2 },
  { left: "81%", size: 3, duration: 21, delay: 7 },
  { left: "90%", size: 2, duration: 16, delay: 5 },
  { left: "96%", size: 3, duration: 18, delay: 11 },
];

export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 0%, transparent 40%, #0b0f0c 92%), radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-gold) 7%, transparent) 0%, transparent 55%)",
        }}
      />
      {MOTES.map((mote, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full animate-mote"
          style={{
            left: mote.left,
            width: mote.size,
            height: mote.size,
            background: "var(--color-gold-bright)",
            opacity: 0,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
