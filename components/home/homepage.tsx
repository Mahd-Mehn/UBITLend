import { Button } from "@/components/ui/button";
import Home from "../web3/registerButton";
import Link from "next/link";
import {
  BookOpenIcon,
  ChevronRightIcon,
  MessagesSquareIcon,
  Settings2Icon,
  TabletSmartphoneIcon,
} from "lucide-react";

export default function HeroSection() {
  return (
    <>
      {/* Hero */}
      <div className="container py-24">
        {/* Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center text-foreground">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              UBITLend: A Hybrid Crypto-Backed P2P Lending Platform
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Simplify and secure lending and borrowing of tokens today.
              Register and make a loan request now!
            </p>
            {/* Buttons */}
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Link href={"/requests"}>
                <Button size={"lg"}>Get started</Button>
              </Link>
              <Link href={"/transactions"}>
                <Button variant={"outline"} size={"lg"}>
                  View your transactions
                </Button>
              </Link>
            </div>
            {/* End Buttons */}
          </div>
          {/* Col */}
          <div className="relative ms-4">
            <Home />
          </div>
          {/* End Col */}
        </div>
        <>
          {/* Icon Blocks */}
          <div className="container py-24 lg:py-32">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">
              {/* Icon Block */}
              <a
                className="group flex flex-col justify-center hover:bg-primary-foreground/20 rounded-lg p-4 md:p-7 "
                href="#"
              >
                <div className="flex justify-center items-center w-12 bg-primary h-12 border rounded-lg">
                  <TabletSmartphoneIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">Responsive</h3>
                  <p className="mt-1 text-muted-foreground">
                    Responsive, and mobile-first project on the web
                  </p>
                  <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm  decoration-2 group-hover:underline font-medium">
                    Learn more
                    <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
                  </span>
                </div>
              </a>
              {/* End Icon Block */}
              {/* Icon Block */}
              <a
                className="group flex flex-col justify-center hover:bg-primary-foreground/20 rounded-lg p-4 md:p-7 "
                href="#"
              >
                <div className="flex justify-center items-center w-12 bg-primary h-12 border rounded-lg">
                  <Settings2Icon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">Customizable</h3>
                  <p className="mt-1 text-muted-foreground">
                    Components are easily customized and extendable
                  </p>
                  <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm  decoration-2 group-hover:underline font-medium">
                    Learn more
                    <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
                  </span>
                </div>
              </a>
              {/* End Icon Block */}
              {/* Icon Block */}
              <a
                className="group flex flex-col justify-center hover:bg-primary-foreground/20 rounded-lg p-4 md:p-7 "
                href="#"
              >
                <div className="flex justify-center items-center w-12 bg-primary h-12 border rounded-lg">
                  <BookOpenIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">Documentation</h3>
                  <p className="mt-1 text-muted-foreground">
                    Every component and plugin is well documented
                  </p>
                  <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm  decoration-2 group-hover:underline font-medium">
                    Learn more
                    <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
                  </span>
                </div>
              </a>
              {/* End Icon Block */}
              {/* Icon Block */}
              <a
                className="group flex flex-col justify-center hover:bg-primary-foreground/20 rounded-lg p-4 md:p-7 "
                href="#"
              >
                <div className="flex justify-center items-center w-12 bg-primary h-12 border rounded-lg">
                  <MessagesSquareIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">24/7 Support</h3>
                  <p className="mt-1 text-muted-foreground">
                    Contact us 24 hours a day, 7 days a week
                  </p>
                  <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm  decoration-2 group-hover:underline font-medium">
                    Learn more
                    <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
                  </span>
                </div>
              </a>
              {/* End Icon Block */}
            </div>
          </div>
          {/* End Icon Blocks */}
        </>
      </div>
      {/* End Hero */}
    </>
  );
}

const star = (
  <svg
    className="h-4 w-4"
    width={51}
    height={51}
    viewBox="0 0 51 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
      fill="currentColor"
    />
  </svg>
);
