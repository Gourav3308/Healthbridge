import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  constructor() { }

  getFullImageUrl(imageUrl: string | undefined): string {
    console.log('ImageService: getFullImageUrl called with:', imageUrl);
    
    if (!imageUrl || imageUrl.trim() === '') {
      console.log('ImageService: No image URL provided, returning default avatar');
      return this.getDefaultAvatar();
    }
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      console.log('ImageService: Full URL detected, returning as is:', imageUrl);
      return imageUrl;
    }
    
    // If it's a relative URL, prepend the backend URL
    if (imageUrl.startsWith('/')) {
      const backendUrl = environment.apiUrl.replace('/api', '');
      const fullUrl = backendUrl + imageUrl;
      console.log('ImageService: Building URL for', imageUrl, '->', fullUrl);
      return fullUrl;
    }
    
    // For any other case, return as is
    console.log('ImageService: Returning image URL as is:', imageUrl);
    return imageUrl;
  }

  getDefaultAvatar(): string {
    return 'assets/images/default-avatar.svg';
  }
}
