export function slugifyTitle(title: string): string {
  return encodeURIComponent(
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove special chars except dash and whitespace
      .replace(/\s+/g, "-") 
  );
}
export function deslugify(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ").toLowerCase();
}
