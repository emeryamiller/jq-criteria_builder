;( function($) {
	jQuery.each(criteria_line_templates, function(name, code) {
		jQuery.template(name, code);
	});

	$.fn.append_criteria_line = function(index, options) {
		var opts = $.extend({}, $.fn.append_criteria_line.defaults, options);


		return this.each(function() {
			$('.context_select').die().live('change', function() {
				var type = $(this).find('option:selected').tmplItem().data.type;
				var $comparitor_select = $(this).next('select');
				$comparitor_select.empty();

				jQuery.tmpl('option', types[type]).appendTo($comparitor_select).change();
			});
			$('.comparitor_select').die().live('change', function() {
				var type = $(this).find('option:selected').tmplItem().data.fields;
				var current_id = $(this).tmplItem().data.id;
				var $fields = $(this).next();
				$fields.empty();

				jQuery.tmpl('field', type, {id: current_id}).appendTo($fields);
				if ( type.length > 1 ) {
					$fields.find('input').each(function(index) {
						$(this).attr('id', $(this).attr('id') + "_" + index);
					});
				}
			});

			var $new_line = jQuery.tmpl('criteria_line', {id: index, context: available_criteria})
			$new_line.dom_attachment_method = opts.attach_method;
			$new_line.dom_attachment_method($(this)).find('select:first').change();
		});
	}


	$.fn.append_criteria_line.defaults = {
		attach_method: $().appendTo
	}
	

	var curr_criteria_index = 0;
	$.fn.add_criteria = function(options) {
		var opts = $.extend({}, $.fn.add_criteria.defaults, options);

		return this.each(function() {
			var $criteria_area = $(this);
			$('input[name^="add_"]').die().live('click', function() {
				$criteria_area.add_criteria();
			});

			$('input[name^="remove_"]').die().live('click', function () {
				$(this).parent().remove();
			});

			curr_criteria_index++;
			var $criteria = jQuery.tmpl('criteria', {id: curr_criteria_index}).appendTo($(this));
			$criteria.append_criteria_line(curr_criteria_index, {attach_method: $().prependTo});
		});
	}

	$.fn.add_criteria.defaults = {
	
	}
})(jQuery);

/* The field criteria_string contains the html for a string field, and critia_date contains the html for the date fields.
 * Each is used accordingly. May need to provide them myself.
 */
var types = {'string': [{name: 'contains', fields: ['string']},
						{name: "doesn't contain", fields: ['string']},
						{name: 'is', fields: ['string']},
						{name: 'is not', fields: ['string']}],
			 'date': [{name: 'is', fields: ['string']},
					 {name: 'is not', fields: ['string']},
				 	 {name: 'is before', fields: ['string']},
			 		 {name: 'is after', fields: ['string']},
			 		 {name: 'is between', fields: ['date', 'date']}]
			};

var available_criteria = [{name: 'text', type: 'string'},
						  {name: 'subject', type: 'string'},
						  {name: 'body', type: 'string'}, 
						  {name: 'attachment name', type: 'string' },
						  {name: 'from', type: 'string' }, 
						  {name: 'to', type: 'string' },
						  {name: 'sent date', type: 'date'}]
