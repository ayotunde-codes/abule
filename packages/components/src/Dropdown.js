/* eslint-disable class-methods-use-this */
import React from 'react';
import $ from 'jquery';
import { getCordinates_, isDescendant } from './Fn';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      revealDropdown: false,
      yPos: 'bottom',
      contentStyle: {},
    };

    this.contentId = 'default';
    this.dropdown = null;
    this.revealHandler = null;
    this.dropdownController = null;
    this.dropdownContent = null;
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.positionDropdown = this.positionDropdown.bind(this);
  }

  hideDropdown() {
    // alert('insidde');
    this.setState({
      showDropdown: false,
    });
    // alert('yeye');
    this.props.onClose();
    window.document.body.removeEventListener('click', this.revealHandler);
    window.removeEventListener('scroll', this.scrollRevealHandler);
    this.revealHandler = null;
    this.scrollRevealHandler = null;
  }

  showDropdown() {
    const { state, props } = this;
    if (!props.readOnly
      && this.dropdownController
      && this.dropdownContent
      && !state.showDropdown
      && !this.revealHandler) {
      this.revealHandler = (event) => {
        if (!isDescendant(event.target, this.dropdownContent)) {
          this.hideDropdown();
        }
      };

      this.revealHandler = (event) => {
        if (!event || !isDescendant(event.target, this.dropdownContent)) {
          this.hideDropdown();
        }
      };

      this.setState({
        showDropdown: true,
        revealDropdown: false,
      }, () => {
        // fit content properly on screen
        this.positionDropdown();
        props.onShow();
        window.document.body.addEventListener('click', this.revealHandler);
        this.scrollRevealHandler = () => {
          if (window.screen.width > process.env.MOBILE_BREAKPOINT) {
            if (this.revealHandler) {
              this.revealHandler();
            }
          }
        };

        window.document.body.addEventListener('click', this.revealHandler);
        if (window.screen.width > process.env.MOBILE_BREAKPOINT) {
          window.addEventListener('scroll', this.scrollRevealHandler);
        }
      });
    }
  }

  positionDropdown() {
    const { props } = this;
    const ContentCord = getCordinates_(this.dropdownContent);
    const contentWidth = $(this.dropdownContent).outerWidth();
    const contentHeight = $(this.dropdownContent).outerHeight();
    ContentCord.right = ContentCord.left + contentWidth;
    ContentCord.bottom = ContentCord.top + contentHeight;
    ContentCord.width = contentWidth;
    ContentCord.height = contentHeight;

    const ControllerCord = getCordinates_(this.dropdownController);
    const controllerWidth = $(this.dropdownController).outerWidth();
    const controllerHeight = $(this.dropdownController).outerHeight();
    ControllerCord.right = ControllerCord.left + controllerWidth;

    $('body').css('overflow-x', 'hidden');
    const pageContentPadding = (window.innerWidth - $('#PageWidthGetter').outerWidth()) / 2;
    // const pageContentWidth = window.innerWidth;
    const pageContentWidth = document.body.clientWidth;
    const pageContentHeight = window.innerHeight;
    // pageContentWidth = $("#PageWidthGetter").innerWidth();
    const contentStyle = {
    };
    let yPos = 'bottom';
    let xPos = 'left';

    const postioning = {
      left: () => {
        xPos = 'left';
        contentStyle.left = ControllerCord.left;
      },
      right: () => {
        xPos = 'right';
        contentStyle.left = 'auto';
        contentStyle.right = pageContentWidth - ControllerCord.right;
      },
      top: () => {
        yPos = 'top';
        contentStyle.top = ControllerCord.top - contentHeight;
      },
      bottom: () => {
        yPos = 'bottom';
        contentStyle.top = ControllerCord.top + controllerHeight;
      },
    };

    if (props.defaultPosition.x === 'auto') {
      if ((ControllerCord.left + contentWidth) > pageContentWidth) {
        postioning.right();
      } else {
        postioning.left();
      }
    } else if (props.defaultPosition.x === 'left') {
      postioning.left();
    } else if (props.defaultPosition.x === 'right') {
      postioning.right();
    }

    if (props.defaultPosition.y === 'auto') {
      if ((ControllerCord.top + controllerHeight + contentHeight) > pageContentHeight) {
        postioning.top();
        if (ControllerCord.top - contentHeight < 10) {
          postioning.left();
          contentStyle.top = 10;
        }
      } else {
        postioning.bottom();
      }
    } else if (props.defaultPosition.y === 'bottom') {
      postioning.bottom();
    } else if (props.defaultPosition.y === 'top') {
      postioning.top();
    }

    this.setState({
      yPos,
      xPos,
      contentStyle,
      revealDropdown: true,
    });
    console.log({
      ContentCord,
      ControllerCord,
      contentHeight,
      contentWidth,
      controllerHeight,
      controllerWidth,
      pageContentWidth,
      pageContentHeight,
    });
  }

  render() {
    const { state, props } = this;
    if (this.dropdown && !state.showDropdown && props.showDropdown) {
      this.showDropdown();
    } else {
      /*  console.log({
        dropdown: this.dropdown,
        showDropdown: state.showDropdown,
        propsShowDrop: props.showDropdown,
      }); */
      // alert('not ok');
    }
    return (
      <div
        className={`hmv-dropdown ${props.className || ''}`}
        ref={(e) => {
          if (e && !this.dropdown) {
            this.dropdown = e;
            props.onLoad(this);
          }
        }}
      >
        <div
          className="hmv-dropdown-cntrl"
          onClick={this.showDropdown}
          ref={(e) => {
            if (e && !this.dropdownController) {
              this.dropdownController = e;
            }

            if (props.contentId !== null) {
              if (this.contentId !== props.contentId && state.showDropdown) {
                // update content positioning
                this.positionDropdown();
              }
              this.contentId = props.contentId;
            }
            // this.props.onLoad
          }}
        >
          {props.controller}
        </div>

        <div
          style={state.contentStyle}
          className={`hmv-dropdown-content${state.showDropdown ? ' show' : ''}${state.revealDropdown ? ' reveal' : ''}${state.yPos === 'top' ? ' position-top' : ''}`}
        >
          <div
            className="hmv-dropdown-content-fg"
            ref={(e) => {
              if (e && !this.dropdownContent) {
                this.dropdownContent = e;
                this.setState({
                  dropdownContent: e,
                });
              }
            }}
          >
            {state.showDropdown && (() => {
              if (typeof props.content === 'function') {
                return props.content({
                  controller: {
                    width: $(this.dropdownController).outerWidth(),
                  },
                });
              }
              return props.content;
            })()}
          </div>
        </div>

      </div>
    );
  }
}

Dropdown.defaultProps = {
  readOnly: false,
  showDropdown: false,
  contentId: null,
  onLoad: () => { },
  onShow: () => { },
  onClose: () => { },
  defaultPosition: {
    y: 'auto',
    x: 'auto',
  },
};

export default Dropdown;
