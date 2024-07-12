import HeroSection from "@/components/home/homepage";
import Home from "@/components/web3/registerButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Homepage() {
  return (
    <main className="p-6 text-white font-semibold flex items-center justify-center h-full">
      <HeroSection />
    </main>
  );
}
