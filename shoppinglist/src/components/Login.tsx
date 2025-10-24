import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Button, TextField, Stack, Snackbar } from "@mui/material";
import Shoppinglist from "./Shoppinglist";

type User = {
  username: string;
  password: string;
};

function Login() {

  const [ user, setUser ] = useState<User> ({
    username : '',
    password : ''
  });

  const [ isAuthenticated, setAuth ] = useState(false);

  const [ open, setOpen ] = useState(false);

  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name] : event.target.value});
  }

  const handleLogin = () => {
    axios.post(import.meta.env.VITE_API_URL + "/login", user, {
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    .then(res => {
      const jwtToken = res.headers.authorization;
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }
    })
    .catch(err => {console.log(err)});
  }

  if (isAuthenticated) {
    return <Shoppinglist />
  }
  else {
    return (
      <>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="로그인 실패 (ID 혹은 PW가 틀렸습니다.)"
        />
        <Stack>
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField type="password" name="password" label="Password" onChange={handleChange} onKeyDown={(e) => {if(e.key === "Enter") {handleLogin();}}} />
        </Stack>
        <Button variant="outlined" color="primary" onClick={handleLogin}>Login</Button>
      </>
    );
  }

}

export default Login;
