import React, { useState } from "react";
import InputField from "../app/components/InputField";
import ResponseDiv from "../app/components/ResponseDiv";
import SubmitForm from "../app/components/SubmitForm";
import { auth, localData, useAxios, web } from "../app/util";

const Login = () => {
  const [resDiv, setResDiv] = useState(null);
  const [inputs, setInputs] = useState(null);

  const preventEmpty = (e) => {
    e.key === " " && e.preventDefault();
  };

  const handleInputChange = (e) => {
    setInputs((i) => ({ ...i, [e.target.id]: e.target.value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    useAxios
      .post("/auth/login", inputs)
      .then(({ data, status, statusText }) => {
        const { token, user } = data;
        auth.set({ value: token });
        localData.set({ name: "user", value: user });
        setResDiv({
          state: true,
          message: data?.message ?? "Login Success",
        });
        web.reload(1500);
      })
      .catch(({ response }) => {
        const { data, status, statusText } = response;
        setResDiv({
          state: false,
          message: data?.message ?? "Login Failed",
        });
      });
  };

  return (
    <div className="max-w-lg mx-auto">
      <SubmitForm
        textbtn={"Login"}
        onSubmit={handleFormSubmit}
        formTitle="Login"
      >
        <InputField
          onKeyDown={preventEmpty}
          onChange={handleInputChange}
          id={"username"}
          required={true}
          autoFocus={true}
          autoComplete={"false"}
          inputTextName={"Username"}
        />
        <InputField
          onKeyDown={preventEmpty}
          onChange={handleInputChange}
          autoComplete="current-password"
          id={"password"}
          required={true}
          autoFocus={true}
          inputType="password"
          inputTextName={"Password"}
        />
        {Boolean(resDiv) && (
          <ResponseDiv state={resDiv?.state} message={resDiv?.message} />
        )}
      </SubmitForm>
    </div>
  );
};

export default Login;
