import { FirebaseApp } from "@firebase/app";
import { AuthBindings } from "@refinedev/core";
import { Auth, ParsedToken, RecaptchaParameters, RecaptchaVerifier } from "firebase/auth";
import { IAuthCallbacks, ILoginArgs, IRegisterArgs } from "./interfaces";
export declare class FirebaseAuth {
    private readonly authActions?;
    auth: Auth;
    constructor(authActions?: IAuthCallbacks, firebaseApp?: FirebaseApp, auth?: Auth);
    handleLogOut(): Promise<{
        success: boolean;
        redirectTo: string;
    }>;
    handleRegister(args: IRegisterArgs): Promise<{
        success: boolean;
        redirectTo: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        redirectTo?: undefined;
    }>;
    handleLogIn({ email, password, remember }: ILoginArgs): Promise<{
        success: boolean;
        redirectTo: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        redirectTo?: undefined;
    }>;
    handleResetPassword(email: string): Promise<void>;
    onUpdateUserData(args: IRegisterArgs): Promise<never>;
    private getUserIdentity;
    private getFirebaseUser;
    private handleCheckAuth;
    private handleOnError;
    getPermissions(): Promise<ParsedToken>;
    createRecaptcha(containerOrId: string | HTMLDivElement, parameters?: RecaptchaParameters): RecaptchaVerifier;
    getAuthProvider(): AuthBindings;
}
