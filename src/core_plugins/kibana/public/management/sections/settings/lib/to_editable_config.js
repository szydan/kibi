import { getValType } from './get_val_type';
import { getEditorType } from './get_editor_type';

/**
 * @param {object} advanced setting definition object
 * @param {object} name of setting
 * @param {object} current value of setting
 * @returns {object} the editable config object
 */
export function toEditableConfig({ def, name, value, isCustom }) {
  if (!def) {
    def = {};
  }
  const conf = {
    name,
    value,
    isCustom,
    readonly: !!def.readonly,
    defVal: def.value,
    type: getValType(def, value),
    description: def.description,
    options: def.options
  };

  const editor = getEditorType(conf);
  conf.json = editor === 'json';
  conf.select = editor === 'select';
  // kibi: 'kibiSelectDashboard' is added
  conf.kibiSelectDashboard = editor === 'kibiSelectDashboard';
  conf.bool = editor === 'boolean';
  conf.array = editor === 'array';
  conf.markdown = editor === 'markdown';
  conf.normal = editor === 'normal';
  conf.tooComplex = !editor;

  // kibi: pretty print JSON values
  if (conf.json && conf.value) {
    conf.value = JSON.stringify(JSON.parse(conf.value), null, ' ');
  }
  // kibi: end

  return conf;
}
