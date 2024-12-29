import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type StreamProps = {
    logOut?: () => void;
}

type MyToken = {
    token: string
};


function TestStream({ logOut }: StreamProps) {
    const [streamUrl, setStreamurl] = useState('');
    const token = sessionStorage.getItem("jwt");

    const handleClick = async () : Promise<MyToken> => {
        const response = await fetch('http://localhost:5000/video', {
            headers: { 'Authorization': token! }
        });
        const data = await response.json();
        console.log(data.url);
        setStreamurl(data.url);

        return data;
    };  

    return(
        <>
        <p>You made it! Do you like turtles?</p>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button onClick={logOut}>Log Out</Button>
            <img src={streamUrl}></img>
            <Button onClick={handleClick}>Let's start streamanating</Button>
        </Stack>
        </>
    );
}

export default TestStream;