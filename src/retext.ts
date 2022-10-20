import { reporter } from "vfile-reporter";
import { unified } from "unified";
import retextEnglish from "retext-english";
import retextStringify from "retext-stringify";
import retextReadability from "retext-readability";

async function processText(text: string) {
	const file = await unified()
		.use(retextEnglish)
		.use(retextReadability)
		.use(retextStringify)
		.process(text);
	return reporter(file);
}

export default processText;
