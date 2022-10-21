import ObsidianReadabilityPlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class ObsidianReadabilitySettingsTab extends PluginSettingTab {
	plugin: ObsidianReadabilityPlugin;

	constructor(app: App, plugin: ObsidianReadabilityPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Default Visibility")
			.setDesc("Start obsidian with highlights shown or hidden")
			.addDropdown((component) => {
				component
					.addOption("show", "Show")
					.addOption("hide", "Hide")
					.setValue(this.plugin.settings.defaultVisibility)
					.onChange(async (value: "show" | "hide") => {
						this.plugin.settings.defaultVisibility = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Check Readability")
			.setDesc("Enable readability highlighting")
			.addToggle((component) => {
				component
					.setValue(this.plugin.settings.checkReadability)
					.onChange(async (value) => {
						this.plugin.settings.checkReadability = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Readability Reading Age")
			.setDesc(
				"Set the reading age for the readability checks (default: 16)"
			)
			.addSlider((component) => {
				component
					.setValue(this.plugin.settings.readingAge)
					.setLimits(5, 18, 1)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.readingAge = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Check for Passive Voice")
			.setDesc("Enable passive voice highlighting")
			.addToggle((component) => {
				component
					.setValue(this.plugin.settings.checkForPassiveVoice)
					.onChange(async (value) => {
						this.plugin.settings.checkForPassiveVoice = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Increase Intensity")
			.setDesc("Enable highlighting of weak or passive wording")
			.addToggle((component) => {
				component
					.setValue(this.plugin.settings.increaseIntensity)
					.onChange(async (value) => {
						this.plugin.settings.increaseIntensity = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Simplify Writing")
			.setDesc("Check for simpler alternative to words")
			.addToggle((component) => {
				component
					.setValue(this.plugin.settings.simplifyText)
					.onChange(async (value) => {
						this.plugin.settings.simplifyText = value;
						await this.plugin.saveSettings();
					});
			});
	}
}
