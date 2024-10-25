export const _ChatBox = () => {
  return (
    <div
      className="absolute bottom-0 left-0
      h-16 w-full
      flex items-center"
    >
      <input
        type="text"
        placeholder="Send a message..."
        className="bg-dark-700 rounded-md
        w-full mx-2 px-4 py-2"
      />
    </div>
  );
};
