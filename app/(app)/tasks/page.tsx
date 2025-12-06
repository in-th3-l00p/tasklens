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

const sampleTasks = [
  {
    id: "t1",
    title: "Beta-test onboarding flow for a DeFi wallet",
    description:
      "Walk through a new user journey, capture friction points, and propose improvements.",
    payout: "12 CELO",
    type: "UX review",
    level: "Intermediate",
  },
  {
    id: "t2",
    title: "Source 5 candidates for a solidity bug-bounty",
    description:
      "Find and shortlist high-signal auditors willing to take a scoped bounty.",
    payout: "40 CELO",
    type: "Talent sourcing",
    level: "Advanced",
  },
  {
    id: "t3",
    title: "Curate 10 user interviews for a fintech MVP",
    description:
      "Recruit participants that match the target persona and schedule remote interviews.",
    payout: "25 CELO",
    type: "User research",
    level: "Intermediate",
  },
] as const;

export default function TaskMarketplacePage() {
  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Task marketplace
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Browse open micro-tasks, filter by type and payout, and join work
            that matches your skills and reputation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/tasks/my">View my work</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/tasks/new">Post a task</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 px-4 lg:px-6">
        <input
          type="search"
          placeholder="Search tasks by title, keywords, or client"
          className="h-9 w-full max-w-xs rounded-md border border-border bg-background px-3 text-sm outline-none ring-0 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">All types</Badge>
          <Badge variant="outline">UX &amp; research</Badge>
          <Badge variant="outline">Sourcing</Badge>
          <Badge variant="outline">Technical QA</Badge>
          <Badge variant="outline">High payout</Badge>
        </div>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6 @4xl/main:grid-cols-3">
        {sampleTasks.map((task) => (
          <Card key={task.id} className="flex flex-col justify-between">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-sm font-semibold">
                  {task.title}
                </CardTitle>
                <Badge variant="outline" className="text-[11px]">
                  {task.type}
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                {task.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3 px-6 pb-4 pt-0 text-xs">
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {task.payout}{" "}
                  <span className="font-normal text-muted-foreground">
                    total budget
                  </span>
                </p>
                <p className="text-muted-foreground">Level: {task.level}</p>
              </div>
              <Button size="sm" variant="outline">
                View details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


