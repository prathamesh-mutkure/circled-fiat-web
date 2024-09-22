import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/landing/landing-globe";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-background font-heading">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <Icons.logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-primary">CircledFiat</span>
            </Link>

            <nav className="flex items-center gap-12">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Docs
              </Link>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col items-start justify-center gap-4">
                <h1 className="font-heading text-4xl font-bold">
                  <span className="text-[#05B4DD]">FIAT</span> TO{" "}
                  <span className="text-[#05B4DD]">USDC</span> INSTANTLY
                </h1>
                <p className="text-muted-foreground">
                  An app that allows merchants to accept USDC payments using
                  Circle's CCTP, enabling customers to pay via Web2 methods like
                  credit cards or PayPal and empowering users and merchants to
                  trade USDC on the chain they want without any additional
                  bridging costs.
                </p>
                <div className="flex gap-4">
                  <Link href="/login">
                    <Button>
                      {/* <Icons.Wallet className="mr-2 h-4 w-4" /> */}
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline">Register</Button>
                  </Link>
                </div>
              </div>

              <div className="flex h-[600px] w-[600px] justify-center md:mt-0 md:justify-start">
                <Globe />
              </div>
            </div>
          </div>

          <div
            className="bg-muted/20 py-12 flex flex-col items-center justify-center"
            id="demo"
          >
            <h2 className="mb-12 font-heading text-center text-5xl font-bold">
              DEMO
            </h2>

            <div className="max-w-full min-w-[400px]">
              <iframe
                width="600"
                height="400"
                src="https://www.youtube.com/embed/T4hdvi-PFQE?si=Ppm1oDhgI8Q9lGNj"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-muted/20 py-12">
            <div className="container mx-auto max-w-6xl px-4">
              <h2 className="mb-8 font-heading text-center text-4xl font-bold uppercase">
                Key Features
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-6 shadow-sm">
                  <Icons.Receipt className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Reward Points</h3>
                  <p className="text-center text-muted-foreground">
                    Earn reward points for every transaction and redeem them for
                    various benefits.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-6 shadow-sm">
                  <Icons.Receipt className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Transaction History</h3>
                  <p className="text-center text-muted-foreground">
                    Keep track of all your transactions and manage your
                    financial activities.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-6 shadow-sm">
                  <Icons.Phone className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Pay by Phone Number</h3>
                  <p className="text-center text-muted-foreground">
                    Send and receive payments using just a phone number, no need
                    for complex wallet addresses.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-6 shadow-sm">
                  <Icons.Scan className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Scan and Pay</h3>
                  <p className="text-center text-muted-foreground">
                    Easily make payments by scanning QR codes, providing a
                    seamless and secure transaction experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-muted/20 py-6">
          <div className="container mx-auto max-w-6xl px-4 text-center text-muted-foreground">
            &copy; 2024 CircledFiat. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
