import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/useAuth";
import Navbar from "../components/Navbar";
import TextEditor from "../editor/TextEditor";

// This is the main writing page after the user logs in.
const EditorPage = () => {
  const { user } = useAuth();

  // Load this user's saved writing from localStorage.
  const [content, setContent] = useState(() => {
    if (user?.id) {
      return localStorage.getItem(`vi-content-${user.id}`) || "";
    }
    return "";
  });

  // Save the writing every time the text changes.
  useEffect(() => {
    const userId = user?.id;
    if (userId) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(`vi-content-${userId}`, content);
      }, 1000); // Wait 1 second after user stops typing

      return () => clearTimeout(timeoutId); // Cleanup on re-render
    }
  }, [content, user?.id]);

  // Count writing details so the user can see basic writing info.
  const writingStats = useMemo(() => {
    const text = content.replace(/\r\n/g, "\n");

    return {
      wordCount: text.trim().split(/\s+/).filter(Boolean).length,
      lineCount: text.length === 0 ? 0 : text.split("\n").length,
      // Here characters means only typed letters/numbers/symbols, not spaces.
      characterCount: text.replace(/\s/g, "").length,
    };
  }, [content]);

  return (
    <div className="editor-page">
      <Navbar />
      <main className="editor-shell">
        {/* This small line shows word count and save status. */}
        <div className="editor-meta" aria-label="Writing details">
          <span>
            {writingStats.wordCount}{" "}
            {writingStats.wordCount === 1 ? "word" : "words"} |{" "}
            {writingStats.lineCount}{" "}
            {writingStats.lineCount === 1 ? "line" : "lines"} |{" "}
            {writingStats.characterCount}{" "}
            {writingStats.characterCount === 1 ? "character" : "characters"}
          </span>
          <span>Saved locally for {user?.name}</span>
        </div>

        {/* The actual typing area is in this component. */}
        <TextEditor
          content={content}
          onTextChange={setContent}
          onKeyDown={() => {}}
          onKeyUp={() => {}}
          onPaste={() => {}}
        />
      </main>
    </div>
  );
};

export default EditorPage;
