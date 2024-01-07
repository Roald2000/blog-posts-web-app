import React, { useEffect, useState } from "react";
import InputField from "../app/components/InputField";
import SubmitForm from "../app/components/SubmitForm";
import { useAxiosWAuth } from "../app/util";
import PostData from "./components/PostData";

const CreatePost = ({ reload }) => {
  const [inputData, setInputData] = useState(null);

  const handleInputChange = (e) => {
    setInputData((i) => ({ ...i, [e.target.id]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    useAxiosWAuth
      .post("/posts/create", inputData)
      .then(async ({ data, status, statusText }) => {
        await reload();
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <SubmitForm
      className={"flex flex-col gap-2"}
      onSubmit={handleFormSubmit}
      formTitle="Create Post"
    >
      <InputField
        onChange={handleInputChange}
        id={"post_topic"}
        inputTextName={"Post Title"}
      />
      <InputField
        onChange={handleInputChange}
        id={"post_description"}
        containerClass="flex flex-col gap-2 justify-stretch items-stretch"
        inputTextName={"Post Description"}
        textArea={true}
      />
    </SubmitForm>
  );
};

const Posts = () => {
  const [postData, setPostData] = useState([]);

  async function load_data() {
    try {
      const result = await useAxiosWAuth(
        "/posts?order_by=createdAt&sort_by=DESC"
      );
      setPostData(result?.data?.posts);
    } catch (error) {
      setPostData([]);
    }
  }

  async function reload() {
    await load_data();
  }

  useEffect(() => {
    load_data();

    return () => {
      setPostData([]);
    };
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto">
        <CreatePost reload={reload} />
      </div>
      <h1 className="text-4xl text-center font-medium">Posts</h1>
      <div className="max-w-lg mx-auto my-10">
        <PostData posts={postData} reload={reload} />
      </div>
    </>
  );
};

export default Posts;
