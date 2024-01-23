import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent implements OnInit {
  @Input() chatItem: any;
  @Input() isOpen: boolean = false;
  messagesList: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore
      .collection(`chats/${this.chatItem.id}/messages`, (ref) =>
        ref.orderBy('date')
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data } as any;
          })
        ),
        tap((messages: any[]) => {
          this.messagesList = messages;
        })
      )
      .subscribe();
  }

  newMessageForm: FormGroup = new FormGroup({
    newMessage: new FormControl('', [Validators.required]),
  });

  addMessage() {
    if (this.newMessageForm.controls['newMessage'].value !== '') {
      const newMessage: string =
        this.newMessageForm.controls['newMessage'].value;
      try {
        this.firestore.collection(`chats/${this.chatItem.id}/messages`).add({
          date: new Date(),
          textMessage: newMessage,
        });
        this.newMessageForm.reset();
      } catch (e) {
        console.log(e);
      }
    }
  }
}
