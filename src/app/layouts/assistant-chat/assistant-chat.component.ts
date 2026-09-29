import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AssistantService } from './assistant.service';
import { renderMarkdown } from './markdown';

interface ChatMessage {
  role: 'user' | 'assistant' | 'error';
  text: string;
  html?: string;
}

const STORAGE_KEY = 'tms-assistant-conversation';

/**
 * Floating chat assistant available on every page of the TMS. It sends the question to
 * POST /api/assistant/chat; the backend lets the LLM call read-only TMS tools and answers
 * with the user's own permissions.
 */
@Component({
  selector: 'app-assistant-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assistant-chat.component.html',
  styleUrls: ['./assistant-chat.component.scss'],
})
export class AssistantChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private scroller?: ElementRef<HTMLDivElement>;

  open = false;
  available = true;
  loading = false;
  input = '';
  messages: ChatMessage[] = [];
  private conversationId: string | null = null;
  private shouldScroll = false;

  readonly suggestions = [
    'Quels voyages sont en retard ?',
    'Chiffre d\'affaires par client ce mois-ci',
    'Top 5 chauffeurs cette année',
    'Véhicules avec visite technique à renouveler',
  ];

  constructor(private assistant: AssistantService) {}

  ngOnInit(): void {
    this.conversationId = sessionStorage.getItem(STORAGE_KEY);
    this.assistant.status().subscribe({
      next: s => (this.available = s.available),
      error: () => (this.available = false),
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll && this.scroller) {
      this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
      this.shouldScroll = false;
    }
  }

  toggle(): void {
    this.open = !this.open;
    this.shouldScroll = true;
  }

  send(text?: string): void {
    const question = (text ?? this.input).trim();
    if (!question || this.loading) {
      return;
    }
    this.messages.push({ role: 'user', text: question });
    this.input = '';
    this.loading = true;
    this.shouldScroll = true;

    this.assistant.ask(question, this.conversationId).subscribe({
      next: reply => {
        this.conversationId = reply.conversationId;
        sessionStorage.setItem(STORAGE_KEY, reply.conversationId);
        this.messages.push({ role: 'assistant', text: reply.answer, html: renderMarkdown(reply.answer) });
        this.loading = false;
        this.shouldScroll = true;
      },
      error: (err: HttpErrorResponse) => {
        const text = err.error?.error ?? 'Le service de l\'assistant est indisponible. Réessayez dans un instant.';
        this.messages.push({ role: 'error', text });
        this.loading = false;
        this.shouldScroll = true;
      },
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  newConversation(): void {
    if (this.conversationId) {
      this.assistant.reset(this.conversationId).subscribe({ error: () => {} });
    }
    this.conversationId = null;
    sessionStorage.removeItem(STORAGE_KEY);
    this.messages = [];
  }
}
