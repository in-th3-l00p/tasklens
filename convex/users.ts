import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const ensureUser = mutation({
  args: {
    clerkUserId: v.string(),
    displayName: v.string(),
    email: v.optional(v.string()),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        displayName: args.displayName,
        email: args.email,
      });

      const profile = await ctx.db
        .query("profiles")
        .withIndex("by_user", (q) => q.eq("userId", existing._id))
        .unique();

      if (!profile) {
        await ctx.db.insert("profiles", {
          userId: existing._id,
          headline: undefined,
          bio: undefined,
          links: [],
          focusTags: [],
          reputation: {
            rating: 0,
            completedAsContributor: 0,
            completedAsCreator: 0,
            recentNotes: [],
          },
        });
      }

      return existing._id;
    }

    const userId = await ctx.db.insert("users", {
      clerkUserId: args.clerkUserId,
      displayName: args.displayName,
      handle: undefined,
      email: args.email,
      wallet: undefined,
      isCreator: true,
      isContributor: true,
    });

    await ctx.db.insert("profiles", {
      userId,
      headline: undefined,
      bio: undefined,
      links: [],
      focusTags: [],
      reputation: {
        rating: 0,
        completedAsContributor: 0,
        completedAsCreator: 0,
        recentNotes: [],
      },
    });

    return userId;
  },
});

export const getProfile = query({
  args: {
    clerkUserId: v.string(),
  },
  returns: v.union(
    v.null(),
    v.object({
      userId: v.id("users"),
      displayName: v.string(),
      email: v.optional(v.string()),
      handle: v.optional(v.string()),
      headline: v.optional(v.string()),
      bio: v.optional(v.string()),
      focusTags: v.optional(v.array(v.string())),
      reputation: v.object({
        rating: v.number(),
        completedAsContributor: v.number(),
        completedAsCreator: v.number(),
      }),
    }),
  ),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    if (!user) {
      return null;
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (!profile) {
      return null;
    }

    return {
      userId: user._id,
      displayName: user.displayName,
      email: user.email,
      handle: user.handle,
      headline: profile.headline,
      bio: profile.bio,
      focusTags: profile.focusTags,
      reputation: {
        rating: profile.reputation.rating,
        completedAsContributor: profile.reputation.completedAsContributor,
        completedAsCreator: profile.reputation.completedAsCreator,
      },
    };
  },
});

export const updateProfile = mutation({
  args: {
    clerkUserId: v.string(),
    headline: v.optional(v.string()),
    bio: v.optional(v.string()),
    focusTags: v.array(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (!profile) {
      await ctx.db.insert("profiles", {
        userId: user._id,
        headline: args.headline,
        bio: args.bio,
        links: [],
        focusTags: args.focusTags,
        reputation: {
          rating: 0,
          completedAsContributor: 0,
          completedAsCreator: 0,
          recentNotes: [],
        },
      });
      return null;
    }

    await ctx.db.patch(profile._id, {
      headline: args.headline,
      bio: args.bio,
      focusTags: args.focusTags,
    });

    return null;
  },
});


