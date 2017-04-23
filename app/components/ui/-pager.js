import PaginationPager from "pagination-pager/components/pagination-pager";

export default PaginationPager.extend({
  classNames: 'component-ui-pager is-centered',
  tagName:    'nav',
  countIn:    1,
  countOut:   1
//  pager:      false, // Always show pager
});
