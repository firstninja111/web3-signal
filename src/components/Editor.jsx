import React, { useEffect, useState } from "react";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = ({ html, setContent }) => {
  const [editorState, setEditorState] = useState(() =>EditorState.createEmpty());

  useEffect(()=>{
    const contentBlock = html ? htmlToDraft(html) : null;
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);      
    }else{
      setEditorState(EditorState.createEmpty());
    }
  }, [html]);
  
  const handleEditorChange = (state) => {
    setEditorState(state);
    let _html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setContent(_html);
  };

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};
export default DraftEditor;
