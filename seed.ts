import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";
import { db } from "./src/db";
import { analysisCards, codeSubmissions, roasts } from "./src/db/schema";

const LANGUAGES = [
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
] as const;

const SEVERITIES = ["low", "medium", "high", "critical"] as const;

const SAMPLE_CODES: Record<string, string> = {
	javascript: `function calculateSum(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
	typescript: `interface User {
  name: string;
  email: string;
}

function getUser(id: string): User {
  return { name: "John", email: "john@example.com" };
}`,
	python: `def process_data(data):
    result = []
    for item in data:
        result.append(item * 2)
    return result`,
	java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
	go: `func main() {
    fmt.Println("Hello, World!")
}`,
	rust: `fn main() {
    println!("Hello, world!");
}`,
	cpp: `#include <iostream>
int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}`,
	csharp: `using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello World");
    }
}`,
	ruby: `puts "Hello World"`,
	php: `<?php
echo "Hello World";
?>`,
	sql: `SELECT * FROM users WHERE id = 1`,
	html: `<div>
  <h1>Hello</h1>
  <p>World</p>
</div>`,
	css: `.container {
  display: flex;
  justify-content: center;
}`,
	other: `console.log("Hello World");`,
};

const ROAST_TEMPLATES = [
	"Este código é tão ruim que até o compilador está rindo.",
	"Eu vi código melhor em um papel higiênico.",
	" parabéns, você conseguiu tornar algo simples em algo complexo.",
	"Este código tem mais bugs do que um programa de TV brasileira.",
	"Você sabia que exists documentação? Provavelmente não.",
	"Este código parece ter sido escrito às 3 da manhã.",
	"Parabéns pelo código! Agora eu entendo por que precisamos de testes.",
	"Esse código é um presente de Natal antecipado para os bugs.",
	"Eu tenho medo de perguntar quem escreveu isso. Na verdade, não tenho.",
	"Este código funciona? Não sei, mas com certeza é criativo.",
];

const ISSUE_TITLES = [
	"Variável mal nomeada",
	"Função muito longa",
	"Sem tratamento de erros",
	"Código duplicado",
	"Performance ruim",
	"Sem validação de entrada",
	"Memory leak potencial",
	"SQL injection vulnerability",
	"Sem comments",
	"Estilo inconsistente",
	"Naming confuso",
	"Função sem propósito claro",
	"Uso de var ao invés de let/const",
	"Sem tipagem",
	"Código morto",
];

const FIX_SUGGESTIONS = [
	"Use nomes descritivos como 'userList' ou 'totalAmount'.",
	"Extraia lógica em funções menores e reutilizáveis.",
	"Adicione try-catch e tratamento adequado de erros.",
	"Use uma função auxiliar para evitar duplicação.",
	"Considere usar memoização ou caching.",
	"Valide todos os inputs antes de processar.",
	"Use weakMap/weakSet ou limpe referências corretamente.",
	"Use parameterized queries para evitar SQL injection.",
	"Adicione JSDoc ou comentários explicando o propósito.",
	"Siga um style guide consistente como ESLint.",
	"Use nomes que descrevem o propósito da variável.",
	"Cada função deve fazer uma coisa só.",
	"Use 'const' para valores que não mudam.",
	"Adicione tipos explícitos ou use TypeScript.",
	"Remova código que nunca é executado.",
];

function randomElement<T>(arr: readonly T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function generateCodeSubmission() {
	const language = randomElement(LANGUAGES);
	const code = SAMPLE_CODES[language] || SAMPLE_CODES.other;

	return {
		code,
		language: language as (typeof LANGUAGES)[number],
		roastMode: faker.datatype.boolean(),
		score: String(faker.number.float({ min: 0, max: 9.9, fractionDigits: 1 })),
		ipHash: faker.string.alphanumeric(64),
	};
}

function generateRoastContent(isSarcastic: boolean): string {
	const base = randomElement(ROAST_TEMPLATES);
	const additional = isSarcastic
		? faker.lorem.sentence()
		: "Aqui está uma análise técnica do código.";
	return `${base} ${additional}`;
}

async function seed() {
	console.log("🌱 Starting seed...");

	console.log("Generating 100 submissions with roasts...");

	for (let i = 0; i < 100; i++) {
		const submission = generateCodeSubmission();

		const [insertedSubmission] = await db
			.insert(codeSubmissions)
			.values(submission)
			.returning();

		const isSarcastic = faker.datatype.boolean();

		const [insertedRoast] = await db
			.insert(roasts)
			.values({
				submissionId: insertedSubmission.id,
				content: generateRoastContent(isSarcastic),
				model: randomElement(["gpt-4", "gpt-3.5-turbo", "claude-3"]),
				modelResponseId: faker.string.alphanumeric(20),
				isSarcastic,
			})
			.returning();

		const numCards = faker.number.int({ min: 1, max: 5 });

		for (let j = 0; j < numCards; j++) {
			await db.insert(analysisCards).values({
				roastId: insertedRoast.id,
				issueTitle: randomElement(ISSUE_TITLES),
				issueDescription: faker.lorem.paragraph(),
				severity: randomElement(SEVERITIES),
				suggestedFix: randomElement(FIX_SUGGESTIONS),
				lineStart: faker.number.int({ min: 1, max: 50 }),
				lineEnd: faker.number.int({ min: 1, max: 50 }),
			});
		}

		if ((i + 1) % 10 === 0) {
			console.log(`  Created ${i + 1} submissions...`);
		}
	}

	console.log("✅ Seed completed!");
}

seed()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("Seed failed:", err);
		process.exit(1);
	});
