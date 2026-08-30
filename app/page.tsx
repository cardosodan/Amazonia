import { Hero } from "@/components/sections/Hero";
import { ProductScene } from "@/components/sections/ProductScene";
import { Journey } from "@/components/sections/Journey";
import { Comparator } from "@/components/sections/Comparator";
import { Sources } from "@/components/sections/Sources";
import { Footer } from "@/components/sections/Footer";
import { productsWithStats } from "@/data/products";

export default function Home() {
  return (
    <main className="relative">
      <Journey>
        <Hero />
        {productsWithStats.map((product, index) => (
          <ProductScene key={product.id} product={product} index={index} />
        ))}
      </Journey>
      <Comparator />
      <Sources />
      <Footer />
    </main>
  );
}
