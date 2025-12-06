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

const inProgress = [
  {
    id: "ip1",
    title: "Interview 3 beta users for lending dApp",
    role: "Contributor",
    status: "In progress",
    payout: "18 CELO",
  },
  {
    id: "ip2",
    title: "Moderate community Discord for one week",
    role: "Contributor",
    status: "Awaiting review",
    payout: "30 CELO",
  },
] as const;

const asCreator = [
  {
    id: "c1",
    title: "Collect product feedback on onboarding emails",
    status: "Open",
    proofs: "6 / 20 proofs submitted",
  },
] as const;

export default function MyWorkPage() {
  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            My work
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Track tasks you&apos;re completing for others alongside the tasks
            you&apos;ve posted as a client.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/tasks">Find new tasks</Link>
        </Button>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Tasks I&apos;m working on
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Tasks where you&apos;ve joined as a contributor and have work in
              progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {inProgress.map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs"
              >
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{task.title}</p>
                  <p className="text-muted-foreground">{task.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline">{task.status}</Badge>
                  <p className="text-muted-foreground">{task.payout}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Tasks I&apos;ve created
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Campaigns where you&apos;re the task creator and manage proofs and
              payouts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {asCreator.map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs"
              >
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{task.title}</p>
                  <p className="text-muted-foreground">{task.proofs}</p>
                </div>
                <Badge variant="outline">{task.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


