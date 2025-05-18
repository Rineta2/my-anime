/**
 * Transforms a URL by replacing '/samehadaku/' with '/'
 * @param url The URL to transform
 * @returns The transformed URL
 */
export const transformUrl = (url: string): string => {
  return url.replace("/samehadaku/", "/");
};
