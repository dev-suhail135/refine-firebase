import { FirebaseApp } from "@firebase/app";
// import { AuthProvider } from "@pankod/refine-core";
import { AuthBindings } from "@refinedev/core";
import { Auth, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, getAuth, getIdTokenResult, ParsedToken, RecaptchaParameters, RecaptchaVerifier, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile, User as FirebaseUser } from "firebase/auth";
import { IAuthCallbacks, ILoginArgs, IRegisterArgs, IUser } from "./interfaces";

export class FirebaseAuth {
    auth: Auth;

    constructor(
        private readonly authActions?: IAuthCallbacks,
        firebaseApp?: FirebaseApp,
        auth?: Auth
    ) {
        this.auth = auth || getAuth(firebaseApp);
        this.auth.useDeviceLanguage();

        this.getAuthProvider = this.getAuthProvider.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.onUpdateUserData = this.onUpdateUserData.bind(this);
        this.getUserIdentity = this.getUserIdentity.bind(this);
        this.handleCheckAuth = this.handleCheckAuth.bind(this);
        this.createRecaptcha = this.createRecaptcha.bind(this);
        this.getPermissions = this.getPermissions.bind(this);
        this.handleOnError = this.handleOnError.bind(this);
    }

    public async handleLogOut() {
        await signOut(this.auth);
        // await this.authActions?.onLogout?.(this.auth);
        return {
            success: true,
            redirectTo: "/login",
        };
    }

    public async handleRegister(args: IRegisterArgs) {
        try {
            const { email, password, displayName } = args;

            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            await sendEmailVerification(userCredential.user);
            if (userCredential.user) {
                if (displayName) {
                    await updateProfile(userCredential.user, { displayName });
                }
                // this.authActions?.onRegister?.(userCredential.user);
                return {
                    success: true,
                    redirectTo: "/",
                };

            }

        } catch (error) {
            // return Promise.reject(error);
            return {
                success: false,
                error: error
            };
        }
    }

    public async handleLogIn({ email, password, remember }: ILoginArgs) {
        try {
            if (this.auth) {
                await this.auth.setPersistence(remember ? browserLocalPersistence : browserSessionPersistence);

                const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
                const userToken = await userCredential?.user?.getIdToken?.();
                if (userToken) {
                    // this.authActions?.onLogin?.(userCredential.user);
                    return ({
                        success: true,
                        redirectTo: "/",
                    });
                } else {
                    // return Promise.reject();
                    return {
                        success: false,
                        error: {
                            message: "Login Error",
                            name: "Invalid email or password",
                        }
                    };
                }
            } else {
                // return Promise.reject();

                return {
                    success: false,
                    error: {
                        message: "Login Error",
                        name: "Invalid email or password",
                    }
                };
            }
        } catch (error) {
            // return Promise.reject(error);
            return {
                success: false,
                error: error
            };
        }
    }

    public handleResetPassword(email: string) {
        return sendPasswordResetEmail(this.auth, email);
    }

    public async onUpdateUserData(args: IRegisterArgs) {

        try {
            if (this.auth?.currentUser) {
                const { displayName, email, password } = args;
                if (password) {
                    await updatePassword(this.auth.currentUser, password);
                }

                if (email && this.auth.currentUser.email !== email) {
                    await updateEmail(this.auth.currentUser, email);
                }

                if (displayName && this.auth.currentUser.displayName !== displayName) {
                    await updateProfile(this.auth.currentUser, { displayName: displayName });
                }
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    private async getUserIdentity(): Promise<IUser> {
        const user = this.auth?.currentUser;
        return {
            ...this.auth.currentUser,
            email: user?.email || "",
            name: user?.displayName || ""
        };
    }

    private getFirebaseUser(): Promise<FirebaseUser> {
        return new Promise<FirebaseUser>((resolve, reject) => {
            const unsubscribe = this.auth?.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user as FirebaseUser | PromiseLike<FirebaseUser>);
            }, reject);
        });
    }

    private async handleCheckAuth() {
        if (await this.getFirebaseUser()) {
            // return Promise.resolve();
            return {
                authenticated: true,
            };
        } else {
            // return Promise.reject("User is not found");
            return {
                authenticated: false,
                redirectTo: "/login",
                logout: true,
                error: {
                    message: "User is not found",
                    name: "User not found",
                }
            };
        }
    }

    private async handleOnError(error: any) {
        if (error.status === 401 || error.status === 403) {
            return {
                redirectTo: "/login",
                logout: true,
                error: error,
            };
        }
        return {};
    }

    public async getPermissions(): Promise<ParsedToken> {
        if (this.auth?.currentUser) {
            const idTokenResult = await getIdTokenResult(this.auth.currentUser);
            return idTokenResult?.claims;
        } else {
            return Promise.reject("User is not found");
        }
    }

    public createRecaptcha(containerOrId: string | HTMLDivElement, parameters?: RecaptchaParameters) {
        return new RecaptchaVerifier(containerOrId, parameters, this.auth);
    }

    public getAuthProvider(): AuthBindings {
        return {
            login: this.handleLogIn,
            logout: this.handleLogOut,
            check: this.handleCheckAuth,
            onError: this.handleOnError,
            getPermissions: this.getPermissions,
            getIdentity: this.getUserIdentity,
        };
    }
}
