import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Article, User } from 'src/app/interfaces/interfaces';
import { RepositoryService } from 'src/app/services/repository.service';
import { arrayRemove } from 'firebase/firestore';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [RepositoryService],
})
export class ArticleComponent implements OnInit {
  articleId: string | undefined;
  user: User | undefined;
  commentsObservable: Observable<any[]> | undefined;
  commentsList: any[] | undefined;
  article: Article | undefined;
  file?: File;
  image: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    const encodedId = this.route.snapshot.params['id'];
    this.articleId = atob(encodedId);
    this.firestore
      .doc<Article>(`shop/${this.articleId}`)
      .valueChanges()
      .subscribe((val) => {
        this.article = val;
      });

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.repositoryService.usersCollection
          .doc<User>(user.uid)
          .get()
          .pipe(take(1))
          .subscribe((snapshot) => {
            this.user = snapshot?.data();
          });
      } else {
        this.user = undefined;
      }
    });

    this.commentsObservable = this.commentsObservable = this.firestore
      .collection(`shop/${this.articleId}/comments`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

    this.commentsObservable.subscribe((comments: any[]) => {
      this.commentsList = comments;
    });
  }

  commentForm: FormGroup = new FormGroup({
    userComment: new FormControl(''),
    userCommentPhoto: new FormControl(null),
  });

  async submitComment() {
    const userComment = this.commentForm.controls['userComment'].value;
    try {
      this.firestore.collection(`shop/${this.articleId}/comments`).add({
        userComment: userComment,
        likes: [],
        dislikes: [],
      });
      this.commentForm.reset();
    } catch (e: any) {}
  }

  async onFileSelected(event: any) {
    this.file = event.target.files[0];
    const filePath = `test6/${this.file?.name}`;
    await this.storage.upload(filePath, this.file);
    this.image = await this.storage.ref(filePath).getDownloadURL().toPromise();
  }

  async like(comment: any) {
    if (comment.likes.includes(this.user!.username)) {
      this.firestore
        .collection(`shop/${this.articleId}/comments`)
        .doc(comment.id)
        .update({
          likes: arrayRemove(this.user!.username),
        });
    } else {
      if (comment.dislikes.includes(this.user!.username)) {
        this.firestore
          .collection(`shop/${this.articleId}/comments`)
          .doc(comment.id)
          .update({
            dislikes: arrayRemove(this.user!.username),
          });
      }
      this.firestore
        .collection(`shop/${this.articleId}/comments`)
        .doc(comment.id)
        .update({
          likes: [this.user!.username],
        });
    }
  }

  async dislike(comment: any) {
    if (comment.dislikes.includes(this.user!.username)) {
      this.firestore
        .collection(`shop/${this.articleId}/comments`)
        .doc(comment.id)
        .update({
          dislikes: arrayRemove(this.user!.username),
        });
    } else {
      this.firestore
        .collection(`shop/${this.articleId}/comments`)
        .doc(comment.id)
        .update({
          dislikes: [this.user!.username],
        });
      if (comment.likes.includes(this.user!.username)) {
        this.firestore
          .collection(`shop/${this.articleId}/comments`)
          .doc(comment.id)
          .update({
            likes: arrayRemove(this.user!.username),
          });
      }
    }
  }
}
