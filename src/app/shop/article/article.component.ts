import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import {
  Article,
  Comment,
  ShoppingCart,
  User,
} from 'src/app/interfaces/interfaces';
import { RepositoryService } from 'src/app/services/repository.service';
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore';
import { UserAuthService } from 'src/app/services/user-auth-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { WarningComponentComponent } from 'src/app/helper-components/warning-component/warning-component.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [RepositoryService, UserAuthService],
})
export class ArticleComponent implements OnInit {
  articleId: string | undefined;
  shoppingCartList: ShoppingCart[] = [];
  user: User | undefined;
  commentsList: Comment[] = [];
  article: Article | undefined;
  file: File | undefined;
  image: string | undefined;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private userAuthService: UserAuthService,
    private repositoryService: RepositoryService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.repositoryService.usersCollection
          .doc<User>(user.uid)
          .get()
          .pipe(take(1))
          .subscribe((snapshot) => {
            const data = snapshot?.data() as User;
            const id = snapshot.id;
            this.user = { id, ...data } as User;
          });
      } else {
        this.user = undefined;
      }
    });
    const encodedId = this.route.snapshot.params['id'];
    this.articleId = atob(encodedId);
    this.firestore
      .doc<Article>(`shop/${this.articleId}`)
      .valueChanges()
      .subscribe((val) => {
        this.article = val;
      });

    this.firestore
      .collection(`shop/${this.articleId}/comments`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Comment;
            const id = a.payload.doc.id;
            return { id, ...data } as Comment;
          })
        ),
        tap((comments: Comment[]) => {
          this.commentsList = comments;
        })
      )
      .subscribe();

    this.firestore
      .collection(`users/${this.user!.id}/shoppingcart`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ShoppingCart;
            const id = a.payload.doc.id;
            return { id, ...data } as ShoppingCart;
          })
        ),
        tap((shoppingCart: ShoppingCart[]) => {
          this.shoppingCartList = shoppingCart;
        })
      )
      .subscribe();
  }

  commentForm: FormGroup = new FormGroup({
    userComment: new FormControl('', Validators.maxLength(1000)),
    userCommentPhoto: new FormControl(null),
  });

  buyArticleNow() {
    if (!this.user) {
    } else if (
      this.shoppingCartList.some((item) => item.id === this.articleId)
    ) {
      this.firestore
        .collection(`users/${this.user!.id}/shoppingcart`)
        .doc(this.articleId)
        .update({
          quantity: increment(1),
        });
      this.router.navigate(['/shopping-cart']);
    } else {
      this.firestore
        .collection(`users/${this.user!.id}/shoppingcart`)
        .doc(this.articleId)
        .set({
          image: this.article!.image,
          productName: this.article!.productName,
          price: this.article!.price,
          targetAudience: this.article!.targetAudience,
          product: this.article!.product,
          quantity: 1,
        });
      this.router.navigate(['/shopping-cart']);
    }
  }

  addToCart() {
    if (!this.user) {
      this.dialog.open(WarningComponentComponent, {
        width: '250px',
        data: { text: 'Are you not logged in yet?', url: '/login' },
      });
    } else if (
      this.shoppingCartList.some((item) => item.id === this.articleId)
    ) {
      this.firestore
        .collection(`users/${this.user!.id}/shoppingcart`)
        .doc(this.articleId)
        .update({
          quantity: increment(1),
        });
    } else {
      this.firestore
        .collection(`users/${this.user!.id}/shoppingcart`)
        .doc(this.articleId)
        .set({
          image: this.article!.image,
          productName: this.article!.productName,
          price: this.article!.price,
          targetAudience: this.article!.targetAudience,
          product: this.article!.product,
          quantity: 1,
        });
    }
  }

  async submitComment() {
    const userComment = this.commentForm.controls['userComment'].value;
    try {
      this.firestore.collection(`shop/${this.articleId}/comments`).add({
        username: this.user?.username,
        profilePhoto: this.user?.profilePhoto,
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
