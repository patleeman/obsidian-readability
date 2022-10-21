import { EditorView, Decoration, DecorationSet } from "@codemirror/view";
import { StateField } from "@codemirror/state";
import { unified } from "unified";
import retextEnglish from "retext-english";
import retextStringify from "retext-stringify";
import retextReadability from "retext-readability";
import retextPassive from "retext-passive";
import retextIntensify from "retext-intensify";
import retextSimplify from "retext-simplify";
import { ObsidianReadabilitySettings } from "./main";

export const THEME_CLASS_NAMES = {
	hardToRead: "cm-rp-readability",
	passive: "cm-rp-passive",
	simplify: "cm-rp-simplify",
	intensify: "cm-rp-intensify",
};

function initializeProcessor(settings: ObsidianReadabilitySettings) {
	let processor = unified().use(retextEnglish);

	if (settings.checkForPassiveVoice) {
		processor = processor.use(retextPassive);
	}
	if (settings.checkReadability) {
		processor = processor.use(retextReadability, {
			age: settings.readingAge,
		});
	}
	if (settings.increaseIntensity) {
		processor = processor.use(retextIntensify);
	}
	if (settings.simplifyText) {
		processor = processor.use(retextSimplify);
	}

	processor = processor.use(retextStringify);
	return processor;
}

function generateHighlightFieldPlugin(settings: ObsidianReadabilitySettings) {
	return StateField.define<DecorationSet>({
		create() {
			return Decoration.none;
		},
		update(highlights, tr) {
			const processor = initializeProcessor(settings);
			const file = processor.processSync(tr.newDoc.sliceString(0));
			highlights = highlights.map(tr.changes);
			for (const message of file.messages) {
				// Check if this range has a mark already.
				const from = message.position?.start?.offset || 0;
				const to = message.position?.end?.offset || 0;
				const elementClass = getClassNameFromMessageSource(
					message.source
				);
				console.log(message.source);
				let skip = false;
				highlights.between(from, to, (from, to, value) => {
					if (value.class === elementClass) {
						skip = true;
						return false;
					}
				});

				if (!skip) {
					highlights = highlights.update({
						add: [
							Decoration.mark({
								class: elementClass,
								attributes: { title: message.reason },
							}).range(from, to),
						],
					});
				}
			}
			return highlights;
		},
		provide: (f) => EditorView.decorations.from(f),
	});
}

function getClassNameFromMessageSource(source: string | null): string {
	switch (source) {
		case "retext-readability":
			return THEME_CLASS_NAMES.hardToRead;
		case "retext-passive":
			return THEME_CLASS_NAMES.passive;
		case "retext-simplify":
			return THEME_CLASS_NAMES.simplify;
		case "retext-intensify":
			return THEME_CLASS_NAMES.intensify;
		default:
			return "";
	}
}

export default generateHighlightFieldPlugin;
