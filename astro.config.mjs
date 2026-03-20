// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";
import starlightLinksValidator from "starlight-links-validator";
import starlightImageZoom from "starlight-image-zoom";
import starlightLlmsTxt from "starlight-llms-txt";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	site: "https://handbook.seventwo.studio",
	integrations: [
		starlight({
			plugins: [
				starlightThemeRapide(),
				starlightLinksValidator(),
				starlightImageZoom(),
				starlightLlmsTxt(),
			],
			title: "SevenTwo Studio Handbook",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/seventwo-studio",
				},
			],
			sidebar: [
				{
					label: "Start Here",
					items: [
						{ label: "Welcome", slug: "start-here" },
						{
							label: "Learning Path",
							slug: "start-here/first-day",
							badge: "New",
						},
						{
							label: "Pick Your Stack",
							slug: "start-here/pick-your-stack",
							badge: "New",
						},
					],
				},
				{
					label: "Guides",
					collapsed: true,
					items: [
						{ label: "Overview", slug: "guides" },
						{
							label: "Project Scaffolding",
							slug: "guides/project-scaffolding",
							badge: "New",
						},
						{
							label: "Auth & Database",
							slug: "guides/auth-and-database",
							badge: "New",
						},
						{
							label: "Deployment",
							slug: "guides/deployment",
							badge: "New",
						},
						{
							label: "Monorepo",
							slug: "guides/monorepo",
							badge: "New",
						},
					],
				},
				{
					label: "Languages",
					collapsed: true,
					items: [
						{ label: "Overview", slug: "languages" },
						{ label: "TypeScript", slug: "languages/typescript" },
						{ label: "Swift", slug: "languages/swift" },
						{ label: "Kotlin", slug: "languages/kotlin" },
						{ label: "Rust", slug: "languages/rust" },
					],
				},
				{
					label: "App Types",
					collapsed: true,
					items: [
						{ label: "Overview", slug: "app-types" },
						{ label: "Expo App", slug: "app-types/expo-app" },
						{ label: "Hono API", slug: "app-types/hono-api" },
						{
							label: "Astro Website",
							slug: "app-types/astro-website",
						},
						{
							label: "TanStack Dashboard",
							slug: "app-types/tanstack-dashboard",
						},
						{
							label: "Native iOS (SwiftUI)",
							slug: "app-types/native-ios-swiftui",
						},
						{
							label: "Native Android (Kotlin + Compose)",
							slug: "app-types/native-android-kotlin-compose",
						},
					],
				},
				{
					label: "Practices",
					collapsed: true,
					items: [
						{ label: "Overview", slug: "practices" },
						{
							label: "Architecture & Design Patterns",
							slug: "practices/architecture",
						},
						{
							label: "Version Control",
							slug: "practices/version-control",
						},
						{
							label: "Code Review",
							slug: "practices/code-review",
						},
						{ label: "Security", slug: "practices/security" },
						{ label: "Database", slug: "practices/database" },
						{
							label: "DevOps & Deployment",
							slug: "practices/devops-deployment",
						},
						{
							label: "Release Strategy",
							slug: "practices/release-strategy",
						},
					],
				},
				{
					label: "Reference",
					items: [
						{
							label: "Language Rules",
							slug: "reference/languages",
							badge: "New",
						},
						{
							label: "App Type Rules",
							slug: "reference/app-types",
							badge: "New",
						},
						{
							label: "Practice Rules",
							slug: "reference/practices",
							badge: "New",
						},
					],
				},
			],
		}),
		robotsTxt(),
	],
});
