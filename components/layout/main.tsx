"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isConnected } = useAccount();

  return (
    <div className="overflow-hidden">
      {isConnected ? (
        <div className="container py-10 mx-auto">{children}</div>
      ) : (
        <div className="w-screen items-center justify-center h-screen flex">
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
