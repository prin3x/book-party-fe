import Head from "next/head";
import React from "react";
import LoginForm from "../../components/Login/LoginForm";

type Props = {};

function LoginPage({}: Props) {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
