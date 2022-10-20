import { EditorView } from "@codemirror/view";
// Dark blue: rgba(86, 99, 138, 1)
// Orange: rgba(255, 142, 114, 1)
// Yellow: rgba(242, 187, 5, 1)
// Green: rgba(139, 191, 159, 1)
// Red: rgba(156, 56, 72, 1)
export const THEME_CLASS_NAMES = {
	hardToRead: {
		name: "cm-rp-readability",
		color: "rgba(86, 99, 138, 1)",
	},
};

const highlightTheme = EditorView.theme(
	{
		[`.${THEME_CLASS_NAMES.hardToRead.name}`]: {
			backgroundColor: THEME_CLASS_NAMES.hardToRead.color,
		},
	},
	{ dark: true }
);

export default highlightTheme;
