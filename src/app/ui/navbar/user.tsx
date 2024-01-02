import Image from "next/image";

const User = () => {
  return (
    <>
      <Image
        src="/user.png"
        alt=""
        width={50}
        height={50}
        className="flex p-1 mx-auto bg-white rounded-full"
      />
      <p>username</p>
    </>
  );
};
export default User;
