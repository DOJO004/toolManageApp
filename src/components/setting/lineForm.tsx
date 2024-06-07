export default function LineForm() {
  return (
    <>
      <div>
        <label htmlFor="lineToken">Line Token</label>
        <input
          id="lineToken"
          type="text"
          className="w-full p-1 text-center text-black rounded-md"
        />
      </div>
      <div>
        <label htmlFor="lineName">Line 名稱</label>
        <input
          id="lineName"
          type="text"
          className="w-full p-1 text-center text-black rounded-md"
        />
      </div>
    </>
  );
}
