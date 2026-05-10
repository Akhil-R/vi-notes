import { useState } from 'react';
import Editor from '../components/Editor';

export default function EditorPage() {
  // const [content, setContent] = useState<string>('');
   // Stores the text — Feature 5 will read this to save to backend
  const [, setContent] = useState<string>('');



  return (
    <div className="page">
      <header className="editor-header">
        <span className="brand">Vi-Notes</span>
      </header>
      {/* setContent passed as callback — Editor calls it on every keystroke */}
      <Editor onTextChange={setContent} />
    </div>
  );
}
