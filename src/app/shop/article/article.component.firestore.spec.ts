import { initializeTestEnvironment, RulesTestEnvironment, assertSucceeds } from "@firebase/rules-unit-testing";
import { setDoc, doc, getDoc } from "firebase/firestore";

const PROJECT_ID = 'angulargamewebsite';
const FIRESTORE_PORT = 8080;

describe('Firestore rules tests', () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        host: "127.0.0.1",
        port: FIRESTORE_PORT,
      },
    });
  });

  it('should write and read data to/from Firestore', async () => {
    const context = testEnv.unauthenticatedContext();
    const db = context.firestore();

    const userRef = doc(db, 'users', 'user123');
    
    // Write data to Firestore
    await assertSucceeds(setDoc(userRef, {
      test: 'data'
    }));

    // Read data from Firestore
    const snapshot = await assertSucceeds(getDoc(userRef));
    
    expect(snapshot.exists()).toBe(true);
    expect(snapshot.data()).toEqual({ test: 'data' });
  });
});
