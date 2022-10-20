import { Plugin } from "obsidian";
import generateHighlightFieldPlugin from "./plugin";
import { highlightTheme } from "./theme";

export interface ObsidianReadabilitySettings {
	readingAge: number;
	enableReadabilityCheck: boolean;
	enablePassiveCheck: boolean;
}

const DEFAULT_SETTINGS: ObsidianReadabilitySettings = {
	readingAge: 18,
	enableReadabilityCheck: true,
	enablePassiveCheck: true,
};

export default class ObsidianReadabilityPlugin extends Plugin {
	settings: ObsidianReadabilitySettings;

	async onload() {
		await this.loadSettings();
		const Plugin = generateHighlightFieldPlugin(this.settings);
		this.registerEditorExtension([Plugin, highlightTheme]);
	}

	onunload() {
		console.log("Obsidian Readability Unloaded");
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
