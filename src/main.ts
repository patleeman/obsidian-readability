import { Plugin } from "obsidian";
import generateHighlightFieldPlugin from "./plugin";
import { ObsidianReadabilitySettingsTab } from "./settings";
import { ReadabilitySummaryView, VIEW_TYPE } from "./summary";

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

		this.registerView(
			VIEW_TYPE,
			(leaf) => new ReadabilitySummaryView(leaf, this.settings)
		);

		if (this.settings.defaultVisibility === "show") {
			document.body.addClass(visibilityToggleClassName);
			this.activateView();
		}

		this.addCommand({
			id: "toggle-readability-highlights",
			name: "Toggle highlights",
			callback: () => {
				if (document.body.hasClass(visibilityToggleClassName)) {
					document.body.removeClass(visibilityToggleClassName);
					this.deactivateView();
				} else {
					document.body.addClass(visibilityToggleClassName);
					this.activateView();
				}
			},
		});
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE);
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

	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]
		);
	}

	async deactivateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE);
	}
}
