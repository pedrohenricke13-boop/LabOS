"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main style={{ padding: 40 }}>
      <h1>Algo deu errado</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()} style={{ marginTop: 12, padding: 10 }}>
        Tentar novamente
      </button>
    </main>
  );
}