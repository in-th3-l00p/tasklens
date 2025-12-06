import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
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
        <Button size="sm" variant="outline">
          Edit profile
        </Button>
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
            <p className="text-sm font-medium text-foreground">Your name</p>
            <p className="text-muted-foreground">
              Short bio about how you like to work, the types of problems you
              enjoy, and past experience that&apos;s relevant here.
            </p>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Links</p>
              <p className="text-muted-foreground">
                Add links to your portfolio, GitHub, LinkedIn, or personal site
                once the profile editor is wired up.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Focus areas</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline">UX &amp; research</Badge>
                <Badge variant="outline">Community</Badge>
                <Badge variant="outline">Web3</Badge>
              </div>
            </div>
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
                4.7★
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Tasks completed as contributor
              </span>
              <span className="text-sm font-semibold text-foreground">34</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Tasks created as client
              </span>
              <span className="text-sm font-semibold text-foreground">12</span>
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


