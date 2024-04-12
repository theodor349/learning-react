import { useMsal } from "@azure/msal-react";


export const SignInButton = () => {
    const { instance } = useMsal();
    const handleSignIn = () => {
        instance.loginRedirect({
            scopes: ["user.read"]
        });
    }

    return (
        <button onClick={handleSignIn}>Sign In</button>
    );
}
