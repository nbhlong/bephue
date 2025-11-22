import {
  MenuItemResponse,
  GalleryImageResponse,
  RestaurantInfoResponse,
  ReservationFormData,
  ContactFormData,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

/**
 * Fetch data from Strapi API
 */
async function fetchAPI(path: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const url = `${API_URL}/api${path}`;

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Get all menu items or filter by category
 */
export async function getMenuItems(category?: string): Promise<MenuItemResponse> {
  try {
    let path = '/menu-items?populate=*';
    if (category) {
      path += `&filters[category][$eq]=${category}`;
    }
    const response = await fetchAPI(path);
    return response;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
  }
}

/**
 * Get featured menu items
 */
export async function getFeaturedMenuItems(): Promise<MenuItemResponse> {
  try {
    const path = '/menu-items?populate=*&filters[featured][$eq]=true';
    const response = await fetchAPI(path);
    return response;
  } catch (error) {
    console.error('Error fetching featured menu items:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
  }
}

/**
 * Get single menu item by ID
 */
export async function getMenuItem(id: string): Promise<any> {
  try {
    const path = `/menu-items/${id}?populate=*`;
    const response = await fetchAPI(path);
    return response;
  } catch (error) {
    console.error(`Error fetching menu item ${id}:`, error);
    return null;
  }
}

/**
 * Get all gallery images or filter by category
 */
export async function getGalleryImages(category?: string): Promise<GalleryImageResponse> {
  try {
    let path = '/gallery-images?populate=*&sort=order:asc';
    if (category) {
      path += `&filters[category][$eq]=${category}`;
    }
    const response = await fetchAPI(path);
    return response;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
  }
}

/**
 * Get restaurant information (single type)
 */
export async function getRestaurantInfo(): Promise<RestaurantInfoResponse | null> {
  try {
    const path = '/restaurant-info';
    const response = await fetchAPI(path);
    return response;
  } catch (error) {
    console.error('Error fetching restaurant info:', error);
    return null;
  }
}

/**
 * Submit a reservation
 */
export async function submitReservation(data: ReservationFormData): Promise<any> {
  try {
    const path = '/reservations';
    const response = await fetchAPI(path, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
    return response;
  } catch (error) {
    console.error('Error submitting reservation:', error);
    throw error;
  }
}

/**
 * Submit a contact form
 */
export async function submitContactForm(data: ContactFormData): Promise<any> {
  try {
    const path = '/contact-submissions';
    const response = await fetchAPI(path, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
    return response;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

/**
 * Get image URL from Strapi
 */
export function getStrapiImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
}
