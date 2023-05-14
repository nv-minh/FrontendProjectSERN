const EditAccout = () => {
  return (
    <div>
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div>
        <input
          type="text"
          readOnly
          className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none"
          // value={}
        />
        <input
          type="text"
          readOnly
          className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none"
          // value={}
        />
      </div>
    </div>
  );
};
export default EditAccout;
