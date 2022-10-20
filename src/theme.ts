import { EditorView } from "@codemirror/view";
// Dark blue: rgba(86, 99, 138, 1)
// Orange: rgba(255, 142, 114, 1)
// Yellow: rgba(242, 187, 5, 1)
// Green: rgba(139, 191, 159, 1)
// Red: rgba(156, 56, 72, 1)
export const THEME_CLASS_NAMES = {
	hardToRead: {
		name: "cm-rp-readability",
		color: {
			dark: "rgb(60, 69, 97)",
			light: "rgb(211, 215, 228)",
		},
	},
	passive: {
		name: "cm-rp-passive",
		color: {
			dark: "rgb(128, 25, 0)",
			light: "rgb(255, 187, 170)",
		},
	},
};

export const highlightTheme = EditorView.theme(
	{
		[`.${THEME_CLASS_NAMES.hardToRead.name}`]: {
			backgroundColor: THEME_CLASS_NAMES.hardToRead.color.dark,
		},
		[`.${THEME_CLASS_NAMES.passive.name}`]: {
			backgroundColor: THEME_CLASS_NAMES.passive.color.dark,
		},
	},
	{ dark: true }
);
