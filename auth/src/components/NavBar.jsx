import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useMsal, MsalProvider, useIsAuthenticated } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

export const NavBar = () => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        if(currentAccount){
            setUsername(currentAccount.username);
        }
    }, [instance])

    useEffect(() => {
        if(!isAuthenticated){
            instance.ssoSilent({
                scopes: ["user.read"],
                loginHint: "theodor349@gmail.com",
            }).then((response) =>{
                instance.setActiveAccount(response.account)
            }).catch((e) => {
                if(e instanceof InteractionRequiredAuthError){
                    instance.loginRedirect({
                        scopes: ["user.read"]
                    })
                }
            })
        }
    });

    return (
    <>
        <AuthenticatedTemplate>
            <p>Authenticated</p>
            <p>Username: {username}</p>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            <p>Not Authenticated</p>
        </UnauthenticatedTemplate>
        {isAuthenticated ? <SignOutButton/> : <SignInButton/>}
    </>
)
}