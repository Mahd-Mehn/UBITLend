"use client";

import { Person } from "@/people";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "address",
    header: "Wallet address",
  },
  {
    accessorKey: "requested_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Requested Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "credit_score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Credit Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "duration_proposed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proposed duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const duration_proposed = row.getValue("duration_proposed");
      const formatted_dob = new Date(
        duration_proposed as string
      ).toLocaleDateString();
      return <div className="font-medium">{formatted_dob}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const person = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Sheet>
              <SheetTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-500/60 w-full">
                Open
              </SheetTrigger>
              <SheetContent side={"bottom"} className="w-screen p-2">
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Interest Rate
                      </Label>
                      <Input
                        id="intrt"
                        type="number"
                        defaultValue=""
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Wallet address of borrower (%)
                      </Label>
                      <Input
                        id="70% minimum"
                        defaultValue="0x2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7Q8r9S0t1U"
                        className="col-span-3"
                        placeholder=""
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Required collateral Percentage (%)
                      </Label>
                      <Input
                        id="70% minimum"
                        defaultValue="70"
                        className="col-span-3"
                        placeholder="Select collateral percentage"
                      />
                    </div>
                  </div>
                </SheetHeader>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Confirm and make proposal</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.address.toString());
              }}
            >
              Copy address
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
