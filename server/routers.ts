import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { subscribers } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  subscribers: router({
    create: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        
        try {
          await db.insert(subscribers).values({
            email: input.email,
          });
          return { success: true };
        } catch (error: any) {
          if (error.code === "ER_DUP_ENTRY") {
            throw new Error("This email is already subscribed");
          }
          throw new Error("Failed to subscribe");
        }
      }),
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      try {
        return await db.select().from(subscribers);
      } catch {
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
