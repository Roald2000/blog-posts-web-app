import React, { useState } from "react";
import InputField from "../app/components/InputField";
import ResponseDiv from "../app/components/ResponseDiv";
import SubmitForm from "../app/components/SubmitForm";
import { useAxios, web } from "../app/util";

const Register = () => {
  const [inputs, setInputs] = useState(null);
  const [resDiv, setResDiv] = useState(null);
  const preventEmpty = (e) => {
    e.key === " " && e.preventDefault();
  };

  const handleInputChange = (e) => {
    setInputs((i) => ({ ...i, [e.target.id]: e.target.value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    useAxios
      .post("/auth/register", inputs)
      .then(({ data, status, statusText }) => {
        setResDiv({
          state: true,
          message: data?.message ?? "Register Success",
        });
        web.reload(1500);
      })
      .catch(({ response }) => {
        const { data, status, statusText } = response;
        setResDiv({
          state: false,
          message: data?.message ?? "Register Failed",
        });
      });
  };

  return (
    <div className="max-w-lg mx-auto">
      <SubmitForm
        textbtn={"Register"}
        onSubmit={handleFormSubmit}
        formTitle="Register"
      >
        <InputField
          onKeyDown={preventEmpty}
          onChange={handleInputChange}
          id={"username"}
          required={true}
          autoFocus={true}
          autoComplete={"false"}
          inputTextName={"Create Username"}
        />
        <InputField
          onKeyDown={preventEmpty}
          onChange={handleInputChange}
          autoComplete="current-password"
          id={"password"}
          required={true}
          autoFocus={true}
          inputType="password"
          inputTextName={"Create Password"}
        />{" "}
        {Boolean(resDiv) && (
          <ResponseDiv state={resDiv?.state} message={resDiv?.message} />
        )}
      </SubmitForm>
    </div>
  );
};

export default Register;
