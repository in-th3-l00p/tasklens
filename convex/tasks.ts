import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const rewardValidator = v.object({
  token: v.literal("CELO"),
  chainId: v.string(),
  amountPerProof: v.number(),
  maxProofs: v.number(),
});

const accessValidator = v.object({
  mode: v.union(
    v.literal("public"),
    v.literal("min_reputation"),
    v.literal("invite_only"),
  ),
  minRating: v.optional(v.number()),
});

const statusValidator = v.union(
  v.literal("draft"),
  v.literal("open"),
  v.literal("in_review"),
  v.literal("completed"),
  v.literal("cancelled"),
);

const taskDocumentValidator = v.object({
  _id: v.id("tasks"),
  _creationTime: v.number(),
  creatorId: v.id("users"),
  title: v.string(),
  description: v.string(),
  brief: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  reward: rewardValidator,
  status: statusValidator,
  access: accessValidator,
  onchainFunding: v.optional(
    v.object({
      chainId: v.string(),
      contractAddress: v.string(),
      referenceId: v.optional(v.string()),
    }),
  ),
});

export const listMyTasks = query({
  args: {},
  returns: v.array(taskDocumentValidator),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found in Convex. Make sure ensureUser has run.");
    }

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_creator", (q) => q.eq("creatorId", user._id))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    brief: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    reward: rewardValidator,
    access: accessValidator,
    status: v.union(v.literal("draft"), v.literal("open")),
  },
  returns: v.id("tasks"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found in Convex. Make sure ensureUser has run.");
    }

    const taskId = await ctx.db.insert("tasks", {
      creatorId: user._id,
      title: args.title,
      description: args.description,
      brief: args.brief,
      tags: args.tags,
      reward: args.reward,
      status: args.status,
      access: args.access,
      onchainFunding: undefined,
    });

    return taskId;
  },
});


