"use client";
import { useEffect, useState } from "react";
import Dialog from "./dialog";

import { createUrl } from "@/app/actions";

export default function Home() {
  const [message, setMessage] = useState();
  const [target, setTarget] = useState("");
  const [randomId, setRandomId] = useState(false);
  const [customId, setCustomId] = useState("");
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await createUrl({
        target,
        randomId,
        id: customId || undefined,
      });
      setCreatedUrl(result.url);
      setIsDialogOpen(true);
      // console.log("URL created:", result);
    } catch (error) {
      console.error("Error creating URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCreatedUrl(null);
    // Optionally reset the form here
    setTarget("");
    setRandomId(false);
    setCustomId("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hello");
      const { version } = await res.json();
      setMessage(version);
    };
    fetchData();
  }, []);

  if (!message)
    return (
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );

  return (
    <main>
      <div className="container mx-auto h-screen flex flex-col items-center justify-center gap-5">
        <div className="mx-auto flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-bold">Razik URL Shortener</h1>
          <p className="text-xs">Version: {message}</p>
        </div>

        <form
          onSubmit={handleCreate}
          className="container mx-auto flex flex-col items-center justify-center p-6 gap-5"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 max-w-xl">
            <input
              type="url"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter target URL"
              required
              className="p-2 rounded container"
            />
            {!randomId && (
              <input
                type="text"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                placeholder="Custom ID (optional)"
                className="p-2 rounded container md:w-1/2"
              />
            )}
          </div>
          <button
            type="submit"
            className="container mx-auto max-w-xl bg-[#282828] text-white py-2 px-5 rounded flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
            )}
            <span>{isLoading ? "Creating..." : "Create"}</span>
          </button>
          <label className="text-sm">
            <input
              type="checkbox"
              checked={randomId}
              onChange={(e) => setRandomId(e.target.checked)}
            />{" "}
            Use Random ID
          </label>
        </form>
      </div>
      {createdUrl && (
        <Dialog
          url={createdUrl}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </main>
  );
}
