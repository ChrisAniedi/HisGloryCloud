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
          toast: "!rounded-md !border-line !bg-ink !text-paper",
          description: "!text-on-ink-muted",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
