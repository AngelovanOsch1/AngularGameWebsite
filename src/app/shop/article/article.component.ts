import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Article, User } from 'src/app/interfaces/interfaces';
import { RepositoryService } from 'src/app/services/repository.service';
import { FieldValue, arrayRemove, doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [RepositoryService],
})
export class ArticleComponent implements OnInit {
  decodedId: string | undefined;
  user: User | undefined;
  article: Article | undefined;
  file?: File;
  image: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    const encodedId = this.route.snapshot.params['id'];
    this.decodedId = atob(encodedId);
    this.firestore
      .doc<Article>(`shop/${this.decodedId}`)
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
  }

  commentForm: FormGroup = new FormGroup({
    userComment: new FormControl(''),
    userCommentPhoto: new FormControl(null),
  });

  async onFileSelected(event: any) {
    this.file = event.target.files[0];
    const documentId = this.firestore.createId();
    const filePath = `test6/${this.file?.name}`;
    await this.storage.upload(filePath, this.file);
    this.image = await this.storage.ref(filePath).getDownloadURL().toPromise();
  }

  async like() {
    if (this.article?.likes.includes(this.user!.username)) {
      await this.firestore
        .collection('shop')
        .doc(this.decodedId)
        .update({
          likes: arrayRemove(this.user!.username),
        });
    } else {
      if (this.article?.dislikes.includes(this.user!.username)) {
        await this.firestore
          .collection('shop')
          .doc(this.decodedId)
          .update({
            dislikes: arrayRemove(this.user!.username),
          });
      }
      await this.repositoryService.shop.doc(this.decodedId).update({
        likes: [this.user!.username],
      });
    }
  }

  async dislike() {
    if (this.article?.dislikes.includes(this.user!.username)) {
      await this.firestore
        .collection('shop')
        .doc(this.decodedId)
        .update({
          dislikes: arrayRemove(this.user!.username),
        });
    } else {
      await this.repositoryService.shop.doc(this.decodedId).update({
        dislikes: [this.user!.username],
      });
      if (this.article?.likes.includes(this.user!.username)) {
        await this.firestore
          .collection('shop')
          .doc(this.decodedId)
          .update({
            likes: arrayRemove(this.user!.username),
          });
      }
    }
  }
}
