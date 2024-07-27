import Link from "next/link";
import {
  BadgeDollarSign,
  CircleUser,
  Menu,
  Package2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "../themes/toggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-[100]">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <BadgeDollarSign className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground font-bold text-lg"
        >
          UBITLend
        </Link>
        <Link
          href="/requests"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Requests
        </Link>
        <Link
          href="/profile"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Profile
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <BadgeDollarSign className="h-6 w-6" />
              <span className="sr-only">UBITLend</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              UBITLend
            </Link>
            <Link
              href="/requests"
              className="text-muted-foreground hover:text-foreground"
            >
              Requests
            </Link>
            <Link
              href="/proposals"
              className="text-muted-foreground hover:text-foreground"
            >
              Proposals
            </Link>
            <Link
              href="/transactions"
              className="text-muted-foreground hover:text-foreground"
            >
              Transactions
            </Link>
            <Link
              href="/profile"
              className="text-muted-foreground hover:text-foreground"
            >
              Profile
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <ConnectButton />
        </form>
        <ModeToggle />
      </div>
    </header>
  );
}
