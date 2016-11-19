import Ember from 'ember';
import PaginationPager from 'pagination-pager/components/pagination-pager';

export default PaginationPager.extend({
  classNames: 'component-ui-pager pagination',
  tagName:    'nav',
//  pager:      false, // Always show pager
});
