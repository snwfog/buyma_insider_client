import Ember from 'ember';
var empty = Ember.isEmpty;

function isNumber(value) {
  return value === value
    && value !== Infinity
    && value !== -Infinity;
}
export default function numericDecimalRound(number, precision) {
  if (empty(number)) {
    return null;
  } else {
    var transformed = Number(number);
    if (!!precision) {
      transformed = transformed.toFixed(precision);
    }

    return isNumber(transformed) ? transformed : null;
  }
}
