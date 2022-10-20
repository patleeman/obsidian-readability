import { Plugin } from "obsidian";
import ReadabilityPlugin from "./plugin";
import HighlightTheme from "./theme";

interface ObsidianReadabilitySettings {
	readingAge: number;
}

const DEFAULT_SETTINGS: ObsidianReadabilitySettings = {
	readingAge: 16,
};

export default class ObsidianReadabilityPlugin extends Plugin {
	settings: ObsidianReadabilitySettings;

	async onload() {
		await this.loadSettings();
		console.log("Obsidian Readability Loaded");
		this.registerEditorExtension([
			ReadabilityPlugin,
			HighlightTheme,
			//readabilityLinter
		]);
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
