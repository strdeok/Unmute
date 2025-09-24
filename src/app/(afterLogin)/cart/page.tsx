import PrevArrowIcon from "@/assets/prevArrow";
import CartItems from "./_components/cartItems";

export default function Cart() {
  return (
    <div className="h-full">
      <header className="flex flex-row py-4 items-center justify-between">
        <button>
          <PrevArrowIcon />
        </button>
        <span>카트</span>
        <div />
      </header>
      <CartItems />
    </div>
  );
}
