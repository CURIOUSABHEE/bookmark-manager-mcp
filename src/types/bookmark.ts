export type Bookmark = {
  id: string;
  url: string;
  title: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};


export type CreateBookmarkData = {
  url: string;
  title: string;
  notes: string;
};
