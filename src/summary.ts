import { ItemView, WorkspaceLeaf } from "obsidian";
import { ObsidianReadabilitySettings } from "./main";
import { ReadabilitySummary } from "./plugin";

export const VIEW_TYPE = "readability-summary";

export class ReadabilitySummaryView extends ItemView {
	settings: ObsidianReadabilitySettings;

	constructor(leaf: WorkspaceLeaf, settings: ObsidianReadabilitySettings) {
		super(leaf);
		this.settings = settings;
	}

	getViewType() {
		return VIEW_TYPE;
	}

	getDisplayText() {
		return "Obsidian Readability Summary";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", { text: "Obsidian Readability" });
		const summary = container.createDiv("or-summary");
		if (this.settings.checkReadability) {
			summary.createEl(
				"p",
				"cm-rp-readability"
			).innerHTML = `<span id="rp-readability-count">0</span> hard to read sentences`;
		}
		if (this.settings.checkForPassiveVoice) {
			summary.createEl(
				"p",
				"cm-rp-passive"
			).innerHTML = `<span id="rp-passive-count">0 uses</span> of passive voice`;
		}
		if (this.settings.simplifyText) {
			summary.createEl(
				"p",
				"cm-rp-simplify"
			).innerHTML = `<span id="rp-simplify-count">0 phrases</span> have simpler alternatives`;
		}
		if (this.settings.increaseIntensity) {
			summary.createEl(
				"p",
				"cm-rp-intensify"
			).innerHTML = `<span id="rp-intensity-count">0 words</span> could use intensifying`;
		}
	}

	async onClose() {
		// Nothing to clean up.
	}
}

export function setSummary(summary: ReadabilitySummary) {
	let el = document.getElementById("rp-readability-count");
	if (el) {
		el.innerText = String(summary["retext-readability"] || 0);
	}

	el = document.getElementById("rp-passive-count");
	if (el) {
		const occurances = summary["retext-passive"];
		let text = "0 uses";
		if (occurances === 1) {
			text = `${occurances} use`;
		} else if (occurances > 1) {
			text = `${occurances} uses`;
		}
		el.innerText = text;
	}

	el = document.getElementById("rp-simplify-count");
	if (el) {
		const occurances = summary["retext-simplify"];
		let text = "0 phrases";
		if (occurances === 1) {
			text = `${occurances} phrase`;
		} else if (occurances > 1) {
			text = `${occurances} phrases`;
		}
		el.innerText = text;
	}

	el = document.getElementById("rp-intensity-count");
	if (el) {
		const occurances = summary["retext-intensify"];
		let text = "0 phrases";
		if (occurances === 1) {
			text = `${occurances} word`;
		} else if (occurances > 1) {
			text = `${occurances} words`;
		}
		el.innerText = text;
	}
}
