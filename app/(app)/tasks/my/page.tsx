"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CreatedTaskRow = {
  id: string;
  title: string;
  status: "draft" | "open" | "in_review" | "completed";
  proofsSubmitted: number;
  proofsMax: number;
  budgetCELO: number;
  updatedAt: string;
};

const createdTasks: CreatedTaskRow[] = [
  {
    id: "t1",
    title: "Collect product feedback on onboarding emails",
    status: "open",
    proofsSubmitted: 6,
    proofsMax: 20,
    budgetCELO: 30,
    updatedAt: "2025-12-05T10:12:00Z",
  },
  {
    id: "t2",
    title: "Source 5 beta users for lending dashboard",
    status: "in_review",
    proofsSubmitted: 5,
    proofsMax: 5,
    budgetCELO: 20,
    updatedAt: "2025-12-06T16:30:00Z",
  },
  {
    id: "t3",
    title: "Review content for launch announcement",
    status: "draft",
    proofsSubmitted: 0,
    proofsMax: 10,
    budgetCELO: 15,
    updatedAt: "2025-12-04T08:45:00Z",
  },
];

const joinedTasks = [
  {
    id: "jp1",
    title: "Moderate community Discord for one week",
    role: "Contributor",
    status: "In progress",
    payout: "30 CELO",
  },
  {
    id: "jp2",
    title: "Interview 3 beta users for lending dApp",
    role: "Contributor",
    status: "Awaiting review",
    payout: "18 CELO",
  },
] as const;

type SortKey = "updatedAt" | "status" | "budget";
type SortDirection = "asc" | "desc";

export default function MyWorkPage() {
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedCreatedTasks = useMemo(() => {
    return [...createdTasks].sort((a, b) => {
      const directionMultiplier = sortDirection === "asc" ? 1 : -1;
      if (sortKey === "budget") {
        return (a.budgetCELO - b.budgetCELO) * directionMultiplier;
      }
      if (sortKey === "status") {
        return a.status.localeCompare(b.status) * directionMultiplier;
      }
      const aTime = new Date(a.updatedAt).getTime();
      const bTime = new Date(b.updatedAt).getTime();
      return (aTime - bTime) * directionMultiplier;
    });
  }, [sortKey, sortDirection]);

  function toggleSort(key: SortKey) {
    setSortKey(key);
    setSortDirection((prev) =>
      key === sortKey && prev === "desc" ? "asc" : "desc",
    );
  }

  const sortLabel = (key: SortKey, label: string) => {
    const isActive = sortKey === key;
    const arrow = isActive ? (sortDirection === "asc" ? "↑" : "↓") : "";
    return (
      <button
        type="button"
        className="flex items-center gap-1 text-xs font-medium"
        onClick={() => toggleSort(key)}
      >
        <span>{label}</span>
        {arrow && <span className="text-[10px] text-muted-foreground">{arrow}</span>}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            My work
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Track the tasks you&apos;ve created and the work you&apos;re
            completing for others on tasklens.
          </p>
        </div>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-2 lg:items-start lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Tasks I&apos;ve created
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Campaigns where you&apos;re the task creator and manage proofs and
              payouts. This table will later be backed by Convex.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="sm" className="mb-2">
              <Link href="/tasks/new">Post a new task</Link>
            </Button>

            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[40%] text-xs font_medium">
                      Task
                    </TableHead>
                    <TableHead className="w-[10%] text-xs font-medium">
                      Status
                    </TableHead>
                    <TableHead className="w-[20%] text-right">
                      {sortLabel("updatedAt", "Last updated")}
                    </TableHead>
                    <TableHead className="w-[15%] text-right">
                      {sortLabel("budget", "Budget (CELO)")}
                    </TableHead>
                    <TableHead className="w-[15%] text-right text-xs font-medium">
                      Proofs
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCreatedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="align-top text-xs">
                        <p className="font-medium text-foreground">
                          {task.title}
                        </p>
                      </TableCell>
                      <TableCell className="align-top text-xs">
                        <Badge variant="outline">
                          {task.status === "in_review"
                            ? "In review"
                            : task.status.charAt(0).toUpperCase() +
                              task.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="align-top text-right text-xs text-muted-foreground">
                        {new Date(task.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="align-top text-right text-xs">
                        {task.budgetCELO.toFixed(1)}
                      </TableCell>
                      <TableCell className="align-top text-right text-xs text-muted-foreground">
                        {task.proofsSubmitted}/{task.proofsMax}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Tasks I&apos;m working on
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              This section is currently mocked. Once wired to Convex, it will
              list tasks where you&apos;ve joined as a contributor or reviewer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild size="sm" variant="outline" className="mb-2">
              <Link href="/tasks">Browse marketplace</Link>
            </Button>

            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[45%] text-xs font-medium">
                      Task
                    </TableHead>
                    <TableHead className="w-[15%] text-xs font-medium">
                      Role
                    </TableHead>
                    <TableHead className="w-[15%] text-xs font-medium">
                      Status
                    </TableHead>
                    <TableHead className="w-[25%] text-right text-xs font-medium">
                      Payout
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {joinedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="align-top text-xs">
                        <p className="font-medium text-foreground">
                          {task.title}
                        </p>
                      </TableCell>
                      <TableCell className="align-top text-xs text-muted-foreground">
                        {task.role}
                      </TableCell>
                      <TableCell className="align-top text-xs">
                        <Badge variant="outline">{task.status}</Badge>
                      </TableCell>
                      <TableCell className="align-top text-right text-xs text-muted-foreground">
                        {task.payout}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

