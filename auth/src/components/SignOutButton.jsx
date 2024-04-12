import { useMsal } from "@azure/msal-react";


export const SignOutButton = () => {
    const { instance } = useMsal();
    const handleSignOut = () => {
        instance.logoutRedirect();
    }

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
}
