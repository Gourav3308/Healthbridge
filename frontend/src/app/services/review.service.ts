import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review, ReviewRequest, ReviewStats } from '../models/review.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl + '/reviews';

  constructor(private http: HttpClient) {}

  // Get all reviews for a doctor
  getReviewsByDoctorId(doctorId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  // Get patient's own reviews
  getMyReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/my-reviews`);
  }

  // Get patient's review for a specific doctor
  getMyReviewForDoctor(doctorId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/doctor/${doctorId}/my-review`);
  }

  // Create a new review
  createReview(reviewRequest: ReviewRequest): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, reviewRequest);
  }

  // Update an existing review
  updateReview(reviewId: number, reviewRequest: ReviewRequest): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${reviewId}`, reviewRequest);
  }

  // Delete a review
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reviewId}`);
  }

  // Get doctor review statistics
  getDoctorReviewStats(doctorId: number): Observable<ReviewStats> {
    return this.http.get<ReviewStats>(`${this.apiUrl}/doctor/${doctorId}/stats`);
  }

  // Helper method to generate star array for display
  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  // Helper method to generate empty star array for display
  getEmptyStarsArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  // Format date for display
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // Get relative time (e.g., "2 days ago")
  getRelativeTime(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
      }
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return years === 1 ? '1 year ago' : `${years} years ago`;
    }
  }
}
