import { useContext } from "react";
import { EditorContext } from "./editor.context";

export function useEditorContext() {
  const editor = useContext(EditorContext);

  if (editor === null) {
    throw new Error(
      'editor has not yet been configured, and the value is null'
    );
  }

  if (editor === undefined) {
    throw new Error(
      'Attempt to access editor outside of the AuthContext Provider'
    );
  }

  return editor;
}
