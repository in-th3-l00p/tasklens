import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sampleTalent = [
  {
    id: "u1",
    name: "Alex Martinez",
    role: "User researcher · Product strategist",
    rating: "4.8",
    completed: 42,
    focus: ["UX research", "Onboarding", "Fintech"],
  },
  {
    id: "u2",
    name: "Jamie Lee",
    role: "Community & growth",
    rating: "4.6",
    completed: 35,
    focus: ["Community", "Content", "Support"],
  },
  {
    id: "u3",
    name: "Taylor Singh",
    role: "Technical QA & security",
    rating: "4.9",
    completed: 28,
    focus: ["Testing", "Security", "Web3"],
  },
] as const;

export default function TalentNetworkPage() {
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
        {sampleTalent.map((talent) => (
          <Card key={talent.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-sm font-semibold">
                <span>{talent.name}</span>
                <Badge variant="outline">{talent.rating}★</Badge>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {talent.role}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <p className="text-muted-foreground">
                {talent.completed} tasks completed on tasklens
              </p>
              <div className="flex flex-wrap gap-1.5">
                {talent.focus.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[11px]">
                    {tag}
                  </Badge>
                ))}
              </div>
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
        ))}
      </div>
    </div>
  );
}


