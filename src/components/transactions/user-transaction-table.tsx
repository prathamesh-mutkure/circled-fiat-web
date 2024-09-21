"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { TUserTransaction } from "../../../types/entities";
import { axiosInstance } from "@/lib/axios";
import { toast } from "../ui/use-toast";
import Link from "next/link";

import { formatDateString, shortenLongStrings } from "@/lib/utils";

export default function UserTransactionsTable() {
  const [userTxns, setUserTxns] = useState<TUserTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [totalAmt, setTotalAmt] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const res = await axiosInstance.get("/transactions/user/all");
        const data = res.data as TUserTransaction[];

        const total = data.reduce(
          (acc, txn) => acc + (txn.aptosPayment?.aptosAmount ?? 0),
          0
        );

        setUserTxns(data.toReversed());
        setTotalAmt(parseFloat(total.toFixed(2)));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load transactions",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // https://explorer.aptoslabs.com/txn

  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>TxHash</TableHead>
          <TableHead className="text-right">APT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userTxns.map((txn, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">
              {shortenLongStrings(txn.id, 5)}
            </TableCell>
            <TableCell>{txn.status}</TableCell>
            <TableCell>{formatDateString(txn.createdAt)}</TableCell>
            <TableCell>
              <Link
                href={
                  txn.aptosPayment?.txHash
                    ? `https://explorer.aptoslabs.com/txn/${txn.aptosPayment.txHash}?network=testnet`
                    : "#"
                }
                target="_blank"
                className="underline"
              >
                {shortenLongStrings(txn.aptosPayment?.txHash ?? "", 5)}
              </Link>
            </TableCell>
            <TableCell className="text-right">
              +{txn.aptosPayment?.aptosAmount ?? "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">+{totalAmt}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
