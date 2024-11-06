'use client'
// components/PlateEditor.js
import React, { useState } from 'react';
import { usePlateEditor, Plate, ParagraphPlugin, PlateLeaf } from '@udecode/plate-common/react';
import { Editor } from '@/components/plate-ui/editor';
import { Value } from '@udecode/plate-common';

import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
} from '@udecode/plate-basic-marks/react';
import { HtmlReactPlugin } from '@udecode/plate-html/react';
import { HeadingPlugin, TocPlugin } from '@udecode/plate-heading/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin, CodeLinePlugin, CodeSyntaxPlugin } from '@udecode/plate-code-block/react';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { withProps } from '@udecode/cn';
import { CommentsPlugin } from '@udecode/plate-comments/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { ColumnPlugin, ColumnItemPlugin } from '@udecode/plate-layout/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { TodoListPlugin } from '@udecode/plate-list/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { MentionPlugin, MentionInputPlugin } from '@udecode/plate-mention/react';
import { TablePlugin, TableRowPlugin, TableCellPlugin, TableCellHeaderPlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import { BlockquoteElement } from './blockquote-element';
import { CodeBlockElement } from './code-block-element';
import { CodeLineElement } from './code-line-element';
import { CodeSyntaxLeaf } from './code-syntax-leaf';
import { ColumnElement } from './column-element';
import { ColumnGroupElement } from './column-group-element';
import { CommentLeaf } from './comment-leaf';
import { CommentsPopover } from './comments-popover';
import { DateElement } from './date-element';
import { ExcalidrawElement } from './excalidraw-element';
import { HighlightLeaf } from './highlight-leaf';
import { HrElement } from './hr-element';
import { ImageElement } from './image-element';
import { LinkElement } from './link-element';
import { MediaEmbedElement } from './media-embed-element';
import { MentionElement } from '@/components/plate-ui/mention-element';
import { MentionInputElement } from '@/components/plate-ui/mention-input-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { TableCellElement, TableCellHeaderElement } from '@/components/plate-ui/table-cell-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { TodoListElement } from '@/components/plate-ui/todo-list-element';
import { ToggleElement } from '@/components/plate-ui/toggle-element';
import { withDraggables } from '@/components/plate-ui/with-draggables';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CaptionPlugin } from '@udecode/plate-caption/react';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break/react';
import { CsvPlugin } from '@udecode/plate-csv';
import { DndPlugin } from '@udecode/plate-dnd';
import { DocxPlugin } from '@udecode/plate-docx';
import { EmojiPlugin } from '@udecode/plate-emoji/react';
import { JuicePlugin } from '@udecode/plate-juice';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import { ResetNodePlugin } from '@udecode/plate-reset-node/react';
import { DeletePlugin } from '@udecode/plate-select';
import { BlockMenuPlugin, BlockSelectionPlugin } from '@udecode/plate-selection/react';
import { TabbablePlugin } from '@udecode/plate-tabbable/react';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { KbdLeaf } from './kbd-leaf';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { AlignPlugin } from '@udecode/plate-alignment/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { LineHeightPlugin } from '@udecode/plate-line-height/react';
import { AutoformatPlugin } from '@udecode/plate-autoformat/react';
import { FontColorPlugin, FontBackgroundColorPlugin, FontSizePlugin } from '@udecode/plate-font/react';
import { CodeLeaf } from './code-leaf';
interface PlateEditorProps {
  initialValue?: Value;
  onChange?: (value: Value) => void;
}

type HandleChangeParams = {
  value: Value; // replace with the exact type if known, e.g., `string` or `Record<string, any>`
};

const ContentEditor = ({ initialValue, onChange }: PlateEditorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialContent = React.useMemo(() => {
    try {
      return initialValue ? initialValue : [{ type: "p", children: [{ text: "" }] }];
    } catch {
      return [{ type: "p", children: [{ text: initialValue }] }];
    }
  }, [initialValue]);
  
  const editor = usePlateEditor({
    value: initialContent as Value,
    plugins: [
      HtmlReactPlugin,
      ParagraphPlugin,
      BlockquotePlugin,
      CodeBlockPlugin,
      HeadingPlugin,
      HorizontalRulePlugin,
      LinkPlugin.configure({
        render: { afterEditable: () => <LinkFloatingToolbar /> },
      }),
      ImagePlugin,
      MediaEmbedPlugin,
      MentionPlugin,
      TodoListPlugin,
      ExcalidrawPlugin,
      TogglePlugin,
      ColumnPlugin,
      TablePlugin,
      DatePlugin,
      TocPlugin,
      CaptionPlugin.configure({
        options: { plugins: [ImagePlugin, MediaEmbedPlugin] },
      }),
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      CodePlugin,
      SubscriptPlugin,
      SuperscriptPlugin,
      FontColorPlugin,
      FontBackgroundColorPlugin,
      FontSizePlugin,
      HighlightPlugin,
      KbdPlugin,
      AlignPlugin.configure({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },
      }),
      IndentPlugin.configure({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },
      }),
      IndentListPlugin.configure({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },
      }),
      LineHeightPlugin.configure({
        inject: {
          nodeProps: {
            defaultNodeValue: 1.5,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
          },
          targetPlugins: ['p', 'h1', 'h2', 'h3'],
        },
      }),
      AutoformatPlugin.configure({
        options: {
          enableUndoOnDelete: true,
          rules: [
            // Usage: https://platejs.org/docs/autoformat
          ],
        },
      }),
      BlockSelectionPlugin,
      EmojiPlugin,
      ExitBreakPlugin.configure({
        options: {
          rules: [
            {
              hotkey: 'mod+enter',
            },
            {
              before: true,
              hotkey: 'mod+shift+enter',
            },
            {
              hotkey: 'enter',
              level: 1,
              query: {
                allow: ['h1', 'h2', 'h3'],
                end: true,
                start: true,
              },
              relative: true,
            },
          ],
        },
      }),
      NodeIdPlugin,
      ResetNodePlugin.configure({
        options: {
          rules: [
            // Usage: https://platejs.org/docs/reset-node
          ],
        },
      }),
      SoftBreakPlugin.configure({
        options: {
          rules: [
            { hotkey: 'shift+enter' },
            {
              hotkey: 'enter',
              query: {
                allow: ['code_block', 'blockquote', 'td', 'th'],
              },
            },
          ],
        },
      }),
      TabbablePlugin,
      TrailingBlockPlugin.configure({
        options: { type: 'p' },
      }),
      CommentsPlugin,
      BlockMenuPlugin,
      DndPlugin.configure({
          options: { enableScroller: true },
      }),
      DeletePlugin,
      DocxPlugin,
      CsvPlugin,
      MarkdownPlugin,
      JuicePlugin,
    ],
    override: {
      components: withDraggables(withPlaceholders(({
        [BlockquotePlugin.key]: BlockquoteElement,
        [CodeBlockPlugin.key]: CodeBlockElement,
        [CodeLinePlugin.key]: CodeLineElement,
        [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
        [ExcalidrawPlugin.key]: ExcalidrawElement,
        [HorizontalRulePlugin.key]: HrElement,
        [ImagePlugin.key]: ImageElement,
        [LinkPlugin.key]: LinkElement,
        [TogglePlugin.key]: ToggleElement,
        [ColumnPlugin.key]: ColumnGroupElement,
        [ColumnItemPlugin.key]: ColumnElement,
        [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
        [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
        [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
        [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
        [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
        [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
        [MediaEmbedPlugin.key]: MediaEmbedElement,
        [MentionPlugin.key]: MentionElement,
        [MentionInputPlugin.key]: MentionInputElement,
        [ParagraphPlugin.key]: ParagraphElement,
        [TablePlugin.key]: TableElement,
        [TableRowPlugin.key]: TableRowElement,
        [TableCellPlugin.key]: TableCellElement,
        [TableCellHeaderPlugin.key]: TableCellHeaderElement,
        [TodoListPlugin.key]: TodoListElement,
        [DatePlugin.key]: DateElement,
        [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
        [CodePlugin.key]: CodeLeaf,
        [CommentsPlugin.key]: CommentLeaf,
        [HighlightPlugin.key]: HighlightLeaf,
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
        [KbdPlugin.key]: KbdLeaf,
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
        [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
        [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
      }))),
    },
  });

  const html = editor.api.htmlReact.serialize({
    nodes: editor.children,
    // if you use @udecode/plate-dnd
    dndWrapper: (props) => <DndProvider backend={HTML5Backend} {...props} />,
  });
  const [debugValue, setDebugValue] = useState<Value>();
  const handleChange = ({value}: HandleChangeParams) => {
    localStorage.setItem('editorContent', html)
    onChange?.(value);
    setDebugValue(value);
  };

  return (
    <div>
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onChange={handleChange} >
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
        <Editor className='rounded-t-none' placeholder="Type..." />
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
        <CommentsPopover />
        <Accordion type="single" collapsible>
          <AccordionItem value="manual-installation">
            <AccordionTrigger>Debug Value</AccordionTrigger>
            <AccordionContent>{JSON.stringify(debugValue)}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Plate>
    </DndProvider>
    </div>
  );
};

export default ContentEditor;
