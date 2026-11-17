"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "!rounded-2xl !border-white/10 !bg-ink-800/95 !backdrop-blur-xl !text-bone-100",
          description: "!text-bone-100/60",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
