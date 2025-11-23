// Strapi API Types (v5)
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface StrapiImageData {
  data: {
    id: number;
    attributes: StrapiImage;
  } | null;
}

// Strapi Block Content (Rich Text)
export interface StrapiTextBlock {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

// Menu Item (Strapi v5 - flattened structure)
export interface MenuItem {
  id: number;
  documentId: string;
  name: string;
  description: string | StrapiTextBlock[]; // Can be string or block array
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'drink';
  featured: boolean;
  image: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MenuItemResponse {
  data: MenuItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Gallery Image (Strapi v5)
export interface GalleryImage {
  id: number;
  documentId: string;
  title: string;
  category: 'food' | 'restaurant' | 'event';
  order: number;
  image: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface GalleryImageResponse {
  data: GalleryImage[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Reservation
export interface Reservation {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Contact Submission
export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Restaurant Info (Single Type - Strapi v5)
export interface RestaurantInfo {
  id: number;
  documentId: string;
  name: string;
  description: string | StrapiTextBlock[];
  phone: string;
  email: string;
  address: string;
  openingHours: any; // JSON field
  socialMedia: any; // JSON field
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface RestaurantInfoResponse {
  data: RestaurantInfo;
}

// Form Types
export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
