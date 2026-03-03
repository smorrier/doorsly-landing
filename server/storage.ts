import { waitlist, type InsertWaitlist, type Waitlist } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistEntryByEmail(email: string): Promise<Waitlist | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createWaitlistEntry(insertWaitlist: InsertWaitlist): Promise<Waitlist> {
    const [entry] = await db
      .insert(waitlist)
      .values(insertWaitlist)
      .returning();
    return entry;
  }

  async getWaitlistEntryByEmail(email: string): Promise<Waitlist | undefined> {
    const [entry] = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, email));
    return entry;
  }
}

export const storage = new DatabaseStorage();
