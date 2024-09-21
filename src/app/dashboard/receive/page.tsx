"use client";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { QRCodeSVG } from "qrcode.react";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { QrCode } from "lucide-react";

const metadata = {
  title: "Payments Page",
  description: "Page to test payments.",
};

export default function PaymentsPage() {
  const [toAddress, setToAddress] = useState(
    "0x927a1477c90ddd07c220aa1aa595db6d45d16217"
  );
  const [tokenAmount, setTokenAmount] = useState(0.1);
  const [receivingChain, setReceivingChain] = useState("Arbitrum");

  const [txHash, setTxHash] = useState<null | string>(null);

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [qrData, setQrData] = useState<null | string>(null);

  async function handlePayment() {
    try {
      setIsPaymentProcessing(true);

      const data = JSON.stringify({ toAddress, tokenAmount, receivingChain });

      console.log(data);

      setQrData(data);
    } catch (err) {
      console.log(err);
      toast({
        title: "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsPaymentProcessing(false);
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Send USDC"
        text="Page to send USDC through Fiat/Paypal"
      />

      <div className="max-w-screen-sm">
        <div className="grid gap-2 mb-4">
          <Alert>
            <AlertDescription className="text-muted-foreground">
              For testing purposes, we have restricted the amount between
              0.01-0.5
            </AlertDescription>
          </Alert>

          <Separator className="my-4 w-9/12 mx-auto" />

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Token to Recieve
            </Label>

            <Input
              id="receivingChain"
              value={receivingChain}
              placeholder="0x123..."
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isPaymentProcessing}
              onChange={(e) => setReceivingChain(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              To Address
            </Label>

            <Input
              id="toAddress"
              value={toAddress}
              placeholder="0x123..."
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isPaymentProcessing}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Amount In USDC
            </Label>
            <Input
              id="tokenAmount"
              value={tokenAmount}
              placeholder="0.1"
              type="number"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isPaymentProcessing}
              onChange={(e) => setTokenAmount(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <Button
          onClick={handlePayment}
          className="w-full mt-2"
          disabled={isPaymentProcessing}
        >
          {isPaymentProcessing && <Icons.spinner className="mr-2" />}
          Receive {tokenAmount} USDC on {receivingChain}
        </Button>

        {qrData && (
          <div className="bg-white w-full max-w-24 mt-8">
            <QRCodeSVG value={qrData} />
          </div>
        )}

        {txHash && (
          <Card className="mt-4 p-4">
            <p>
              <span className="font-bold">Transaction Hash: </span>
              <Link
                href={`https://explorer.circle.com/txn/${txHash}?network=testnet`}
                target="_blank"
                className="underline"
              >
                {txHash}
              </Link>
            </p>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
