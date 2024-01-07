import React from "react";

const SubmitForm = ({
  className,
  onSubmit,
  formTitle = "Form Title",
  children,
  textbtn,
}) => {
  return (
    <form onSubmit={onSubmit} textbtn="Submit">
      <h1 className="text-2xl font-medium capitalize">{formTitle}</h1>
      <div className="divider my-1"></div>
      <div className={className}>{children}</div>
      <div className="divider my-1"></div>
      <input className="btn btn-primary" type="submit" value={textbtn} />
    </form>
  );
};

export default SubmitForm;
