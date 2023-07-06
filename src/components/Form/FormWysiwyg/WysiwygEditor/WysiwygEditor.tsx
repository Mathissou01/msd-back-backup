import React, { MutableRefObject, useEffect, useState } from "react";
import { Editor as TinyMceEditor, EditorEvent } from "tinymce";
import { Editor } from "@tinymce/tinymce-react";

export interface IWysiwygEditorOptions {
  height: number;
  plugins: string;
  menubar: string | false;
  toolbar: Array<{ name: string; items: Array<string> }> | false;
  formats?: {
    [key: string]: { inline: string; classes: string };
  };
  blockFormats?: string;
  elementPath: boolean;
}

const defaultWysiwygEditorOptions: IWysiwygEditorOptions = {
  height: 400,
  plugins:
    "lists table link " +
    "charmap insertdatetime searchreplace quickbars autolink autosave wordcount visualchars visualblocks help " +
    "importcss",
  menubar: "file edit view insert table help",
  toolbar: [
    { name: "history", items: ["undo", "redo"] },
    {
      name: "formatting",
      items: ["blocks", "bold", "italic", "strikethrough", "removeformat"],
    },
    { name: "lists", items: ["bullist", "numlist"] },
    { name: "tables", items: ["table"] },
    { name: "indents", items: ["outdent", "indent"] },
    { name: "links", items: ["link", "unlink"] },
  ],
  formats: {
    h1: { inline: "", classes: "" },
    h5: { inline: "", classes: "" },
    h6: { inline: "", classes: "" },
    address: { inline: "", classes: "" },
    div: { inline: "", classes: "" },
  },
  blockFormats: "Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4",
  elementPath: true,
};

export const minimalWysiwygEditorOptions: IWysiwygEditorOptions = {
  height: 300,
  plugins: "autosave wordcount " + "importcss",
  menubar: false,
  toolbar: false,
  formats: {
    h1: { inline: "", classes: "" },
    h2: { inline: "", classes: "" },
    h3: { inline: "", classes: "" },
    h4: { inline: "", classes: "" },
    h5: { inline: "", classes: "" },
    h6: { inline: "", classes: "" },
    address: { inline: "", classes: "" },
    div: { inline: "", classes: "" },
    bold: { inline: "", classes: "" },
    italic: { inline: "", classes: "" },
  },
  elementPath: false,
};

interface IWysiwygEditorProps {
  id: string;
  forwardedRef: MutableRefObject<TinyMceEditor | null>;
  onEditorChange: (a: string, editor: TinyMceEditor) => void;
  editorOptions?: IWysiwygEditorOptions;
  value?: string;
  isDisabled?: boolean;
  maxCharacterLength?: number;
}

export default function WysiwygEditor({
  id,
  forwardedRef,
  onEditorChange,
  editorOptions = defaultWysiwygEditorOptions,
  value,
  isDisabled,
  maxCharacterLength,
}: IWysiwygEditorProps) {
  /* Static Data */
  // TODO AllowedKeys
  //const allowedKeys = ["Backspace", "Delete", "Tab", "Escape", "Enter"];
  const [isInitialized, setIsInitialized] = useState(false);

  /* Methods */
  function getCharCount(editor: TinyMceEditor) {
    const textContent = editor.getContent({ format: "text" });
    const convertedString = textContent.replace(/(\r\n|\n|\r)/gm, "");
    return convertedString.length;
  }

  function handleInit(evt: EditorEvent<unknown>, editor: TinyMceEditor) {
    forwardedRef.current = editor;
  }

  function handleUpdate(value: string, editor: TinyMceEditor) {
    if (maxCharacterLength) {
      const cCount = getCharCount(editor);
      if (cCount <= maxCharacterLength) {
        onEditorChange(value, editor);
      }
    } else {
      onEditorChange(value, editor);
    }
  }

  function handleBeforeAddUndo(
    evt: EditorEvent<unknown>,
    editor: TinyMceEditor,
  ) {
    if (maxCharacterLength) {
      if (getCharCount(editor) > maxCharacterLength) {
        evt.preventDefault();
      }
    }
  }

  /* Local Data */
  useEffect(() => {
    // forces tinyMCE to properly load without bug of duplicating instances
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);
  }, []);

  return (
    <>
      {isInitialized && (
        <Editor
          id={`wysiwyg-editor-${id}`}
          tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
          value={value}
          // onEditorChange={onEditorChange}
          onEditorChange={handleUpdate}
          onBeforeAddUndo={handleBeforeAddUndo}
          disabled={isDisabled}
          onInit={handleInit}
          init={{
            height: editorOptions.height,
            min_height: editorOptions.height,
            // setup: (editor) => {
            //   editor.ui.registry.addButton("myCustomToolbarButton", {
            //     text: "My Custom Button",
            //     onAction: () => alert("button clicked!"),
            //   });
            // },
            plugins: editorOptions?.plugins,
            autosave_ask_before_unload: false,
            language: "fr_FR",
            /* MENUBAR */
            menubar: editorOptions.menubar,
            menu: {
              file: {
                title: "File",
                items: "restoredraft | export print",
              },
              edit: {
                title: "Edit",
                items:
                  "undo redo | cut copy paste pastetext | selectall | searchreplace",
              },
              view: {
                title: "View",
                items: "visualaid visualchars visualblocks",
              },
              insert: {
                title: "Insert",
                items: "link inserttable | charmap | insertdatetime",
              },
              table: {
                title: "Table",
                items:
                  "inserttable | cell row column | advtablesort | tableprops deletetable",
              },
              help: {
                title: "Help",
                items: "wordcount | help",
              },
            },
            /* TOOLBAR */
            toolbar_mode: "wrap",
            // toolbar_sticky: true,
            // toolbar_sticky_offset: isSmallScreen ? 102 : 108,
            toolbar: editorOptions?.toolbar,
            formats: editorOptions?.formats,
            block_formats: editorOptions?.blockFormats,
            elementpath: editorOptions?.elementPath,
            /* QUICKBARS */
            quickbars_insert_toolbar: false,
            quickbars_selection_toolbar: false,
            /* CONTEXT MENUS */
            contextmenu: "link table",
            /* STYLING */
            promotion: false,
            // branding: false,
            // skin: useDarkMode ? "oxide-dark" : "oxide",
            // content_css: useDarkMode ? "dark" : "default",
            // content_style:
            //   "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            // TODO: change default style (font, colors, how it will be displayed on the FO...
            //  style/colors need to be the one of THIS contract (custom colors that will be shown on the FO, etc)
            //  typography and sizes need to match de style guide
            //  allow color change but ONLY the contract color palette
            // import_css: "wysiwyg-editor.scss",
            // content_css: "/assets/wysiwyg-editor.css",
            // importcss_append: true,
            skin: "oxide-custom",
          }}
        />
      )}
    </>
  );
}
