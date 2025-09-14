export type Bookmark = {
  id: string;
  url: string;
  title: string;
  notes: string;
  createdAt: string; // Changed to string to match API response
  updatedAt: string; // Changed to string to match API response
  userId: string;
};


export type CreateBookmarkData = {
  url: string;
  title: string;
  notes: string;
};
