import PrevArrowIcon from "@/assets/prevArrow";
import CartItems from "./_components/cartItems";
import Link from "next/link";

export default function Cart() {
  return (
    <div className="h-full">
      <header className="flex flex-row py-4 items-center justify-between">
        <Link href="/">
          <PrevArrowIcon />
        </Link>
        <span>카트</span>
        <div />
      </header>
      <CartItems />
    </div>
  );
}
