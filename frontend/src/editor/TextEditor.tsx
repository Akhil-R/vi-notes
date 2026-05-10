import React from "react";
import type { EditorProps } from "./editorTypes";

// This is the simple text editor where the user writes their content.
const Editor = React.memo(function Editor({
  content,
  onTextChange,
  onKeyDown,
  onKeyUp,
  onPaste,
}: EditorProps) {
  return (
    <section className="writing-surface">
      {/* The textarea is controlled by React, so the page always knows the latest text. */}
      <textarea
        className="editor-textarea"
        value={content}
        onChange={(event) => onTextChange(event.target.value)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onPaste={onPaste}
        placeholder="Start writing your note..."
        spellCheck={true}
        aria-label="Writing editor"
      />
    </section>
  );
});

export default Editor;
