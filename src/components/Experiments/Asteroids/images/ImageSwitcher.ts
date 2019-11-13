import p5, { Image } from "p5";
import { NamedImage } from "./types";

class ImageSwitcher {
  images: Image[];
  imageIndex: number;

  constructor(s: p5, namedImages: NamedImage[]) {
    this.imageIndex = 0;
    this.images = namedImages.map(n => s.loadImage(n.image));
  }

  nextImage() {
    this.imageIndex += 1;
    this.imageIndex %= this.images.length;
  }

  currentImage(): Image {
    return this.images[this.imageIndex];
  }
}

export default ImageSwitcher;
