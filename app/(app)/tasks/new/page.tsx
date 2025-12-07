"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AccessMode = "public" | "min_reputation" | "invite_only";
type TaskStatus = "draft" | "open";

export default function NewTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payout, setPayout] = useState("");
  const [maxProofs, setMaxProofs] = useState("");
  const [tags, setTags] = useState("");
  const [chainId, setChainId] = useState("celo-alfajores");
  const [accessMode, setAccessMode] = useState<AccessMode>("public");
  const [minRating, setMinRating] = useState("4.0");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(intent: TaskStatus) {
    return (event: FormEvent) => {
      event.preventDefault();
      if (!title.trim() || !description.trim()) {
        setError("Title and description are required to create a task.");
        return;
      }
      if (!payout.trim() || Number.isNaN(Number(payout))) {
        setError("Enter a valid numeric payout per proof in CELO.");
        return;
      }
      if (!maxProofs.trim() || Number.isNaN(Number(maxProofs))) {
        setError("Enter a valid numeric max accepted proofs value.");
        return;
      }

      setError(null);

      // For now we just log the payload; this will later call a Convex mutation.
      // eslint-disable-next-line no-console
      console.log("New task payload", {
        status: intent,
        title,
        description,
        reward: {
          token: "CELO",
          chainId,
          amountPerProof: Number(payout),
          maxProofs: Number(maxProofs),
        },
        access: {
          mode: accessMode,
          minRating: accessMode === "min_reputation" ? Number(minRating) : null,
        },
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
    };
  }

  return (
    <form
      className="flex flex-col gap-6 py-4 md:py-6"
      onSubmit={handleSubmit("open")}
    >
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
            {error && (
              <p className="text-xs font-medium text-destructive">{error}</p>
            )}
            <div className="space-y-1">
              <Label htmlFor="title" className="text-xs">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Short, clear description of the task"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs">
                Description
              </Label>
              <textarea
                id="description"
                rows={5}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                placeholder="Share context, goals, and what a high-quality proof looks like."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">
                Contributors will see this before joining, so be explicit about
                expectations and deliverables.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="payout" className="text-xs">
                  Payout per proof (CELO)
                </Label>
                <Input
                  id="payout"
                  type="number"
                  min={0}
                  step="0.01"
                  value={payout}
                  onChange={(e) => setPayout(e.target.value)}
                  placeholder="e.g. 1.5"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="maxProofs" className="text-xs">
                  Max accepted proofs
                </Label>
                <Input
                  id="maxProofs"
                  type="number"
                  min={1}
                  step="1"
                  value={maxProofs}
                  onChange={(e) => setMaxProofs(e.target.value)}
                  placeholder="e.g. 25"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="chainId" className="text-xs">
                Network
              </Label>
              <Select value={chainId} onValueChange={setChainId}>
                <SelectTrigger size="sm" id="chainId">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celo-alfajores">
                    Celo Alfajores · Testnet
                  </SelectItem>
                  <SelectItem value="celo-mainnet">
                    Celo Mainnet · Production
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="tags" className="text-xs">
                Tags
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. UX, sourcing, content, research"
              />
              <p className="text-[11px] text-muted-foreground">
                Comma-separated list used for discovery in the marketplace.
              </p>
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
              <Select
                value={accessMode}
                onValueChange={(value: AccessMode) => setAccessMode(value)}
              >
                <SelectTrigger size="sm" id="accessMode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Open to all</SelectItem>
                  <SelectItem value="min_reputation">
                    Min. reputation threshold
                  </SelectItem>
                  <SelectItem value="invite_only">Invite-only</SelectItem>
                </SelectContent>
              </Select>
              {accessMode === "min_reputation" && (
                <div className="mt-2 space-y-1">
                  <Label htmlFor="minRating" className="text-xs">
                    Minimum rating
                  </Label>
                  <Input
                    id="minRating"
                    type="number"
                    min={0}
                    max={5}
                    step="0.1"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    placeholder="e.g. 4.0"
                  />
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Required proof</p>
              <p className="text-muted-foreground">
                For now, describe the artefacts you expect (links, screenshots,
                write-ups). Later, we&apos;ll wire this into structured proof
                templates tied to submissions.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Review &amp; payout window
              </p>
              <p className="text-muted-foreground">
                Define how quickly you intend to review proofs and release Celo
                payouts so contributors can plan. This will map to on-chain
                behaviour once escrow flows are connected.
              </p>
            </div>
            <div className="space-y-2 border-t border-dashed border-border pt-3 text-[11px]">
              <p className="font-medium text-foreground">Summary</p>
              <p className="text-muted-foreground">
                {payout && maxProofs
                  ? `Up to ${Number(maxProofs)} proofs at ${payout} CELO each (${Number(payout) * Number(maxProofs)} CELO max budget).`
                  : "Set payout and max proofs to see your estimated budget."}
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                size="sm"
                className="flex-1"
                onClick={handleSubmit("open")}
              >
                Publish task
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={handleSubmit("draft")}
              >
                Save draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

