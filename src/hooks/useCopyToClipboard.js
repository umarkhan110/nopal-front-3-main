import { useState } from "react";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const success = document.execCommand("copy");
        setIsCopied(success);
        if (success) {
          setTimeout(() => setIsCopied(false), 3000); // Reset isCopied after 3 seconds
        }
      } catch (err) {
        setIsCopied(false);
      }

      document.body.removeChild(textArea);
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000); // Reset isCopied after 3 seconds
        })
        .catch(() => setIsCopied(false));
    }
  };

  return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;
