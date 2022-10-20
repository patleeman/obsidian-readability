// import { highlightPlugin } from "./plugin";
// import { Plugin } from "obsidian";
import processText from "./retext";

const hardSentence = `“Strange Bedfellows!” lamented the title of a recent letter to Museum News, in which a certain Harriet Sherman excoriated the National Gallery of Art in Washington for its handling of tickets to the much-ballyhooed “Van Gogh’s van Goghs” exhibit. A huge proportion of the 200,000 free tickets were snatched up by the opportunists in the dead of winter, who then scalped those tickets at $85 apiece to less hardy connoiseurs.

Yet, Sherman’s bedfellows are far from strange. Art, despite its religious and magical origins, very soon became a commercial venture. From bourgeois patrons funding art they barely understood in order to share their protegee’s prestige, to museum curators stage-managing the cult of artists in order to enhance the market value of museum holdings, entrepreneurs have found validation and profit in big-name art. Speculators, thieves, and promoters long ago created and fed a market where cultural icons could be traded like commodities.

This trend toward commodification of high-brow art took an ominous, if predictable, turn in the 1980s during the Japanese “bubble economy.” At a time when Japanese share prices more than doubled, individual tycoons and industrial giants alike invested record amounts in some of the West’s greatest masterpieces. Ryoei Saito, for example, purchased van Gogh’s Portrait of Dr. Gachet for a record-breaking $82.5 million. The work, then on loan to the Metropolitan Museum of Modern Art, suddenly vanished from the public domain. Later learning that he owed the Japanese government $24 million in taxes, Saito remarked that he would have the paining cremated with him to spare his heirs the inheritance tax. This statement, which he later dismissed as a joke, alarmed and enraged many. A representative of the Van Gogh museum, conceding that he had no legal redress, made an ethical appeal to Mr. Saito, asserting, “a work of art remains the possession of the world at large.”

Ethical appeals notwithstanding, great art will increasingly devolve into big business. Firstly, great art can only be certified by its market value. Moreover, the “world at large” hasn’t the means of acquisition. Only one museum currently has the funding to contend for the best pieces–the J. Paul Getty Museum, founded by the billionaire oilman. The art may disappear into private hands, but its transfer will disseminate once static fortunes into the hands of various investors, collectors, and occasionally the artist.
`;

console.log(processText(hardSentence).then((t) => console.log(t)));

// interface ObsidianReadabilitySettings {
// 	mySetting: string;
// }

// const DEFAULT_SETTINGS: ObsidianReadabilitySettings = {
// 	mySetting: "default",
// };

// export default class ObsidianReadabilityPlugin extends Plugin {
// 	settings: ObsidianReadabilitySettings;

// 	async onload() {
// 		await this.loadSettings();
// 		console.log("Obsidian Readability Loaded");
// 		this.registerEditorExtension([highlightPlugin]);
// 	}

// 	onunload() {
// 		console.log("Obsidian Readability Unloaded");
// 	}

// 	async loadSettings() {
// 		this.settings = Object.assign(
// 			{},
// 			DEFAULT_SETTINGS,
// 			await this.loadData()
// 		);
// 	}

// 	async saveSettings() {
// 		await this.saveData(this.settings);
// 	}
// }
