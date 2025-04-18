export default function ErrorPage({ error }: { error?: Error }) {
  return (
    <div>
      <h1>There was an error. Please try again.</h1>
      <p>{error?.message}</p>
    </div>
  );
}
