import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
