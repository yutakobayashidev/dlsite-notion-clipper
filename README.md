# dlsite-notion-clipper

Chrome extension to save information about DLsite's works in Notion.

## Setup

1. Duplicate the Notion template database from the following URL

https://yutakobayashi.notion.site/DLsite-7e820481866145308159ef8ec1551fe6

2. Clone the repository, create an .env file and specify the duplicated database ID and API Key.

```
VITE_NOTION_API_KEY="for"
VITE_DATABASE_ID="bar"
```

3. Run `yarn build` and load the generated `dist` directory in the Chrome browser.