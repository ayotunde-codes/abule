import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideGallery, setFocusedItem } from '../redux/gallery/action';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.gallery = null;
  }

  componentDidMount() {
    $('BODY').css('overflow', 'hidden');
  }

  componentWillUnmount() {
    $('BODY').css('overflow', 'auto');
  }

  render() {
    const { props, state } = this;

    const { items, focusedIndex } = props.gallery;
    const focusedItem = items[focusedIndex];
    let focusedItemExt = '';
    if (focusedItem.file) {
      [, focusedItemExt] = focusedItem.file.type.split('/');
    } else {
      focusedItemExt = focusedItem.url.split('.');
      focusedItemExt = focusedItemExt[focusedItemExt.length - 1];
    }
    return (
      <div
        id="mediaGallery"
        ref={(e) => {
          this.gallery = e;
        }}
      >
        <div className="main-view" onClick={props.hideGallery}>
          <div className="actions">
            <span className="action canceller icon-cross" />
          </div>
          <div className="screen-container">
            <div className="screen">
              <span
                className={`controller left icon-arrow-left-2${focusedIndex < 1 ? ' hide' : ''}`}
                onClick={(event) => {
                  event.stopPropagation();
                  if (focusedIndex > 0) {
                    this.props.setFocusedItem(focusedIndex - 1);
                  }
                }}
              />
              <div className="roller-container">
                <div className="roller">
                  <div className="item-container">
                    {focusedItem.type === 'video' ? (
                      <video
                        controls
                        autoPlay
                        src={focusedItem.url}
                        className="item"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    ) : (
                      <img
                        alt=""
                        src={focusedItem.url}
                        className="item"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <span
                className={`controller right icon-arrow-right-3${focusedIndex >= items.length - 1 ? ' hide' : ''}`}
                onClick={(event) => {
                  event.stopPropagation();
                  if (focusedIndex < items.length - 1) {
                    this.props.setFocusedItem(focusedIndex + 1);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="previews-container">
          <div className="previews">
            {items.map((item, i) => (
              <div
                className={`preview-item${focusedIndex === i ? ' focused' : ''}`}
                onClick={() => {
                  if (focusedIndex !== i) {
                    this.props.setFocusedItem(i);
                  }
                }}
              >
                {item.type === 'video' ? <video src={item.url} /> : <img src={item.url} alt="" />}
                {item.type === 'video' && <span className="icon play icon-play" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  // readOnly: PropTypes.BOOLEAN,
};

Gallery.defaultProps = {
  // readOnly: false,
};

const mapDispatchToProps = (dispatch) => ({
  hideGallery: () => dispatch(hideGallery()),
  setFocusedItem: (index) => dispatch(setFocusedItem(index)),

});
export default connect(null, mapDispatchToProps)(Gallery);
