import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema/index.ts",
	out: "./drizzle",
	dbCredentials: {
		url:
			process.env.DATABASE_URL ||
			"postgresql://devroast:devroast@localhost:5432/devroast",
	},
	casing: "snake_case",
});
