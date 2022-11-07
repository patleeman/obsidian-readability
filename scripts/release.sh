#!/usr/bin/env bash
# Ripped from: https://github.com/blacksmithgu/obsidian-dataview/blob/master/scripts/release

NEW_VERSION=$1

if [ -z "$NEW_VERSION" ]; then
    NEW_VERSION=$(jq -r ".version" manifest.json | awk -F. -v OFS=. '{$NF += 1 ; print}')
fi

# Rebuild the project to prepare for a release.
npm run build

# And do a github release.
gh release create "${NEW_VERSION}" main.js styles.css manifest.json --title "${NEW_VERSION}"
