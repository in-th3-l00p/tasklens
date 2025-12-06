import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const conversations = [
  {
    id: "m1",
    name: "Alex from Celo Labs",
    lastMessage: "Thanks for the latest proofs, we’ll review them today.",
    unread: 2,
  },
  {
    id: "m2",
    name: "Jamie · Growth tasks",
    lastMessage: "Can you clarify the audience for this campaign?",
    unread: 0,
  },
] as const;

export default function MessagesPage() {
  return (
    <div className="flex h-full flex-col gap-4 py-4 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Messages
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Coordinate scope, share proofs, and keep conversations tied to the
          tasks you&apos;re collaborating on.
        </p>
      </div>

      <div className="flex flex-1 gap-4 px-4 lg:px-6">
        <Card className="flex w-full max-w-xs flex-col">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {conversations.map((thread) => (
              <button
                key={thread.id}
                className="w-full rounded-md border border-transparent bg-background/60 px-3 py-2 text-left transition hover:border-border hover:bg-background"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground">
                    {thread.name}
                  </span>
                  {thread.unread > 0 && (
                    <Badge variant="secondary">{thread.unread}</Badge>
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                  {thread.lastMessage}
                </p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="hidden flex-1 flex-col md:flex">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Select a conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center text-xs text-muted-foreground">
            Messaging will live here, scoped to each task or talent
            relationship.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


