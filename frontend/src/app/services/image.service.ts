import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  constructor() { }

  getFullImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) {
      return this.getDefaultAvatar();
    }
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative URL, prepend the backend URL
    if (imageUrl.startsWith('/')) {
      const backendUrl = environment.apiUrl.replace('/api', '');
      return backendUrl + imageUrl;
    }
    
    // For any other case, return as is
    return imageUrl;
  }

  getDefaultAvatar(): string {
    return 'assets/images/default-avatar.png';
  }
}
