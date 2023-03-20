import { Editor as TinyMceEditor } from "tinymce";
import { Editor } from "@tinymce/tinymce-react";
import React, { MutableRefObject } from "react";

interface IWysiwygEditorProps {
  id: string;
  forwardedRef: MutableRefObject<TinyMceEditor | null>;
  onEditorChange: (a: string, editor: TinyMceEditor) => void;
  initialValue?: string;
  value?: string;
  isDisabled?: boolean;
}

export default function WysiwygEditor({
  id,
  forwardedRef,
  onEditorChange,
  initialValue,
  value,
  isDisabled,
}: IWysiwygEditorProps) {
  return (
    <Editor
      id={`wysiwyg-editor-${id}`}
      tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
      initialValue={initialValue}
      value={value}
      onEditorChange={onEditorChange}
      disabled={isDisabled}
      onInit={(evt, editor) => {
        forwardedRef.current = editor;
      }}
      init={{
        height: 400,
        min_height: 400,
        // setup: (editor) => {
        //   editor.ui.registry.addButton("myCustomToolbarButton", {
        //     text: "My Custom Button",
        //     onAction: () => alert("button clicked!"),
        //   });
        // },
        plugins:
          "lists table link " +
          "charmap insertdatetime searchreplace quickbars autolink autosave wordcount visualchars visualblocks help",
        language: "fr_FR",
        /* MENUBAR */
        menubar: "file edit view insert table help",
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
        toolbar: [
          { name: "history", items: ["undo", "redo"] },
          {
            name: "formatting",
            items: [
              "blocks",
              "bold",
              "italic",
              "strikethrough",
              "removeformat",
            ],
          },
          { name: "lists", items: ["bullist", "numlist"] },
          { name: "tables", items: ["table"] },
          { name: "indents", items: ["outdent", "indent"] },
          { name: "links", items: ["link", "unlink"] },
        ],
        block_formats: "Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4",
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
        // import_css: "my-styles.css",
        // importcss_append: true,
      }}
    />
  );
}
