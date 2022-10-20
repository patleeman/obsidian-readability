import { EditorView, Decoration, DecorationSet } from "@codemirror/view";
import { StateField, EditorState } from "@codemirror/state";
import { unified } from "unified";
import retextEnglish from "retext-english";
import retextStringify from "retext-stringify";
import retextReadability from "retext-readability";
import { THEME_CLASS_NAMES } from "./theme";

const underlineField = StateField.define<DecorationSet>({
	create(state: EditorState) {
		return Decoration.none;
	},
	update(highlights, tr) {
		const updatedHighlights = highlights.map(tr.changes);
		const updatedDoc = tr.newDoc.sliceString(0);
		const file = unified()
			.use(retextEnglish)
			.use(retextReadability, { age: 18 })
			.use(retextStringify)
			.processSync(updatedDoc);

		const decoration = [];
		for (const message of file.messages) {
			decoration.push(
				Decoration.mark({
					class: THEME_CLASS_NAMES.hardToRead.name,
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

export default underlineField;
