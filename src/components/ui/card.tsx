// src/components/ui/card.tsx
import React from "react";

export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="bg-white rounded-2xl shadow p-4" {...props}>
      {children}
    </div>
  );
}
