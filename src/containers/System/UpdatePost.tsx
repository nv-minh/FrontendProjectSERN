import { PostEditor } from './index';

const UpdatePost = ({ currentPost, handleEditPost, setIsEdit, setCurrentPost }: any) => {
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        setIsEdit(false);
      }}
      className="absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 z-30 flex items-center justify-center"
    >
      <div className="bg-white max-w-[1100px] w-full overflow-y-auto h-full ">
        <PostEditor
          currentPost={currentPost}
          handleEditPost={handleEditPost}
          setIsEdit={setIsEdit}
          setCurrentPost={setCurrentPost}
        />
      </div>
    </div>
  );
};
export default UpdatePost;
