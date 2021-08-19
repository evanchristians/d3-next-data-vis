import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Data Visualization | D3 | Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl">
          Data Visualization with <span className="text-yellow-400">D3.js</span>{" "}
          & <span className="text-blue-500">Next.js</span>
        </h1>
      </main>
    </div>
  );
}
