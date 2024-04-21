import { Component, Input, OnInit } from '@angular/core';
import { Comment, User } from '../interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { WarningComponentComponent } from '../helper-components/warning-component/warning-component.component';
import { UserAuthService } from '../services/user-auth-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
  providers: [UserAuthService],
})
export class UserCommentsComponent implements OnInit {
  @Input() commentsList: Comment[] = [];
  @Input() articleId: string | undefined;

  user: User | undefined;
  file: File | undefined;
  image: string | undefined;

  constructor(
    private dialog: MatDialog,
    private firestore: AngularFirestore,
    private userAuthService: UserAuthService,
    private storage: AngularFireStorage
  ) {}
  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();
  }

  commentForm: FormGroup = new FormGroup({
    userComment: new FormControl('', Validators.maxLength(1000)),
    userCommentPhoto: new FormControl(null),
  });

  async submitComment() {
    const userComment = this.commentForm.controls['userComment'].value;
    try {
      this.firestore.collection(`shop/${this.articleId}/comments`).add({
        username: this.user?.username,
        profilePhoto: this.user?.profilePhoto,
        userComment: userComment,
        likes: [],
        dislikes: [],
        commentPhoto: this.image,
      });
      this.commentForm.reset();
      this.image = undefined;
    } catch (e: any) {}
  }

  async userCommentPhotoUpload(event: any) {
    this.file = event.target.files[0];
    const filePath = `user/comments/${this.user?.id}/${this.articleId}/${this.file?.name}`;
    const uploadTask = await this.storage.upload(filePath, this.file);
    this.image = await uploadTask.ref.getDownloadURL();
  }

  async like(comment: Comment) {
    if (!this.user) {
      this.dialog.open(WarningComponentComponent, {
        width: '250px',
        data: { text: 'Are you not logged in yet?', url: '/login' },
      });
    } else {
      if (comment.likes.includes(this.user!.id!)) {
        this.firestore
          .collection(`shop/${this.articleId}/comments`)
          .doc(comment.id)
          .update({
            likes: arrayRemove(this.user!.id),
          });
      } else {
        this.firestore
          .collection(`shop/${this.articleId}/comments`)
          .doc(comment.id)
          .update({
            likes: arrayUnion(this.user!.id),
          });
        if (comment.dislikes.includes(this.user!.id!)) {
          this.firestore
            .collection(`shop/${this.articleId}/comments`)
            .doc(comment.id)
            .update({
              dislikes: arrayRemove(this.user!.id),
            });
        }
      }
    }
  }

  async dislike(comment: Comment) {
    if (!this.user) {
      this.dialog.open(WarningComponentComponent, {
        width: '250px',
        data: { text: 'Are you not logged in yet?', url: '/login' },
      });
    } else {
      if (comment.dislikes.includes(this.user!.username)) {
        this.firestore
          .collection(`shop/${this.articleId}/comments`)
          .doc(comment.id)
          .update({
            dislikes: arrayRemove(this.user!.id),
          });
      } else {
        this.firestore
          .collection(`shop/${this.articleId}/comments`)
          .doc(comment.id)
          .update({
            dislikes: arrayUnion(this.user!.id),
          });
        if (comment.likes.includes(this.user!.id!)) {
          this.firestore
            .collection(`shop/${this.articleId}/comments`)
            .doc(comment.id)
            .update({
              likes: arrayRemove(this.user!.id),
            });
        }
      }
    }
  }
}
