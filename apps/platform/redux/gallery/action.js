export const actionTypes = {
  GALLERY_SET_ITEMS: 'GALLERY_SET_ITEMS',
  GALLERY_HIDE_ITEMS: 'GALLERY_HIDE_ITEMS',
  GALLERY_SET_FOCUSED_ITEM: 'GALLERY_SET_FOCUSED_ITEM',
};

export const setItems = (items, focusedIndex = 0) => ({
  items,
  focusedIndex,
  type: actionTypes.GALLERY_SET_ITEMS,
});
export const setFocusedItem = (index) => ({
  index,
  type: actionTypes.GALLERY_SET_FOCUSED_ITEM,
});

export const hideGallery = () => ({
  type: actionTypes.GALLERY_HIDE_ITEMS,
});
