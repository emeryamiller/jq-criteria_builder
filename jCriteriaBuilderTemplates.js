var criteria_line_templates = {'criteria_line': '\
<span id="criteria_${id}" class="criteria_entry">\
	<select id="context_${id}" class="context_select">\
		{{tmpl(context) "option"}}\
	</select>\
	<select id="comparitor_${id}" class="comparitor_select">\
	</select>\
	<span id="fields_${id}" class="criteria_fields">\
	</span>\
</span>',
'option': '<option value="${name}">${name}</option>',
'field': '<input id="criteria_input_${$item.id}" class="input_${$data}" type="text"></input>',
'criteria':'<div id="criteria_wrapper_${id}" class="criteria_wrapper">\
	<input type="button" value="Add" name="add_${id}"></input>\
	<input type="button" value="Remove" name="remove_${id}"></input>\
	</div>'}

