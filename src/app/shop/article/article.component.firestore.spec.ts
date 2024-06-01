import { assertSucceeds } from "@firebase/rules-unit-testing";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { CustomFirebaseEmulatorSettings } from "../../../../firebase-emulator-settings";
import { ArticleComponent } from "./article.component";
import { TestBed } from "@angular/core/testing";
import { Article, User } from "src/app/interfaces/interfaces";

describe('Firestore rules tests', () => {
  let component: ArticleComponent;

  beforeAll(async () => {
    await CustomFirebaseEmulatorSettings.initializeTestEnvironment();
  });

  afterAll(async () => {
    // await CustomFirebaseEmulatorSettings.clearFirestore();
    await CustomFirebaseEmulatorSettings.cleanUp();
  });

  component = TestBed.createComponent(ArticleComponent).componentInstance;
  component.user = {
    id: '1',
    emailAddress: 'test@example.com',
    isOnline: true,
    newsletter: true,
    role: 'user',
    username: 'testUser'
  } as User

  component.articleId = '123'

  component.article = {
    productName: 'Test Product',
    productCategory: 'Test Category',
    product: 'Test Product Type',
    price: 50,
    targetAudience: 'Test Audience',
    stock: 100,
    description: 'Test Description',
    image: 'test-image-url.jpg',
  } as Article

  it('should write and read data to/from Firestore', async () => {
    component.addToCart();
    const db = CustomFirebaseEmulatorSettings.unauthenticatedContext();

    const snapshot = await db.collection(`users/${component.user!.id}/shoppingcart`).doc(`${component.articleId}`).get();

    expect(snapshot.exists).toBe(true);
    expect(snapshot.data()).toEqual({
      image: 'articleImage.jpg',
      productName: 'Product Name',
      price: 10.99,
      targetAudience: 'Target Audience',
      product: 'Product',
      quantity: 1,
    });


    // const db = CustomFirebaseEmulatorSettings.unauthenticatedContext();
    // const userRef = doc(db, 'users', 'user123');
    
    // await assertSucceeds(setDoc(userRef, {
    //   test: 'data'
    // }));

    // const snapshot = await assertSucceeds(getDoc(userRef));
    
    // expect(snapshot.exists()).toBe(true);
    // expect(snapshot.data()).toEqual({ test: 'data' });
  });
});
