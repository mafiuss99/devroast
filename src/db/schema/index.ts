import {
	boolean,
	decimal,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const issueSeverityEnum = pgEnum("issue_severity", [
	"low",
	"medium",
	"high",
	"critical",
]);

export const programmingLanguageEnum = pgEnum("programming_language", [
	"javascript",
	"typescript",
	"python",
	"java",
	"go",
	"rust",
	"cpp",
	"csharp",
	"ruby",
	"php",
	"sql",
	"html",
	"css",
	"other",
]);

export const codeSubmissions = pgTable("code_submissions", {
	id: uuid("id").primaryKey().defaultRandom(),
	code: text("code").notNull(),
	language: programmingLanguageEnum("language").notNull(),
	roastMode: boolean("roast_mode").default(true),
	score: decimal("score", { precision: 2, scale: 1 }),
	ipHash: varchar("ip_hash", { length: 64 }),
	createdAt: timestamp("created_at").defaultNow(),
});

export const roasts = pgTable("roasts", {
	id: uuid("id").primaryKey().defaultRandom(),
	submissionId: uuid("submission_id")
		.notNull()
		.references(() => codeSubmissions.id),
	content: text("content").notNull(),
	model: varchar("model", { length: 50 }).notNull(),
	modelResponseId: varchar("model_response_id", { length: 100 }),
	isSarcastic: boolean("is_sarcastic").default(true),
	createdAt: timestamp("created_at").defaultNow(),
});

export const analysisCards = pgTable("analysis_cards", {
	id: uuid("id").primaryKey().defaultRandom(),
	roastId: uuid("roast_id")
		.notNull()
		.references(() => roasts.id),
	issueTitle: varchar("issue_title", { length: 255 }).notNull(),
	issueDescription: text("issue_description").notNull(),
	severity: issueSeverityEnum("severity").notNull(),
	suggestedFix: text("suggested_fix").notNull(),
	lineStart: integer("line_start"),
	lineEnd: integer("line_end"),
	createdAt: timestamp("created_at").defaultNow(),
});

export type CodeSubmission = typeof codeSubmissions.$inferSelect;
export type NewCodeSubmission = typeof codeSubmissions.$inferInsert;
export type Roast = typeof roasts.$inferSelect;
export type NewRoast = typeof roasts.$inferInsert;
export type AnalysisCard = typeof analysisCards.$inferSelect;
export type NewAnalysisCard = typeof analysisCards.$inferInsert;
