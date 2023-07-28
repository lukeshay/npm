type Configs = Record<
	| "all"
	| "react"
	| "recommended-natural"
	| "recommended-typescript-error"
	| "recommended"
	| "strict"
	| "typescript",
	{
		rules: Record<string, unknown>
	}
>

declare module "eslint-plugin-import" {
	export const configs: Configs
}

declare module "eslint-plugin-promise" {
	export const configs: Configs
}

declare module "eslint-plugin-unicorn" {
	export const configs: Configs
}

declare module "eslint-plugin-perfectionist" {
	export const configs: Configs
}

declare module "eslint-plugin-security" {
	export const configs: Configs
}
declare module "eslint-plugin-regexp" {
	export const configs: Configs
}
declare module "eslint-plugin-jsdoc" {
	export const configs: Configs
}
declare module "eslint-plugin-n" {
	export const configs: Configs
}
declare module "eslint-plugin-etc" {}
declare module "eslint-plugin-fp" {}
declare module "@regru/eslint-plugin-prefer-early-return" {}
declare module "eslint-plugin-sonar" {}
declare module "eslint-plugin-validate-jsx-nesting" {}
declare module "eslint-plugin-react-refresh" {}
declare module "@html-eslint/eslint-plugin" {
	export const configs: Configs
}
declare module "eslint-plugin-react" {
	export const configs: Configs
}
declare module "eslint-plugin-react-hooks" {
	export const configs: Configs
}
declare module "eslint-plugin-react-perf" {
	export const configs: Configs
}
declare module "eslint-plugin-jsx-a11y" {
	export const configs: Configs
}
declare module "eslint-plugin-ssr-friendly" {
	export const configs: Configs
}

declare module "eslint-plugin-react-native" {
	export const configs: Configs
}
declare module "eslint-plugin-vitest" {
	export const configs: Configs
}

declare module "@react-native-community/eslint-plugin"
