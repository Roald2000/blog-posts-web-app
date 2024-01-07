import React, { useContext, useEffect, useRef, useState } from "react";
import * as Icon from "react-icons/ai";
import AppContext from "../../app/components/AppContext";
import DialogPopUp from "../../app/components/DialogPopUp";
import { parseDateTime, useAxiosWAuth } from "../../app/util";
import Teleporter from "../../app/components/Teleporter";

const PostCreateComment = ({ reload, post_id }) => {
  const comment_content = useRef(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        useAxiosWAuth
          .post("/comments/create/", {
            comment_content: comment_content.current.value,
            post_id,
          })
          .then(() => {
            reload();
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }}
      className="mb-3 flex justify-stretch items-center gap-2"
    >
      <input
        className="input input-bordered input-xs w-full"
        type="text"
        ref={comment_content}
      />
      <button type="submit" className="hover:text-success cursor-pointer">
        <Icon.AiOutlineSend size={24} />
      </button>
    </form>
  );
};

const PostComment = ({ post_id }) => {
  const [comment, setComment] = useState([]);

  const { user } = useContext(AppContext);
  const { user_id } = user;

  async function load_comment() {
    try {
      const { data } = await useAxiosWAuth(
        `/comments/${post_id}?order_by=createdAt&sort_by=DESC`
      );
      setComment(data?.comments);
    } catch (error) {
      setComment([]);
    }
  }

  useEffect(() => {
    return () => {
      setComment([]);
    };
  }, []);

  const comment_toggle = useRef(null);

  return (
    <>
      <div className="collapse collapse-arrow hover:bg-base-200 mt-2 p-0">
        <input
          ref={comment_toggle}
          type="checkbox"
          name=""
          id=""
          className=""
          onChange={() => {
            const toggle = comment_toggle.current.checked;
            if (toggle) {
              load_comment();
            }
          }}
        />
        <span className=" collapse-title flex justify-between items-center">
          <span className="text-sm">Comments</span>
          <span>{comment.length !== 0 ? comment.length : ""}</span>
        </span>
        <div className="collapse-content">
          <PostCreateComment reload={load_comment} post_id={post_id} />
          {comment.length !== 0 ? (
            <div
              className={
                comment.length > 3
                  ? "h-[150px] overflow-y-scroll pr-3 py-2"
                  : "px-3 py-3"
              }
            >
              {comment.map((commentItem, commentIndex) => {
                return (
                  <ul
                    key={commentIndex}
                    className="my-1 rounded p-1 bg-base-100"
                  >
                    {commentItem?.User?.user_id === user_id && (
                      <li className="text-xs p-1 flex justify-between items-center">
                        <span>{commentItem?.User.username}</span>
                        <Icon.AiOutlineDelete
                          size={18}
                          className=" cursor-pointer hover:text-error"
                          title="Delete Comment"
                          onClick={() => {
                            useAxiosWAuth
                              .delete(
                                `/comments/delete/${commentItem.comment_id}`
                              )
                              .then(async () => {
                                await load_comment();
                              })
                              .catch(() => {
                                setComment([]);
                              });
                          }}
                        />
                      </li>
                    )}
                    {commentItem?.User?.user_id !== user_id && (
                      <li className="text-xs p-1">
                        {commentItem?.User?.username}
                      </li>
                    )}
                    <li className="text-sm indent-1 bg-base-100 rounded p-1">
                      {commentItem?.comment_content}
                    </li>
                  </ul>
                );
              })}
            </div>
          ) : (
            <p>No Comments</p>
          )}
        </div>
      </div>
    </>
  );
};

const PostData = ({ posts, reload }) => {
  const [dialogState, setDialogState] = useState(false);

  const { user } = useContext(AppContext);
  return (
    <>
      {!Boolean(posts) && (
        <p className="text-error-content bg-error">No Posts Found</p>
      )}
      {Boolean(posts) &&
        posts.map((post, postIndex) => {
          return (
            <div
              key={postIndex}
              className="w-full mb-3 border-2 border-base-300 rounded-xl p-2 shadow-md flex flex-col"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-xs font-medium">{post?.User?.username}</p>
                </div>
                {Boolean(dialogState) && (
                  <Teleporter>
                    <DialogPopUp
                      className={"max-w-lg w-full"}
                      dialogState={dialogState}
                      setDialogState={setDialogState}
                      renderContent={post}
                      render={(content) => {
                        return <p>{content?.post_id} </p>;
                      }}
                    />
                  </Teleporter>
                )}
                <div className=" dropdown dropdown-hover dropdown-end">
                  <h1 className="cursor-pointer text-xs">
                    {parseDateTime({
                      timeString: post?.updatedAt ?? post?.createdAt,
                    })}
                  </h1>
                  {user?.user_id == post?.User?.user_id && (
                    <div className="dropdown-content bg-base-200 p-2 rounded-md flex flex-row gap-2 justify-start items-center">
                      <span
                        className="flex items-center justify-start gap-1 text-xs cursor-pointer hover:text-info"
                        onClick={() => {
                          setDialogState(!dialogState);
                        }}
                      >
                        <Icon.AiOutlineEdit size={18} />
                        <span>Update</span>
                      </span>
                      <span
                        className="flex items-center justify-start gap-1 text-xs cursor-pointer hover:text-error"
                        onClick={() => {
                          useAxiosWAuth
                            .delete(`/posts/delete/${post?.post_id}`)
                            .then(async () => {
                              await reload();
                            })
                            .catch(({ response }) => {
                              console.log(response);
                            });
                        }}
                      >
                        <Icon.AiOutlineDelete size={18} />
                        <span>Delete</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="divider my-1"></div>
              <>
                <div>
                  <span className="text-xs tracking-wide uppercase">Topic</span>
                  <h1 className="text-3xl font-medium">{post?.post_topic}</h1>
                </div>
                <div>
                  <span className="text-xs tracking-wide uppercase">
                    Description
                  </span>
                  <p className="bg-base-200 p-2 rounded">
                    {post?.post_description}
                  </p>
                  <PostComment post_id={post?.post_id} />
                </div>
              </>
            </div>
          );
        })}
    </>
  );
};

export default PostData;
