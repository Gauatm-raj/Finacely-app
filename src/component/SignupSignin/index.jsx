import React, { useState } from "react";
import "./style.css";
import Input from "../Input/index";
import Button from "../Button/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db,provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SignupSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmitWithEmail = () => {
    setLoading(true);
    console.log(name, email, password);

    if (name != "" && email != "" && password != "" && confirmPass != "") {
      if (password === confirmPass) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            // ...
            toast.success("User Created");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
            createDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);

            // ..
          });
      } else {
        setLoading(false);
        toast.error("Password miss matched");
      }
    } else {
      setLoading(false);
      toast.error("Check All fields");
    }
  };

  async function createDoc(user) {
    //make sure user not created before

    //create doc
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Created doc");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exist");
      setLoading(false);
    }
  }

  //login form function
  function loginUsingEmail() {
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success("User LogedIn");
          console.log(user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("Check email and password again and should not be empty");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          createDoc(user);
          toast.success("Succesfully signup");
          console.log(user);
          setLoading(false);
          navigate("/dashboard")
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          setLoading(false);
          // ...
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="sign-wrapper">
          <h2 className="title">
            Sign up on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form action="">
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Gautam@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"44564654"}
            />

            <Button
              disabled={isLoading}
              text={isLoading ? "Loading...." : "Login with Email and Password"}
              onClick={loginUsingEmail}
              blue={false}
            />
            <p className="p-login">or</p>
            <Button
              disabled={isLoading}
              text={isLoading ? "Loading...." : "Login with Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-login">
              If you don't have an account{" "}
              <span
                onClick={() => setLoginForm(!loginForm)}
                style={{ color: "var(--theme)" }}
              >
                Click Here
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className="sign-wrapper">
          <h2 className="title">
            Sign up on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form action="">
            <Input
              type={"text"}
              label={"FullName"}
              state={name}
              setState={setName}
              placeholder={"Gautam Raj"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Gautam@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"44564654"}
            />
            <Input
              type={"password"}
              label={"Confirm Passowrd"}
              state={confirmPass}
              setState={setConfirmPass}
              placeholder={" 44564654"}
            />
            <Button
              disabled={isLoading}
              text={
                isLoading ? "Loading...." : "SignUp with Email and Password"
              }
              onClick={handleSubmitWithEmail}
              blue={false}
            />
            <p className="p-login">or</p>
            <Button
              disabled={isLoading}
              text={isLoading ? "Loading...." : "SignUp with Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-login">
              If you have an account{" "}
              <span
                onClick={() => setLoginForm(!loginForm)}
                style={{ color: "var(--theme)" }}
              >
                Click Here
              </span>{" "}
              for Login
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSignIn;
