interface Rule {
  name: string;
  params: any[];
}

interface Messages {
  [key: string]: string;
}

export type {
  Rule,
  Messages,
};
