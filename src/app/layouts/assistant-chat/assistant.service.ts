import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REST_URL } from '../../shared/utils/constants';

export interface AssistantReply {
  conversationId: string;
  answer: string;
}

/** Calls the tms-rest AI assistant. The JWT is added by JwtInterceptor because the URL starts with REST_URL. */
@Injectable({ providedIn: 'root' })
export class AssistantService {
  private readonly base = REST_URL + 'api/assistant';

  constructor(private http: HttpClient) {}

  status(): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${this.base}/status`);
  }

  ask(message: string, conversationId: string | null): Observable<AssistantReply> {
    return this.http.post<AssistantReply>(`${this.base}/chat`, { message, conversationId });
  }

  reset(conversationId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/conversations/${encodeURIComponent(conversationId)}`);
  }
}
