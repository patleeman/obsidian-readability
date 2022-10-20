import { EditorView, Decoration, DecorationSet } from "@codemirror/view";
import { StateField } from "@codemirror/state";
import { unified } from "unified";
import retextEnglish from "retext-english";
import retextStringify from "retext-stringify";
import retextReadability from "retext-readability";
import retextPassive from "retext-passive";
import { ObsidianReadabilitySettings } from "./main";

export const THEME_CLASS_NAMES = {
	hardToRead: "cm-rp-readability",
	passive: "cm-rp-passive",
};

function generateHighlightFieldPlugin(settings: ObsidianReadabilitySettings) {
	return StateField.define<DecorationSet>({
		create() {
			return Decoration.none;
		},
		update(highlights, tr) {
			const updatedHighlights = highlights.map(tr.changes);
			const updatedDoc = tr.newDoc.sliceString(0);
			let processor = unified().use(retextEnglish);

			if (settings.enablePassiveCheck) {
				processor = processor.use(retextPassive);
			}
			if (settings.enableReadabilityCheck) {
				processor = processor.use(retextReadability, {
					age: settings.readingAge,
				});
			}

			processor = processor.use(retextStringify);
			const file = processor.processSync(updatedDoc);
			console.log(file);
			const decoration = [];
			for (const message of file.messages) {
				console.log(message.source);
				decoration.push(
					Decoration.mark({
						class: getClassNameFromMessageSource(message.source),
					}).range(
						message.position?.start?.offset || 0,
						message.position?.end?.offset
					)
				);
			}

			return updatedHighlights.update({
				add: decoration,
				sort: true,
			});
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
		default:
			return "";
	}
}

export default generateHighlightFieldPlugin;
