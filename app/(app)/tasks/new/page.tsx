import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewTaskPage() {
  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Post a new task
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Define the work, payout, and proof requirements so contributors know
            exactly how to succeed.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/tasks">Back to task marketplace</Link>
        </Button>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Task details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="text-xs font-medium text-foreground"
              >
                Title
              </label>
              <input
                id="title"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                placeholder="Short, clear description of the task"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="description"
                className="text-xs font-medium text-foreground"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                placeholder="Share context, goals, and what a high-quality proof looks like."
              />
              <p className="text-[11px] text-muted-foreground">
                Contributors will see this before joining, so be explicit about{" "}
                expectations and deliverables.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="payout"
                  className="text-xs font-medium text-foreground"
                >
                  Payout per proof (CELO)
                </label>
                <input
                  id="payout"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                  placeholder="e.g. 1.5"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="maxProofs"
                  className="text-xs font-medium text-foreground"
                >
                  Max accepted proofs
                </label>
                <input
                  id="maxProofs"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                  placeholder="e.g. 25"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="tags"
                className="text-xs font-medium text-foreground"
              >
                Tags
              </label>
              <input
                id="tags"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                placeholder="e.g. UX, sourcing, content, research"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Proof and access settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-1">
              <p className="font-medium text-foreground">Who can join?</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Open to all</Badge>
                <Badge variant="outline">Min. 4★ reputation</Badge>
                <Badge variant="outline">Invite-only</Badge>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Required proof</p>
              <p className="text-muted-foreground">
                For now, describe the artefacts you expect (links, screenshots,
                write-ups). Later, we&apos;ll wire this into structured proof
                templates.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Review &amp; payout window
              </p>
              <p className="text-muted-foreground">
                Define how quickly you intend to review proofs and release Celo
                payouts so contributors can plan.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                Publish task
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Save draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


