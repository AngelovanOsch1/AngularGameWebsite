import { initializeTestEnvironment, RulesTestEnvironment } from "@firebase/rules-unit-testing";

export class CustomFirebaseEmulatorSettings  {
    static testEnv: RulesTestEnvironment;
    static PROJECT_ID: string = 'angulargamewebsite';
    static FIRESTORE_PORT: number = 8080;

    static async initializeTestEnvironment() {
        this.testEnv = await initializeTestEnvironment({
            projectId: this.PROJECT_ID,
            firestore: {
              host: "127.0.0.1",
              port: this.FIRESTORE_PORT,
            },
        });
    }

    static async cleanUp() {
        await this.testEnv.cleanup();
    }

    static async clearFirestore() {
        await this.testEnv.clearFirestore(); 
    }

    static unauthenticatedContext() {
        return this.testEnv.unauthenticatedContext().firestore();
    }
}