export function formatDate(dateTime: string) {
  return new Date(dateTime).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
