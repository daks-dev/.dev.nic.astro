export type BindImageData =
  | ImageMetadata
  | {
      data?: {
        image: ImageMetadata;
        alt?: string;
        caption?: Record<string, string>;
      }[];
    };
