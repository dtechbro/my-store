"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/store/cartStores";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [error, setError] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const router = useRouter();

  const applyCoupon = () => {
    const validFormat = /^POWERLABSx$/; // case-sensitive regex

    if (discountApplied) {
      setError("Coupon already applied.");
      return;
    }

    if (validFormat.test(coupon.trim())) {
      setDiscountApplied(true);
      setError("");
    } else {
      setError("Invalid coupon code.");
    }
  };

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = discountApplied ? total * 0.132 : 0;
  const finalTotal = total - discount;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href={"/"}>
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-20">
          <ShoppingCart size={64} className="text-gray-400 mb-4" />
          <p className="text-xl font-medium mb-2">Your cart is empty</p>
          <p className="text-sm mb-6">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            href="/"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-md shadow-sm">
                <div className="relative w-full sm:w-40 h-40 rounded overflow-hidden">
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 w-full">
                  <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
                  <p className="text-green-600 font-bold mb-2">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 cursor-pointer">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 cursor-pointer">
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline cursor-pointer">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-col gap-2 w-full sm:max-w-sm">
              <label htmlFor="coupon" className="font-medium text-gray-700">
                Coupon Code
              </label>
              <input
                type="text"
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={applyCoupon}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Apply Coupon
              </button>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {discountApplied && (
                <p className="text-green-600 text-sm mt-1">
                  Coupon applied! 🎉
                </p>
              )}
            </div>

            <div className="text-right mt-4 sm:mt-0">
              <p className="text-lg font-semibold">
                Subtotal: ${total.toFixed(2)}
              </p>
              {discountApplied && (
                <>
                  <p className="text-sm text-green-600">
                    Discount: -${discount.toFixed(2)}
                  </p>
                  {/* <p className="text-xl font-bold mt-1">
                    Total: ${finalTotal.toFixed(2)}
                  </p> */}
                </>
              )}
              {/* {!discountApplied && (
                <p className="text-xl font-bold mt-1">
                  Total: ${total.toFixed(2)}
                </p>
              )} */}
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${finalTotal.toFixed(2)}</p>
            <button
              onClick={() => setShowReceipt(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition cursor-pointer">
              Checkout
            </button>
          </div>

          {showReceipt && (
            <div className="fixed inset-0 bg-[#00000072] flex items-center justify-center z-50 transition-opacity">
              <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl text-center animate-fade-in">
                <div className="text-green-600 mb-4">
                  <svg
                    className="mx-auto w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <h2 className="text-2xl font-bold mt-2">
                    Purchase Successful
                  </h2>
                </div>

                <p className="text-gray-600 mb-4">
                  Thanks for shopping with us. Here&apos;s your receipt:
                </p>

                <div className="text-left text-sm max-h-48 overflow-y-auto mb-4 border rounded p-3 bg-gray-50">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between mb-1">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (13.2%)</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold mt-2">
                    <span>Total Paid</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const store = useCartStore.getState();
                    store.cart.forEach((item) => store.removeFromCart(item.id));
                    setShowReceipt(false);
                    setTimeout(() => router.push("/"), 700); // slight delay for better UX
                  }}
                  className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition mt-2 cursor-pointer">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
