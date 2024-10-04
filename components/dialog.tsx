import React, { useState } from "react";

interface UrlConfirmationDialogProps {
  url: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UrlConfirmationDialog({
  url,
  isOpen,
  onClose,
}: UrlConfirmationDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url!).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 filter backdrop-blur-[2px]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">URL Created Successfully</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &#x2715; {/* X symbol */}
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium mb-2">Your shortened URL:</p>
          <p className="break-all text-blue-600">{url}</p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {copied ? "Copied!" : "Copy URL"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
