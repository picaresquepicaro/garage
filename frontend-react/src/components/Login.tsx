import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import TestStream from "./TestStream";

type User = {
    username: string;
    password: string;
}

function Login() {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });
    const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const handleLogin = () => {
        axios.post('http://localhost:5000/login', user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            const jwtToken = res.data;
            console.log(jwtToken);
            if (jwtToken.error !== "wrong username or password") {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            } else {
                setOpen(true);
            }
        })
        .catch(() => setOpen(true));
    }

    const handleLogout = () => {
        setAuth(false);
        sessionStorage.setItem("jwt", "");
    }

    if (isAuthenticated) {
        return <TestStream logOut={handleLogout} />
    } else {
        return (
            <Stack spacing={2} alignItems="center" mt={2}>
                <TextField
                    name="username"
                    label="username"
                    onChange={handleChange} />
                <TextField
                    type="password"
                    name="password"
                    label="password"
                    onChange={handleChange} />    
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleLogin}>
                        Login
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login failed"
                    />
            </Stack>
        )
    }
}

export default Login;