import { auth, currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { fetchMutation, fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function updateProfileAction(formData: FormData) {
  "use server";

  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return;
  }

  const headline = (formData.get("headline") as string | null) ?? "";
  const bio = (formData.get("bio") as string | null) ?? "";
  const tagsRaw = (formData.get("tags") as string | null) ?? "";

  const focusTags = tagsRaw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  await fetchMutation(api.users.updateProfile, {
    clerkUserId,
    headline: headline.trim() || undefined,
    bio: bio.trim() || undefined,
    focusTags,
  });

  revalidatePath("/profile");
}

export default async function ProfilePage() {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return <RedirectToSignIn />;
  }

  const clerkUser = await currentUser();

  await fetchMutation(api.users.ensureUser, {
    clerkUserId,
    displayName:
      clerkUser?.fullName ??
      clerkUser?.username ??
      clerkUser?.primaryEmailAddress?.emailAddress ??
      "Anonymous user",
    email: clerkUser?.primaryEmailAddress?.emailAddress ?? undefined,
  });

  const profileData = await fetchQuery(api.users.getProfile, { clerkUserId });

  const displayName =
    profileData?.displayName ??
    clerkUser?.fullName ??
    clerkUser?.username ??
    "Anonymous user";

  const email =
    profileData?.email ?? clerkUser?.primaryEmailAddress?.emailAddress;

  const headline = profileData?.headline ?? "";
  const bio = profileData?.bio ?? "";
  const tags = profileData?.focusTags ?? [];
  const reputation = profileData?.reputation ?? {
    rating: 0,
    completedAsContributor: 0,
    completedAsCreator: 0,
  };

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Profile &amp; reputation
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Tune how you show up to clients and collaborators, and keep track of
            the reputation you&apos;ve earned on tasklens.
          </p>
        </div>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Public profile
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              This is what task creators and collaborators see when they view
              your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <p className="text-sm font-medium text-foreground">{displayName}</p>
            {email && (
              <p className="text-[11px] text-muted-foreground">{email}</p>
            )}

            <form className="mt-3 space-y-3" action={updateProfileAction}>
              <div className="space-y-1">
                <Label htmlFor="headline" className="text-xs">
                  Headline
                </Label>
                <Input
                  id="headline"
                  name="headline"
                  defaultValue={headline}
                  placeholder="How do you like to introduce yourself?"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="bio" className="text-xs">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  defaultValue={bio}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  placeholder="Short bio about how you like to work, the types of problems you enjoy, and past experience that&apos;s relevant here."
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="tags" className="text-xs">
                  Focus areas
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  defaultValue={tags.join(", ")}
                  placeholder="e.g. UX research, community, Web3"
                />
                <p className="text-[11px] text-muted-foreground">
                  Comma-separated list used for discovery in the talent network.
                </p>
              </div>
              <div className="pt-2">
                <Button size="sm" type="submit">
                  Save profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Reputation summary
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Lightweight view of how you&apos;ve worked with others on
              tasklens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Overall rating</span>
              <span className="text-sm font-semibold text-foreground">
                {reputation.rating.toFixed(1)}★
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Tasks completed as contributor
              </span>
              <span className="text-sm font-semibold text-foreground">
                {reputation.completedAsContributor}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Tasks created as client
              </span>
              <span className="text-sm font-semibold text-foreground">
                {reputation.completedAsCreator}
              </span>
            </div>
            <div className="space-y-1 pt-2">
              <p className="font-medium text-foreground">Recent feedback</p>
              <p className="text-muted-foreground">
                Once wired to Convex, this will surface short, high-signal notes
                from clients and collaborators.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

