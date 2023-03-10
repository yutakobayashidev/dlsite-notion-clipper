# dlsite-notion-clipper

Chrome extension to save information about DLsite's works in Notion.

## Setup

1. Duplicate the Notion template database from the following URL

https://yutakobayashi.notion.site/1dc867cb243c4d7cb7bf8629f68d7396?v=753abc35a59348f99dfc4af419a8c4c1

2. Clone the repository, create an .env file and specify the duplicated database ID and API Key.

```
VITE_NOTION_API_KEY="for"
VITE_DATABASE_ID="bar"
```

3. Run `yarn build` and load the generated `dist` directory in the Chrome browser.

## TODO

- [ ] Allow easy configuration of tokens and database settings
- [ ] Page Duplicate Check
- [ ] Display the save button in dlsite.com

## LICENCE

MIT