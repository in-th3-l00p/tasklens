import { fetchQuery } from "convex/nextjs";

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

export default async function TalentNetworkPage() {
  const talent = await fetchQuery(api.users.listTalent, {});

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Talent network
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Discover contributors with strong reputation, relevant experience,
            and a track record of shipping quality work.
          </p>
        </div>
        <Button size="sm" variant="outline">
          Invite talent
        </Button>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-3 lg:px-6">
        {talent.length === 0 ? (
          <Card className="col-span-full text-xs">
            <CardContent className="py-8 text-center text-muted-foreground">
              No profiles yet. As contributors complete work on tasklens, their
              profiles and reputation will appear here.
            </CardContent>
          </Card>
        ) : (
          talent.map((person) => (
            <Card key={person.userId}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-sm font-semibold">
                  <span>{person.displayName}</span>
                  <Badge variant="outline">
                    {person.reputation.rating.toFixed(1)}★
                  </Badge>
                </CardTitle>
                {person.headline && (
                  <CardDescription className="text-xs text-muted-foreground">
                    {person.headline}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p className="text-muted-foreground">
                  {person.reputation.completedAsContributor} tasks completed as
                  a contributor · {person.reputation.completedAsCreator} as a
                  client
                </p>
                {person.focusTags && person.focusTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {person.focusTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[11px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1">
                    View profile
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Start chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

