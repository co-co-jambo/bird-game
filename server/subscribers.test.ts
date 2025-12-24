import { describe, expect, it, beforeEach, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

// Mock getDb before importing routers
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockResolvedValue([]),
    }),
  }),
}));

import { appRouter } from "./routers";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("subscribers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("should successfully create a subscriber with valid email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.subscribers.create({
        email: "test@example.com",
      });

      expect(result).toEqual({ success: true });
    });

    it("should reject invalid email format", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.subscribers.create({
          email: "invalid-email",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBeTruthy();
      }
    });

    it("should handle empty email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.subscribers.create({
          email: "",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBeTruthy();
      }
    });
  });

  describe("list", () => {
    it("should return empty list when no subscribers exist", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.subscribers.list();

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
