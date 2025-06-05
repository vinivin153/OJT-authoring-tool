export const parseTags = (tags: string) => {
  if (!tags) return [];

  return tags.split(',').map((tag: string) => tag.trim());
};
