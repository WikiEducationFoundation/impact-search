type SPARQLResponse = {
  head: {
    vars: string[];
  };
  results: {
    bindings: Array<{
      article: {
        type: string;
        value: string;
      };
      personLabel: {
        "xml:lang": string;
        type: string;
        value: string;
      };
    }>;
  };
};

type MediaWikiResponse = {
  batchcomplete: string;
  continue?: {
    gcmcontinue: string;
    continue: string;
  };
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        categoryinfo?: {
          size: number;
          pages: number;
          files: number;
          subcats: number;
        };
      };
    };
  };
  error?: {
    code: string;
    info: string;
    "*": string;
  };
  servedby?: string;
};

type Page = {
  id: number;
  title: string;
};

type CategoryNode = {
  name: string;
  id: number;
  isBranch: boolean;
  pages: Page[];
  children?: CategoryNode[];
};

export type { SPARQLResponse, MediaWikiResponse, CategoryNode };
