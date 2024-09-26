import React, { useState } from 'react';
// import {ClassicEditor,
// 	Autoformat,
// 	Bold,
// 	Italic,
// 	Underline,
// 	BlockQuote,
// 	Base64UploadAdapter,
// 	CKFinder,
// 	CKFinderUploadAdapter,
// 	CloudServices,
// 	CKBox,
// 	Essentials,
// 	Heading,
// 	Image,
// 	ImageCaption,
// 	ImageResize,
// 	ImageStyle,
// 	ImageToolbar,
// 	ImageUpload,
// 	PictureEditing,
// 	Indent,
// 	IndentBlock,
// 	Link,
// 	List,
// 	MediaEmbed,
// 	Mention,
// 	Paragraph,
// 	PasteFromOffice,
// 	Table,
// 	TableColumnResize,
// 	TableToolbar,
// 	TextTransformation,
// 	HorizontalLine,
// 	Alignment,
//     Context,
//     ContextWatchdog,
// 	WordCount
// } from 'ckeditor5';
// import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import { Button, TextField, Box, Typography, Grid } from '@mui/material';
import CKEditorSetup from './CKEditorSetup';
// import 'ckeditor5/ckeditor5.css';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleEditorChange = (event) => {
    setContent(event.editor.getData());
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle form submission, including content and image upload
    console.log({ title, content, image });
  };

  return (
    <Box sx={{ p: 3, my: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add New Blog
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Blog Content
          </Typography>
		  <CKEditorSetup/>
          {/* <CKEditorContext context={ Context } contextWatchdog={ ContextWatchdog }>
      <CKEditor
        editor={ ClassicEditor }
        className="my-editor"
        config={ {
            plugins: [
                Autoformat,
                BlockQuote,
                Bold,
                CKFinder,
                CKFinderUploadAdapter,
                CloudServices,
                // ...(CKBOX_TOKEN_URL ? [CKBox] : []),
                Essentials,
                Heading,
                Image,
                ImageCaption,
                ImageResize,
                ImageStyle,
                ImageToolbar,
                ImageUpload,
                Base64UploadAdapter,
                Indent,
                IndentBlock,
                Italic,
                Link,
                List,
                MediaEmbed,
                Mention,
                Paragraph,
                PasteFromOffice,
                PictureEditing,
                Table,
                TableColumnResize,
                TableToolbar,
                TextTransformation,
                Underline,
				HorizontalLine,
				Alignment,
				WordCount,
                // ...(LICENSE_KEY ? [SlashCommand] : []),
            ],
          toolbar: [
			'undo',
			'redo',
			'|',
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'link',
			'uploadImage',
			'ckbox',
			'insertTable',
			'blockQuote',
			'mediaEmbed',
			'|',
			'alignment',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'horizontalLine',
		],
        heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph',
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1',
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2',
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3',
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4',
				},
			],
		},
		image: {
			resizeOptions: [
				{
					name: 'resizeImage:original',
					label: 'Default image width',
					value: null,
				},
				{
					name: 'resizeImage:50',
					label: '50% page width',
					value: '50',
				},
				{
					name: 'resizeImage:75',
					label: '75% page width',
					value: '75',
				},
			],
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'|',
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText',
				'|',
				'resizeImage',
			],
		},
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
		},
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
		},
		wordCount: {
			words: {
				'paragraph': 'Paragraph',
				'table': 'Table',
				'img': 'Image',
				'video': 'Video',
				'embed': 'Embed',
				'object': 'Object',
				'code': 'Code',
				'header': 'Header',
				'heading1': 'Heading 1',
				'heading2': 'Heading 2',
				'heading3': 'Heading 3',
				'heading4': 'Heading 4',
				'heading5': 'Heading 5',
				'heading6': 'Heading 6',
				'text': 'Text',
				'textAlternative': 'Text alternative',	
			},
			wordsCountTitle: 'Word count: {wordsCount}',
			charactersCountTitle: 'Characters count: {charactersCount}',
			charactersCountMessage: 'Characters count: {charactersCountMessage}',
			maxWords: 500,
		},
	
        } }
        data={ content }
        onReady={ ( editor ) => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor 1 is ready to use!', editor );
          
        } }
		onChange={( event, editor ) => {
		  const data = editor.getData();	
		  setContent( data );
		}}
      />
	  <Typography variant="body2" sx={{ mt: 1 }}>
  Word count: {content.split('').length==0 ? 0 : content.split(' ').length} / 500
</Typography>

    </CKEditorContext> */}

        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Add Image
          </Typography>
          <Button variant="contained" component="label" sx={{ mb: 2 }}>
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected Image: {image.name}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Publish Blog
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddBlog;
