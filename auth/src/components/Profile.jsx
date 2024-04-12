import { useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { useState, useEffect } from "react";
import { fetchData } from "../fetch";

export const Profile = () => {
    const [graphData, setGraphData] = useState(null);
    const { result, error } = useMsalAuthentication(InteractionType.SilentPopup, {
        scopes: ["user.read"]
    });

    useEffect(() => {
        console.log("---")
        console.log("Graph Data: " + (!!graphData))
        console.log("Result: " + result)
        console.log("Error: " + (!!error))
        if(!!graphData){
            return;
        }

        if(!!error){
            console.error(error);
            return;
        }

        if(result){
            const { accessToken } = result;
            fetchData("https://graph.microsoft.com/v1.0/me", accessToken)
                .then(response =>{
                    console.log("---")
                    console.log("---")
                    console.log("---")
                    console.log("---")
                    console.log(response);
                    setGraphData(response);
                })
                .catch(error => console.error(error));
        }
    }, [graphData, error, result])

    return (
        <>
            {graphData ? 
                <>
                    <p>Name: {graphData.givenName}</p>
                    <p>Surname: {graphData.surname}</p>
                </>
                :
                <>
                    <p>Loading Data...</p>
                </>
            }           

        </>
    )
}