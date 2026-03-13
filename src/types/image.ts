export interface Image {
  id: string;
  title: string | null;
  description: string | null;
  filename: string;
  url: string;
  thumbnailUrl: string;
  mimeType: string;
  fileSize: number;
  width: number;
  height: number;
  categoryId: string;
  featured: boolean;
  artistPortrait: boolean;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UploadImageDto {
  title?: string;
  description?: string;
  categoryId: string;
  featured?: boolean;
  artistPortrait?: boolean;
}

export interface UpdateImageDto {
  title?: string;
  description?: string;
  categoryId?: string;
  featured?: boolean;
  artistPortrait?: boolean;
  order?: number;
}

export interface ImageResponseDto extends Image {
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  imageCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string;
  order?: number;
}

export interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  order?: number;
}
