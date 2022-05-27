$(() => {
  $.widget('custom.combobox', {
    _create () {
      this.wrapper = $('<span>')
        .addClass('custom-combobox')
        .insertAfter(this.element);

      this.element.hide();
      this._createAutocomplete();
    },

    _createAutocomplete () {
      const selected = this.element.children(':selected'),
        value = selected.val() ? selected.text() : '';

      this.input = $('<input>')
        .appendTo(this.wrapper)
        .val(value)
        .attr('title', '')
        .attr('id', 'inputTitle')
        .addClass('custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left')
        .autocomplete({
          delay: 0,
          minLength: 0,
          source: this._source.bind(this),
        })
        .tooltip({
          classes: {
            'ui-tooltip': 'ui-state-highlight',
          },
        });

      this._on(this.input, {
        autocompleteselect (event, ui) {
          ui.item.option.selected = true;
          this._trigger('select', event, {
            item: ui.item.option,
          });
        },

        autocompletechange: '_removeIfInvalid',
      });
    },

    _createShowAllButton () {
      let { input } = this,
        wasOpen = false;

      $('<a>')
        .attr('tabIndex', -1)
        .attr('title', 'Show All Items')
        .tooltip()
        .appendTo(this.wrapper)
        .button({
          icons: {
            primary: 'ui-icon-triangle-1-s',
          },
          text: false,
        })
        .removeClass('ui-corner-all')
        .addClass('custom-combobox-toggle ui-corner-right')
        .on('mousedown', () => {
          wasOpen = input.autocomplete('widget').is(':visible');
        })
        .on('click', () => {
          input.trigger('focus');

          // Close if already visible
          if (wasOpen) {
            return;
          }

          // Pass empty string as value to search for, displaying all results
          input.autocomplete('search', '');
        });
    },

    _source (request, response) {
      const matcher = new RegExp(
        $.ui.autocomplete.escapeRegex(request.term),
        'i',
      );
      response(this.element.children('option').map(function () {
        const text = $(this).text();
        if (this.value && (!request.term || matcher.test(text))) return {
          label: text,
          value: text,
          option: this,
        };
      }));
    },

    _removeIfInvalid (event, ui) {
      // Selected an item, nothing to do
      if (ui.item) {
        return;
      }

      // Search for a match (case-insensitive)
      let value = this.input.val(),
        valueLowerCase = value.toLowerCase(),
        valid = false;
      this.element.children('option').each(function () {
        if ($(this).text().toLowerCase() === valueLowerCase) {
          this.selected = valid = true;
          return false;
        }
      });

      // Found a match, nothing to do
      if (valid) {
        return;
      }

      // Remove invalid value
      this.input
        .val('')
        .attr('title', `${value} didn't match any item`)
        .tooltip('open');
      this.element.val('');
      this._delay(function () {
        this.input.tooltip('close').attr('title', '');
      }, 2500);
      this.input.autocomplete('instance').term = '';
    },

    _destroy () {
      this.wrapper.remove();
      this.element.show();
    },
  });

  $('#combobox').combobox();
  $('#toggle').on('click', () => {
    $('#combobox').toggle();
  });
});

(function () {
  'use strict';
  window.addEventListener(
    'load',
    () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      const validation = Array.prototype.filter.call(forms, form => {
        form.addEventListener(
          'submit',
          event => {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          },
          false,
        );
      });
    },
    false,
  );
})();
