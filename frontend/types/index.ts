// Strapi API Types
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
  };
}

// Menu Item
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'drink';
  featured: boolean;
  image: StrapiImageData;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemResponse {
  data: {
    id: number;
    attributes: MenuItem;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Gallery Image
export interface GalleryImage {
  id: number;
  title: string;
  category: 'food' | 'restaurant' | 'event';
  order: number;
  image: StrapiImageData;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImageResponse {
  data: {
    id: number;
    attributes: GalleryImage;
  }[];
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

// Restaurant Info (Single Type)
export interface RestaurantInfo {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export interface RestaurantInfoResponse {
  data: {
    id: number;
    attributes: RestaurantInfo;
  };
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
