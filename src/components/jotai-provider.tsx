'use client';

interface JotaiProviderProps {
    children: React.ReactNode;
}

export function JotaiProvider({ children }: JotaiProviderProps) {
  return (
  <div>
    {children}
  </div>
  );
}
