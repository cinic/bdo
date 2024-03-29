CKEDITOR.editorConfig = function( config )
{
    config.toolbar =
    [
        { name: 'document', items : [ 'Source'] },
        { name: 'basicstyles', items : [ 'Bold','Italic','-','RemoveFormat', '-','NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote' ] },
        { name: 'insert', items : [ 'Image','Table'] },
        { name: 'links', items : [ 'Link','Unlink' ] }
        /*,
        { name: 'links', items : [ 'Link','Unlink','Anchor' ] }*/
    ];
    config.coreStyles_bold = { element : 'b', overrides : 'strong' };
    config.coreStyles_italic = { element : 'i', overrides : 'em' };
    config.pasteFromWordRemoveFontStyles = true;
    config.pasteFromWordRemoveStyles = true;
    config.filebrowserBrowseUrl = "/admin/ckeditor/attachment_files";
    config.filebrowserImageBrowseUrl = "/admin/ckeditor/pictures";
    config.filebrowserImageBrowseLinkUrl = "/admin/ckeditor/pictures";
    config.filebrowserImageUploadUrl = "/admin/ckeditor/pictures";
    config.filebrowserUploadUrl = "/admin/ckeditor/attachment_files";

    // Rails CSRF token
    config.filebrowserParams = function(){
        var csrf_token, csrf_param, meta,
            metas = document.getElementsByTagName('meta'),
            params = new Object();

        for ( var i = 0 ; i < metas.length ; i++ ){
            meta = metas[i];

            switch(meta.name) {
                case "csrf-token":
                    csrf_token = meta.content;
                    break;
                case "csrf-param":
                    csrf_param = meta.content;
                    break;
                default:
                    continue;
            }
        }

        if (csrf_param !== undefined && csrf_token !== undefined) {
            params[csrf_param] = csrf_token;
        }

        return params;
    };

    config.addQueryString = function( url, params ){
        var queryString = [];

        if ( !params ) {
            return url;
        } else {
            for ( var i in params )
                queryString.push( i + "=" + encodeURIComponent( params[ i ] ) );
        }

        return url + ( ( url.indexOf( "?" ) != -1 ) ? "&" : "?" ) + queryString.join( "&" );
    };

    // Integrate Rails CSRF token into file upload dialogs (link, image, attachment and flash)
    CKEDITOR.on( 'dialogDefinition', function( ev ){
        // Take the dialog name and its definition from the event data.
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;
        var content, upload;

        if (CKEDITOR.tools.indexOf(['link', 'image', 'attachment', 'flash'], dialogName) > -1) {
            content = (dialogDefinition.getContents('Upload') || dialogDefinition.getContents('upload'));
            upload = (content == null ? null : content.get('upload'));

            if (upload && upload.filebrowser && upload.filebrowser['params'] === undefined) {
                upload.filebrowser['params'] = config.filebrowserParams();
                upload.action = config.addQueryString(upload.action, upload.filebrowser['params']);
            }
        }
    });
}