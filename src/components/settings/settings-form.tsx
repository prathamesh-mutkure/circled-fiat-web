"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { TUser } from "../../../types/entities";

const settingFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  apiKey: z.string(),
  walletAddress: z.string(),
  avatar: z.string(),
});

type ProfileFormValues = z.infer<typeof settingFormSchema>;
type TWalletData = {
  address: string;
  publicKey: string;
};

const defaultValues: Partial<ProfileFormValues> = {};

export default function SettingsForm() {
  const [userData, setUserData] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(settingFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const res = await axiosInstance.get("/auth/profile");
        const data = res.data as TUser;

        form.setValue("name", data.name);
        form.setValue("email", data.email);
        form.setValue("walletAddress", data.walletAddress);
        form.setValue("apiKey", data.apiKey);
        form.setValue("avatar", data.avatar ?? "");

        setUserData(data);
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

  function getAptosWallet() {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  }

  async function connectToPetraWallet() {
    // @ts-ignore
    const isPetraInstalled = window?.aptos;

    const wallet: any = getAptosWallet();

    try {
      const response = (await wallet.connect()) as TWalletData;
      const account = (await wallet.account()) as TWalletData;

      if (!account.address) {
        throw new Error("Failed to connect to Petra Wallet");
      }

      form.setValue("walletAddress", account.address);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to connect to Petra Wallet",
      });
    }
  }

  async function disconnectToPetraWallet() {
    // @ts-ignore
    const isPetraInstalled = window?.aptos;

    if (!isPetraInstalled) {
      return;
    }

    const wallet: any = getAptosWallet();

    await wallet.disconnect();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="AptCash" {...field} />
              </FormControl>
              <FormDescription>
                This will be visible to user while paying on gateway
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@aptcash.com" {...field} disabled />
              </FormControl>
              <FormDescription>
                This will be your communication address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <Input placeholder="API Key" {...field} disabled />
              </FormControl>
              <FormDescription>API Key to use in SDK</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input placeholder="Avatar URL" {...field} type="url" />
              </FormControl>
              <FormDescription>
                Your personal avatar visible in checkout page
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <div className="flex flex-row gap-2">
                  <Input placeholder="0x..." {...field} type="text" />

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-10"
                    onClick={connectToPetraWallet}
                  >
                    Connect Wallet
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-10"
                    onClick={connectToPetraWallet}
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              </FormControl>
              <FormDescription>Enter or connect Aptos Wallet</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="">
          Update Settings
        </Button>
      </form>
    </Form>
  );
}
