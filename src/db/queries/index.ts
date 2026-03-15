import { eq, sql } from "drizzle-orm";
import { db } from "../index";
import {
	type AnalysisCard,
	analysisCards,
	type CodeSubmission,
	codeSubmissions,
	type NewAnalysisCard,
	type NewCodeSubmission,
	type NewRoast,
	type Roast,
	roasts,
} from "../schema";

export const insertCodeSubmission = async (
	data: NewCodeSubmission,
): Promise<CodeSubmission[]> => {
	return db.insert(codeSubmissions).values(data).returning() as Promise<
		CodeSubmission[]
	>;
};

export const getCodeSubmissionById = async (
	id: string,
): Promise<CodeSubmission | null> => {
	const result = await db
		.select()
		.from(codeSubmissions)
		.where(eq(codeSubmissions.id, id))
		.limit(1);
	return result[0] || null;
};

export const getCodeSubmissionsWithRoast = async (limit = 10, offset = 0) => {
	const query = sql`
    SELECT 
      cs.id,
      cs.code,
      cs.language,
      cs.roast_mode,
      cs.score,
      cs.ip_hash,
      cs.created_at,
      r.id as roast_id,
      r.content as roast_content,
      r.model,
      r.is_sarcastic
    FROM code_submissions cs
    LEFT JOIN roasts r ON r.submission_id = cs.id
    ORDER BY cs.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
	return db.execute(query);
};

export const insertRoast = async (data: NewRoast): Promise<Roast[]> => {
	return db.insert(roasts).values(data).returning() as Promise<Roast[]>;
};

export const getRoastBySubmissionId = async (
	submissionId: string,
): Promise<Roast | null> => {
	const result = await db
		.select()
		.from(roasts)
		.where(eq(roasts.submissionId, submissionId))
		.limit(1);
	return result[0] || null;
};

export const insertAnalysisCard = async (
	data: NewAnalysisCard,
): Promise<AnalysisCard[]> => {
	return db.insert(analysisCards).values(data).returning() as Promise<
		AnalysisCard[]
	>;
};

export const getAnalysisCardsByRoastId = async (
	roastId: string,
): Promise<AnalysisCard[]> => {
	return db
		.select()
		.from(analysisCards)
		.where(eq(analysisCards.roastId, roastId));
};

export const getFullSubmissionWithRoast = async (submissionId: string) => {
	const submission = await db
		.select()
		.from(codeSubmissions)
		.where(eq(codeSubmissions.id, submissionId))
		.limit(1);
	if (!submission[0]) return null;

	const roast = await db
		.select()
		.from(roasts)
		.where(eq(roasts.submissionId, submissionId))
		.limit(1);

	let cards: AnalysisCard[] = [];
	if (roast[0]) {
		cards = await db
			.select()
			.from(analysisCards)
			.where(eq(analysisCards.roastId, roast[0].id));
	}

	return {
		submission: submission[0],
		roast: roast[0] || null,
		analysisCards: cards,
	};
};

export const getLeaderboard = async (limit = 50) => {
	const query = sql`
    SELECT 
      cs.id,
      cs.code,
      cs.language,
      cs.score,
      cs.created_at,
      r.content as roast_content
    FROM code_submissions cs
    LEFT JOIN roasts r ON r.submission_id = cs.id
    WHERE cs.score IS NOT NULL
    ORDER BY cs.score ASC
    LIMIT ${limit}
  `;
	return db.execute(query);
};

export const getSubmissionsByIpHash = async (
	ipHash: string,
): Promise<CodeSubmission[]> => {
	return db
		.select()
		.from(codeSubmissions)
		.where(eq(codeSubmissions.ipHash, ipHash));
};

export const countSubmissionsByIpHash = async (
	ipHash: string,
): Promise<number> => {
	const result = await db
		.select({ count: sql<number>`count(*)` })
		.from(codeSubmissions)
		.where(eq(codeSubmissions.ipHash, ipHash));
	return result[0]?.count || 0;
};

export const updateSubmissionScore = async (
	id: string,
	score: number,
): Promise<CodeSubmission[]> => {
	return db
		.update(codeSubmissions)
		.set({ score: sql`${score}::decimal(2,1)` })
		.where(eq(codeSubmissions.id, id))
		.returning() as Promise<CodeSubmission[]>;
};
