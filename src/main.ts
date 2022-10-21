import { Plugin } from "obsidian";
import generateHighlightFieldPlugin from "./plugin";
import { ObsidianReadabilitySettingsTab } from "./settings";

export interface ObsidianReadabilitySettings {
	defaultVisibility: "show" | "hide";
	readingAge: number;
	checkReadability: boolean;
	checkForPassiveVoice: boolean;
	increaseIntensity: boolean;
	simplifyText: boolean;
}

const DEFAULT_SETTINGS: ObsidianReadabilitySettings = {
	defaultVisibility: "show",
	readingAge: 18,
	checkReadability: true,
	checkForPassiveVoice: true,
	increaseIntensity: true,
	simplifyText: true,
};

const visibilityToggleClassName = "or-show";

export default class ObsidianReadabilityPlugin extends Plugin {
	settings: ObsidianReadabilitySettings;

	async onload() {
		await this.loadSettings();
		const Plugin = generateHighlightFieldPlugin(this.settings);
		this.registerEditorExtension([Plugin]);

		this.addSettingTab(new ObsidianReadabilitySettingsTab(this.app, this));

		if (this.settings.defaultVisibility === "show") {
			document.body.addClass(visibilityToggleClassName);
		}

		this.addCommand({
			id: "toggle-readability-highlights",
			name: "Toggle highlights",
			callback: () => {
				if (document.body.hasClass(visibilityToggleClassName)) {
					document.body.removeClass(visibilityToggleClassName);
				} else {
					document.body.addClass(visibilityToggleClassName);
				}
			},
		});
	}

	onunload() {}

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
