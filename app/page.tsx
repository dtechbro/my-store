"use client";

import { useEffect, useState } from "react";
import { Product } from "./types/types";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "./store/cartStores";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const cart = useCartStore((state) => state.cart.length);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  // if (loading)
  //   return (
  //     <div className="h-screen w-screen flex items-center justify-center bg-white ">
  //       <p className="text-gray-700 text-lg">Loading...Hang on for a bit</p>
  //     </div>
  //   );

  return (
    <main className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
      <header className="flex flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Hey there!</h2>
          <p className="text-gray-600">Welcome to my store</p>
        </div>
        {/* Placeholder for Cart */}
        <Link
          href={`/cart`}
          className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow-sm">
          <ShoppingCart />
          <p>{cart}</p>
        </Link>
      </header>

      {loading ? (
        <section>
          <h1 className="text-3xl font-bold mb-6">Available Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col animate-pulse">
                <div className="bg-gray-200 rounded-lg w-full h-48 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
                <div className="mt-auto flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-16" />
                  <div className="h-10 bg-gray-300 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section>
          <h1 className="text-3xl font-bold mb-6">Available Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={product.imgUrl || "/images/image.jpg"}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 250px"
                    priority={true}
                  />
                </div>

                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                  {product.name}
                </h2>

                <div className="mt-auto flex justify-between items-center">
                  <p className="text-xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`Added ${product.name} to cart!`);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition cursor-pointer">
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
