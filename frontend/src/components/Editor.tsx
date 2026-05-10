// Stateless(Presentational) component — only job is to show textarea and report changes

import type { EditorProps } from '../types/editor.types';
import '../styles/Editor.css';

export default function Editor({
  onTextChange,
  onKeyDown,
  onKeyUp,
  onPaste,
}: EditorProps) {

  // e.target.value = full text in textarea right now
  // Pass it up to parent — Editor doesn't store anything itself
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };

  return (
    <div className="editor-wrapper">
      <textarea
        className="editor-textarea"
        onChange={handleChange}
        onKeyDown={onKeyDown} // Feature 3 will use this
        onKeyUp={onKeyUp} // Feature 3 will use this
        onPaste={onPaste}  // Feature 4 will use this
        placeholder="Start writing..."
        spellCheck={true} // This turns on the browser’s built-in spellchecker.
        aria-label="Writing editor" // This is for Accessibility
      />
    </div>
  );
}
