export default class FieldService {
  static fieldTrimLeft = (str) => {
    return str.replace(/^\s+/g, '');
  };
}
