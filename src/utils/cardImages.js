export function getCardImageSrc(image, quality = "high") {
  if (!image) return "";
  if (/\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(image)) return image;
  return `${image}/${quality}.webp`;
}
