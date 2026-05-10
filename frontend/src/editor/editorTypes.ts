// These are the values the TextEditor component needs from the editor page.
export interface EditorProps {
  content: string;
  onTextChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste: () => void;
}
