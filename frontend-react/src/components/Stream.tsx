import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ReactPlayer from 'react-player';


type StreamProps = {
    logOut?: () => void;
}

function Stream({ logOut }: StreamProps) {
    /*
    const [currentTime, setCurrentTime] = useState(0);
    const token = sessionStorage.getItem("jwt");

    const handleClick = () => {
        fetch('http://localhost:5000/time', {
            method: 'GET',
            headers: { 'Authorization': token! },
        }).then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });
    };
    */

    const [streamUrl, setStreamurl] = useState('');
    const token = sessionStorage.getItem("jwt");


    const handleClick = async () => {
        await fetch('http://localhost:5000/', {
            method: 'GET',
            headers: { 'Authorization': token! },
        }).then(response => response.json())
        .then(data => setStreamurl(data.url))
        .catch(err => console.log(err));

        console.log(streamUrl);
    };

    const [data, setData] = useState<string[]>([]);
    useEffect(() => { 
        async function testApi() {
            const response = await fetch("http://localhost:5555/");
            if (!response.ok) {
                throw new Error(response.status.toString());
            }

            const reader = response.body?.getReader();

            if (!reader) {
                throw new Error("No ReadableStream");
            }

            const decoder = new TextDecoder();

            const readChunk = async () => {
                const { done, value } = await reader.read();
                if (done) {
                    reader.releaseLock();
                    return;
                }

                const chunk = decoder.decode(value);
                console.log(chunk);
                setData((prev) => [...prev, chunk]);
                readChunk();
            }

            readChunk();
        };

        testApi().catch((error) => console.error(error));
    }, []);

    /*
    const myVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,        
            }).then(stream => {
                if (myVideoRef.current) {
                    myVideoRef.current.srcObject = stream;
                }
            });
        }
    }, []);
    */

    return (
        <>
        <p>You made it! Do you like turtles?</p>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button onClick={logOut}>Log Out</Button>
            <Button onClick={handleClick}>Let's start streamanating</Button>
        </Stack>
        <video
            src={streamUrl}
            width="640px"
            height="360px"
            controls
            autoPlay
            muted
            playsInline
            />
            <button>Click Me</button>
        </>
    )
}

export default Stream;