import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    displayName: v.string(),
    handle: v.optional(v.string()),
    email: v.optional(v.string()),
    wallet: v.optional(
      v.object({
        chain: v.literal("celo"),
        address: v.string(),
        verified: v.boolean(),
      }),
    ),
    isCreator: v.optional(v.boolean()),
    isContributor: v.optional(v.boolean()),
  })
    .index("by_clerkUserId", ["clerkUserId"])
    .index("by_handle", ["handle"]),

  profiles: defineTable({
    userId: v.id("users"),
    headline: v.optional(v.string()),
    bio: v.optional(v.string()),
    links: v.optional(
      v.array(
        v.object({
          label: v.string(),
          url: v.string(),
        }),
      ),
    ),
    focusTags: v.optional(v.array(v.string())),
    reputation: v.object({
      rating: v.number(),
      completedAsContributor: v.number(),
      completedAsCreator: v.number(),
      recentNotes: v.optional(
        v.array(
          v.object({
            note: v.string(),
            taskId: v.optional(v.id("tasks")),
            createdAt: v.number(),
          }),
        ),
      ),
    }),
  }).index("by_user", ["userId"]),

  tasks: defineTable({
    creatorId: v.id("users"),
    title: v.string(),
    description: v.string(),
    brief: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    reward: v.object({
      token: v.literal("CELO"),
      chainId: v.string(),
      amountPerProof: v.number(),
      maxProofs: v.number(),
    }),
    status: v.union(
      v.literal("draft"),
      v.literal("open"),
      v.literal("in_review"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    access: v.object({
      mode: v.union(
        v.literal("public"),
        v.literal("min_reputation"),
        v.literal("invite_only"),
      ),
      minRating: v.optional(v.number()),
    }),
    onchainFunding: v.optional(
      v.object({
        chainId: v.string(),
        contractAddress: v.string(),
        referenceId: v.optional(v.string()),
      }),
    ),
  })
    .index("by_creator", ["creatorId"])
    .index("by_status", ["status"])
    .searchIndex("search_title_and_description", {
      searchField: "title",
      filterFields: ["status"],
    }),

  taskParticipants: defineTable({
    taskId: v.id("tasks"),
    userId: v.id("users"),
    role: v.union(v.literal("contributor"), v.literal("reviewer")),
    status: v.union(
      v.literal("requested"),
      v.literal("accepted"),
      v.literal("in_progress"),
      v.literal("submitted"),
      v.literal("completed"),
      v.literal("rejected"),
    ),
    decisionNote: v.optional(v.string()),
    agreedReward: v.optional(
      v.object({
        token: v.literal("CELO"),
        chainId: v.string(),
        amountPerProof: v.number(),
      }),
    ),
    onchainPayment: v.optional(
      v.object({
        chainId: v.string(),
        txHash: v.string(),
        referenceId: v.optional(v.string()),
      }),
    ),
  })
    .index("by_task", ["taskId"])
    .index("by_user", ["userId"])
    .index("by_user_and_status", ["userId", "status"]),

  submissions: defineTable({
    taskId: v.id("tasks"),
    contributorId: v.id("users"),
    participationId: v.optional(v.id("taskParticipants")),
    content: v.object({
      summary: v.string(),
      links: v.optional(
        v.array(
          v.object({
            label: v.string(),
            url: v.string(),
          }),
        ),
      ),
      extra: v.optional(v.any()),
    }),
    status: v.union(
      v.literal("submitted"),
      v.literal("under_review"),
      v.literal("approved"),
      v.literal("rejected"),
    ),
    reviewerId: v.optional(v.id("users")),
    reviewNote: v.optional(v.string()),
    onchainPayment: v.optional(
      v.object({
        chainId: v.string(),
        txHash: v.string(),
        referenceId: v.optional(v.string()),
      }),
    ),
  })
    .index("by_task", ["taskId"])
    .index("by_contributor", ["contributorId"])
    .index("by_reviewer", ["reviewerId"]),

  messages: defineTable({
    taskId: v.optional(v.id("tasks")),
    senderId: v.id("users"),
    recipientId: v.optional(v.id("users")),
    body: v.string(),
  })
    .index("by_task", ["taskId"])
    .index("by_recipient", ["recipientId"]),

  onchainEvents: defineTable({
    chainId: v.string(),
    txHash: v.string(),
    kind: v.union(
      v.literal("task_funded"),
      v.literal("submission_paid"),
      v.literal("other"),
    ),
    taskId: v.optional(v.id("tasks")),
    submissionId: v.optional(v.id("submissions")),
    participantId: v.optional(v.id("taskParticipants")),
    payload: v.optional(v.any()),
  })
    .index("by_chain_and_tx", ["chainId", "txHash"])
    .index("by_task", ["taskId"]),
});


