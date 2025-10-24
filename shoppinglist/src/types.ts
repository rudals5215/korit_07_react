export type ItemResponse = {
  product: string;
  amount: string;
  _links: {
    self: {
      href: string;
    };
    item: {
      href: string;
    };
    user: {
      href: string;
    };
  };
};

export type Item = {
  product: string;
  amount: string;
};

export type ItemEntity = {
  item: Item;
  url: string;
};