/**
 * This will perform a conversion to update the fields user_id and organization_id from field user_org_id. Because of the super administrator feature the user_org_id cannot be used anymore.
 * 
 * @author Vincent Schuurhof
 * @since 2011-07-07
 * 
 * @properties={typeid:24,uuid:"560692CA-3149-4CE0-A6CE-F1F5F436B2FA"}
 * @AllowToRunInFind
 */
function svy_cnv_userOrgID() {
	var autoSave = databaseManager.getAutoSave();
	databaseManager.setAutoSave(true);
	
	databaseManager.startTransaction();
	
	/** @type {JSFoundSet<db:/svy_framework/sec_user_org>} */
	var _fsUserOrg = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user_org');
	
	/** @type {JSFoundSet<db:/svy_framework/nav_advanced_search>} */
	var _fsAdvancedSearch = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_advanced_search');
	_fsAdvancedSearch.loadAllRecords();
	
	for (var i = 1; i <= _fsAdvancedSearch.getSize(); i++) {
		_fsAdvancedSearch.setSelectedIndex(i);
		if (_fsAdvancedSearch.user_org_id) {
			_fsUserOrg.find();
			_fsUserOrg.user_org_id = _fsAdvancedSearch.user_org_id;
			if (_fsUserOrg.search()) {
				_fsAdvancedSearch.user_id = _fsUserOrg.user_id;
				_fsAdvancedSearch.organization_id = _fsUserOrg.organization_id;
				
				_fsAdvancedSearch.user_org_id = null;
			}
		}
	}
	
	/** @type {JSFoundSet<db:/svy_framework/nav_bookmarks>} */
	var _fsBookmarks = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_bookmarks');
	_fsBookmarks.loadAllRecords();
	
	for (var j = 1; j <= _fsBookmarks.getSize(); j++) {
		_fsBookmarks.setSelectedIndex(j);
		if (_fsBookmarks.user_org_id) {
			_fsUserOrg.find();
			_fsUserOrg.user_org_id = _fsBookmarks.user_org_id;
			if (_fsUserOrg.search()) {
				_fsBookmarks.user_id = _fsUserOrg.user_id;
				_fsBookmarks.organization_id = _fsUserOrg.organization_id;
				
				_fsBookmarks.user_org_id = null;
			}
		}
	}
	
	/** @type {JSFoundSet<db:/svy_framework/nav_shortcut>} */
	var _fsShortcut = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_shortcut');
	_fsShortcut.loadAllRecords();
	
	for (var k = 1; k <= _fsShortcut.getSize(); k++) {
		_fsShortcut.setSelectedIndex(k);
		if (_fsShortcut.user_org_id) {
			_fsUserOrg.find();
			_fsUserOrg.user_org_id = _fsShortcut.user_org_id;
			if (_fsUserOrg.search()) {
				_fsShortcut.user_id = _fsUserOrg.user_id;
				_fsShortcut.organization_id = _fsUserOrg.organization_id;
				
				_fsShortcut.user_org_id = null;
			}
		}
	}
	
	/** @type {JSFoundSet<db:/svy_framework/nav_user_table_view>} */
	var _fsUserTableView = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_user_table_view');
	_fsUserTableView.loadAllRecords();
	
	for (var m = 1; m <= _fsUserTableView.getSize(); m++) {
		_fsUserTableView.setSelectedIndex(m);
		if (_fsUserTableView.user_org_id) {
			_fsUserOrg.find();
			_fsUserOrg.user_org_id = _fsUserTableView.user_org_id;
			if (_fsUserOrg.search()) {
				_fsUserTableView.user_id = _fsUserOrg.user_id;
				_fsUserTableView.organization_id = _fsUserOrg.organization_id;
				
				_fsUserTableView.user_org_id = null;
			}
		}
	}
	
	/** @type {JSFoundSet<db:/svy_framework/search_criteria>} */
	var _fsSearchCriteria = databaseManager.getFoundSet(globals.nav_db_framework, 'search_criteria');
	_fsSearchCriteria.loadAllRecords();
	
	for (var n = 1; n <= _fsSearchCriteria.getSize(); n++) {
		_fsSearchCriteria.setSelectedIndex(n);
		if (_fsSearchCriteria.user_org_id) {
			_fsUserOrg.find();
			_fsUserOrg.user_org_id = _fsSearchCriteria.user_org_id;
			if (_fsUserOrg.search()) {
				_fsSearchCriteria.user_id = _fsUserOrg.user_id;
				_fsSearchCriteria.organization_id = _fsUserOrg.organization_id;
				
				_fsSearchCriteria.user_org_id = null;
			}
		}
	}
	
	/** @type {JSFoundSet<db:/svy_framework/sec_user_table_properties>} */
	var _fsUserTableProperties = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user_table_properties');
	_fsUserTableProperties.loadAllRecords();
	
	for (var o = 1; o <= _fsUserTableProperties.getSize(); o++) {
		_fsUserTableProperties.setSelectedIndex(o);
		if (_fsUserTableProperties.user_org_id) {
			_fsUserOrg.find();
			_fsUserOrg.user_org_id = _fsUserTableProperties.user_org_id;
			if (_fsUserOrg.search()) {
				_fsUserTableProperties.user_id = _fsUserOrg.user_id;
				_fsUserTableProperties.organization_id = _fsUserOrg.organization_id;
				
				_fsUserTableProperties.user_org_id = null;
			}
		}
	}
	
	databaseManager.setAutoSave(autoSave);
	
	return databaseManager.commitTransaction();
}

/**
 * Create the programs, settings in configurator for Mail functionality
 * 
 * @author pradiptab
 * @since 2011-09-12
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DA6AB28E-EDEA-4781-BB6A-F51BC9C069CB"}
 * @AllowToRunInFind
 */
function svy_cnv_setUpMail(event) {
	
	var _tabsRec = null;
	/** @type {JSFoundSet<db:/svy_framework/nav_menu>} */
	var _menuFs = null;
	var _menuItemRec = null;
	var _parent = null;
	var _navKeyRec = null;
	
	/** @type {JSFoundSet<db:/svy_framework/nav_program>} */
	var _programFs = databaseManager.getFoundSet('svy_framework', 'nav_program');
	
	if (_programFs.find()) {
		_programFs.program_name = 'svy_mail';
		_programFs.search();
	}
	
	if (!databaseManager.hasRecords(_programFs))  {
	
		// Create new program for mail module
		_programFs.newRecord();
		_programFs.program_name = 'svy_mail';
		_programFs.base_form_name = 'svy_mail';
		_programFs.sort_value = 'receive_date desc';
		_programFs.description = 'Inbox';
		_programFs.display_field_header = 'subject';
		_programFs.table_name = 'nav_mail';
		_programFs.server_name = 'svy_framework';
		_programFs.program_image = 'inbox.png';
		_programFs.form_name = 'svy_mail_tbl';
		_programFs.startup_view = 3;
		_programFs.divider_height = 350;
		_programFs.form_object = [[1,"detail","svy_mail_dtl",1],[2,"table","svy_mail_tbl",1]]
		_programFs.template_object = [[1,"detail",0,0],[2,"detail/tab",0,0],[3,"table/tab",1,1],[4,"table",1,1]];
		
		// Create tabs
		if (!_programFs.nav_program_to_nav_programtabs)
			return;
		
		_tabsRec = _programFs.nav_program_to_nav_programtabs.getRecord(_programFs.nav_program_to_nav_programtabs.newRecord());
		_tabsRec.form_type = 0;
		_tabsRec.program_name = 'svy_mail';
		_tabsRec.target_program_name = 'svy_mail';
		_tabsRec.display_description = 'Details';
		_tabsRec.description = 'Details';
		
		// Create root menu item "Mail"
		_menuFs = databaseManager.getFoundSet('svy_framework', 'nav_menu');
		
		_menuFs.find();
		_menuFs.name = 'sampleuse navigation';
		_menuFs.search();
		
		if (!databaseManager.hasRecords(_menuFs)) {
			_menuFs.newRecord();
			_menuFs.name = 'svy_mail';
		}
		
		// Create menu items for Mail Menu (Root item)
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items.getRecord(_menuFs.nav_menu_to_nav_menu_items.newRecord());
		_menuItemRec.description = 'Mail';
		_menuItemRec.sort_order = 1;
		_menuItemRec.menuitem_type = 'R';
		_menuItemRec.menuitem_image = 'mail.png';
		_parent = _menuItemRec.menu_item_id;
		
		// Create Inbox item in tree
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items.getRecord(_menuFs.nav_menu_to_nav_menu_items.newRecord());
		_menuItemRec.sort_order = 2;
		_menuItemRec.menuitem_type = 'P';
		_menuItemRec.program_name = 'svy_mail';
		_menuItemRec.parent_id = _parent;
		
		// Create Outbox item in tree
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items.getRecord(_menuFs.nav_menu_to_nav_menu_items.newRecord());
		_menuItemRec.sort_order = 3;
		_menuItemRec.menuitem_type = 'P';
		_menuItemRec.program_name = 'svy_mail_outbox';
		_menuItemRec.parent_id = _parent;
		
		// Create Settings item in tree
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items.getRecord(_menuFs.nav_menu_to_nav_menu_items.newRecord());
		_menuItemRec.sort_order = 4;
		_menuItemRec.menuitem_type = 'P';
		_menuItemRec.program_name = 'svy_mail_settings';
		_menuItemRec.parent_id = _parent;
		
		// Create Templates item in tree
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items.getRecord(_menuFs.nav_menu_to_nav_menu_items.newRecord());
		_menuItemRec.sort_order = 5;
		_menuItemRec.menuitem_type = 'P';
		_menuItemRec.program_name = 'svy_mail_templates';
		_menuItemRec.parent_id = _parent;
		
		// Assign key to program
		_navKeyRec = _programFs.nav_program_to_nav_navigation_keys$key_program.getRecord(_programFs.nav_program_to_nav_navigation_keys$key_program.newRecord());
		
		_navKeyRec.code = 'program';
		_navKeyRec.program_name = 'svy_mail';
		_navKeyRec.solution_name = 'sampleuse_navigation';
		_navKeyRec.security_key_id = globals.svy_cnv_securityKey('sampleuse_navigation menu');
	}
	
	// Create program, tabs and menu items for OUTBOX
	if (_programFs.find()) {
		_programFs.program_name = 'svy_mail_outbox';
		_programFs.search();
	}
	
	if (!databaseManager.hasRecords(_programFs))  {
	
		// Create new program for mail module
		_programFs.newRecord();
		_programFs.program_name = 'svy_mail_outbox';
		_programFs.base_form_name = 'svy_mail';
		_programFs.sort_value = 'receive_date desc';
		_programFs.description = 'Outbox';
		_programFs.display_field_header = 'subject';
		_programFs.table_name = 'nav_mail';
		_programFs.server_name = 'svy_framework';
		_programFs.program_image = 'outbox.png';
		_programFs.form_name = 'svy_mail_tbl';
		_programFs.startup_view = 3;
		_programFs.divider_height = 350;
		_programFs.form_object = [[1,"detail","svy_mail_dtl",1],[2,"table","svy_mail_tbl",1]]
		_programFs.template_object = [[1,"detail",0,0],[2,"detail/tab",0,0],[3,"table/tab",1,1],[4,"table",1,1]];
		
		// Create tabs
		if (!_programFs.nav_program_to_nav_programtabs)
			return;
		
		_tabsRec = _programFs.nav_program_to_nav_programtabs.getRecord(_programFs.nav_program_to_nav_programtabs.newRecord());
		_tabsRec.form_type = 0;
		_tabsRec.program_name = 'svy_mail_outbox';
		_tabsRec.target_program_name = 'svy_mail_outbox';
		_tabsRec.display_description = 'Details';
		_tabsRec.description = 'Details';
		
		// Assign key to program
		_navKeyRec = _programFs.nav_program_to_nav_navigation_keys$key_program.getRecord(_programFs.nav_program_to_nav_navigation_keys$key_program.newRecord());
		
		_navKeyRec.code = 'program';
		_navKeyRec.program_name = 'svy_mail_outbox';
		_navKeyRec.solution_name = 'sampleuse_navigation';
		_navKeyRec.security_key_id = globals.svy_cnv_securityKey('sampleuse_navigation menu');
	}
	
	
	// Configure Mail settings Program
	if (_programFs.find()) {
		_programFs.program_name = 'svy_mail_settings';
		_programFs.search();
	}
	
	if (!databaseManager.hasRecords(_programFs))  {
		
		// Create new program for mail module
		_programFs.newRecord();
		_programFs.program_name = 'svy_mail_settings';
		_programFs.base_form_name = 'svy_mail_settings';
		_programFs.sort_value = 'is_primary desc';
		_programFs.description = 'Settings';
		_programFs.display_field_header = 'settings_name';
		_programFs.table_name = 'nav_mail_settings';
		_programFs.server_name = 'svy_framework';
		_programFs.program_image = 'tool.png';
		_programFs.form_name = 'svy_mail_settings_tbl';
		_programFs.startup_view = 3;
		_programFs.divider_height = 350;
		_programFs.form_object = [[1,"detail","svy_mail_settings_dtl",1],[2,"table","svy_mail_settings_tbl",1]]
		_programFs.template_object = [[1,"detail",0,0],[2,"detail/tab",0,0],[3,"table/tab",1,0],[4,"table",1,0]];
		_programFs.btn_edit = 0;
		_programFs.btn_delete = 0;
		
		// Create tabs
		if (!_programFs.nav_program_to_nav_programtabs)
			return;
		
		_tabsRec = _programFs.nav_program_to_nav_programtabs.getRecord(_programFs.nav_program_to_nav_programtabs.newRecord());
		_tabsRec.form_type = 0;
		_tabsRec.program_name = 'svy_mail_settings';
		_tabsRec.target_program_name = 'svy_mail_settings';
		_tabsRec.display_description = 'Details';
		_tabsRec.description = 'Details';
		_tabsRec.update_mode = 1;
		_tabsRec.delete_mode = 1;
		_tabsRec.tab_sequence = 1;
		_tabsRec.add_mode = 0;
		_tabsRec.edit_on_tab = 1;
		_tabsRec.solution_name = 'sampleuse_navigation';
		
		// Assign key to program
		_navKeyRec = _programFs.nav_program_to_nav_navigation_keys$key_program.getRecord(_programFs.nav_program_to_nav_navigation_keys$key_program.newRecord());
		
		_navKeyRec.code = 'program';
		_navKeyRec.program_name = 'svy_mail_settings';
		_navKeyRec.solution_name = 'sampleuse_navigation';
		_navKeyRec.security_key_id = globals.svy_cnv_securityKey('sampleuse_navigation menu');
	}
	
	// Configure Mail Templates Program
	if (_programFs.find()) {
		_programFs.program_name = 'svy_mail_templates';
		_programFs.search();
	}
	
	if (!databaseManager.hasRecords(_programFs))  {
		
		// Create new program for mail module
		_programFs.newRecord();
		_programFs.program_name = 'svy_mail_templates';
		_programFs.base_form_name = 'svy_mail_templates';
		_programFs.sort_value = 'log_creation_date asc';
		_programFs.description = 'Templates';
		_programFs.display_field_header = 'subject';
		_programFs.table_name = 'nav_mail_templates';
		_programFs.server_name = 'svy_framework';
		_programFs.program_image = 'template.png';
		_programFs.form_name = 'svy_mail_templates_tbl';
		_programFs.startup_view = 3;
		_programFs.divider_height = 350;
		_programFs.form_object = [[1,"detail","svy_mail_templates_dtl",1],[2,"table","svy_mail_templates_tbl",1]]
		_programFs.template_object = [[1,"detail",0,0],[2,"detail/tab",0,0],[3,"table/tab",1,0],[4,"table",1,0]];
		_programFs.btn_edit = 0;
		_programFs.btn_delete = 0;
		
		// Create tabs
		if (!_programFs.nav_program_to_nav_programtabs)
			return;
		
		_tabsRec = _programFs.nav_program_to_nav_programtabs.getRecord(_programFs.nav_program_to_nav_programtabs.newRecord());
		_tabsRec.form_type = 0;
		_tabsRec.program_name = 'svy_mail_templates';
		_tabsRec.target_program_name = 'svy_mail_templates';
		_tabsRec.display_description = 'Template Details';
		_tabsRec.description = 'Template Details';
		_tabsRec.update_mode = 1;
		_tabsRec.delete_mode = 1;
		_tabsRec.tab_sequence = 1;
		_tabsRec.add_mode = 0;
		_tabsRec.edit_on_tab = 1;
		_tabsRec.solution_name = 'sampleuse_navigation';
		
		// Assign key to program
		_navKeyRec = _programFs.nav_program_to_nav_navigation_keys$key_program.getRecord(_programFs.nav_program_to_nav_navigation_keys$key_program.newRecord());
		
		_navKeyRec.code = 'program';
		_navKeyRec.program_name = 'svy_mail_templates';
		_navKeyRec.solution_name = 'sampleuse_navigation';
		_navKeyRec.security_key_id = globals.svy_cnv_securityKey('sampleuse_navigation menu');
	}
	
	
	// Configure Mail Mailings Program
	if (_programFs.find()) {
		_programFs.program_name = 'svy_mail_mailings';
		_programFs.search();
	}
	
	if (!databaseManager.hasRecords(_programFs))  {
		
		// Create new program for mail module
		_programFs.newRecord();
		_programFs.program_name = 'svy_mail_mailings';
		_programFs.base_form_name = 'svy_mail_mailings';
		_programFs.sort_value = 'mailing_id asc';
		_programFs.description = 'Mailings';
		_programFs.display_field_header = 'name';
		_programFs.table_name = 'nav_mail_mailings';
		_programFs.server_name = 'svy_framework';
		_programFs.program_image = 'mail_merge.png';
		_programFs.form_name = 'svy_mail_mailings_tbl';
		_programFs.startup_view = 3;
		_programFs.divider_height = 350;
		_programFs.form_object = [[1,"detail","svy_mail_mailings_dtl",1],[2,"table","svy_mail_mailings_tbl",1]]
		_programFs.template_object = [[1,"detail",0,0],[2,"detail/tab",0,0],[3,"table/tab",1,0],[4,"table",1,0]];
		_programFs.btn_edit = 0;
		_programFs.btn_delete = 0;
		
		// Create tabs
		if (!_programFs.nav_program_to_nav_programtabs)
			return;
		
		_tabsRec = _programFs.nav_program_to_nav_programtabs.getRecord(_programFs.nav_program_to_nav_programtabs.newRecord());
		_tabsRec.form_type = 0;
		_tabsRec.program_name = 'svy_mail_mailings';
		_tabsRec.target_program_name = 'svy_mail_mailings';
		_tabsRec.display_description = 'Mailing Details';
		_tabsRec.description = 'Mailing Details';
		_tabsRec.update_mode = 1;
		_tabsRec.delete_mode = 1;
		_tabsRec.tab_sequence = 1;
		_tabsRec.add_mode = 0;
		_tabsRec.edit_on_tab = 1;
		_tabsRec.solution_name = 'sampleuse_navigation';
		
		// Assign key to program
		_navKeyRec = _programFs.nav_program_to_nav_navigation_keys$key_program.getRecord(_programFs.nav_program_to_nav_navigation_keys$key_program.newRecord());
		
		_navKeyRec.code = 'program';
		_navKeyRec.program_name = 'svy_mail_mailings';
		_navKeyRec.solution_name = 'sampleuse_navigation';
		_navKeyRec.security_key_id = globals.svy_cnv_securityKey('sampleuse_navigation menu');
		
		// Create root menu item "Mail"
		_menuFs = databaseManager.getFoundSet('svy_framework', 'nav_menu');
		
		_menuFs.find();
		_menuFs.name = 'sampleuse navigation';
		_menuFs.search();
		
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items;
		if (_menuItemRec.find()) {
			_menuItemRec.description = 'Mail';
			_menuItemRec.search();
		}
		_parent = _menuItemRec.menu_item_id;
		
		// Create Mailings item in tree
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items.getRecord(_menuFs.nav_menu_to_nav_menu_items.newRecord());
		_menuItemRec.sort_order = 6;
		_menuItemRec.menuitem_type = 'P';
		_menuItemRec.program_name = 'svy_mail_mailings';
		_menuItemRec.parent_id = _parent;
		
		application.output('Mailing program created in configurator.');
	}	
	
	
	// Configure Mail Query Program
	if (_programFs.find()) {
		_programFs.program_name = 'svy_mail_queries';
		_programFs.search();
	}
	
	if (!databaseManager.hasRecords(_programFs))  {
		
		// Create new program for mail module
		_programFs.newRecord();
		_programFs.program_name = 'svy_mail_queries';
		_programFs.base_form_name = 'svy_mail_queries';
		_programFs.sort_value = 'mailing_id asc';
		_programFs.description = 'Queries';
		_programFs.display_field_header = 'name';
		_programFs.table_name = 'nav_mail_queries';
		_programFs.server_name = 'svy_framework';
		_programFs.program_image = 'query.png';
		_programFs.form_name = 'svy_mail_queries_tbl';
		_programFs.startup_view = 3;
		_programFs.divider_height = 350;
		_programFs.form_object = [[1,"detail","svy_mail_queries_dtl",1],[2,"table","svy_mail_queries_tbl",1]]
		_programFs.template_object = [[1,"detail",0,0],[2,"detail/tab",0,0],[3,"table/tab",1,0],[4,"table",1,0]];
		_programFs.btn_edit = 0;
		_programFs.btn_delete = 0;
		
		// Create tabs
		if (!_programFs.nav_program_to_nav_programtabs)
			return;
		
		_tabsRec = _programFs.nav_program_to_nav_programtabs.getRecord(_programFs.nav_program_to_nav_programtabs.newRecord());
		_tabsRec.form_type = 0;
		_tabsRec.program_name = 'svy_mail_queries';
		_tabsRec.target_program_name = 'svy_mail_queries';
		_tabsRec.display_description = 'Query Details';
		_tabsRec.description = 'Query Details';
		_tabsRec.update_mode = 1;
		_tabsRec.delete_mode = 1;
		_tabsRec.tab_sequence = 1;
		_tabsRec.add_mode = 0;
		_tabsRec.edit_on_tab = 1;
		_tabsRec.solution_name = 'sampleuse_navigation';
		
		// Assign key to program
		_navKeyRec = _programFs.nav_program_to_nav_navigation_keys$key_program.getRecord(_programFs.nav_program_to_nav_navigation_keys$key_program.newRecord());
		
		_navKeyRec.code = 'program';
		_navKeyRec.program_name = 'svy_mail_queries';
		_navKeyRec.solution_name = 'sampleuse_navigation';
		_navKeyRec.security_key_id = globals.svy_cnv_securityKey('sampleuse_navigation menu');
		
		// Create root menu item "Mail"
		_menuFs = databaseManager.getFoundSet('svy_framework', 'nav_menu');
		
		_menuFs.find();
		_menuFs.name = 'sampleuse navigation';
		_menuFs.search();
		
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items;
		if (_menuItemRec.find()) {
			_menuItemRec.description = 'Mail';
			_menuItemRec.search();
		}
		_parent = _menuItemRec.menu_item_id;
		
		// Create Mailings item in tree
		_menuItemRec = _menuFs.nav_menu_to_nav_menu_items.getRecord(_menuFs.nav_menu_to_nav_menu_items.newRecord());
		_menuItemRec.sort_order = 7;
		_menuItemRec.menuitem_type = 'P';
		_menuItemRec.program_name = 'svy_mail_queries';
		_menuItemRec.parent_id = _parent;
		
		application.output('Queries Program created in configurator.')
	}	
}

/**
 * Method to convert all the table PK's to UUID
 * 
 * @properties={typeid:24,uuid:"836D971E-0F93-402D-9EB6-F43AF4DEE6C6"}
 */
function svy_cnv_pkToUUID() {
	// Method to convert all the table PK's to UUID
	
	if (application.getVersion() == '6.0.0' || utils.stringToNumber(application.getVersion().split('.')[0]) < 6) {
		application.output('Not compartible with 6.0.0. required a Servoy version greater than 6.0.0');
		return;
	}

	var _server = 'svy_framework';
	
	try {
	
		if (!plugins.maintenance.isInMaintenanceMode())
			plugins.maintenance.setMaintenanceMode(true);				
					
		var _jsServer = plugins.maintenance.getServer(_server);
		var _tables = _jsServer.getTableNames();
		for (var _i = 0 ; _i < _tables.length; _i++) {											// loop through Tables
			
			var _table = _tables[_i];
			
			if ( //_table.indexOf('doc_') > -1 && 
					(_table == 'table1' || _table == 'doc_documentZZZ'|| _table == 'doc_folderZZZ') && 
					_table != 'i18n_messages' && _table != 'log'&& _table != 'nav_program') 															// Restricted to certain tables for testing
			{	
				
				application.output(_table +": primary")
				var _jsTableobj = _jsServer.getTable(_table);
				var _rowIdentifiers = _jsTableobj.getRowIdentifierColumnNames();
				
				var _j = 0;
				var _jsOldIdColumn = _jsTableobj.getColumn(_rowIdentifiers[_j]);
				
				// Table already converted
				if (_table && _jsServer.getTable(_table).getColumn(_jsOldIdColumn.getSQLName()).getType() == JSColumn.TEXT &&
						_jsServer.getTable(_table).getColumn(_jsOldIdColumn.getSQLName()).hasFlag(JSColumn.UUID_COLUMN)) {
					continue;
				}
				
				// Create new primary key column
				var _jsNewIdColumn = _jsTableobj.createNewColumn(_jsOldIdColumn.getSQLName() + '2', JSColumn.TEXT, 50);
				if (_jsNewIdColumn) {
					_jsNewIdColumn.setFlag(JSColumn.UUID_COLUMN, true);
					_jsNewIdColumn.sequenceType = JSColumn.UUID_GENERATOR;
					_jsNewIdColumn.allowNull = false;
				}
				else
					continue

				_jsServer.synchronizeWithDB(_jsTableobj);
				plugins.rawSQL.flushAllClientsCache(_server, _jsTableobj.getSQLName());
				
				/*** Fill Primary key field with UUID Data */
				var _fs = databaseManager.getFoundSet(_server, _table);						
				/** @type {JSRecord} */
				var _rec = null;
				_fs.loadAllRecords();
				for (var _m = 1; _m <= _fs.getSize(); _m++) {
					_rec = _fs.getRecord(_m);
//					_fs.setSelectedIndex(_m);
//					_fs.setDataProviderValue(_jsNewIdColumn.getSQLName(), application.getUUID())
					_rec[_jsNewIdColumn.getSQLName()] = application.getUUID();
					application.output(_rec[_jsNewIdColumn.getSQLName()])
				}
				databaseManager.saveData(_fs);
				
				
				
				
				
				var _jsRelations = solutionModel.getRelations(_server, _table);
				for (var _k = 0 ; _k < _jsRelations.length ; _k++) {							// Loop through relations of the table

					var _jsRelation = _jsRelations[_k];
					var _jsRelationItems = _jsRelation.getRelationItems();
					var _primaryColName = _rowIdentifiers[_j];
					var _foreignColName = null;
					var _foreignTableName = _jsRelations[_k].foreignDataSource.split('/')[2];
					
					for (var _l = 0 ; _l < _jsRelationItems.length ; _l++) {					// loop through the relation items
					
						if (_jsRelationItems[_l].primaryDataProviderID == _primaryColName) {	// The relation item is using the primary key
							
							// Relation is using the old Primary key
							_foreignColName = _jsRelationItems[_l].foreignColumnName;
							
							// When foreign column is already converted
							if (_foreignColName && _jsServer.getTable(_foreignTableName).getColumn(_foreignColName).getType() == JSColumn.TEXT &&
									_jsServer.getTable(_foreignTableName).getColumn(_foreignColName).hasFlag(JSColumn.UUID_COLUMN)) {
								continue
							}
							
							if (_foreignColName && _foreignTableName) {
								// Set the foreign column type to text
								
								if (_foreignColName.indexOf('2') == -1) {
									var _col = _jsServer.getTable(_foreignTableName).createNewColumn(_foreignColName + '2', JSColumn.TEXT, 50);
									if (_col) 
										_col.setFlag(JSColumn.UUID_COLUMN, true);

									_jsServer.synchronizeWithDB(_jsServer.getTable(_foreignTableName));
								}
								
								/*** Fill Foreign key field with UUID Data from primary data provider */
								_fs = databaseManager.getFoundSet(_server, _table);
								_fs.loadAllRecords();
								for (_m = 1; _m <= _fs.getSize(); _m++) {
									_rec = _fs.getRecord(_m);
									/** @type {JSFoundset} */
									var _relFs = _rec[_jsRelation.name];
									_relFs.loadAllRecords();
									
									var _fsUpdater = databaseManager.getFoundSetUpdater(_relFs);_foreignColName + '2';
									_fsUpdater.setColumn(_foreignColName + '2', _rec[_jsOldIdColumn.getSQLName() + '2']);
									application.output(_fsUpdater.performUpdate());
								}
								
								databaseManager.saveData(_fs);
								
								
								if (databaseManager.getDatabaseProductName(_server) == 'postgresql') {
										
									var _sql1 = 'ALTER TABLE ' + _foreignTableName + ' DROP COLUMN ' + _foreignColName + '; ' +
										'ALTER TABLE ' + _foreignTableName + ' RENAME ' + _foreignColName + '2' + '  TO ' + _foreignColName + ';'
								}
							
								/**** Remove old field and rename new field to old name for foreign table*/										
								if (plugins.rawSQL.executeSQL(_server, _foreignTableName, _sql1, null)) {						
									plugins.rawSQL.flushAllClientsCache(_server, _foreignTableName);
									application.output('Removed and renamed field in ' + _foreignTableName)
								}
							}
						}
					}
				}
				
				if (databaseManager.getDatabaseProductName(_server) == 'postgresql') {
					_sql1 = 'ALTER TABLE ' + _table + ' DROP COLUMN ' + _jsOldIdColumn.getSQLName() + '; ' +
					'ALTER TABLE ' + _table + ' RENAME ' + _jsOldIdColumn.getSQLName() + '2' + '  TO ' + _jsOldIdColumn.getSQLName() + ';'
				}
				/**** Remove old field and rename new field to old name for SOurce table*/										
				if (plugins.rawSQL.executeSQL(_server, _table, _sql1, null)) {
					plugins.rawSQL.flushAllClientsCache(_server, _table);
					application.output('Removed and renamed field in ' + _table)
				}
				
				// make the Column as Primary field
				_jsNewIdColumn.setFlag(JSColumn.PK_COLUMN, true);
				_jsServer.synchronizeWithDB(_jsTableobj);
			}
		}
	}
	catch (ex) {
		application.output('Exception************************************************************');
		application.output(ex)
	}
	finally {
		plugins.maintenance.setMaintenanceMode(false);	
		application.output('Conversion completed. Please restart application');
	}
}

/**
 * @properties={typeid:24,uuid:"3D20582B-9245-4800-8260-B49693DEF0FD"}
 * @AllowToRunInFind
 */
function svy_cnv_setUpDocumentManagement() {
	
	var _tabsRec = null;
	var _navKeyRec = null;
	
	/** @type {JSFoundSet<db:/svy_framework/nav_program>} */
	var _programFs = databaseManager.getFoundSet('svy_framework', 'nav_program');
	
	if (_programFs.find()) {
		_programFs.program_name = 'svy_documents';
		_programFs.search();
	}
	
	// Create svy_documents program
	if (!databaseManager.hasRecords(_programFs))  {
	
		// Create new program for mail module
		_programFs.newRecord();
		_programFs.program_name = 'svy_documents';
		_programFs.base_form_name = 'svy_doc_documents';
		_programFs.sort_value = 'doc_document_id asc';
		_programFs.description = 'Documents';
		_programFs.display_field_header = 'name';
		_programFs.table_name = 'doc_document';
		_programFs.server_name = 'svy_framework';
		_programFs.program_image = 'inbox.png';
		_programFs.form_name = 'svy_doc_documents_tbl';
		_programFs.startup_view = 0;
		_programFs.divider_height = 350;
		_programFs.form_object = [[1,"detail","svy_doc_documents_dtl",1],[2,"table","svy_doc_documents_tbl",1]]
		_programFs.template_object = [[1,"detail",0,0],[2,"detail/tab",0,0],[3,"table/tab",0,0],[4,"table",1,1]];
		_programFs.btn_method = 1;
		_programFs.btn_print = 1;
		_programFs.btn_search = 0;
		_programFs.btn_search_prop = 0;
		_programFs.btn_sort = 1;
		_programFs.btn_all_records = 1;
		_programFs.btn_rec_nav = 1;
		_programFs.btn_new = 1;
		_programFs.btn_delete = 1;
		_programFs.btn_edit = 1;
		_programFs.btn_duplicate = 1;
		_programFs.btn_export =  1;
		_programFs.btn_resettblheader = 1;
		_programFs.btn_help = 1;
		_programFs.btn_record_information = 1;	
		_programFs.btn_required_fields = 1;
		_programFs.btn_lookup_new = 1;
		_programFs.btn_lookup_show = 1;
		_programFs.solution_name = 'sampleuse_navigation';
		
		// Create tabs
		if (!_programFs.nav_program_to_nav_programtabs)
			return;
		
		// Create Document details tab
		_tabsRec = _programFs.nav_program_to_nav_programtabs.getRecord(_programFs.nav_program_to_nav_programtabs.newRecord());
		_tabsRec.form_type = 0;
		_tabsRec.program_name = 'svy_documents';
		_tabsRec.target_program_name = 'svy_documents';
		_tabsRec.display_description = 'Document Details';
		_tabsRec.description = 'Document Details';
		_tabsRec.update_mode = 1;
		_tabsRec.tab_sequence = 1;
		_tabsRec.edit_on_tab = 1;
		_tabsRec.solution_name = 'sampleuse_navigation';
		
		// Create Revision details tab
		_tabsRec = _programFs.nav_program_to_nav_programtabs.getRecord(_programFs.nav_program_to_nav_programtabs.newRecord());
		_tabsRec.form_type = 0;
		_tabsRec.program_name = 'svy_documents';
		_tabsRec.target_program_name = 'svy_doc_revision';
		_tabsRec.display_description = 'Revisions & Preview';
		_tabsRec.description = 'Revisions & Preview';
		_tabsRec.update_mode = 1;
		_tabsRec.tab_sequence = 2;
		_tabsRec.edit_on_tab = 1;
		_tabsRec.delete_mode = 1;
		_tabsRec.solution_name = 'sampleuse_navigation';
		
		
		// Assign key to program
		_navKeyRec = _programFs.nav_program_to_nav_navigation_keys$key_program.getRecord(_programFs.nav_program_to_nav_navigation_keys$key_program.newRecord());
		
		_navKeyRec.code = 'program';
		_navKeyRec.program_name = 'svy_documents';
		_navKeyRec.solution_name = 'sampleuse_navigation';
		_navKeyRec.security_key_id = globals.svy_cnv_securityKey('sampleuse_navigation menu');
	}
	
	
	if (_programFs.find()) {
		_programFs.program_name = 'svy_doc_revision';
		_programFs.search();
	}
	
	// Create svy_doc_revision program
	if (!databaseManager.hasRecords(_programFs))  {
	
		// Create new program for mail module
		_programFs.newRecord();
		_programFs.program_name = 'svy_doc_revision';
		_programFs.base_form_name = 'svy_doc_revision';
		_programFs.sort_value = 'revision_datetime asc';
		_programFs.description = 'Revisions';
		_programFs.display_field_header = '';
		_programFs.table_name = 'doc_revision';
		_programFs.server_name = 'svy_framework';
		_programFs.program_image = 'inbox.png';
		_programFs.form_name = 'svy_doc_revision_tbl';
		_programFs.startup_view = 0;
		_programFs.divider_height = 350;
		_programFs.form_object = [[1,"detail","svy_doc_revision_dtl",1],[2,"table","svy_doc_revision_tbl",1]]
		_programFs.template_object = [[1,"detail",0,0],[2,"detail/tab",0,0],[3,"table/tab",0,0],[4,"table",0,0]];
		_programFs.btn_method = 1;
		_programFs.btn_print = 1;
		_programFs.btn_search = 1;
		_programFs.btn_search_prop = 1;
		_programFs.btn_sort = 1;
		_programFs.btn_all_records = 1;
		_programFs.btn_rec_nav = 1;
		_programFs.btn_new = 1;
		_programFs.btn_delete = 1;
		_programFs.btn_edit = 1;
		_programFs.btn_duplicate = 1;
		_programFs.btn_export =  1;
		_programFs.btn_resettblheader = 1;
		_programFs.btn_help = 1;
		_programFs.btn_record_information = 1;	
		_programFs.btn_required_fields = 1;
		_programFs.btn_lookup_new = 1;
		_programFs.btn_lookup_show = 1;
		_programFs.solution_name = 'sampleuse_navigation';
		
		
		// Assign key to program
		_navKeyRec = _programFs.nav_program_to_nav_navigation_keys$key_program.getRecord(_programFs.nav_program_to_nav_navigation_keys$key_program.newRecord());
		
		_navKeyRec.code = 'program';
		_navKeyRec.program_name = 'svy_doc_revision';
		_navKeyRec.solution_name = 'sampleuse_navigation';
		_navKeyRec.security_key_id = globals.svy_cnv_securityKey('sampleuse_navigation menu');
	}
	
	application.output('Document management Module is created in Framework.');
}

/**
 * 
 * @param {String} _keyName Name of the security key
 * @return {Number} Security key id
 *
 * @properties={typeid:24,uuid:"A8AF6E96-B381-47BA-A835-B473C76444D9"}
 * @AllowToRunInFind
 */
function svy_cnv_securityKey(_keyName) {
	
	/** @type {JSFoundSet<db:/svy_framework/sec_security_key>} */
	var _secKeyFs = null;
	
	_secKeyFs = databaseManager.getFoundSet('db:/svy_framework/sec_security_key');
	if (_secKeyFs.find()) {
		_secKeyFs.name = _keyName;
		_secKeyFs.search();
		
		return databaseManager.hasRecords(_secKeyFs) ? _secKeyFs.security_key_id : null;
	}
	
	return null;
}

/**
 *
 * @properties={typeid:24,uuid:"46A74EF1-A028-4EA1-9891-295EDAA079EA"}
 */
function svy_cnv_convertNavHelp() {
	// Method to convert the field "title" in nav_help to "help_title"
	
	if (application.getVersion() == '6.0.0' || utils.stringToNumber(application.getVersion().split('.')[0]) < 6) {
		application.output('Not compartible with 6.0.0. required a Servoy version greater than 6.0.0');
		return;
	}
	
	var _server = 'svy_framework';
	var _tableName = 'nav_help';
	
	try {
	
		if (!plugins.maintenance.isInMaintenanceMode())
			plugins.maintenance.setMaintenanceMode(true);	
		
		var _jsServer = plugins.maintenance.getServer(_server);
		var _table = _jsServer.getTable(_tableName);		
		_table.createNewColumn('help_title', JSColumn.TEXT, 50);
		_jsServer.synchronizeWithDB(_table);		
		
		var _helpFs = databaseManager.getFoundSet('db:/svy_framework/nav_help');
		_helpFs.loadAllRecords();
		
		for (var _i = 1; _i <= _helpFs.getSize(); _i++ ) {
			var _helpRec = _helpFs.getRecord(_i);
			
//			_helpRec['help_title'] = _helpRec['title'];
			var _sql = 'UPDATE nav_help SET help_title = ? WHERE help_id = ?'
			plugins.rawSQL.executeSQL(_server, _tableName, _sql, [_helpRec['title'], _helpRec['help_id']])
		}	
		
		_table.deleteColumn('title');
		_jsServer.synchronizeWithDB(_table);		
	}
	catch (ex) {
		application.output('Exception************************************************************');
		application.output(ex)
	}
	finally {
		plugins.maintenance.setMaintenanceMode(false);	
		application.output('Conversion completed. Please restart application');
	}
}
