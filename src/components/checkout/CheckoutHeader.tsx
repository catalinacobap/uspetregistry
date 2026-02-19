"use client";

export function CheckoutHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-white border-b border-[var(--color-border)] pointer-events-none select-none"
      aria-label="Checkout"
    >
      <div className="w-full h-[72px] py-2.5 px-6 flex items-center justify-center max-md:px-4">
        <img
          src="/logo.png"
          alt="US Pet Registry"
          className="h-9 w-auto object-contain"
          draggable={false}
        />
      </div>
    </header>
  );
}
