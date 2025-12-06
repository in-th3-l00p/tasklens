import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-secondary/40 to-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12 sm:py-16 lg:py-20">
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div className="space-y-8">
            <Badge
              variant="outline"
              className="gap-2 border-border bg-background/60 px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              On-chain micro-task verification on Celo
            </Badge>

            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Verify micro-tasks.
                <br />
                <span className="text-primary">Unlock trusted payouts.</span>
              </h1>
              <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
                <span className="font-semibold">tasklens</span> is a micro-task
                verification marketplace powered by Convex, Clerk, and Celo
                payments. Post tasks, review proofs, and settle rewards with
                on-chain transparency.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#how-it-works">How tasklens works</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#features">Explore features</a>
              </Button>
            </div>

            <dl className="grid grid-cols-2 gap-4 text-sm text-muted-foreground sm:max-w-md sm:text-xs md:text-sm">
              <div>
                <dt className="font-medium text-foreground">For creators</dt>
                <dd>Spin up verifiable task campaigns in minutes.</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">For reviewers</dt>
                <dd>Earn by validating high-signal user proofs.</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-primary/15 via-secondary/10 to-primary/5 blur-3xl" />
            <Card className="relative bg-background/80 shadow-sm backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Live task snapshot
                  </p>
                  <CardTitle className="mt-1 text-sm">
                    Onboard 50 beta users
                  </CardTitle>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">
                  Funded on Celo
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="flex flex-row items-center justify-between border-dashed bg-muted/40 px-4 py-3">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Verification queue
                    </p>
                    <p className="text-sm font-semibold">
                      12 proofs awaiting review
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-xs text-muted-foreground">
                    <span>Avg. payout</span>
                    <span className="font-semibold text-foreground">
                      0.4 CELO / task
                    </span>
                  </div>
                </Card>

                <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
                  <Card className="border-border/80 bg-background/80 p-3">
                    <CardTitle className="text-[11px] font-medium uppercase tracking-wide">
                      Convex
                    </CardTitle>
                    <CardDescription className="mt-1 text-[13px] text-foreground">
                      Tasks, proofs, and reputation stored in a single source of
                      truth.
                    </CardDescription>
                  </Card>
                  <Card className="border-border/80 bg-background/80 p-3">
                    <CardTitle className="text-[11px] font-medium uppercase tracking-wide">
                      Clerk
                    </CardTitle>
                    <CardDescription className="mt-1 text-[13px] text-foreground">
                      Users sign in once and link wallets securely to their
                      identity.
                    </CardDescription>
                  </Card>
                  <Card className="border-border/80 bg-background/80 p-3">
                    <CardTitle className="text-[11px] font-medium uppercase tracking-wide">
                      Celo
                    </CardTitle>
                    <CardDescription className="mt-1 text-[13px] text-foreground">
                      Payouts settle on Celo with transparent on-chain receipts.
                    </CardDescription>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="features" className="space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Built for verifiable micro-tasks
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Structure tasks as on-chain commitments, collect rich proofs from
                contributors, and keep reviewers in the loop with clear queues and
                reputation signals.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="group bg-background/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 px-0 pb-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Image src="/file.svg" alt="" width={20} height={20} />
                </div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Structured task definitions
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <CardDescription className="text-sm text-muted-foreground">
                  Capture inputs, expected outputs, and reviewer criteria in a
                  repeatable schema for every task campaign.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group bg-background/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 px-0 pb-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Image src="/window.svg" alt="" width={20} height={20} />
                </div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Proofs, not screenshots
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <CardDescription className="text-sm text-muted-foreground">
                  Collect verifiable proofs—links, artifacts, and context—stored in
                  Convex and tied to each contributor&apos;s identity.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group bg-background/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 px-0 pb-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Image src="/globe.svg" alt="" width={20} height={20} />
                </div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Celo-native payouts
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <CardDescription className="text-sm text-muted-foreground">
                  Settle rewards in CELO after review, with task states and payment
                  flows that can be surfaced to contributors in real time.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section
          id="how-it-works"
          className="rounded-3xl border border-dashed border-border bg-muted/40 px-6 py-8 sm:px-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                How tasklens works
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Under the hood, tasklens connects Clerk identities, Convex data, and
                Celo wallets so every micro-task is traceable from brief to payout.
              </p>
            </div>
          </div>

          <ol className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
            <Card className="border-border bg-background/60 p-4">
              <CardHeader className="px-0 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Step 1
                </p>
                <CardTitle className="mt-1 text-sm font-medium text-foreground">
                  Sign in with Clerk &amp; link your Celo wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <CardDescription className="text-sm text-muted-foreground">
                  Clerk is the source of truth for users, with wallets linked as
                  verified addresses—never private keys.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-background/60 p-4">
              <CardHeader className="px-0 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Step 2
                </p>
                <CardTitle className="mt-1 text-sm font-medium text-foreground">
                  Launch tasks &amp; collect proofs in Convex
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <CardDescription className="text-sm text-muted-foreground">
                  Tasks, submissions, and reviewer decisions live in Convex,
                  powering real-time queues and reputation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-background/60 p-4">
              <CardHeader className="px-0 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Step 3
                </p>
                <CardTitle className="mt-1 text-sm font-medium text-foreground">
                  Verify work &amp; settle payouts on Celo
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <CardDescription className="text-sm text-muted-foreground">
                  Once proofs are approved, payouts are executed via Celo with
                  transparent, on-chain receipts.
                </CardDescription>
              </CardContent>
            </Card>
          </ol>
        </section>
      </div>
    </main>
  );
}
