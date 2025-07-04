export default function VerifySuccess() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-green-600 text-2xl font-bold">Email Verified!</h1>
      <p>
        You can now{" "}
        <a href="/login" className="text-blue-500 underline">
          login
        </a>
        .
      </p>
    </div>
  );
}
