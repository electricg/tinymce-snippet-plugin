(function() {
	var PLUGIN_NAME = 'snippet';
	
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack(PLUGIN_NAME);

	tinymce.create('tinymce.plugins.SnippetPlugin', {
		init : function(ed, url) {
			s_data = ed.getParam('snippet_list');
			s_url = url;
			s_image = s_url + '/img/wishlist_add.gif';
			s_title = PLUGIN_NAME + '.title';
			s_class = 'snippet_list';
			// Loads the CSS file for the plugin
            ed.onBeforeRenderUI.add(function() {
                tinymce.DOM.loadCSS(s_url + '/css/' + PLUGIN_NAME + '.css');
            });
		},
		
		createControl: function(n, cm) {
			switch (n) {
				// List Box
				case 'snippetlistbox':
					var c = cm.createListBox(n, {
						"class" : s_class,
						title : s_title,
						onselect : function(g) {
							tinyMCE.activeEditor.execCommand('mceInsertContent', false, g);
						}
					});
					// Add some values to the list box
					for (i = 0; i < s_data.length; i++) {
						c.add(s_data[i].title, s_data[i].value, {"class": s_class + ' ' + s_data[i].cls});
					}
					// Return the new menu button instance
					return c;
				
				// Split Button
				case 'snippetsplitbtn':
					var s = 0;
					var c = cm.createSplitButton(n, {
						title : s_title,
						image : s_image,
						onclick : function() {
							tinyMCE.activeEditor.execCommand('mceInsertContent', false, s_data[s].value);
						}
					});
					c.onRenderMenu.add(function(c, m) {
						m.add({title: s_title, "class": "mceMenuItemTitle"}).setDisabled(1);
						for (i = 0; i < s_data.length; i++) {
							m.add({
								"class" : s_class,
								icon : s_data[i].cls,
								title : s_data[i].title,
								onclick : function(g, index) {
									return function() {
										s = index;
										tinyMCE.activeEditor.execCommand('mceInsertContent', false, g);
									};
								}(s_data[i].value, i)
							});
						}
					});
					// Return the new menu button instance
					return c;
				
				// Menu Button without icons
				case 'snippetmenubtn':
					var c = cm.createMenuButton(n, {
						title : s_title,
						image : s_image,
						icons  : false
					});
					c.onRenderMenu.add(function(c, m) {
						for (i = 0; i < s_data.length; i++) {
							m.add({
								title : s_data[i].title,
								onclick : function(g) {
									return function() {
										tinyMCE.activeEditor.execCommand('mceInsertContent', false, g);
									};
								}(s_data[i].value)
							});
						}
					});
					// Return the new menu button instance
					return c;
				
				// Menu Button with icons
				case 'snippetmenubtnicon':
					var c = cm.createMenuButton(n, {
						title : s_title,
						image : s_image,
						icons  : true
					});
					c.onRenderMenu.add(function(c, m) {
						for (i = 0; i < s_data.length; i++) {
							m.add({
								"class" : s_class,
								icon : s_data[i].cls,
								title : s_data[i].title,
								onclick : function(g) {
									return function() {
										tinyMCE.activeEditor.execCommand('mceInsertContent', false, g);
									};
								}(s_data[i].value)
							});
						}
					});
					// Return the new menu button instance
					return c;
			}
			
			return null;
		}
	});
	
	// Register plugin
	tinymce.PluginManager.add(PLUGIN_NAME, tinymce.plugins.SnippetPlugin);
})();