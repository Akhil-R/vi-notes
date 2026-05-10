// Defines what props Editor accepts
// Kept in types/ so other features can easily import
export interface EditorProps {
  // Called every time user types — parent stores the text
  onTextChange: (text: string) => void;



  // Optional now — Feature 3 (keystroke timing) will pass these
  // We use this to record the Start Time of a keystroke.
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  // By comparing the onKeyDown time and the onKeyUp time, we calculate Hold Time (how long your finger stayed on the key).
  onKeyUp?:   (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;

  // Optional now — Feature 4 (paste detection) will pass this
  // 
  onPaste?:   (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
}
