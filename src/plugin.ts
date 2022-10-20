import { RangeSetBuilder } from "@codemirror/state";
import {
	Decoration,
	DecorationSet,
	EditorView,
	PluginValue,
	ViewPlugin,
	ViewUpdate,
} from "@codemirror/view";

class HighlightPlugin implements PluginValue {
	decorations: DecorationSet;
	view: EditorView;

	constructor(view: EditorView) {
		this.view = view;
	}

	update(update: ViewUpdate) {
		if (update.docChanged || update.viewportChanged) {
			const builder = new RangeSetBuilder<Decoration>();

			for (const { from, to } of update.view.visibleRanges) {
				console.log(from, to);
				console.log(this.view);
				// Extract the visible range from the document

				// Run the visible range through the editor

				// Highlight using builder.add
			}

			return builder.finish();
		}
	}

	destroy() {
		// ...
	}
}

export const highlightPlugin = ViewPlugin.fromClass(HighlightPlugin);
