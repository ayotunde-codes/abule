(window.webpackJsonp = window.webpackJsonp || []).push([[8], {
  '+521': function (t, e, r) {
    t.exports = function (t) { return Object.keys(t).map(((e) => t[e])); };
  },
  '+vfz': function (t, e, r) {
    const n = r('7nmT').unstable_flushControlled; t.exports = n;
  },
  '/2Cm': function (t, e, r) {
    const n = r('tBqf'); t.exports = n;
  },
  '/Cwe': function (t, e, r) {
    const n = r('euSu');
    const i = r('kuaq'); function o(t) { return t == null ? t : String(t); }t.exports = function (t, e) { let r; if (window.getComputedStyle && (r = window.getComputedStyle(t, null))) return o(r.getPropertyValue(i(e))); if (document.defaultView && document.defaultView.getComputedStyle) { if (r = document.defaultView.getComputedStyle(t, null)) return o(r.getPropertyValue(i(e))); if (e === 'display') return 'none'; } return t.currentStyle ? o(e === 'float' ? t.currentStyle.cssFloat || t.currentStyle.styleFloat : t.currentStyle[n(e)]) : o(t.style && t.style[n(e)]); };
  },
  '/L11': function (t, e, r) {
    const n = r('b+nQ');
    const i = r('AL/+');
    const o = r('tI3i'); function a(t, e, r) {
      let a = e.getCharacterList();
      const s = r > 0 ? a.get(r - 1) : void 0;
      const u = r < a.count() ? a.get(r) : void 0;
      const c = s ? s.getEntity() : void 0;
      const l = u ? u.getEntity() : void 0; if (l && l === c && t.__get(l).getMutability() !== 'MUTABLE') { for (var f, p = (function (t, e, r) { let n; return i(t, ((t, e) => t.getEntity() === e.getEntity()), ((t) => t.getEntity() === e), ((t, e) => { t <= r && e >= r && (n = { start: t, end: e }); })), typeof n !== 'object' && o(!1), n; }(a, l, r)), h = p.start, d = p.end; h < d;)f = a.get(h), a = a.set(h, n.applyEntity(f, null)), h++; return e.set('characterList', a); } return e;
    }t.exports = function (t, e) {
      const r = t.getBlockMap();
      const n = t.getEntityMap();
      const i = {};
      const o = e.getStartKey();
      const s = e.getStartOffset();
      const u = r.get(o);
      const c = a(n, u, s); c !== u && (i[o] = c); const l = e.getEndKey();
      const f = e.getEndOffset();
      let p = r.get(l); o === l && (p = c); const h = a(n, p, f); return h !== p && (i[l] = h), Object.keys(i).length ? t.merge({ blockMap: r.merge(i), selectionAfter: e }) : t.set('selectionAfter', e);
    };
  },
  '/LAw': function (t, e, r) {
    function n(t, e) { const r = i.get(t, e); return r === 'auto' || r === 'scroll'; } var i = { get: r('/Cwe'), getScrollParent(t) { if (!t) return null; for (var e = t.ownerDocument; t && t !== e.body;) { if (n(t, 'overflow') || n(t, 'overflowY') || n(t, 'overflowX')) return t; t = t.parentNode; } return e.defaultView || e.parentWindow; } }; t.exports = i;
  },
  '/jhs': function (t, e, r) {
    var n = { isImage(t) { return i(t)[0] === 'image'; }, isJpeg(t) { const e = i(t); return n.isImage(t) && (e[1] === 'jpeg' || e[1] === 'pjpeg'); } }; function i(t) { return t.split('/'); }t.exports = n;
  },
  '0Gcc': function (t, e, r) {
    const n = r('iogJ');
    const i = r('1xkk');
    const o = r('1AUG');
    const a = r('4aXP'); t.exports = function (t) { const e = a(t, ((t) => { const e = t.getSelection(); const r = e.getStartOffset(); if (r === 0) return o(t, 1); const i = e.getStartKey(); const a = t.getCurrentContent().getBlockForKey(i).getText().slice(0, r); const s = n.getBackward(a); return o(t, s.length || 1); }), 'backward'); return e === t.getCurrentContent() ? t : i.push(t, e, 'remove-range'); };
  },
  '0Uhd': function (t, e, r) {
    (function (e) {
      const n = r('maj8'); function i() { return (i = n || function (t) { for (let e = 1; e < arguments.length; e++) { const r = arguments[e]; for (const n in r)Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]); } return t; }).apply(this, arguments); } function o(t) {
        for (let e = 1; e < arguments.length; e++) {
          var r = arguments[e] != null ? arguments[e] : {};
          let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { s(t, e, r[e]); }));
        } return t;
      } function a(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t; } function s(t, e, r) {
        return e in t ? Object.defineProperty(t, e, {
          value: r, enumerable: !0, configurable: !0, writable: !0,
        }) : t[e] = r, t;
      } function u(t, e) { t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e; } const c = r('VUbk');
      const l = r('naKV');
      const f = r('fpFo');
      const p = r('QAfK');
      const h = r('UfDk');
      const d = r('QVkg');
      const g = r('+vfz');
      const y = r('tRbA');
      const v = r('Ea6c');
      const m = r('1xkk');
      const _ = r('ERkP');
      const S = r('O+2R');
      const b = r('/LAw');
      const w = r('rim0');
      const k = r('2Wwg');
      const x = r('YSZ8');
      const C = r('gZn9');
      const E = r('7MNd');
      const O = r('ZUd0');
      const D = r('tI3i');
      const K = r('gUTI');
      const T = r('hF1F');
      const M = w.isBrowser('IE');
      const A = !M;
      const I = {
        edit: d, composite: f, drag: h, cut: null, render: null,
      };
      let B = !1;
      const R = (function (t) { function e() { return t.apply(this, arguments) || this; }u(e, t); const r = e.prototype; return r.render = function () { return null; }, r.componentDidMount = function () { this._update(); }, r.componentDidUpdate = function () { this._update(); }, r._update = function () { const t = this.props.editor; t._latestEditorState = this.props.editorState, t._blockSelectEvents = !0; }, e; }(_.Component));
      const L = (function (t) {
        function r(e) { let r; return s(a(r = t.call(this, e) || this), '_blockSelectEvents', void 0), s(a(r), '_clipboard', void 0), s(a(r), '_handler', void 0), s(a(r), '_dragCount', void 0), s(a(r), '_internalDrag', void 0), s(a(r), '_editorKey', void 0), s(a(r), '_placeholderAccessibilityID', void 0), s(a(r), '_latestEditorState', void 0), s(a(r), '_latestCommittedEditorState', void 0), s(a(r), '_pendingStateFromBeforeInput', void 0), s(a(r), '_onBeforeInput', void 0), s(a(r), '_onBlur', void 0), s(a(r), '_onCharacterData', void 0), s(a(r), '_onCompositionEnd', void 0), s(a(r), '_onCompositionStart', void 0), s(a(r), '_onCopy', void 0), s(a(r), '_onCut', void 0), s(a(r), '_onDragEnd', void 0), s(a(r), '_onDragOver', void 0), s(a(r), '_onDragStart', void 0), s(a(r), '_onDrop', void 0), s(a(r), '_onInput', void 0), s(a(r), '_onFocus', void 0), s(a(r), '_onKeyDown', void 0), s(a(r), '_onKeyPress', void 0), s(a(r), '_onKeyUp', void 0), s(a(r), '_onMouseDown', void 0), s(a(r), '_onMouseUp', void 0), s(a(r), '_onPaste', void 0), s(a(r), '_onSelect', void 0), s(a(r), 'editor', void 0), s(a(r), 'editorContainer', void 0), s(a(r), 'focus', void 0), s(a(r), 'blur', void 0), s(a(r), 'setMode', void 0), s(a(r), 'exitCurrentMode', void 0), s(a(r), 'restoreEditorDOM', void 0), s(a(r), 'setClipboard', void 0), s(a(r), 'getClipboard', void 0), s(a(r), 'getEditorKey', void 0), s(a(r), 'update', void 0), s(a(r), 'onDragEnter', void 0), s(a(r), 'onDragLeave', void 0), s(a(r), '_handleEditorContainerRef', ((t) => { r.editorContainer = t, r.editor = t !== null ? t.firstChild : null; })), s(a(r), 'focus', ((t) => { const e = r.props.editorState; const n = e.getSelection().getHasFocus(); const i = r.editor; if (i) { const o = b.getScrollParent(i); const a = t || E(o); const s = a.x; const u = a.y; K(i) || D(!1), i.focus(), o === window ? window.scrollTo(s, u) : S.setTop(o, u), n || r.update(m.forceSelection(e, e.getSelection())); } })), s(a(r), 'blur', (() => { const t = r.editor; t && (K(t) || D(!1), t.blur()); })), s(a(r), 'setMode', ((t) => { const e = r.props; const n = e.onPaste; const i = e.onCut; const a = e.onCopy; const s = o({}, I.edit); n && (s.onPaste = n), i && (s.onCut = i), a && (s.onCopy = a); const u = o({}, I, { edit: s }); r._handler = u[t]; })), s(a(r), 'exitCurrentMode', (() => { r.setMode('edit'); })), s(a(r), 'restoreEditorDOM', ((t) => { r.setState({ contentsKey: r.state.contentsKey + 1 }, (() => { r.focus(t); })); })), s(a(r), 'setClipboard', ((t) => { r._clipboard = t; })), s(a(r), 'getClipboard', (() => r._clipboard)), s(a(r), 'update', ((t) => { r._latestEditorState = t, r.props.onChange(t); })), s(a(r), 'onDragEnter', (() => { r._dragCount++; })), s(a(r), 'onDragLeave', (() => { r._dragCount--, r._dragCount === 0 && r.exitCurrentMode(); })), r._blockSelectEvents = !1, r._clipboard = null, r._handler = null, r._dragCount = 0, r._editorKey = e.editorKey || x(), r._placeholderAccessibilityID = `placeholder-${r._editorKey}`, r._latestEditorState = e.editorState, r._latestCommittedEditorState = e.editorState, r._onBeforeInput = r._buildHandler('onBeforeInput'), r._onBlur = r._buildHandler('onBlur'), r._onCharacterData = r._buildHandler('onCharacterData'), r._onCompositionEnd = r._buildHandler('onCompositionEnd'), r._onCompositionStart = r._buildHandler('onCompositionStart'), r._onCopy = r._buildHandler('onCopy'), r._onCut = r._buildHandler('onCut'), r._onDragEnd = r._buildHandler('onDragEnd'), r._onDragOver = r._buildHandler('onDragOver'), r._onDragStart = r._buildHandler('onDragStart'), r._onDrop = r._buildHandler('onDrop'), r._onInput = r._buildHandler('onInput'), r._onFocus = r._buildHandler('onFocus'), r._onKeyDown = r._buildHandler('onKeyDown'), r._onKeyPress = r._buildHandler('onKeyPress'), r._onKeyUp = r._buildHandler('onKeyUp'), r._onMouseDown = r._buildHandler('onMouseDown'), r._onMouseUp = r._buildHandler('onMouseUp'), r._onPaste = r._buildHandler('onPaste'), r._onSelect = r._buildHandler('onSelect'), r.getEditorKey = function () { return r._editorKey; }, r.state = { contentsKey: 0 }, r; }u(r, t); const n = r.prototype; return n._buildHandler = function (t) { const e = this; return function (r) { if (!e.props.readOnly) { const n = e._handler && e._handler[t]; n && (g ? g((() => n(e, r))) : n(e, r)); } }; }, n._showPlaceholder = function () { return !!this.props.placeholder && !this.props.editorState.isInCompositionMode() && !this.props.editorState.getCurrentContent().hasText(); }, n._renderPlaceholder = function () {
          if (this._showPlaceholder()) {
            const t = {
              text: T(this.props.placeholder), editorState: this.props.editorState, textAlignment: this.props.textAlignment, accessibilityID: this._placeholderAccessibilityID,
            }; return _.createElement(y, t);
          } return null;
        }, n.render = function () {
          const t = this.props; const e = t.blockRenderMap; const r = t.blockRendererFn; const n = t.blockStyleFn; const a = t.customStyleFn; const s = t.customStyleMap; const u = t.editorState; const c = t.preventScroll; const f = t.readOnly; const h = t.textAlignment; const d = t.textDirectionality; const g = k({
            'DraftEditor/root': !0, 'DraftEditor/alignLeft': h === 'left', 'DraftEditor/alignRight': h === 'right', 'DraftEditor/alignCenter': h === 'center',
          }); const y = this.props.role || 'textbox'; const v = y === 'combobox' ? !!this.props.ariaExpanded : null; const m = {
            blockRenderMap: e, blockRendererFn: r, blockStyleFn: n, customStyleMap: o({}, l, s), customStyleFn: a, editorKey: this._editorKey, editorState: u, preventScroll: c, textDirectionality: d,
          }; return _.createElement('div', { className: g }, this._renderPlaceholder(), _.createElement('div', { className: k('DraftEditor/editorContainer'), ref: this._handleEditorContainerRef }, _.createElement('div', i({
            'aria-activedescendant': f ? null : this.props.ariaActiveDescendantID,
            'aria-autocomplete': f ? null : this.props.ariaAutoComplete,
            'aria-controls': f ? null : this.props.ariaControls,
            'aria-describedby': this.props.ariaDescribedBy || this._placeholderAccessibilityID,
            'aria-expanded': f ? null : v,
            'aria-label': this.props.ariaLabel,
            'aria-labelledby': this.props.ariaLabelledBy,
            'aria-multiline': this.props.ariaMultiline,
            'aria-owns': f ? null : this.props.ariaOwneeID,
            autoCapitalize: this.props.autoCapitalize,
            autoComplete: this.props.autoComplete,
            autoCorrect: this.props.autoCorrect,
            className: k({ notranslate: !f, 'public/DraftEditor/content': !0 }),
            contentEditable: !f,
            'data-testid': this.props.webDriverTestID,
            onBeforeInput: this._onBeforeInput,
            onBlur: this._onBlur,
            onCompositionEnd: this._onCompositionEnd,
            onCompositionStart: this._onCompositionStart,
            onCopy: this._onCopy,
            onCut: this._onCut,
            onDragEnd: this._onDragEnd,
            onDragEnter: this.onDragEnter,
            onDragLeave: this.onDragLeave,
            onDragOver: this._onDragOver,
            onDragStart: this._onDragStart,
            onDrop: this._onDrop,
            onFocus: this._onFocus,
            onInput: this._onInput,
            onKeyDown: this._onKeyDown,
            onKeyPress: this._onKeyPress,
            onKeyUp: this._onKeyUp,
            onMouseUp: this._onMouseUp,
            onPaste: this._onPaste,
            onSelect: this._onSelect,
            ref: this.props.editorRef,
            role: f ? null : y,
            spellCheck: A && this.props.spellCheck,
            style: {
              outline: 'none', userSelect: 'text', WebkitUserSelect: 'text', whiteSpace: 'pre-wrap', wordWrap: 'break-word',
            },
            suppressContentEditableWarning: !0,
            tabIndex: this.props.tabIndex,
          }, this.props.customAttrs), _.createElement(R, { editor: this, editorState: u }), _.createElement(p, i({}, m, { key: `contents${this.state.contentsKey}` })))));
        }, n.componentDidMount = function () { this._blockSelectEvents = !1, !B && O('draft_ods_enabled') && (B = !0, v.initODS()), this.setMode('edit'), M && (this.editor ? this.editor.ownerDocument.execCommand('AutoUrlDetect', !1, !1) : e.execCommand('AutoUrlDetect', !1, !1)); }, n.componentDidUpdate = function () { this._blockSelectEvents = !1, this._latestEditorState = this.props.editorState, this._latestCommittedEditorState = this.props.editorState; }, r;
      }(_.Component)); s(L, 'defaultProps', {
        blockRenderMap: c, blockRendererFn() { return null; }, blockStyleFn() { return ''; }, customAttrs: {}, keyBindingFn: C, readOnly: !1, spellCheck: !1, stripPastedStyles: !1,
      }), t.exports = L;
    }).call(this, r('fRV1'));
  },
  '1+m/': function (t, e, r) {
    const n = r('Ea6c');
    const i = r('Cfxn');
    const o = r('rim0');
    const a = r('iN4q');
    const s = r('2KzS');
    const u = r('vYw2');
    const c = r('tI3i');
    const l = r('13UR');
    const f = o.isBrowser('IE'); function p(t, e) { if (!t) return '[empty]'; const r = (function t(e, r) { const n = void 0 !== r ? r(e) : []; if (e.nodeType === Node.TEXT_NODE) { const i = e.textContent.length; return u(e).createTextNode(`[text ${i}${n.length ? ` | ${n.join(', ')}` : ''}]`); } const o = e.cloneNode(); o.nodeType === 1 && n.length && o.setAttribute('data-labels', n.join(', ')); for (let a = e.childNodes, s = 0; s < a.length; s++)o.appendChild(t(a[s], r)); return o; }(t, e)); return r.nodeType === Node.TEXT_NODE ? r.textContent : (l(r) || c(!1), r.outerHTML); } function h(t, e) { for (let r = t, n = r; r;) { if (l(r) && n.hasAttribute('contenteditable')) return p(r, e); n = r = r.parentNode; } return 'Could not find contentEditable parent of node'; } function d(t) { return t.nodeValue === null ? t.childNodes.length : t.nodeValue.length; } function g(t, e, r, n) {
      const o = s(); if (t.extend && e != null && a(o, e)) {
        r > d(e) && i.logSelectionStateFailure({ anonymizedDom: h(e), extraParams: JSON.stringify({ offset: r }), selectionState: JSON.stringify(n.toJS()) }); const u = e === t.focusNode; try { t.rangeCount > 0 && t.extend && t.extend(e, r); } catch (a) {
          throw i.logSelectionStateFailure({
            anonymizedDom: h(e, ((e) => { const r = []; return e === o && r.push('active element'), e === t.anchorNode && r.push('selection anchor node'), e === t.focusNode && r.push('selection focus node'), r; })),
            extraParams: JSON.stringify({
              activeElementName: o ? o.nodeName : null, nodeIsFocus: e === t.focusNode, nodeWasFocus: u, selectionRangeCount: t.rangeCount, selectionAnchorNodeName: t.anchorNode ? t.anchorNode.nodeName : null, selectionAnchorOffset: t.anchorOffset, selectionFocusNodeName: t.focusNode ? t.focusNode.nodeName : null, selectionFocusOffset: t.focusOffset, message: a ? `${a}` : null, offset: r,
            }, null, 2),
            selectionState: JSON.stringify(n.toJS(), null, 2),
          }), a;
        }
      } else if (e && t.rangeCount > 0) { const c = t.getRangeAt(0); c.setEnd(e, r), t.addRange(c.cloneRange()); }
    } function y(t, e, r, o) { const a = u(e).createRange(); if (r > d(e) && (i.logSelectionStateFailure({ anonymizedDom: h(e), extraParams: JSON.stringify({ offset: r }), selectionState: JSON.stringify(o.toJS()) }), n.handleExtensionCausedError()), a.setStart(e, r), f) try { t.addRange(a); } catch (t) { 0; } else t.addRange(a); }t.exports = { setDraftEditorSelection(t, e, r, n, i) { const o = u(e); if (a(o.documentElement, e)) { const s = o.defaultView.getSelection(); let c = t.getAnchorKey(); let l = t.getAnchorOffset(); let f = t.getFocusKey(); let p = t.getFocusOffset(); let h = t.getIsBackward(); if (!s.extend && h) { const d = c; const v = l; c = f, l = p, f = d, p = v, h = !1; } const m = c === r && n <= l && i >= l; const _ = f === r && n <= p && i >= p; if (m && _) return s.removeAllRanges(), y(s, e, l - n, t), void g(s, e, p - n, t); if (h) { if (_ && (s.removeAllRanges(), y(s, e, p - n, t)), m) { const S = s.focusNode; const b = s.focusOffset; s.removeAllRanges(), y(s, e, l - n, t), g(s, S, b, t); } } else m && (s.removeAllRanges(), y(s, e, l - n, t)), _ && g(s, e, p - n, t); } }, addFocusToSelection: g };
  },
  '13UR': function (t, e, r) {
    t.exports = function (t) { return !(!t || !t.ownerDocument) && t.nodeType === Node.ELEMENT_NODE; };
  },
  '1AUG': function (t, e, r) {
    r('/2Cm'); t.exports = function (t, e) {
      const r = t.getSelection();
      const n = t.getCurrentContent();
      const i = r.getStartKey();
      const o = r.getStartOffset();
      let a = i;
      let s = 0; if (e > o) { const u = n.getKeyBefore(i); if (u == null)a = i; else a = u, s = n.getBlockForKey(u).getText().length; } else s = o - e; return r.merge({ focusKey: a, focusOffset: s, isBackward: !0 });
    };
  },
  '1xkk': function (t, e, r) {
    function n(t) {
      for (let e = 1; e < arguments.length; e++) {
        var r = arguments[e] != null ? arguments[e] : {};
        let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { i(t, e, r[e]); }));
      } return t;
    } function i(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const o = r('VUYy');
    const a = r('VeLA');
    const s = r('Yed0');
    const u = r('IDEf');
    const c = r('Svze');
    const l = c.OrderedSet;
    const f = c.Record;
    const p = c.Stack;
    const h = c.OrderedMap;
    const d = c.List;
    const g = f({
      allowUndo: !0, currentContent: null, decorator: null, directionMap: null, forceSelection: !1, inCompositionMode: !1, inlineStyleOverride: null, lastChangeType: null, nativelyRenderedContent: null, redoStack: p(), selection: null, treeMap: null, undoStack: p(),
    });
    const y = (function () {
      e.createEmpty = function (t) { return e.createWithContent(a.createFromText(''), t); }, e.createWithContent = function (t, r) {
        if (t.getBlockMap().count() === 0) return e.createEmpty(r); const n = t.getBlockMap().first().getKey(); return e.create({
          currentContent: t, undoStack: p(), redoStack: p(), decorator: r || null, selection: u.createEmpty(n),
        });
      }, e.create = function (t) { const r = t.currentContent; const i = n({}, t, { treeMap: m(r, t.decorator), directionMap: s.getDirectionMap(r) }); return new e(new g(i)); }, e.fromJS = function (t) {
        return new e(new g(n({}, t, {
          directionMap: t.directionMap != null ? h(t.directionMap) : t.directionMap, inlineStyleOverride: t.inlineStyleOverride != null ? l(t.inlineStyleOverride) : t.inlineStyleOverride, nativelyRenderedContent: t.nativelyRenderedContent != null ? a.fromJS(t.nativelyRenderedContent) : t.nativelyRenderedContent, redoStack: t.redoStack != null ? p(t.redoStack.map(((t) => a.fromJS(t)))) : t.redoStack, selection: t.selection != null ? new u(t.selection) : t.selection, treeMap: t.treeMap != null ? h(t.treeMap).map(((t) => d(t).map(((t) => o.fromJS(t))))) : t.treeMap, undoStack: t.undoStack != null ? p(t.undoStack.map(((t) => a.fromJS(t)))) : t.undoStack, currentContent: a.fromJS(t.currentContent),
        })));
      }, e.set = function (t, r) { return new e(t.getImmutable().withMutations(((e) => { const n = e.get('decorator'); let i = n; r.decorator === null ? i = null : r.decorator && (i = r.decorator); const a = r.currentContent || t.getCurrentContent(); if (i !== n) { let s; const u = e.get('treeMap'); return s = i && n ? (function (t, e, r, n, i) { return r.merge(e.toSeq().filter(((e) => n.getDecorations(e, t) !== i.getDecorations(e, t))).map(((e) => o.generate(t, e, n)))); }(a, a.getBlockMap(), u, i, n)) : m(a, i), void e.merge({ decorator: i, treeMap: s, nativelyRenderedContent: null }); }a !== t.getCurrentContent() && e.set('treeMap', (function (t, e, r, n) { const i = t.getCurrentContent().set('entityMap', r); const a = i.getBlockMap(); return t.getImmutable().get('treeMap').merge(e.toSeq().filter(((t, e) => t !== a.get(e))).map(((t) => o.generate(i, t, n)))); }(t, a.getBlockMap(), a.getEntityMap(), i))), e.merge(r); }))); }; const t = e.prototype; function e(t) { i(this, '_immutable', void 0), this._immutable = t; } return t.toJS = function () { return this.getImmutable().toJS(); }, t.getAllowUndo = function () { return this.getImmutable().get('allowUndo'); }, t.getCurrentContent = function () { return this.getImmutable().get('currentContent'); }, t.getUndoStack = function () { return this.getImmutable().get('undoStack'); }, t.getRedoStack = function () { return this.getImmutable().get('redoStack'); }, t.getSelection = function () { return this.getImmutable().get('selection'); }, t.getDecorator = function () { return this.getImmutable().get('decorator'); }, t.isInCompositionMode = function () { return this.getImmutable().get('inCompositionMode'); }, t.mustForceSelection = function () { return this.getImmutable().get('forceSelection'); }, t.getNativelyRenderedContent = function () { return this.getImmutable().get('nativelyRenderedContent'); }, t.getLastChangeType = function () { return this.getImmutable().get('lastChangeType'); }, t.getInlineStyleOverride = function () { return this.getImmutable().get('inlineStyleOverride'); }, e.setInlineStyleOverride = function (t, r) { return e.set(t, { inlineStyleOverride: r }); }, t.getCurrentInlineStyle = function () { const t = this.getInlineStyleOverride(); if (t != null) return t; const e = this.getCurrentContent(); const r = this.getSelection(); return r.isCollapsed() ? (function (t, e) { const r = e.getStartKey(); const n = e.getStartOffset(); const i = t.getBlockForKey(r); if (n > 0) return i.getInlineStyleAt(n - 1); if (i.getLength()) return i.getInlineStyleAt(0); return S(t, r); }(e, r)) : (function (t, e) { const r = e.getStartKey(); const n = e.getStartOffset(); const i = t.getBlockForKey(r); if (n < i.getLength()) return i.getInlineStyleAt(n); if (n > 0) return i.getInlineStyleAt(n - 1); return S(t, r); }(e, r)); }, t.getBlockTree = function (t) { return this.getImmutable().getIn(['treeMap', t]); }, t.isSelectionAtStartOfContent = function () { const t = this.getCurrentContent().getBlockMap().first().getKey(); return this.getSelection().hasEdgeWithin(t, 0, 0); }, t.isSelectionAtEndOfContent = function () { const t = this.getCurrentContent().getBlockMap().last(); const e = t.getLength(); return this.getSelection().hasEdgeWithin(t.getKey(), e, e); }, t.getDirectionMap = function () { return this.getImmutable().get('directionMap'); }, e.acceptSelection = function (t, e) { return v(t, e, !1); }, e.forceSelection = function (t, e) { return e.getHasFocus() || (e = e.set('hasFocus', !0)), v(t, e, !0); }, e.moveSelectionToEnd = function (t) {
        const r = t.getCurrentContent().getLastBlock(); const n = r.getKey(); const i = r.getLength(); return e.acceptSelection(t, new u({
          anchorKey: n, anchorOffset: i, focusKey: n, focusOffset: i, isBackward: !1,
        }));
      }, e.moveFocusToEnd = function (t) { const r = e.moveSelectionToEnd(t); return e.forceSelection(r, r.getSelection()); }, e.push = function (t, r, n) {
        const i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]; if (t.getCurrentContent() === r) return t; const o = s.getDirectionMap(r, t.getDirectionMap()); if (!t.getAllowUndo()) {
          return e.set(t, {
            currentContent: r, directionMap: o, lastChangeType: n, selection: r.getSelectionAfter(), forceSelection: i, inlineStyleOverride: null,
          });
        } const a = t.getSelection(); const u = t.getCurrentContent(); let c = t.getUndoStack(); let l = r; a !== u.getSelectionAfter() || _(t, n) ? (c = c.push(u), l = l.set('selectionBefore', a)) : n !== 'insert-characters' && n !== 'backspace-character' && n !== 'delete-character' || (l = l.set('selectionBefore', u.getSelectionBefore())); let f = t.getInlineStyleOverride(); const h = ['adjust-depth', 'change-block-type', 'split-block']; h.indexOf(n) === -1 && (f = null); const d = {
          currentContent: l, directionMap: o, undoStack: c, redoStack: p(), lastChangeType: n, selection: r.getSelectionAfter(), forceSelection: i, inlineStyleOverride: f,
        }; return e.set(t, d);
      }, e.undo = function (t) {
        if (!t.getAllowUndo()) return t; const r = t.getUndoStack(); const n = r.peek(); if (!n) return t; const i = t.getCurrentContent(); const o = s.getDirectionMap(n, t.getDirectionMap()); return e.set(t, {
          currentContent: n, directionMap: o, undoStack: r.shift(), redoStack: t.getRedoStack().push(i), forceSelection: !0, inlineStyleOverride: null, lastChangeType: 'undo', nativelyRenderedContent: null, selection: i.getSelectionBefore(),
        });
      }, e.redo = function (t) {
        if (!t.getAllowUndo()) return t; const r = t.getRedoStack(); const n = r.peek(); if (!n) return t; const i = t.getCurrentContent(); const o = s.getDirectionMap(n, t.getDirectionMap()); return e.set(t, {
          currentContent: n, directionMap: o, undoStack: t.getUndoStack().push(i), redoStack: r.shift(), forceSelection: !0, inlineStyleOverride: null, lastChangeType: 'redo', nativelyRenderedContent: null, selection: n.getSelectionAfter(),
        });
      }, t.getImmutable = function () { return this._immutable; }, e;
    }()); function v(t, e, r) {
      return y.set(t, {
        selection: e, forceSelection: r, nativelyRenderedContent: null, inlineStyleOverride: null,
      });
    } function m(t, e) { return t.getBlockMap().map(((r) => o.generate(t, r, e))).toOrderedMap(); } function _(t, e) { return e !== t.getLastChangeType() || e !== 'insert-characters' && e !== 'backspace-character' && e !== 'delete-character'; } function S(t, e) {
      const r = t.getBlockMap().reverse().skipUntil(((t, r) => r === e)).skip(1)
        .skipUntil(((t, e) => t.getLength()))
        .first(); return r ? r.getInlineStyleAt(r.getLength() - 1) : l();
    }t.exports = y;
  },
  '2KzS': function (t, e, r) {
    t.exports = function (t) { if (void 0 === (t = t || (typeof document !== 'undefined' ? document : void 0))) return null; try { return t.activeElement || t.body; } catch (e) { return t.body; } };
  },
  '2Wwg': function (t, e, r) {
    function n(t) { return t.replace(/\//g, '-'); }t.exports = function (t) { return typeof t === 'object' ? Object.keys(t).filter(((e) => t[e])).map(n).join(' ') : Array.prototype.map.call(arguments, n).join(' '); };
  },
  '3as9': function (t, e, r) {
    let n;
    /*!
 * UAParser.js v0.7.19
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */!(function (i, o) {
      const a = 'model'; const s = 'name'; const u = 'type'; const c = 'vendor'; const l = 'version'; const f = 'mobile'; const p = 'tablet'; const h = {
        extend(t, e) { const r = {}; for (const n in t)e[n] && e[n].length % 2 == 0 ? r[n] = e[n].concat(t[n]) : r[n] = t[n]; return r; }, has(t, e) { return typeof t === 'string' && e.toLowerCase().indexOf(t.toLowerCase()) !== -1; }, lowerize(t) { return t.toLowerCase(); }, major(t) { return typeof t === 'string' ? t.replace(/[^\d\.]/g, '').split('.')[0] : void 0; }, trim(t) { return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''); },
      }; const d = { rgx(t, e) { for (var r, n, i, o, a, s, u = 0; u < e.length && !a;) { const c = e[u]; const l = e[u + 1]; for (r = n = 0; r < c.length && !a;) if (a = c[r++].exec(t)) for (i = 0; i < l.length; i++)s = a[++n], typeof (o = l[i]) === 'object' && o.length > 0 ? o.length == 2 ? typeof o[1] === 'function' ? this[o[0]] = o[1].call(this, s) : this[o[0]] = o[1] : o.length == 3 ? typeof o[1] !== 'function' || o[1].exec && o[1].test ? this[o[0]] = s ? s.replace(o[1], o[2]) : void 0 : this[o[0]] = s ? o[1].call(this, s, o[2]) : void 0 : o.length == 4 && (this[o[0]] = s ? o[3].call(this, s.replace(o[1], o[2])) : void 0) : this[o] = s || void 0; u += 2; } }, str(t, e) { for (const r in e) if (typeof e[r] === 'object' && e[r].length > 0) { for (let n = 0; n < e[r].length; n++) if (h.has(e[r][n], t)) return r === '?' ? void 0 : r; } else if (h.has(e[r], t)) return r === '?' ? void 0 : r; return t; } }; const g = {
        browser: {
          oldsafari: {
            version: {
              '1.0': '/8', 1.2: '/1', 1.3: '/3', '2.0': '/412', '2.0.2': '/416', '2.0.3': '/417', '2.0.4': '/419', '?': '/',
            },
          },
        },
        device: { amazon: { model: { 'Fire Phone': ['SD', 'KF'] } }, sprint: { model: { 'Evo Shift 4G': '7373KT' }, vendor: { HTC: 'APA', Sprint: 'Sprint' } } },
        os: {
          windows: {
            version: {
              ME: '4.90', 'NT 3.11': 'NT3.51', 'NT 4.0': 'NT4.0', 2e3: 'NT 5.0', XP: ['NT 5.1', 'NT 5.2'], Vista: 'NT 6.0', 7: 'NT 6.1', 8: 'NT 6.2', 8.1: 'NT 6.3', 10: ['NT 6.4', 'NT 10.0'], RT: 'ARM',
            },
          },
        },
      }; const y = {
        browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [s, l], [/(opios)[\/\s]+([\w\.]+)/i], [[s, 'Opera Mini'], l], [/\s(opr)\/([\w\.]+)/i], [[s, 'Opera'], l], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i], [s, l], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [[s, 'IE'], l], [/(edge|edgios|edga)\/((\d+)?[\w\.]+)/i], [[s, 'Edge'], l], [/(yabrowser)\/([\w\.]+)/i], [[s, 'Yandex'], l], [/(puffin)\/([\w\.]+)/i], [[s, 'Puffin'], l], [/(focus)\/([\w\.]+)/i], [[s, 'Firefox Focus'], l], [/(opt)\/([\w\.]+)/i], [[s, 'Opera Touch'], l], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [[s, 'UCBrowser'], l], [/(comodo_dragon)\/([\w\.]+)/i], [[s, /_/g, ' '], l], [/(micromessenger)\/([\w\.]+)/i], [[s, 'WeChat'], l], [/(brave)\/([\w\.]+)/i], [[s, 'Brave'], l], [/(qqbrowserlite)\/([\w\.]+)/i], [s, l], [/(QQ)\/([\d\.]+)/i], [s, l], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i], [s, l], [/(BIDUBrowser)[\/\s]?([\w\.]+)/i], [s, l], [/(2345Explorer)[\/\s]?([\w\.]+)/i], [s, l], [/(MetaSr)[\/\s]?([\w\.]+)/i], [s], [/(LBBROWSER)/i], [s], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [l, [s, 'MIUI Browser']], [/;fbav\/([\w\.]+);/i], [l, [s, 'Facebook']], [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i], [s, l], [/headlesschrome(?:\/([\w\.]+)|\s)/i], [l, [s, 'Chrome Headless']], [/\swv\).+(chrome)\/([\w\.]+)/i], [[s, /(.+)/, '$1 WebView'], l], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[s, /(.+(?:g|us))(.+)/, '$1 $2'], l], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i], [l, [s, 'Android Browser']], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [s, l], [/(dolfin)\/([\w\.]+)/i], [[s, 'Dolphin'], l], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[s, 'Chrome'], l], [/(coast)\/([\w\.]+)/i], [[s, 'Opera Coast'], l], [/fxios\/([\w\.-]+)/i], [l, [s, 'Firefox']], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [l, [s, 'Mobile Safari']], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [l, s], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [[s, 'GSA'], l], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [s, [l, d.str, g.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], [s, l], [/(navigator|netscape)\/([\w\.-]+)/i], [[s, 'Netscape'], l], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [s, l]], cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [['architecture', 'amd64']], [/(ia32(?=;))/i], [['architecture', h.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [['architecture', 'ia32']], [/windows\s(ce|mobile);\sppc;/i], [['architecture', 'arm']], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [['architecture', /ower/, '', h.lowerize]], [/(sun4\w)[;\)]/i], [['architecture', 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [['architecture', h.lowerize]]], device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [a, c, [u, p]], [/applecoremedia\/[\w\.]+ \((ipad)/], [a, [c, 'Apple'], [u, p]], [/(apple\s{0,1}tv)/i], [[a, 'Apple TV'], [c, 'Apple']], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [c, a, [u, p]], [/(kf[A-z]+)\sbuild\/.+silk\//i], [a, [c, 'Amazon'], [u, p]], [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i], [[a, d.str, g.device.amazon.model], [c, 'Amazon'], [u, f]], [/android.+aft([bms])\sbuild/i], [a, [c, 'Amazon'], [u, 'smarttv']], [/\((ip[honed|\s\w*]+);.+(apple)/i], [a, c, [u, f]], [/\((ip[honed|\s\w*]+);/i], [a, [c, 'Apple'], [u, f]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [c, a, [u, f]], [/\(bb10;\s(\w+)/i], [a, [c, 'BlackBerry'], [u, f]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], [a, [c, 'Asus'], [u, p]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[c, 'Sony'], [a, 'Xperia Tablet'], [u, p]], [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i], [a, [c, 'Sony'], [u, f]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [c, a, [u, 'console']], [/android.+;\s(shield)\sbuild/i], [a, [c, 'Nvidia'], [u, 'console']], [/(playstation\s[34portablevi]+)/i], [a, [c, 'Sony'], [u, 'console']], [/(sprint\s(\w+))/i], [[c, d.str, g.device.sprint.vendor], [a, d.str, g.device.sprint.model], [u, f]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [c, a, [u, p]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i], [c, [a, /_/g, ' '], [u, f]], [/(nexus\s9)/i], [a, [c, 'HTC'], [u, p]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i], [a, [c, 'Huawei'], [u, f]], [/(microsoft);\s(lumia[\s\w]+)/i], [c, a, [u, f]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [a, [c, 'Microsoft'], [u, 'console']], [/(kin\.[onetw]{3})/i], [[a, /\./g, ' '], [c, 'Microsoft'], [u, f]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [a, [c, 'Motorola'], [u, f]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [a, [c, 'Motorola'], [u, p]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[c, h.trim], [a, h.trim], [u, 'smarttv']], [/hbbtv.+maple;(\d+)/i], [[a, /^/, 'SmartTV'], [c, 'Samsung'], [u, 'smarttv']], [/\(dtv[\);].+(aquos)/i], [a, [c, 'Sharp'], [u, 'smarttv']], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[c, 'Samsung'], a, [u, p]], [/smart-tv.+(samsung)/i], [c, [u, 'smarttv'], a], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i], [[c, 'Samsung'], a, [u, f]], [/sie-(\w*)/i], [a, [c, 'Siemens'], [u, f]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i], [[c, 'Nokia'], a, [u, f]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], [a, [c, 'Acer'], [u, p]], [/android.+([vl]k\-?\d{3})\s+build/i], [a, [c, 'LG'], [u, p]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[c, 'LG'], a, [u, p]], [/(lg) netcast\.tv/i], [c, a, [u, 'smarttv']], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i], [a, [c, 'LG'], [u, f]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [a, [c, 'Lenovo'], [u, p]], [/linux;.+((jolla));/i], [c, a, [u, f]], [/((pebble))app\/[\d\.]+\s/i], [c, a, [u, 'wearable']], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [c, a, [u, f]], [/crkey/i], [[a, 'Chromecast'], [c, 'Google']], [/android.+;\s(glass)\s\d/i], [a, [c, 'Google'], [u, 'wearable']], [/android.+;\s(pixel c)[\s)]/i], [a, [c, 'Google'], [u, p]], [/android.+;\s(pixel( [23])?( xl)?)\s/i], [a, [c, 'Google'], [u, f]], [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i], [[a, /_/g, ' '], [c, 'Xiaomi'], [u, f]], [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i], [[a, /_/g, ' '], [c, 'Xiaomi'], [u, p]], [/android.+;\s(m[1-5]\snote)\sbuild/i], [a, [c, 'Meizu'], [u, p]], [/(mz)-([\w-]{2,})/i], [[c, 'Meizu'], a, [u, f]], [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i], [a, [c, 'OnePlus'], [u, f]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i], [a, [c, 'RCA'], [u, p]], [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i], [a, [c, 'Dell'], [u, p]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i], [a, [c, 'Verizon'], [u, p]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i], [[c, 'Barnes & Noble'], a, [u, p]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i], [a, [c, 'NuVision'], [u, p]], [/android.+;\s(k88)\sbuild/i], [a, [c, 'ZTE'], [u, p]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i], [a, [c, 'Swiss'], [u, f]], [/android.+[;\/]\s*(zur\d{3})\s+build/i], [a, [c, 'Swiss'], [u, p]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i], [a, [c, 'Zeki'], [u, p]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i], [[c, 'Dragon Touch'], a, [u, p]], [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i], [a, [c, 'Insignia'], [u, p]], [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i], [a, [c, 'NextBook'], [u, p]], [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[c, 'Voice'], a, [u, f]], [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i], [[c, 'LvTel'], a, [u, f]], [/android.+;\s(PH-1)\s/i], [a, [c, 'Essential'], [u, f]], [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i], [a, [c, 'Envizen'], [u, p]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i], [c, a, [u, p]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i], [a, [c, 'MachSpeed'], [u, p]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i], [c, a, [u, p]], [/android.+[;\/]\s*TU_(1491)\s+build/i], [a, [c, 'Rotor'], [u, p]], [/android.+(KS(.+))\s+build/i], [a, [c, 'Amazon'], [u, p]], [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i], [c, a, [u, p]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[u, h.lowerize], c, a], [/(android[\w\.\s\-]{0,9});.+build/i], [a, [c, 'Generic']]], engine: [[/windows.+\sedge\/([\w\.]+)/i], [l, [s, 'EdgeHTML']], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [s, l], [/rv\:([\w\.]{1,9}).+(gecko)/i], [l, s]], os: [[/microsoft\s(windows)\s(vista|xp)/i], [s, l], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [s, [l, d.str, g.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[s, 'Windows'], [l, d.str, g.os.windows.version]], [/\((bb)(10);/i], [[s, 'BlackBerry'], l], [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, /linux;.+(sailfish);/i], [s, l], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i], [[s, 'Symbian'], l], [/\((series40);/i], [s], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[s, 'Firefox OS'], l], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i], [s, l], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[s, 'Chromium OS'], l], [/(sunos)\s?([\w\.\d]*)/i], [[s, 'Solaris'], l], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i], [s, l], [/(haiku)\s(\w+)/i], [s, l], [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i], [[l, /_/g, '.'], [s, 'iOS']], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i], [[s, 'Mac OS'], [l, /_/g, '.']], [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i], [s, l]],
      }; var v = function (t, e) {
        if (typeof t === 'object' && (e = t, t = void 0), !(this instanceof v)) return new v(t, e).getResult(); let r = t || (i && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : ''); const n = e ? h.extend(y, e) : y; return this.getBrowser = function () { const t = { name: void 0, version: void 0 }; return d.rgx.call(t, r, n.browser), t.major = h.major(t.version), t; }, this.getCPU = function () { const t = { architecture: void 0 }; return d.rgx.call(t, r, n.cpu), t; }, this.getDevice = function () { const t = { vendor: void 0, model: void 0, type: void 0 }; return d.rgx.call(t, r, n.device), t; }, this.getEngine = function () { const t = { name: void 0, version: void 0 }; return d.rgx.call(t, r, n.engine), t; }, this.getOS = function () { const t = { name: void 0, version: void 0 }; return d.rgx.call(t, r, n.os), t; }, this.getResult = function () {
          return {
            ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU(),
          };
        }, this.getUA = function () { return r; }, this.setUA = function (t) { return r = t, this; }, this;
      }; v.VERSION = '0.7.19', v.BROWSER = { NAME: s, MAJOR: 'major', VERSION: l }, v.CPU = { ARCHITECTURE: 'architecture' }, v.DEVICE = {
        MODEL: a, VENDOR: c, TYPE: u, CONSOLE: 'console', MOBILE: f, SMARTTV: 'smarttv', TABLET: p, WEARABLE: 'wearable', EMBEDDED: 'embedded',
      }, v.ENGINE = { NAME: s, VERSION: l }, v.OS = { NAME: s, VERSION: l }, void 0 !== e ? (void 0 !== t && t.exports && (e = t.exports = v), e.UAParser = v) : r('jPSd') ? void 0 === (n = function () { return v; }.call(e, r, e, t)) || (t.exports = n) : i && (i.UAParser = v); const m = i && (i.jQuery || i.Zepto); if (void 0 !== m && !m.ua) { const _ = new v(); m.ua = _.getResult(), m.ua.get = function () { return _.getUA(); }, m.ua.set = function (t) { _.setUA(t); const e = _.getResult(); for (const r in e)m.ua[r] = e[r]; }; }
    }(typeof window === 'object' ? window : this));
  },
  '4aXP': function (t, e, r) {
    const n = r('7002');
    const i = r('ZUd0')('draft_tree_data_support'); t.exports = function (t, e, r) {
      const o = t.getSelection();
      const a = t.getCurrentContent();
      let s = o;
      const u = o.getAnchorKey();
      const c = o.getFocusKey();
      const l = a.getBlockForKey(u); if (i && r === 'forward' && u !== c) return a; if (o.isCollapsed()) { if (r === 'forward') { if (t.isSelectionAtEndOfContent()) return a; if (i) if (o.getAnchorOffset() === a.getBlockForKey(u).getLength()) { const f = a.getBlockForKey(l.nextSibling); if (!f || f.getLength() === 0) return a; } } else if (t.isSelectionAtStartOfContent()) return a; if ((s = e(t)) === o) return a; } return n.removeRange(a, s, r);
    };
  },
  '5/F0': function (t, e, r) {
    const n = r('iN4q'); t.exports = function (t) {
      const e = t.ownerDocument.documentElement; if (!('getBoundingClientRect' in t) || !n(e, t)) {
        return {
          left: 0, right: 0, top: 0, bottom: 0,
        };
      } const r = t.getBoundingClientRect(); return {
        left: Math.round(r.left) - e.clientLeft, right: Math.round(r.right) - e.clientLeft, top: Math.round(r.top) - e.clientTop, bottom: Math.round(r.bottom) - e.clientTop,
      };
    };
  },
  '58Uu': function (t, e, r) {
    t.exports = function (t) { t._internalDrag = !0, t.setMode('drag'); };
  },
  '5mUX': function (t, e, r) {
    const n = r('tI3i'); t.exports = function (t, e) { const r = []; return t.findEntityRanges(((t) => t.getEntity() === e), ((t, e) => { r.push({ start: t, end: e }); })), r.length || n(!1), r; };
  },
  7002(t, e, r) {
    const n = r('b+nQ'); const i = r('HKFH'); const o = r('8dwq'); const a = r('USh0'); const s = r('hDHP'); const u = r('Svze'); const c = r('yzfH'); const l = r('pW+J'); const f = r('tI3i'); const p = r('WmAF'); const h = r('/L11'); const d = r('QCHf'); const g = r('KDIr'); const y = u.OrderedSet; var v = {
      replaceText(t, e, r, i, o) { const a = h(t, e); const s = d(a, e); const u = n.create({ style: i || y(), entity: o || null }); return l(s, s.getSelectionAfter(), r, u); },
      insertText(t, e, r, n, i) { return e.isCollapsed() || f(!1), v.replaceText(t, e, r, n, i); },
      moveText(t, e, r) { const n = s(t, e); const i = v.removeRange(t, e, 'backward'); return v.replaceWithFragment(i, r, n); },
      replaceWithFragment(t, e, r) {
        const n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 'REPLACE_WITH_NEW_DATA'; const i = h(t, e); const
          o = d(i, e); return c(o, o.getSelectionAfter(), r, n);
      },
      removeRange(t, e, r) {
        let n; let i; let o; let s; e.getIsBackward() && (e = e.merge({
          anchorKey: e.getFocusKey(), anchorOffset: e.getFocusOffset(), focusKey: e.getAnchorKey(), focusOffset: e.getAnchorOffset(), isBackward: !1,
        })), n = e.getAnchorKey(), i = e.getFocusKey(), o = t.getBlockForKey(n), s = t.getBlockForKey(i); const u = e.getStartOffset(); const c = e.getEndOffset(); const l = o.getEntityAt(u); const f = s.getEntityAt(c - 1); if (n === i && l && l === f) { const p = a(t.getEntityMap(), o, s, e, r); return d(t, p); } const g = h(t, e); return d(g, e);
      },
      splitBlock(t, e) { const r = h(t, e); const n = d(r, e); return g(n, n.getSelectionAfter()); },
      applyInlineStyle(t, e, r) { return i.add(t, e, r); },
      removeInlineStyle(t, e, r) { return i.remove(t, e, r); },
      setBlockType(t, e, r) { return p(t, e, ((t) => t.merge({ type: r, depth: 0 }))); },
      setBlockData(t, e, r) { return p(t, e, ((t) => t.merge({ data: r }))); },
      mergeBlockData(t, e, r) { return p(t, e, ((t) => t.merge({ data: t.getData().merge(r) }))); },
      applyEntity(t, e, r) { const n = h(t, e); return o(n, e, r); },
    }; t.exports = v;
  },
  '7MNd': function (t, e, r) {
    const n = r('JtWY');
    const i = r('LxfW'); t.exports = function (t) {
      const e = n(t.ownerDocument || t.document); t.Window && t instanceof t.Window && (t = e); const r = i(t);
      const o = t === e ? t.ownerDocument.documentElement : t;
      const a = t.scrollWidth - o.clientWidth;
      const s = t.scrollHeight - o.clientHeight; return r.x = Math.max(0, Math.min(r.x, a)), r.y = Math.max(0, Math.min(r.y, s)), r;
    };
  },
  '7XzN': function (t, e, r) {
    const n = r('b//S');
    const i = r('hF1F'); t.exports = function (t, e, r, o, a) {
      const s = i(t.getSelection()); if (!e || !o) return s; const u = n.decode(e);
      const c = u.blockKey;
      const l = t.getBlockTree(c);
      const f = l && l.getIn([u.decoratorKey, 'leaves', u.leafKey]);
      const p = n.decode(o);
      const h = p.blockKey;
      const d = t.getBlockTree(h);
      const g = d && d.getIn([p.decoratorKey, 'leaves', p.leafKey]); if (!f || !g) return s; const y = f.get('start');
      const v = g.get('start');
      const m = f ? y + r : null;
      const _ = g ? v + a : null; if (s.getAnchorKey() === c && s.getAnchorOffset() === m && s.getFocusKey() === h && s.getFocusOffset() === _) return s; let S = !1; if (c === h) {
        const b = f.get('end');
        const w = g.get('end'); S = v === y && w === b ? a < r : v < y;
      } else {
        S = t.getCurrentContent().getBlockMap().keySeq().skipUntil(((t) => t === c || t === h))
          .first() === h;
      } return s.merge({
        anchorKey: c, anchorOffset: m, focusKey: h, focusOffset: _, isBackward: S,
      });
    };
  },
  '7mA2': function (t, e, r) {
    const n = r('ObfX'); t.exports = function (t) { return t.which === n.RETURN && (t.getModifierState('Shift') || t.getModifierState('Alt') || t.getModifierState('Control')); };
  },
  '8SYF': function (t, e, r) {
    const n = r('1xkk'); t.exports = function (t) {
      const e = t.getSelection();
      const r = e.getEndKey();
      const i = t.getCurrentContent().getBlockForKey(r).getLength(); return n.set(t, {
        selection: e.merge({
          anchorKey: r, anchorOffset: i, focusKey: r, focusOffset: i, isBackward: !1,
        }),
        forceSelection: !0,
      });
    };
  },
  '8dwq': function (t, e, r) {
    const n = r('ZxmY');
    const i = r('Svze'); t.exports = function (t, e, r) {
      const o = t.getBlockMap();
      const a = e.getStartKey();
      const s = e.getStartOffset();
      const u = e.getEndKey();
      const c = e.getEndOffset();
      const l = o.skipUntil(((t, e) => e === a)).takeUntil(((t, e) => e === u)).toOrderedMap().merge(i.OrderedMap([[u, o.get(u)]]))
        .map(((t, e) => { const i = e === a ? s : 0; const o = e === u ? c : t.getLength(); return n(t, i, o, r); })); return t.merge({ blockMap: o.merge(l), selectionBefore: e, selectionAfter: e });
    };
  },
  9e3(t, e, r) {
    const n = r('7002'); const i = r('1xkk'); t.exports = function (t) { const e = n.splitBlock(t.getCurrentContent(), t.getSelection()); return i.push(t, e, 'split-block'); };
  },
  '9Kr7': function (t, e, r) {
    const n = r('7002');
    const i = r('1xkk');
    const o = r('udiT');
    const a = r('hF1F');
    var s = {
      currentBlockContainsLink(t) { const e = t.getSelection(); const r = t.getCurrentContent(); const n = r.getEntityMap(); return r.getBlockForKey(e.getAnchorKey()).getCharacterList().slice(e.getStartOffset(), e.getEndOffset()).some(((t) => { const e = t.getEntity(); return !!e && n.__get(e).getType() === 'LINK'; })); },
      getCurrentBlockType(t) { const e = t.getSelection(); return t.getCurrentContent().getBlockForKey(e.getStartKey()).getType(); },
      getDataObjectForLinkURL(t) { return { url: t.toString() }; },
      handleKeyCommand(t, e, r) { switch (e) { case 'bold': return s.toggleInlineStyle(t, 'BOLD'); case 'italic': return s.toggleInlineStyle(t, 'ITALIC'); case 'underline': return s.toggleInlineStyle(t, 'UNDERLINE'); case 'code': return s.toggleCode(t); case 'backspace': case 'backspace-word': case 'backspace-to-start-of-line': return s.onBackspace(t); case 'delete': case 'delete-word': case 'delete-to-end-of-block': return s.onDelete(t); default: return null; } },
      insertSoftNewline(t) { const e = n.insertText(t.getCurrentContent(), t.getSelection(), '\n', t.getCurrentInlineStyle(), null); const r = i.push(t, e, 'insert-characters'); return i.forceSelection(r, e.getSelectionAfter()); },
      onBackspace(t) { const e = t.getSelection(); if (!e.isCollapsed() || e.getAnchorOffset() || e.getFocusOffset()) return null; const r = t.getCurrentContent(); const n = e.getStartKey(); const o = r.getBlockBefore(n); if (o && o.getType() === 'atomic') { const a = r.getBlockMap().delete(o.getKey()); const u = r.merge({ blockMap: a, selectionAfter: e }); if (u !== r) return i.push(t, u, 'remove-range'); } const c = s.tryToRemoveBlockStyle(t); return c ? i.push(t, c, 'change-block-type') : null; },
      onDelete(t) { const e = t.getSelection(); if (!e.isCollapsed()) return null; const r = t.getCurrentContent(); const o = e.getStartKey(); const a = r.getBlockForKey(o).getLength(); if (e.getStartOffset() < a) return null; const s = r.getBlockAfter(o); if (!s || s.getType() !== 'atomic') return null; const u = e.merge({ focusKey: s.getKey(), focusOffset: s.getLength() }); const c = n.removeRange(r, u, 'forward'); return c !== r ? i.push(t, c, 'remove-range') : null; },
      onTab(t, e, r) { const n = e.getSelection(); const a = n.getAnchorKey(); if (a !== n.getFocusKey()) return e; const s = e.getCurrentContent(); const u = s.getBlockForKey(a); const c = u.getType(); if (c !== 'unordered-list-item' && c !== 'ordered-list-item') return e; t.preventDefault(); const l = u.getDepth(); if (!t.shiftKey && l === r) return e; const f = o(s, n, t.shiftKey ? -1 : 1, r); return i.push(e, f, 'adjust-depth'); },
      toggleBlockType(t, e) {
        const r = t.getSelection(); const o = r.getStartKey(); let s = r.getEndKey(); const u = t.getCurrentContent(); let c = r; if (o !== s && r.getEndOffset() === 0) {
          const l = a(u.getBlockBefore(s)); s = l.getKey(), c = c.merge({
            anchorKey: o, anchorOffset: r.getStartOffset(), focusKey: s, focusOffset: l.getLength(), isBackward: !1,
          });
        } if (u.getBlockMap().skipWhile(((t, e) => e !== o)).reverse().skipWhile(((t, e) => e !== s))
          .some(((t) => t.getType() === 'atomic'))) return t; const f = u.getBlockForKey(o).getType() === e ? 'unstyled' : e; return i.push(t, n.setBlockType(u, c, f), 'change-block-type');
      },
      toggleCode(t) { const e = t.getSelection(); const r = e.getAnchorKey(); const n = e.getFocusKey(); return e.isCollapsed() || r !== n ? s.toggleBlockType(t, 'code-block') : s.toggleInlineStyle(t, 'CODE'); },
      toggleInlineStyle(t, e) { const r = t.getSelection(); const o = t.getCurrentInlineStyle(); if (r.isCollapsed()) return i.setInlineStyleOverride(t, o.has(e) ? o.remove(e) : o.add(e)); let a; const s = t.getCurrentContent(); return a = o.has(e) ? n.removeInlineStyle(s, r, e) : n.applyInlineStyle(s, r, e), i.push(t, a, 'change-inline-style'); },
      toggleLink(t, e, r) { const o = n.applyEntity(t.getCurrentContent(), e, r); return i.push(t, o, 'apply-entity'); },
      tryToRemoveBlockStyle(t) { const e = t.getSelection(); const r = e.getAnchorOffset(); if (e.isCollapsed() && r === 0) { const i = e.getAnchorKey(); const o = t.getCurrentContent(); const a = o.getBlockForKey(i).getType(); const s = o.getBlockBefore(i); if (a === 'code-block' && s && s.getType() === 'code-block' && s.getLength() !== 0) return null; if (a !== 'unstyled') return n.setBlockType(o, e, 'unstyled'); } return null; },
    }; t.exports = s;
  },
  '9XMQ': function (t, e, r) {
    const n = r('1xkk');
    const i = r('W6iK');
    const o = r('MzOC');
    const a = r('4aXP'); t.exports = function (t) { const e = a(t, ((t) => { const e = t.getSelection(); const r = t.getCurrentContent(); const n = e.getAnchorKey(); const a = e.getAnchorOffset(); const s = r.getBlockForKey(n).getText()[a]; return o(t, s ? i.getUTF16Length(s, 0) : 1); }), 'forward'); if (e === t.getCurrentContent()) return t; const r = t.getSelection(); return n.push(t, e.set('selectionBefore', r), r.isCollapsed() ? 'delete-character' : 'remove-range'); };
  },
  ADYu(t, e, r) {
    t.exports = function (t) { const e = t.getSelection(); const r = e.getAnchorKey(); const n = t.getBlockTree(r); const i = e.getStartOffset(); let o = !1; return n.some(((t) => (i === t.get('start') ? (o = !0, !0) : i < t.get('end') && t.get('leaves').some(((t) => { const e = t.get('start'); return i === e && (o = !0, !0); }))))), o; };
  },
  'AL/+': function (t, e, r) {
    t.exports = function (t, e, r, n) { if (t.size) { let i = 0; t.reduce(((t, o, a) => (e(t, o) || (r(t) && n(i, a), i = a), o))), r(t.last()) && n(i, t.count()); } };
  },
  ApIa(t, e, r) {
    function n(t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { i(t, e, r[e]); })); } return t; } function i(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const o = r('ooRk'); const a = r('b+nQ'); const s = r('IbSy'); const u = r('YM28'); const c = r('7002'); const l = r('1xkk'); const f = r('YSZ8'); const p = r('ZUd0'); const h = r('Svze'); const d = r('uJSo'); const g = p('draft_tree_data_support'); const y = g ? u : s; const v = h.List; const m = h.Repeat; const _ = {
      insertAtomicBlock(t, e, r) {
        const i = t.getCurrentContent(); const s = t.getSelection(); const u = c.removeRange(i, s, 'backward'); const p = u.getSelectionAfter(); const h = c.splitBlock(u, p); const d = h.getSelectionAfter(); const _ = c.setBlockType(h, d, 'atomic'); const S = a.create({ entity: e }); let b = {
          key: f(), type: 'atomic', text: r, characterList: v(m(S, r.length)),
        }; let w = { key: f(), type: 'unstyled' }; g && (b = n({}, b, { nextSibling: w.key }), w = n({}, w, { prevSibling: b.key })); const k = [new y(b), new y(w)]; const x = o.createFromArray(k); const C = c.replaceWithFragment(_, d, x); const E = C.merge({ selectionBefore: s, selectionAfter: C.getSelectionAfter().set('hasFocus', !0) }); return l.push(t, E, 'insert-fragment');
      },
      moveAtomicBlock(t, e, r, n) { let i; const o = t.getCurrentContent(); const a = t.getSelection(); if (n === 'before' || n === 'after') { const s = o.getBlockForKey(n === 'before' ? r.getStartKey() : r.getEndKey()); i = d(o, e, s, n); } else { const u = c.removeRange(o, r, 'backward'); const f = u.getSelectionAfter(); const p = u.getBlockForKey(f.getFocusKey()); if (f.getStartOffset() === 0)i = d(u, e, p, 'before'); else if (f.getEndOffset() === p.getLength())i = d(u, e, p, 'after'); else { const h = c.splitBlock(u, f); const g = h.getSelectionAfter(); const y = h.getBlockForKey(g.getFocusKey()); i = d(h, e, y, 'before'); } } const v = i.merge({ selectionBefore: a, selectionAfter: i.getSelectionAfter().set('hasFocus', !0) }); return l.push(t, v, 'move-block'); },
    }; t.exports = _;
  },
  B3y8(t, e, r) {
    r('/2Cm'); const n = { isValidBlock(t, e) { const r = t.getKey(); const n = t.getParentKey(); if (n != null && !e.get(n).getChildKeys().includes(r)) return !1; if (!t.getChildKeys().map(((t) => e.get(t))).every(((t) => t.getParentKey() === r))) return !1; const i = t.getPrevSiblingKey(); if (i != null && e.get(i).getNextSiblingKey() !== r) return !1; const o = t.getNextSiblingKey(); if (o != null && e.get(o).getPrevSiblingKey() !== r) return !1; return (o === null || i === null || i !== o) && !(t.text != '' && t.getChildKeys().size > 0); }, isConnectedTree(t) { const e = t.toArray().filter(((t) => t.getParentKey() == null && t.getPrevSiblingKey() == null)); if (e.length !== 1) return !1; for (var r = 0, n = e.shift().getKey(), i = []; n != null;) { const o = t.get(n); const a = o.getChildKeys(); const s = o.getNextSiblingKey(); if (a.size > 0) { s != null && i.unshift(s); const u = a.map(((e) => t.get(e))).find(((t) => t.getPrevSiblingKey() == null)); if (u == null) return !1; n = u.getKey(); } else n = o.getNextSiblingKey() != null ? o.getNextSiblingKey() : i.shift(); r++; } return r === t.size; }, isValidTree(t) { const e = this; return !!t.toArray().every(((r) => e.isValidBlock(r, t))) && this.isConnectedTree(t); } }; t.exports = n;
  },
  BTrg(t, e, r) {
    function n() { let t; return document.documentElement && (t = document.documentElement.clientWidth), !t && document.body && (t = document.body.clientWidth), t || 0; } function i() { let t; return document.documentElement && (t = document.documentElement.clientHeight), !t && document.body && (t = document.body.clientHeight), t || 0; } function o() { return { width: window.innerWidth || n(), height: window.innerHeight || i() }; }o.withoutScrollbars = function () { return { width: n(), height: i() }; }, t.exports = o;
  },
  BsqC(t, e, r) {
    const n = r('1xkk'); t.exports = function (t, e, r) { const i = n.undo(e); if (e.getLastChangeType() !== 'spellcheck-change')t.preventDefault(), e.getNativelyRenderedContent() ? (r(n.set(e, { nativelyRenderedContent: null })), setTimeout((() => { r(i); }), 0)) : r(i); else { const o = i.getCurrentContent(); r(n.set(i, { nativelyRenderedContent: o })); } };
  },
  Cfxn(t, e, r) {
    t.exports = { logBlockedSelectionEvent() { return null; }, logSelectionStateFailure() { return null; } };
  },
  Cl3z(t, e, r) {
    const n = r('W6iK'); const i = r('vYw2'); const o = r('KXNC'); const a = r('tI3i'); function s(t, e) { for (var r = 1 / 0, n = 1 / 0, i = -1 / 0, o = -1 / 0, a = 0; a < t.length; a++) { const s = t[a]; s.width !== 0 && s.width !== 1 && (r = Math.min(r, s.top), n = Math.min(n, s.bottom), i = Math.max(i, s.top), o = Math.max(o, s.bottom)); } return i <= n && i - r < e && o - n < e; } function u(t) { switch (t.nodeType) { case Node.DOCUMENT_TYPE_NODE: return 0; case Node.TEXT_NODE: case Node.PROCESSING_INSTRUCTION_NODE: case Node.COMMENT_NODE: return t.length; default: return t.childNodes.length; } }t.exports = function (t) { t.collapsed || a(!1); let e = (t = t.cloneRange()).startContainer; e.nodeType !== 1 && (e = e.parentNode); const r = (function (t) { const e = getComputedStyle(t); const r = i(t); const n = r.createElement('div'); n.style.fontFamily = e.fontFamily, n.style.fontSize = e.fontSize, n.style.fontStyle = e.fontStyle, n.style.fontWeight = e.fontWeight, n.style.lineHeight = e.lineHeight, n.style.position = 'absolute', n.textContent = 'M'; const o = r.body; o || a(!1), o.appendChild(n); const s = n.getBoundingClientRect(); return o.removeChild(n), s.height; }(e)); let c = t.endContainer; let l = t.endOffset; for (t.setStart(t.startContainer, 0); s(o(t), r) && (c = t.startContainer, l = t.startOffset, c.parentNode || a(!1), t.setStartBefore(c), c.nodeType !== 1 || getComputedStyle(c).display === 'inline'););for (let f = c, p = l - 1; ;) { for (var h = f.nodeValue, d = p; d >= 0; d--) if (!(h != null && d > 0 && n.isSurrogatePair(h, d - 1))) { if (t.setStart(f, d), !s(o(t), r)) break; c = f, l = d; } if (d === -1 || f.childNodes.length === 0) break; p = u(f = f.childNodes[d]); } return t.setStart(c, l), t; };
  },
  CqlG(t, e, r) {
    const n = r('tI3i'); t.exports = function (t) { return (function (t) { return !!t && (typeof t === 'object' || typeof t === 'function') && 'length' in t && !('setInterval' in t) && typeof t.nodeType !== 'number' && (Array.isArray(t) || 'callee' in t || 'item' in t); }(t)) ? Array.isArray(t) ? t.slice() : (function (t) { const e = t.length; if ((Array.isArray(t) || typeof t !== 'object' && typeof t !== 'function') && n(!1), typeof e !== 'number' && n(!1), e === 0 || e - 1 in t || n(!1), typeof t.callee === 'function' && n(!1), t.hasOwnProperty) try { return Array.prototype.slice.call(t); } catch (t) {} for (var r = Array(e), i = 0; i < e; i++)r[i] = t[i]; return r; }(t)) : [t]; };
  },
  CtAg(t, e, r) {
    const n = r('5/F0'); t.exports = function (t) {
      const e = n(t); return {
        x: e.left, y: e.top, width: e.right - e.left, height: e.bottom - e.top,
      };
    };
  },
  DZH9(t, e, r) {
    const n = r('W6iK'); const i = r('Svze').OrderedSet; const o = n.substr; const a = i(); t.exports = function (t, e) { const r = Array(t.length).fill(a); return e && e.forEach(((e) => { for (let n = o(t, 0, e.offset).length, i = n + o(t, e.offset, e.length).length; n < i;)r[n] = r[n].add(e.style), n++; })), r; };
  },
  DtGU(t, e, r) {
    const n = r('13UR'); t.exports = function t(e) { if (n(e)) { const r = e; const i = r.getAttribute('data-offset-key'); if (i) return i; for (let o = 0; o < r.childNodes.length; o++) { const a = t(r.childNodes[o]); if (a) return a; } } return null; };
  },
  DuSR(t, e, r) {
    const n = r('Cfxn'); const i = r('1xkk'); const o = r('KqX8'); const a = r('WbhC'); t.exports = function (t) { if (t._blockSelectEvents || t._latestEditorState !== t.props.editorState) { if (t._blockSelectEvents) { const e = t.props.editorState.getSelection(); n.logBlockedSelectionEvent({ anonymizedDom: 'N/A', extraParams: JSON.stringify({ stacktrace: (new Error()).stack }), selectionState: JSON.stringify(e.toJS()) }); } } else { let r = t.props.editorState; const s = a(r, o(t)); const u = s.selectionState; u !== r.getSelection() && (r = s.needsRecovery ? i.forceSelection(r, u) : i.acceptSelection(r, u), t.update(r)); } };
  },
  EYg6(t, e, r) {
    function n(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const i = r('IbSy'); const o = r('YM28'); const a = r('tO3r'); const s = r('YSZ8'); const u = r('GSkh'); const c = r('ZUd0'); const l = r('Svze'); const f = r('fNVm'); const p = l.List; const h = l.Repeat; const d = c('draft_tree_data_support'); const g = d ? o : i; const y = {
      processHTML(t, e) { return a(t, u, e); },
      processText(t, e, r) {
        return t.reduce(((t, i, o) => {
          i = f(i); const a = s(); let u = {
            key: a, type: r, text: i, characterList: p(h(e, i.length)),
          }; if (d && o !== 0) { const c = o - 1; u = (function (t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let i = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (i = i.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), i.forEach(((e) => { n(t, e, r[e]); })); } return t; }({}, u, { prevSibling: (t[c] = t[c].merge({ nextSibling: a })).getKey() })); } return t.push(new g(u)), t;
        }), []);
      },
    }; t.exports = y;
  },
  Ea6c(t, e, r) {
    t.exports = { initODS() {}, handleExtensionCausedError() {} };
  },
  Fd87(t, e, r) {
    const n = r('n09L'); const i = r('tI3i'); const o = '֐־׀׃׆׈-׏א-ת׫-ׯװ-ײ׳-״׵-׿߀-߉ߊ-ߪߴ-ߵߺ߻-߿ࠀ-ࠕࠚࠤࠨ࠮-࠯࠰-࠾࠿ࡀ-ࡘ࡜-࡝࡞࡟-࢟‏יִײַ-ﬨשׁ-זּ﬷טּ-לּ﬽מּ﬿נּ-סּ﭂ףּ-פּ﭅צּ-ﭏ'; const a = '؈؋؍؛؜؝؞-؟ؠ-ؿـف-ي٭ٮ-ٯٱ-ۓ۔ەۥ-ۦۮ-ۯۺ-ۼ۽-۾ۿ܀-܍܎܏ܐܒ-ܯ݋-݌ݍ-ޥޱ޲-޿ࢠ-ࢲࢳ-ࣣﭐ-ﮱ﮲-﯁﯂-﯒ﯓ-ﴽ﵀-﵏ﵐ-ﶏ﶐-﶑ﶒ-ﷇ﷈-﷏ﷰ-ﷻ﷼﷾-﷿ﹰ-ﹴ﹵ﹶ-ﻼ﻽-﻾'; const s = new RegExp(`${'[' + 'A-Za-zªµºÀ-ÖØ-öø-ƺƻƼ-ƿǀ-ǃǄ-ʓʔʕ-ʯʰ-ʸʻ-ˁː-ˑˠ-ˤˮͰ-ͳͶ-ͷͺͻ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҂Ҋ-ԯԱ-Ֆՙ՚-՟ա-և։ःऄ-हऻऽा-ीॉ-ौॎ-ॏॐक़-ॡ।-॥०-९॰ॱॲ-ঀং-ঃঅ-ঌএ-ঐও-নপ-রলশ-হঽা-ীে-ৈো-ৌৎৗড়-ঢ়য়-ৡ০-৯ৰ-ৱ৴-৹৺ਃਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਾ-ੀਖ਼-ੜਫ਼੦-੯ੲ-ੴઃઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽા-ીૉો-ૌૐૠ-ૡ૦-૯૰ଂ-ଃଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽାୀେ-ୈୋ-ୌୗଡ଼-ଢ଼ୟ-ୡ୦-୯୰ୱ୲-୷ஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹா-ிு-ூெ-ைொ-ௌௐௗ௦-௯௰-௲ఁ-ఃఅ-ఌఎ-ఐఒ-నప-హఽు-ౄౘ-ౙౠ-ౡ౦-౯౿ಂ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽಾಿೀ-ೄೆೇ-ೈೊ-ೋೕ-ೖೞೠ-ೡ೦-೯ೱ-ೲം-ഃഅ-ഌഎ-ഐഒ-ഺഽാ-ീെ-ൈൊ-ൌൎൗൠ-ൡ൦-൯൰-൵൹ൺ-ൿං-ඃඅ-ඖක-නඳ-රලව-ෆා-ෑෘ-ෟ෦-෯ෲ-ෳ෴ก-ะา-ำเ-ๅๆ๏๐-๙๚-๛ກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆ໐-໙ໜ-ໟༀ༁-༃༄-༒༓༔༕-༗༚-༟༠-༩༪-༳༴༶༸༾-༿ཀ-ཇཉ-ཬཿ྅ྈ-ྌ྾-࿅࿇-࿌࿎-࿏࿐-࿔࿕-࿘࿙-࿚က-ဪါ-ာေးျ-ြဿ၀-၉၊-၏ၐ-ၕၖ-ၗၚ-ၝၡၢ-ၤၥ-ၦၧ-ၭၮ-ၰၵ-ႁႃ-ႄႇ-ႌႎႏ႐-႙ႚ-ႜ႞-႟Ⴀ-ჅჇჍა-ჺ჻ჼჽ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፠-፨፩-፼ᎀ-ᎏᎠ-Ᏼᐁ-ᙬ᙭-᙮ᙯ-ᙿᚁ-ᚚᚠ-ᛪ᛫-᛭ᛮ-ᛰᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱ᜵-᜶ᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳាើ-ៅះ-ៈ។-៖ៗ៘-៚ៜ០-៩᠐-᠙ᠠ-ᡂᡃᡄ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᤣ-ᤦᤩ-ᤫᤰ-ᤱᤳ-ᤸ᥆-᥏ᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧀᧁ-ᧇᧈ-ᧉ᧐-᧙᧚ᨀ-ᨖᨙ-ᨚ᨞-᨟ᨠ-ᩔᩕᩗᩡᩣ-ᩤᩭ-ᩲ᪀-᪉᪐-᪙᪠-᪦ᪧ᪨-᪭ᬄᬅ-ᬳᬵᬻᬽ-ᭁᭃ-᭄ᭅ-ᭋ᭐-᭙᭚-᭠᭡-᭪᭴-᭼ᮂᮃ-ᮠᮡᮦ-ᮧ᮪ᮮ-ᮯ᮰-᮹ᮺ-ᯥᯧᯪ-ᯬᯮ᯲-᯳᯼-᯿ᰀ-ᰣᰤ-ᰫᰴ-ᰵ᰻-᰿᱀-᱉ᱍ-ᱏ᱐-᱙ᱚ-ᱷᱸ-ᱽ᱾-᱿᳀-᳇᳓᳡ᳩ-ᳬᳮ-ᳱᳲ-ᳳᳵ-ᳶᴀ-ᴫᴬ-ᵪᵫ-ᵷᵸᵹ-ᶚᶛ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‎ⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℴℵ-ℸℹℼ-ℿⅅ-ⅉⅎ⅏Ⅰ-ↂↃ-ↄↅ-ↈ⌶-⍺⎕⒜-ⓩ⚬⠀-⣿Ⰰ-Ⱞⰰ-ⱞⱠ-ⱻⱼ-ⱽⱾ-ⳤⳫ-ⳮⳲ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵰ⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々〆〇〡-〩〮-〯〱-〵〸-〺〻〼ぁ-ゖゝ-ゞゟァ-ヺー-ヾヿㄅ-ㄭㄱ-ㆎ㆐-㆑㆒-㆕㆖-㆟ㆠ-ㆺㇰ-ㇿ㈀-㈜㈠-㈩㈪-㉇㉈-㉏㉠-㉻㉿㊀-㊉㊊-㊰㋀-㋋㋐-㋾㌀-㍶㍻-㏝㏠-㏾㐀-䶵一-鿌ꀀ-ꀔꀕꀖ-ꒌꓐ-ꓷꓸ-ꓽ꓾-꓿ꔀ-ꘋꘌꘐ-ꘟ꘠-꘩ꘪ-ꘫꙀ-ꙭꙮꚀ-ꚛꚜ-ꚝꚠ-ꛥꛦ-ꛯ꛲-꛷Ꜣ-ꝯꝰꝱ-ꞇ꞉-꞊Ꞌ-ꞎꞐ-ꞭꞰ-Ʇꟷꟸ-ꟹꟺꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꠣ-ꠤꠧ꠰-꠵꠶-꠷ꡀ-ꡳꢀ-ꢁꢂ-ꢳꢴ-ꣃ꣎-꣏꣐-꣙ꣲ-ꣷ꣸-꣺ꣻ꤀-꤉ꤊ-ꤥ꤮-꤯ꤰ-ꥆꥒ-꥓꥟ꥠ-ꥼꦃꦄ-ꦲꦴ-ꦵꦺ-ꦻꦽ-꧀꧁-꧍ꧏ꧐-꧙꧞-꧟ꧠ-ꧤꧦꧧ-ꧯ꧰-꧹ꧺ-ꧾꨀ-ꨨꨯ-ꨰꨳ-ꨴꩀ-ꩂꩄ-ꩋꩍ꩐-꩙꩜-꩟ꩠ-ꩯꩰꩱ-ꩶ꩷-꩹ꩺꩻꩽꩾ-ꪯꪱꪵ-ꪶꪹ-ꪽꫀꫂꫛ-ꫜꫝ꫞-꫟ꫠ-ꫪꫫꫮ-ꫯ꫰-꫱ꫲꫳ-ꫴꫵꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚ꭛ꭜ-ꭟꭤ-ꭥꯀ-ꯢꯣ-ꯤꯦ-ꯧꯩ-ꯪ꯫꯬꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ-豈-舘並-龎ﬀ-ﬆﬓ-ﬗＡ-Ｚａ-ｚｦ-ｯｰｱ-ﾝﾞ-ﾟﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ'}${o}${a}]`); const u = new RegExp(`[${o}${a}]`); function c(t) { const e = s.exec(t); return e == null ? null : e[0]; } function l(t) { const e = c(t); return e == null ? n.NEUTRAL : u.exec(e) ? n.RTL : n.LTR; } function f(t, e) { if (e = e || n.NEUTRAL, !t.length) return e; const r = l(t); return r === n.NEUTRAL ? e : r; } function p(t, e) { return e || (e = n.getGlobalDir()), n.isStrong(e) || i(!1), f(t, e); } const h = {
      firstStrongChar: c, firstStrongCharDir: l, resolveBlockDir: f, getDirection: p, isDirectionLTR(t, e) { return p(t, e) === n.LTR; }, isDirectionRTL(t, e) { return p(t, e) === n.RTL; },
    }; t.exports = h;
  },
  GSkh(t, e, r) {
    const n = r('rim0'); const i = r('tI3i'); const o = n.isBrowser('IE <= 9'); t.exports = function (t) { let e; let r = null; return !o && document.implementation && document.implementation.createHTMLDocument && ((e = document.implementation.createHTMLDocument('foo')).documentElement || i(!1), e.documentElement.innerHTML = t, r = e.getElementsByTagName('body')[0]), r; };
  },
  GyyK(t, e, r) {
    function n(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const i = r('IbSy'); const o = r('YM28'); const a = r('IvBP'); const s = r('mTn+'); const u = r('zYrz'); const c = r('tI3i'); const l = function (t, e) {
      return {
        key: t.getKey(), text: t.getText(), type: t.getType(), depth: t.getDepth(), inlineStyleRanges: u(t), entityRanges: s(t, e), data: t.getData().toObject(),
      };
    }; const f = function (t, e, r, a) { if (t instanceof i)r.push(l(t, e)); else { t instanceof o || c(!1); const s = t.getParentKey(); const u = a[t.getKey()] = (function (t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let i = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (i = i.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), i.forEach(((e) => { n(t, e, r[e]); })); } return t; }({}, l(t, e), { children: [] })); s ? a[s].children.push(u) : r.push(u); } }; t.exports = function (t) { let e = { entityMap: {}, blocks: [] }; return e = (function (t, e) { const r = e.entityMap; const n = []; const i = {}; const o = {}; let s = 0; return t.getBlockMap().forEach(((t) => { t.findEntityRanges(((t) => t.getEntity() !== null), ((e) => { const n = t.getEntityAt(e); const i = a.stringify(n); o[i] || (o[i] = n, r[i] = ''.concat(s), s++); })), f(t, r, n, i); })), { blocks: n, entityMap: r }; }(t, e)), e = (function (t, e) { const r = e.blocks; const n = e.entityMap; const i = {}; return Object.keys(n).forEach(((e, r) => { const n = t.getEntity(a.unstringify(e)); i[r] = { type: n.getType(), mutability: n.getMutability(), data: n.getData() }; })), { blocks: r, entityMap: i }; }(t, e)); };
  },
  HKFH(t, e, r) {
    const n = r('b+nQ'); const i = r('Svze').Map; const o = { add(t, e, r) { return a(t, e, r, !0); }, remove(t, e, r) { return a(t, e, r, !1); } }; function a(t, e, r, o) { const a = t.getBlockMap(); const s = e.getStartKey(); const u = e.getStartOffset(); const c = e.getEndKey(); const l = e.getEndOffset(); const f = a.skipUntil(((t, e) => e === s)).takeUntil(((t, e) => e === c)).concat(i([[c, a.get(c)]])).map(((t, e) => { let i; let a; s === c ? (i = u, a = l) : (i = e === s ? u : 0, a = e === c ? l : t.getLength()); for (var f, p = t.getCharacterList(); i < a;)f = p.get(i), p = p.set(i, o ? n.applyStyle(f, r) : n.removeStyle(f, r)), i++; return t.set('characterList', p); })); return t.merge({ blockMap: a.merge(f), selectionBefore: e, selectionAfter: e }); }t.exports = o;
  },
  HdU4(t, e, r) {
    const n = r('YM28'); t.exports = function (t, e) { if (!(t instanceof n)) return null; const r = t.getNextSiblingKey(); if (r) return r; const i = t.getParentKey(); if (!i) return null; for (var o = e.get(i); o && !o.getNextSiblingKey();) { const a = o.getParentKey(); o = a ? e.get(a) : null; } return o ? o.getNextSiblingKey() : null; };
  },
  IDEf(t, e, r) {
    const n = (function (t) {
      let e; let r; function n() { return t.apply(this, arguments) || this; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const i = n.prototype; return i.serialize = function () { return `Anchor: ${this.getAnchorKey()}:${this.getAnchorOffset()}, Focus: ${this.getFocusKey()}:${this.getFocusOffset()}, Is Backward: ${String(this.getIsBackward())}, Has Focus: ${String(this.getHasFocus())}`; }, i.getAnchorKey = function () { return this.get('anchorKey'); }, i.getAnchorOffset = function () { return this.get('anchorOffset'); }, i.getFocusKey = function () { return this.get('focusKey'); }, i.getFocusOffset = function () { return this.get('focusOffset'); }, i.getIsBackward = function () { return this.get('isBackward'); }, i.getHasFocus = function () { return this.get('hasFocus'); }, i.hasEdgeWithin = function (t, e, r) { const n = this.getAnchorKey(); const i = this.getFocusKey(); if (n === i && n === t) { const o = this.getStartOffset(); const a = this.getEndOffset(); return e <= o && o <= r || e <= a && a <= r; } if (t !== n && t !== i) return !1; const s = t === n ? this.getAnchorOffset() : this.getFocusOffset(); return e <= s && r >= s; }, i.isCollapsed = function () { return this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset(); }, i.getStartKey = function () { return this.getIsBackward() ? this.getFocusKey() : this.getAnchorKey(); }, i.getStartOffset = function () { return this.getIsBackward() ? this.getFocusOffset() : this.getAnchorOffset(); }, i.getEndKey = function () { return this.getIsBackward() ? this.getAnchorKey() : this.getFocusKey(); }, i.getEndOffset = function () { return this.getIsBackward() ? this.getAnchorOffset() : this.getFocusOffset(); }, n.createEmpty = function (t) {
        return new n({
          anchorKey: t, anchorOffset: 0, focusKey: t, focusOffset: 0, isBackward: !1, hasFocus: !1,
        });
      }, n;
    }((0, r('Svze').Record)({
      anchorKey: '', anchorOffset: 0, focusKey: '', focusOffset: 0, isBackward: !1, hasFocus: !1,
    }))); t.exports = n;
  },
  IbSy(t, e, r) {
    const n = r('b+nQ'); const i = r('AL/+'); const o = r('Svze'); const a = o.List; const s = o.Map; const u = o.OrderedSet; const c = o.Record; const l = o.Repeat; const f = u(); const p = c({
      key: '', type: 'unstyled', text: '', characterList: a(), depth: 0, data: s(),
    }); const h = (function (t) { let e; let r; function o(e) { return t.call(this, (function (t) { if (!t) return t; const e = t.characterList; const r = t.text; return r && !e && (t.characterList = a(l(n.EMPTY, r.length))), t; }(e))) || this; }r = t, (e = o).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const s = o.prototype; return s.getKey = function () { return this.get('key'); }, s.getType = function () { return this.get('type'); }, s.getText = function () { return this.get('text'); }, s.getCharacterList = function () { return this.get('characterList'); }, s.getLength = function () { return this.getText().length; }, s.getDepth = function () { return this.get('depth'); }, s.getData = function () { return this.get('data'); }, s.getInlineStyleAt = function (t) { const e = this.getCharacterList().get(t); return e ? e.getStyle() : f; }, s.getEntityAt = function (t) { const e = this.getCharacterList().get(t); return e ? e.getEntity() : null; }, s.findStyleRanges = function (t, e) { i(this.getCharacterList(), d, t, e); }, s.findEntityRanges = function (t, e) { i(this.getCharacterList(), g, t, e); }, o; }(p)); function d(t, e) { return t.getStyle() === e.getStyle(); } function g(t, e) { return t.getEntity() === e.getEntity(); }t.exports = h;
  },
  IchF(t, e, r) {
    const n = r('M7w5'); const i = r('DtGU'); const o = r('7XzN'); const a = r('tI3i'); const s = r('13UR'); const u = r('hF1F'); function c(t, e, r) { let o = e; const c = n(o); (c != null || t && (t === o || t.firstChild === o) || a(!1), t === o) && (o = o.firstChild, s(o) || a(!1), (o = o).getAttribute('data-contents') !== 'true' && a(!1), r > 0 && (r = o.childNodes.length)); if (r === 0) { let f = null; if (c != null)f = c; else { const p = (function (t) { for (;t.firstChild && (s(t.firstChild) && t.firstChild.getAttribute('data-blocks') === 'true' || i(t.firstChild));)t = t.firstChild; return t; }(o)); f = u(i(p)); } return { key: f, offset: 0 }; } const h = o.childNodes[r - 1]; let d = null; let g = null; if (i(h)) { const y = (function (t) { for (;t.lastChild && (s(t.lastChild) && t.lastChild.getAttribute('data-blocks') === 'true' || i(t.lastChild));)t = t.lastChild; return t; }(h)); d = u(i(y)), g = l(y); } else d = u(c), g = l(h); return { key: d, offset: g }; } function l(t) { const e = t.textContent; return e === '\n' ? 0 : e.length; }t.exports = function (t, e, r, i, a, s) { const l = r.nodeType === Node.TEXT_NODE; const f = a.nodeType === Node.TEXT_NODE; if (l && f) return { selectionState: o(t, u(n(r)), i, u(n(a)), s), needsRecovery: !1 }; let p = null; let h = null; let d = !0; return l ? (p = { key: u(n(r)), offset: i }, h = c(e, a, s)) : f ? (h = { key: u(n(a)), offset: s }, p = c(e, r, i)) : (p = c(e, r, i), h = c(e, a, s), r === a && i === s && (d = !!r.firstChild && r.firstChild.nodeName !== 'BR')), { selectionState: o(t, p.key, p.offset, h.key, h.offset), needsRecovery: d }; };
  },
  IvBP(t, e, r) {
    const n = { stringify(t) { return `_${String(t)}`; }, unstringify(t) { return t.slice(1); } }; t.exports = n;
  },
  JAVJ(t, e, r) {
    const n = r('maj8'); function i() { return (i = n || function (t) { for (let e = 1; e < arguments.length; e++) { const r = arguments[e]; for (const n in r)Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]); } return t; }).apply(this, arguments); } function o(t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { a(t, e, r[e]); })); } return t; } function a(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const s = r('MOn9'); const u = r('b//S'); const c = r('ERkP'); const l = r('2Wwg'); const f = r('Y5pQ'); const p = r('hF1F'); const h = function (t, e, r, n) {
      return l({
        'public/DraftStyleDefault/unorderedListItem': t === 'unordered-list-item', 'public/DraftStyleDefault/orderedListItem': t === 'ordered-list-item', 'public/DraftStyleDefault/reset': r, 'public/DraftStyleDefault/depth0': e === 0, 'public/DraftStyleDefault/depth1': e === 1, 'public/DraftStyleDefault/depth2': e === 2, 'public/DraftStyleDefault/depth3': e === 3, 'public/DraftStyleDefault/depth4': e >= 4, 'public/DraftStyleDefault/listLTR': n === 'LTR', 'public/DraftStyleDefault/listRTL': n === 'RTL',
      });
    }; const d = (function (t) {
      let e; let r; function n() { return t.apply(this, arguments) || this; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const a = n.prototype; return a.shouldComponentUpdate = function (t) { const e = this.props.editorState; const r = t.editorState; if (e.getDirectionMap() !== r.getDirectionMap()) return !0; if (e.getSelection().getHasFocus() !== r.getSelection().getHasFocus()) return !0; const n = r.getNativelyRenderedContent(); const i = e.isInCompositionMode(); const o = r.isInCompositionMode(); if (e === r || n !== null && r.getCurrentContent() === n || i && o) return !1; const a = e.getCurrentContent(); const s = r.getCurrentContent(); const u = e.getDecorator(); const c = r.getDecorator(); return i !== o || a !== s || u !== c || r.mustForceSelection(); }, a.render = function () {
        for (var t = this.props, e = t.blockRenderMap, r = t.blockRendererFn, n = t.blockStyleFn, a = t.customStyleMap, l = t.customStyleFn, d = t.editorState, g = t.editorKey, y = t.preventScroll, v = t.textDirectionality, m = d.getCurrentContent(), _ = d.getSelection(), S = d.mustForceSelection(), b = d.getDecorator(), w = p(d.getDirectionMap()), k = m.getBlocksAsArray(), x = [], C = null, E = null, O = 0; O < k.length; O++) {
          const D = k[O]; const K = D.getKey(); const T = D.getType(); const M = r(D); let A = void 0; let I = void 0; let B = void 0; M && (A = M.component, I = M.props, B = M.editable); const R = v || w.get(K); const L = u.encode(K, 0, 0); const F = {
            contentState: m, block: D, blockProps: I, blockStyleFn: n, customStyleMap: a, customStyleFn: l, decorator: b, direction: R, forceSelection: S, offsetKey: L, preventScroll: y, selection: _, tree: d.getBlockTree(K),
          }; const N = e.get(T) || e.get('unstyled'); const P = N.wrapper; const z = N.element || e.get('unstyled').element; const U = D.getDepth(); let j = ''; if (n && (j = n(D)), z === 'li')j = f(j, h(T, U, E !== P || C === null || U > C, R)); const q = A || s; let H = {
            className: j, 'data-block': !0, 'data-editor': g, 'data-offset-key': L, key: K,
          }; void 0 !== B && (H = o({}, H, { contentEditable: B, suppressContentEditableWarning: !0 })); const W = c.createElement(z, H, c.createElement(q, i({}, F, { key: K }))); x.push({
            block: W, wrapperTemplate: P, key: K, offsetKey: L,
          }), C = P ? D.getDepth() : null, E = P;
        } for (var V = [], Y = 0; Y < x.length;) { const J = x[Y]; if (J.wrapperTemplate) { const X = []; do { X.push(x[Y].block), Y++; } while (Y < x.length && x[Y].wrapperTemplate === J.wrapperTemplate);const G = c.cloneElement(J.wrapperTemplate, { key: `${J.key}-wrap`, 'data-offset-key': J.offsetKey }, X); V.push(G); } else V.push(J.block), Y++; } return c.createElement('div', { 'data-contents': 'true' }, V);
      }, n;
    }(c.Component)); t.exports = d;
  },
  JtWY(t, e, r) {
    const n = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('AppleWebKit') > -1; t.exports = function (t) { return (t = t || document).scrollingElement ? t.scrollingElement : n || t.compatMode !== 'CSS1Compat' ? t.body : t.documentElement; };
  },
  KDIr(t, e, r) {
    const n = r('YM28'); const i = r('YSZ8'); const o = r('Svze'); const a = r('tI3i'); const s = r('WmAF'); const u = o.List; const c = o.Map; const l = function (t, e, r) { if (t) { const n = e.get(t); n && e.set(t, r(n)); } }; t.exports = function (t, e) {
      e.isCollapsed() || a(!1); const r = e.getAnchorKey(); const o = t.getBlockMap(); const f = o.get(r); const p = f.getText(); if (!p) { const h = f.getType(); if (h === 'unordered-list-item' || h === 'ordered-list-item') return s(t, e, ((t) => t.merge({ type: 'unstyled', depth: 0 }))); } const d = e.getAnchorOffset(); const g = f.getCharacterList(); const y = i(); const v = f instanceof n; const m = f.merge({ text: p.slice(0, d), characterList: g.slice(0, d) }); const _ = m.merge({
        key: y, text: p.slice(d), characterList: g.slice(d), data: c(),
      }); const S = o.toSeq().takeUntil(((t) => t === f)); const b = o.toSeq().skipUntil(((t) => t === f)).rest(); let w = S.concat([[r, m], [y, _]], b).toOrderedMap(); return v && (f.getChildKeys().isEmpty() || a(!1), w = (function (t, e, r) { return t.withMutations(((t) => { const n = e.getKey(); const i = r.getKey(); l(e.getParentKey(), t, ((t) => { const e = t.getChildKeys(); const r = e.indexOf(n) + 1; const o = e.toArray(); return o.splice(r, 0, i), t.merge({ children: u(o) }); })), l(e.getNextSiblingKey(), t, ((t) => t.merge({ prevSibling: i }))), l(n, t, ((t) => t.merge({ nextSibling: i }))), l(i, t, ((t) => t.merge({ prevSibling: n }))); })); }(w, m, _))), t.merge({
        blockMap: w,
        selectionBefore: e,
        selectionAfter: e.merge({
          anchorKey: y, anchorOffset: 0, focusKey: y, focusOffset: 0, isBackward: !1,
        }),
      });
    };
  },
  KOTo(t, e, r) {
    function n(t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { i(t, e, r[e]); })); } return t; } function i(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const o = r('IbSy'); const a = r('YM28'); const s = r('VeLA'); const u = r('krsZ'); const c = r('bdcm'); const l = (r('B3y8'), r('IDEf')); const f = r('hgxY'); const p = r('NgPv'); const h = r('DZH9'); const d = r('YSZ8'); const g = r('ZUd0'); const y = r('Svze'); const v = r('tI3i'); const m = g('draft_tree_data_support'); const _ = y.List; const S = y.Map; const b = y.OrderedMap; const w = function (t, e) {
      const r = t.key; const n = t.type; const i = t.data; return {
        text: t.text, depth: t.depth || 0, type: n || 'unstyled', key: r || d(), data: S(i), characterList: k(t, e),
      };
    }; var k = function (t, e) { const r = t.text; const i = t.entityRanges; const o = t.inlineStyleRanges; const a = i || []; return f(h(r, o || []), p(r, a.filter(((t) => e.hasOwnProperty(t.key))).map(((t) => n({}, t, { key: e[t.key] }))))); }; const x = function (t) { return n({}, t, { key: t.key || d() }); }; const C = function (t, e, r) { const i = e.map(((t) => n({}, t, { parentRef: r }))); return t.concat(i.reverse()); }; const E = function (t, e) {
      const r = t.blocks.find(((t) => Array.isArray(t.children) && t.children.length > 0)); const i = m && !r ? c.fromRawStateToRawTreeState(t).blocks : t.blocks; return m ? (function (t, e) {
        return t.map(x).reduce(((r, i, o) => {
          Array.isArray(i.children) || v(!1); const s = i.children.map(x); const u = new a(n({}, w(i, e), { prevSibling: o === 0 ? null : t[o - 1].key, nextSibling: o === t.length - 1 ? null : t[o + 1].key, children: _(s.map(((t) => t.key))) })); r = r.set(u.getKey(), u); for (let c = C([], s, u); c.length > 0;) {
            const l = c.pop(); const f = l.parentRef; const p = f.getChildKeys(); const h = p.indexOf(l.key); const d = Array.isArray(l.children); if (!d) { d || v(!1); break; } const g = l.children.map(x); const y = new a(n({}, w(l, e), {
              parent: f.getKey(), children: _(g.map(((t) => t.key))), prevSibling: h === 0 ? null : p.get(h - 1), nextSibling: h === p.size - 1 ? null : p.get(h + 1),
            })); r = r.set(y.getKey(), y), c = C(c, g, y);
          } return r;
        }), b());
      }(i, e)) : (function (t, e) { return b(t.map(((t) => { const r = new o(w(t, e)); return [r.getKey(), r]; }))); }(r ? c.fromRawTreeStateToRawState(t).blocks : i, e));
    }; t.exports = function (t) {
      Array.isArray(t.blocks) || v(!1); const e = (function (t) { const e = t.entityMap; const r = {}; return Object.keys(e).forEach(((t) => { const n = e[t]; const i = n.type; const o = n.mutability; const a = n.data; r[t] = u.__create(i, o, a || {}); })), r; }(t)); const r = E(t, e); const n = r.isEmpty() ? new l() : l.createEmpty(r.first().getKey()); return new s({
        blockMap: r, entityMap: e, selectionBefore: n, selectionAfter: n,
      });
    };
  },
  KXNC(t, e, r) {
    const n = r('rim0'); const i = r('tI3i'); const o = n.isBrowser('Chrome') ? function (t) { for (let e = t.cloneRange(), r = [], n = t.endContainer; n != null; n = n.parentNode) { const o = n === t.commonAncestorContainer; o ? e.setStart(t.startContainer, t.startOffset) : e.setStart(e.endContainer, 0); var a; const s = Array.from(e.getClientRects()); if (r.push(s), o) return r.reverse(), (a = []).concat.apply(a, r); e.setEndBefore(n); }i(!1); } : function (t) { return Array.from(t.getClientRects()); }; t.exports = o;
  },
  KqX8(t, e, r) {
    const n = r('tI3i'); const i = r('gUTI'); t.exports = function (t) { const e = t.editorContainer; return e || n(!1), i(e.firstChild) || n(!1), e.firstChild; };
  },
  LYv7(t, e, r) {
    t.exports = function (t) { const e = (t ? t.ownerDocument || t : document).defaultView || window; return !(!t || !(typeof e.Node === 'function' ? t instanceof e.Node : typeof t === 'object' && typeof t.nodeType === 'number' && typeof t.nodeName === 'string')); };
  },
  LtnY(t, e, r) {
    const n = r('ooRk'); const i = r('b+nQ'); const o = r('djSO'); const a = r('7002'); const s = r('EYg6'); const u = r('1xkk'); const c = r('9Kr7'); const l = r('e59y'); const f = r('VVXv'); const p = r('X+Re'); const h = r('cQcL'); function d(t, e, r) { const n = a.replaceWithFragment(t.getCurrentContent(), t.getSelection(), e); return u.push(t, n.set('entityMap', r), 'insert-fragment'); }t.exports = function (t, e) { e.preventDefault(); const r = new o(e.clipboardData); if (!r.isRichText()) { const g = r.getFiles(); const y = r.getText(); if (g.length > 0) { if (t.props.handlePastedFiles && p(t.props.handlePastedFiles(g))) return; return void f(g, ((e) => { if (e = e || y) { const r = t._latestEditorState; const o = h(e); const f = i.create({ style: r.getCurrentInlineStyle(), entity: l(r.getCurrentContent(), r.getSelection()) }); const p = c.getCurrentBlockType(r); const d = s.processText(o, f, p); const g = n.createFromArray(d); const v = a.replaceWithFragment(r.getCurrentContent(), r.getSelection(), g); t.update(u.push(r, v, 'insert-fragment')); } })); } } let v = []; const m = r.getText(); const _ = r.getHTML(); const S = t._latestEditorState; if (!t.props.handlePastedText || !p(t.props.handlePastedText(m, _, S))) { if (m && (v = h(m)), !t.props.stripPastedStyles) { const b = t.getClipboard(); if (r.isRichText() && b) { if (_.indexOf(t.getEditorKey()) !== -1 || v.length === 1 && b.size === 1 && b.first().getText() === m) return void t.update(d(t._latestEditorState, b)); } else if (b && r.types.includes('com.apple.webarchive') && !r.types.includes('text/html') && (function (t, e) { return t.length === e.size && e.valueSeq().every(((e, r) => e.getText() === t[r])); }(v, b))) return void t.update(d(t._latestEditorState, b)); if (_) { const w = s.processHTML(_, t.props.blockRenderMap); if (w) { const k = w.contentBlocks; const x = w.entityMap; if (k) { const C = n.createFromArray(k); return void t.update(d(t._latestEditorState, C, x)); } } }t.setClipboard(null); } if (v.length) { const E = i.create({ style: S.getCurrentInlineStyle(), entity: l(S.getCurrentContent(), S.getSelection()) }); const O = c.getCurrentBlockType(S); const D = s.processText(v, E, O); const K = n.createFromArray(D); t.update(d(t._latestEditorState, K)); } } };
  },
  LxfW(t, e, r) {
    t.exports = function (t) { return t.Window && t instanceof t.Window ? { x: t.pageXOffset || t.document.documentElement.scrollLeft, y: t.pageYOffset || t.document.documentElement.scrollTop } : { x: t.scrollLeft, y: t.scrollTop }; };
  },
  M6Be(t, e, r) {
    const n = r('1xkk'); const i = r('Cl3z'); const o = r('IchF'); const a = r('1AUG'); const s = r('4aXP'); t.exports = function (t, e) { const r = s(t, ((t) => { const r = t.getSelection(); if (r.isCollapsed() && r.getAnchorOffset() === 0) return a(t, 1); let n = e.currentTarget.ownerDocument.defaultView.getSelection().getRangeAt(0); return n = i(n), o(t, null, n.endContainer, n.endOffset, n.startContainer, n.startOffset).selectionState; }), 'backward'); return r === t.getCurrentContent() ? t : n.push(t, r, 'remove-range'); };
  },
  M7w5(t, e, r) {
    const n = r('vYw2'); const i = r('DtGU'); t.exports = function (t) { for (let e = t; e && e !== n(t).documentElement;) { const r = i(e); if (r != null) return r; e = e.parentNode; } return null; };
  },
  MIqs(t, e, r) {
    const n = r('LYv7'); t.exports = function (t) { return n(t) && t.nodeType == 3; };
  },
  MKsC(t, e, r) {
    t.exports = function (t) { return t && t.ownerDocument && t.ownerDocument.defaultView ? t.ownerDocument.defaultView : window; };
  },
  MOn9(t, e, r) {
    const n = r('maj8'); function i() { return (i = n || function (t) { for (let e = 1; e < arguments.length; e++) { const r = arguments[e]; for (const n in r)Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]); } return t; }).apply(this, arguments); } function o(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t; } function a(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const s = r('XPEN'); const u = r('b//S'); const c = r('ERkP'); const l = r('O+2R'); const f = r('/LAw'); const p = r('Fd87'); const h = r('n09L'); const d = r('2Wwg'); const g = r('CtAg'); const y = r('7MNd'); const v = r('BTrg'); const m = r('tI3i'); const _ = r('gUTI'); const S = r('hF1F'); const b = function (t, e) { return t.getAnchorKey() === e || t.getFocusKey() === e; }; const w = (function (t) {
      let e; let r; function n() { for (var e, r = arguments.length, n = new Array(r), i = 0; i < r; i++)n[i] = arguments[i]; return a(o(e = t.call.apply(t, [this].concat(n)) || this), '_node', void 0), e; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const w = n.prototype; return w.shouldComponentUpdate = function (t) { return this.props.block !== t.block || this.props.tree !== t.tree || this.props.direction !== t.direction || b(t.selection, t.block.getKey()) && t.forceSelection; }, w.componentDidMount = function () { if (!this.props.preventScroll) { const t = this.props.selection; const e = t.getEndKey(); if (t.getHasFocus() && e === this.props.block.getKey()) { const r = this._node; if (r != null) { let n; const i = f.getScrollParent(r); const o = y(i); if (i === window) { const a = g(r); (n = a.y + a.height - v().height) > 0 && window.scrollTo(o.x, o.y + n + 10); } else { _(r) || m(!1), (n = r.offsetHeight + r.offsetTop - (i.offsetTop + i.offsetHeight + o.y)) > 0 && l.setTop(i, l.getTop(i) + n + 10); } } } } }, w._renderChildren = function () {
        const t = this; const e = this.props.block; const r = e.getKey(); const n = e.getText(); const o = this.props.tree.size - 1; const a = b(this.props.selection, r); return this.props.tree.map(((l, f) => {
          const d = l.get('leaves'); if (d.size === 0) return null; const g = d.size - 1; const y = d.map(((i, l) => {
            const p = u.encode(r, f, l); const h = i.get('start'); const d = i.get('end'); return c.createElement(s, {
              key: p, offsetKey: p, block: e, start: h, selection: a ? t.props.selection : null, forceSelection: t.props.forceSelection, text: n.slice(h, d), styleSet: e.getInlineStyleAt(h), customStyleMap: t.props.customStyleMap, customStyleFn: t.props.customStyleFn, isLast: f === o && l === g,
            });
          })).toArray(); const v = l.get('decoratorKey'); if (v == null) return y; if (!t.props.decorator) return y; const m = S(t.props.decorator); const _ = m.getComponentForKey(v); if (!_) return y; const b = m.getPropsForKey(v); const w = u.encode(r, f, 0); const k = d.first().get('start'); const x = d.last().get('end'); const C = n.slice(k, x); const E = e.getEntityAt(l.get('start')); const O = h.getHTMLDirIfDifferent(p.getDirection(C), t.props.direction); const D = {
            contentState: t.props.contentState, decoratedText: C, dir: O, start: k, end: x, blockKey: r, entityKey: E, offsetKey: w,
          }; return c.createElement(_, i({}, b, D, { key: w }), y);
        })).toArray();
      }, w.render = function () { const t = this; const e = this.props; const r = e.direction; const n = e.offsetKey; const i = d({ 'public/DraftStyleDefault/block': !0, 'public/DraftStyleDefault/ltr': r === 'LTR', 'public/DraftStyleDefault/rtl': r === 'RTL' }); return c.createElement('div', { 'data-offset-key': n, className: i, ref(e) { return t._node = e; } }, this._renderChildren()); }, n;
    }(c.Component)); t.exports = w;
  },
  MzOC(t, e, r) {
    r('/2Cm'); t.exports = function (t, e) { let r; const n = t.getSelection(); const i = n.getStartKey(); const o = n.getStartOffset(); const a = t.getCurrentContent(); let s = i; return e > a.getBlockForKey(i).getText().length - o ? (s = a.getKeyAfter(i), r = 0) : r = o + e, n.merge({ focusKey: s, focusOffset: r }); };
  },
  NGtv(t, e, r) {
    const n = r('3as9'); const i = 'Unknown'; const o = { 'Mac OS': 'Mac OS X' }; let a; const s = (new n()).getResult(); const u = (function (t) { if (!t) return { major: '', minor: '' }; const e = t.split('.'); return { major: e[0], minor: e[1] }; }(s.browser.version)); const c = {
      browserArchitecture: s.cpu.architecture || i, browserFullVersion: s.browser.version || i, browserMinorVersion: u.minor || i, browserName: s.browser.name || i, browserVersion: s.browser.major || i, deviceName: s.device.model || i, engineName: s.engine.name || i, engineVersion: s.engine.version || i, platformArchitecture: s.cpu.architecture || i, platformName: (a = s.os.name, o[a] || a || i), platformVersion: s.os.version || i, platformFullVersion: s.os.version || i,
    }; t.exports = c;
  },
  NgPv(t, e, r) {
    const n = r('W6iK').substr; t.exports = function (t, e) { const r = Array(t.length).fill(null); return e && e.forEach(((e) => { for (let i = n(t, 0, e.offset).length, o = i + n(t, e.offset, e.length).length, a = i; a < o; a++)r[a] = e.key; })), r; };
  },
  'O+2R': function (t, e, r) {
    function n(t, e) { return !!e && (t === e.documentElement || t === e.body); } const i = {
      getTop(t) { const e = t.ownerDocument; return n(t, e) ? e.body.scrollTop || e.documentElement.scrollTop : t.scrollTop; }, setTop(t, e) { const r = t.ownerDocument; n(t, r) ? r.body.scrollTop = r.documentElement.scrollTop = e : t.scrollTop = e; }, getLeft(t) { const e = t.ownerDocument; return n(t, e) ? e.body.scrollLeft || e.documentElement.scrollLeft : t.scrollLeft; }, setLeft(t, e) { const r = t.ownerDocument; n(t, r) ? r.body.scrollLeft = r.documentElement.scrollLeft = e : t.scrollLeft = e; },
    }; t.exports = i;
  },
  OJbI(t, e, r) {
    const n = r('maj8'); function i() { return (i = n || function (t) { for (let e = 1; e < arguments.length; e++) { const r = arguments[e]; for (const n in r)Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]); } return t; }).apply(this, arguments); } const o = r('b//S'); const a = r('ERkP'); const s = r('Fd87'); const u = r('n09L'); const c = (function (t) {
      let e; let r; function n() { return t.apply(this, arguments) || this; } return r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r, n.prototype.render = function () {
        const t = this.props; const e = t.block; const r = t.children; const n = t.contentState; const c = t.decorator; const l = t.decoratorKey; const f = t.direction; const p = t.leafSet; const h = t.text; const d = e.getKey(); const g = p.get('leaves'); const y = c.getComponentForKey(l); const v = c.getPropsForKey(l); const m = o.encode(d, parseInt(l, 10), 0); const _ = h.slice(g.first().get('start'), g.last().get('end')); const S = u.getHTMLDirIfDifferent(s.getDirection(_), f); return a.createElement(y, i({}, v, {
          contentState: n, decoratedText: _, dir: S, key: m, entityKey: e.getEntityAt(p.get('start')), offsetKey: m,
        }), r);
      }, n;
    }(a.Component)); t.exports = c;
  },
  OTOR(t, e, r) {
    t.exports = function () { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ((t) => { const e = 16 * Math.random() | 0; return (t == 'x' ? e : 3 & e | 8).toString(16); })); };
  },
  ObfX(t, e, r) {
    t.exports = {
      BACKSPACE: 8, TAB: 9, RETURN: 13, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46, COMMA: 188, PERIOD: 190, A: 65, Z: 90, ZERO: 48, NUMPAD_0: 96, NUMPAD_9: 105,
    };
  },
  'P/Gd': function (t, e, r) {
    const n = r('7002');
    const i = r('b//S');
    const o = r('1xkk');
    const a = r('rim0');
    const s = r('RXrk').notEmptyKey;
    const u = r('M7w5');
    const c = r('ZFda');
    const l = r('hF1F');
    const f = a.isEngine('Gecko'); t.exports = function (t, e) {
      void 0 !== t._pendingStateFromBeforeInput && (t.update(t._pendingStateFromBeforeInput), t._pendingStateFromBeforeInput = void 0); const r = t.editor.ownerDocument.defaultView.getSelection();
      const a = r.anchorNode;
      const p = r.isCollapsed;
      const h = (a == null ? void 0 : a.nodeType) !== Node.TEXT_NODE && (a == null ? void 0 : a.nodeType) !== Node.ELEMENT_NODE; if (a != null && !h) {
        if (a.nodeType === Node.TEXT_NODE && (a.previousSibling !== null || a.nextSibling !== null)) { const d = a.parentNode; if (d == null) return; a.nodeValue = d.textContent; for (let g = d.firstChild; g != null; g = g.nextSibling)g !== a && d.removeChild(g); } let y = a.textContent;
        const v = t._latestEditorState;
        const m = l(u(a));
        const _ = i.decode(m);
        const S = _.blockKey;
        const b = _.decoratorKey;
        const w = _.leafKey;
        const k = v.getBlockTree(S).getIn([b, 'leaves', w]);
        const x = k.start;
        const C = k.end;
        const E = v.getCurrentContent();
        const O = E.getBlockForKey(S);
        const D = O.getText().slice(x, C); if (y.endsWith('\n\n') && (y = y.slice(0, -1)), y !== D) {
          let K;
          let T;
          let M;
          let A;
          const I = v.getSelection();
          const B = I.merge({ anchorOffset: x, focusOffset: C, isBackward: !1 });
          const R = O.getEntityAt(x);
          const L = s(R) ? E.getEntity(R) : null;
          const F = (L != null ? L.getMutability() : null) === 'MUTABLE';
          const N = F ? 'spellcheck-change' : 'apply-entity';
          const P = n.replaceText(E, B, y, O.getInlineStyleAt(x), F ? O.getEntityAt(x) : null); if (f)K = r.anchorOffset, T = r.focusOffset, A = (M = x + Math.min(K, T)) + Math.abs(K - T), K = M, T = A; else { const z = y.length - D.length; M = I.getStartOffset(), A = I.getEndOffset(), K = p ? A + z : M, T = A + z; } const U = P.merge({ selectionBefore: E.getSelectionAfter(), selectionAfter: I.merge({ anchorOffset: K, focusOffset: T }) }); t.update(o.push(v, U, N));
        } else { const j = e.nativeEvent.inputType; if (j) { const q = (function (t, e) { switch (t) { case 'deleteContentBackward': return c(e); } return e; }(j, v)); if (q !== v) return t.restoreEditorDOM(), void t.update(q); } }
      }
    };
  },
  PrWI(t, e, r) {
    const n = r('hDHP'); t.exports = function (t) { const e = t.getSelection(); return e.isCollapsed() ? null : n(t.getCurrentContent(), e); };
  },
  QAfK(t, e, r) {
    const n = r('ZUd0')('draft_tree_data_support'); t.exports = r(n ? 'vHsC' : 'JAVJ');
  },
  QCHf(t, e, r) {
    const n = r('YM28'); const i = r('HdU4'); const o = r('Svze'); const a = (o.List, o.Map); const s = function (t, e, r) { if (t) { const n = e.get(t); n && e.set(t, r(n)); } }; const u = function (t, e) { const r = []; if (!t) return r; for (let n = e.get(t); n && n.getParentKey();) { const i = n.getParentKey(); i && r.push(i), n = i ? e.get(i) : null; } return r; }; const c = function (t, e, r) { if (!t) return null; for (var n = r.get(t.getKey()).getNextSiblingKey(); n && !e.get(n);)n = r.get(n).getNextSiblingKey() || null; return n; }; const l = function (t, e, r) { if (!t) return null; for (var n = r.get(t.getKey()).getPrevSiblingKey(); n && !e.get(n);)n = r.get(n).getPrevSiblingKey() || null; return n; }; const f = function (t, e, r, n) { return t.withMutations(((o) => { if (s(e.getKey(), o, ((t) => t.merge({ nextSibling: c(t, o, n), prevSibling: l(t, o, n) }))), s(r.getKey(), o, ((t) => t.merge({ nextSibling: c(t, o, n), prevSibling: l(t, o, n) }))), u(e.getKey(), n).forEach(((t) => s(t, o, ((t) => t.merge({ children: t.getChildKeys().filter(((t) => o.get(t))), nextSibling: c(t, o, n), prevSibling: l(t, o, n) }))))), s(e.getNextSiblingKey(), o, ((t) => t.merge({ prevSibling: e.getPrevSiblingKey() }))), s(e.getPrevSiblingKey(), o, ((t) => t.merge({ nextSibling: c(t, o, n) }))), s(r.getNextSiblingKey(), o, ((t) => t.merge({ prevSibling: l(t, o, n) }))), s(r.getPrevSiblingKey(), o, ((t) => t.merge({ nextSibling: r.getNextSiblingKey() }))), u(r.getKey(), n).forEach(((t) => { s(t, o, ((t) => t.merge({ children: t.getChildKeys().filter(((t) => o.get(t))), nextSibling: c(t, o, n), prevSibling: l(t, o, n) }))); })), (function (t, e) { const r = []; if (!t) return r; for (let n = i(t, e); n && e.get(n);) { const o = e.get(n); r.push(n), n = o.getParentKey() ? i(o, e) : null; } return r; }(r, n)).forEach(((t) => s(t, o, ((t) => t.merge({ nextSibling: c(t, o, n), prevSibling: l(t, o, n) }))))), t.get(e.getKey()) == null && t.get(r.getKey()) != null && r.getParentKey() === e.getKey() && r.getPrevSiblingKey() == null) { const a = e.getPrevSiblingKey(); s(r.getKey(), o, ((t) => t.merge({ prevSibling: a }))), s(a, o, ((t) => t.merge({ nextSibling: r.getKey() }))); const f = a ? t.get(a) : null; const p = f ? f.getParentKey() : null; if (e.getChildKeys().forEach(((t) => { s(t, o, ((t) => t.merge({ parent: p }))); })), p != null) { const h = t.get(p); s(p, o, ((t) => t.merge({ children: h.getChildKeys().concat(e.getChildKeys()) }))); }s(e.getChildKeys().find(((e) => t.get(e).getNextSiblingKey() === null)), o, ((t) => t.merge({ nextSibling: e.getNextSiblingKey() }))); } })); }; const p = function (t, e, r) { if (e === 0) for (;e < r;)t = t.shift(), e++; else if (r === t.count()) for (;r > e;)t = t.pop(), r--; else { const n = t.slice(0, e); const i = t.slice(r); t = n.concat(i).toList(); } return t; }; t.exports = function (t, e) {
      if (e.isCollapsed()) return t; let r; const o = t.getBlockMap(); const s = e.getStartKey(); const c = e.getStartOffset(); const l = e.getEndKey(); const h = e.getEndOffset(); const d = o.get(s); const g = o.get(l); const y = d instanceof n; let v = []; if (y) { const m = g.getChildKeys(); const _ = u(l, o); g.getNextSiblingKey() && (v = v.concat(_)), m.isEmpty() || (v = v.concat(_.concat([l]))), v = v.concat(u(i(g, o), o)); }r = d === g ? p(d.getCharacterList(), c, h) : d.getCharacterList().slice(0, c).concat(g.getCharacterList().slice(h)); const S = d.merge({ text: d.getText().slice(0, c) + g.getText().slice(h), characterList: r }); const b = y && c === 0 && h === 0 && g.getParentKey() === s && g.getPrevSiblingKey() == null ? a([[s, null]]) : o.toSeq().skipUntil(((t, e) => e === s)).takeUntil(((t, e) => e === l)).filter(((t, e) => v.indexOf(e) === -1))
        .concat(a([[l, null]]))
        .map(((t, e) => (e === s ? S : null))); let w = o.merge(b).filter(((t) => !!t)); return y && d !== g && (w = f(w, d, g, o)), t.merge({
        blockMap: w,
        selectionBefore: e,
        selectionAfter: e.merge({
          anchorKey: s, anchorOffset: c, focusKey: s, focusOffset: c, isBackward: !1,
        }),
      });
    };
  },
  QVkg(t, e, r) {
    const n = r('rim0'); const i = r('r5/r'); const o = r('Vwge'); const a = r('oNIj'); const s = r('fNrL'); const u = r('k5bp'); const c = r('gLP3'); const l = r('58Uu'); const f = r('glMO'); const p = r('P/Gd'); const h = r('njFt'); const d = r('LtnY'); const g = r('DuSR'); const y = n.isBrowser('Chrome'); const v = n.isBrowser('Firefox'); const m = y || v ? g : function (t) {}; const _ = {
      onBeforeInput: i, onBlur: o, onCompositionStart: a, onCopy: s, onCut: u, onDragOver: c, onDragStart: l, onFocus: f, onInput: p, onKeyDown: h, onPaste: d, onSelect: g, onMouseUp: m, onKeyUp: m,
    }; t.exports = _;
  },
  R0VQ(t, e, r) {
    const n = r('KXNC'); t.exports = function (t) {
      const e = n(t); let r = 0; let i = 0; let o = 0; let a = 0; if (e.length) { if (e.length > 1 && e[0].width === 0) { const s = e[1]; r = s.top, i = s.right, o = s.bottom, a = s.left; } else { const u = e[0]; r = u.top, i = u.right, o = u.bottom, a = u.left; } for (let c = 1; c < e.length; c++) { const l = e[c]; l.height !== 0 && l.width !== 0 && (r = Math.min(r, l.top), i = Math.max(i, l.right), o = Math.max(o, l.bottom), a = Math.min(a, l.left)); } } return {
        top: r, right: i, bottom: o, left: a, width: i - a, height: o - r,
      };
    };
  },
  RH6X(t, e, r) {
    r('kYxP'); const n = r('KEM+'); const i = r.n(n); const o = r('ERkP'); const a = r('oEoC'); const s = r('2dXj'); const u = r('GZwR'); const c = r('zpdM'); class l extends o.Component {
      constructor(...t) {
        super(...t), i()(this, 'state', { queryContext: void 0, canShowTypeahead: !1 }), i()(this, '_genericWrapperRef', o.createRef()), i()(this, 'render', () => {
          const {
            children: t, contextText: e, isInline: r, onTypeaheadStateChange: n, source: i,
          } = this.props; const { queryContext: a, canShowTypeahead: c } = this.state; const l = c && a ? { word: a.word, resultType: a.resultType } : void 0; return o.createElement(s.a, {
            contextText: e, isInline: r, onDismiss: this._handleDismiss, onSelectItem: this._handleSelectItem, onTypeaheadStateChange: n, query: l, ref: this._genericWrapperRef, source: i || u.d.Compose,
          }, t(this._handleInputChange));
        }), i()(this, '_getCaret', (t) => t.getSelection().getStartOffset()), i()(this, '_getPlaintextFromCurrentBlock', (t) => { const e = t.getSelection().anchorKey; return t.getCurrentContent().getBlockForKey(e).getText(); }), i()(this, '_handleSelectItem', (t) => { const { onTextUpdated: e } = this.props; const { queryContext: r } = this.state; if (r) { const n = r.resultType === 'users' && t.type === 'user' ? `@${t.data.screen_name} ` : `${t.data.topic || t.data.text || ''} `; e(this._replaceToken(n, r)); } this._setQueryContext(void 0); }), i()(this, '_handleInputChange', (t) => {
          const { queryContext: e } = this.state; const r = e && e.word; const n = this._getPlaintextFromCurrentBlock(t); const { word: i, start: o, end: s } = a.c(this._getCaret(t), n); const u = a.d(i || '', 'compose'); if ((u == null ? void 0 : u.q) !== r) {
            if (this._genericWrapperRef.current && this._genericWrapperRef.current.resetSelectedItem(), o === -1) this._setQueryContext(void 0); else if (u) {
              const { q: e, result_type: r } = u; this._setQueryContext({
                word: e, resultType: r, editorState: t, startIndex: o, endIndex: s,
              });
            } else this._setQueryContext(void 0);
          }
        }), i()(this, '_setQueryContext', (t) => this.setState({ queryContext: t, canShowTypeahead: !!t })), i()(this, '_handleDismiss', () => this.setState({ canShowTypeahead: !1 }));
      }

      _replaceToken(t, e) { const { startIndex: r, endIndex: n, editorState: i } = e; const o = i.getSelection().merge({ anchorKey: i.getSelection().getFocusKey(), anchorOffset: r, focusOffset: n }); const a = c.Modifier.replaceText(i.getCurrentContent(), o, t); const s = c.EditorState.push(i, a, 'insert-characters'); const u = r + t.length; const l = s.getSelection().merge({ anchorOffset: u, focusOffset: u }); return c.EditorState.forceSelection(s, l); }
    }e.a = l;
  },
  RXrk(t, e, r) {
    t.exports = { notEmptyKey(t) { return t != null && t != ''; } };
  },
  Svze(t, e, r) {
    t.exports = (function () {
      const t = Array.prototype.slice; function e(t, e) { e && (t.prototype = Object.create(e.prototype)), t.prototype.constructor = t; } function r(t) { return a(t) ? t : j(t); } function n(t) { return s(t) ? t : q(t); } function i(t) { return u(t) ? t : H(t); } function o(t) { return a(t) && !c(t) ? t : W(t); } function a(t) { return !(!t || !t[f]); } function s(t) { return !(!t || !t[p]); } function u(t) { return !(!t || !t[h]); } function c(t) { return s(t) || u(t); } function l(t) { return !(!t || !t[d]); }e(n, r), e(i, r), e(o, r), r.isIterable = a, r.isKeyed = s, r.isIndexed = u, r.isAssociative = c, r.isOrdered = l, r.Keyed = n, r.Indexed = i, r.Set = o; var f = '@@__IMMUTABLE_ITERABLE__@@'; var p = '@@__IMMUTABLE_KEYED__@@'; var h = '@@__IMMUTABLE_INDEXED__@@'; var d = '@@__IMMUTABLE_ORDERED__@@'; const g = {}; const y = { value: !1 }; const v = { value: !1 }; function m(t) { return t.value = !1, t; } function _(t) { t && (t.value = !0); } function S() {} function b(t, e) { e = e || 0; for (var r = Math.max(0, t.length - e), n = new Array(r), i = 0; i < r; i++)n[i] = t[i + e]; return n; } function w(t) { return void 0 === t.size && (t.size = t.__iterate(x)), t.size; } function k(t, e) { if (typeof e !== 'number') { const r = e >>> 0; if (`${r}` !== e || r === 4294967295) return NaN; e = r; } return e < 0 ? w(t) + e : e; } function x() { return !0; } function C(t, e, r) { return (t === 0 || void 0 !== r && t <= -r) && (void 0 === e || void 0 !== r && e >= r); } function E(t, e) { return D(t, e, 0); } function O(t, e) { return D(t, e, e); } function D(t, e, r) { return void 0 === t ? r : t < 0 ? Math.max(0, e + t) : void 0 === e ? t : Math.min(e, t); } let K; let T; let M; const A = typeof Symbol === 'function' && Symbol.iterator; const I = A || '@@iterator'; function B(t) { this.next = t; } function R(t, e, r, n) { const i = t === 0 ? e : t === 1 ? r : [e, r]; return n ? n.value = i : n = { value: i, done: !1 }, n; } function L() { return { value: void 0, done: !0 }; } function F(t) { return !!z(t); } function N(t) { return t && typeof t.next === 'function'; } function P(t) { const e = z(t); return e && e.call(t); } function z(t) { const e = t && (A && t[A] || t['@@iterator']); if (typeof e === 'function') return e; } function U(t) { return t && typeof t.length === 'number'; } function j(t) { return t == null ? Z() : a(t) ? t.toSeq() : (function (t) { const e = tt(t) || typeof t === 'object' && new Y(t); if (!e) throw new TypeError(`Expected Array or iterable object of values, or keyed object: ${t}`); return e; }(t)); } function q(t) { return t == null ? Z().toKeyedSeq() : a(t) ? s(t) ? t.toSeq() : t.fromEntrySeq() : Q(t); } function H(t) { return t == null ? Z() : a(t) ? s(t) ? t.entrySeq() : t.toIndexedSeq() : $(t); } function W(t) { return (t == null ? Z() : a(t) ? s(t) ? t.entrySeq() : t : $(t)).toSetSeq(); } function V(t) { this._array = t, this.size = t.length; } function Y(t) { const e = Object.keys(t); this._object = t, this._keys = e, this.size = e.length; } function J(t) { this._iterable = t, this.size = t.length || t.size; } function X(t) { this._iterator = t, this._iteratorCache = []; } function G(t) { return !(!t || !t['@@__IMMUTABLE_SEQ__@@']); } function Z() { return K || (K = new V([])); } function Q(t) { const e = Array.isArray(t) ? new V(t).fromEntrySeq() : N(t) ? new X(t).fromEntrySeq() : F(t) ? new J(t).fromEntrySeq() : typeof t === 'object' ? new Y(t) : void 0; if (!e) throw new TypeError(`Expected Array or iterable object of [k, v] entries, or keyed object: ${t}`); return e; } function $(t) { const e = tt(t); if (!e) throw new TypeError(`Expected Array or iterable object of values: ${t}`); return e; } function tt(t) { return U(t) ? new V(t) : N(t) ? new X(t) : F(t) ? new J(t) : void 0; } function et(t, e, r, n) { const i = t._cache; if (i) { for (var o = i.length - 1, a = 0; a <= o; a++) { const s = i[r ? o - a : a]; if (!1 === e(s[1], n ? s[0] : a, t)) return a + 1; } return a; } return t.__iterateUncached(e, r); } function rt(t, e, r, n) { const i = t._cache; if (i) { const o = i.length - 1; let a = 0; return new B(((() => { const t = i[r ? o - a : a]; return a++ > o ? { value: void 0, done: !0 } : R(e, n ? t[0] : a - 1, t[1]); }))); } return t.__iteratorUncached(e, r); } function nt(t, e) { return e ? (function t(e, r, n, i) { return Array.isArray(r) ? e.call(i, n, H(r).map(((n, i) => t(e, n, i, r)))) : ot(r) ? e.call(i, n, q(r).map(((n, i) => t(e, n, i, r)))) : r; }(e, t, '', { '': t })) : it(t); } function it(t) { return Array.isArray(t) ? H(t).map(it).toList() : ot(t) ? q(t).map(it).toMap() : t; } function ot(t) { return t && (t.constructor === Object || void 0 === t.constructor); } function at(t, e) { if (t === e || t != t && e != e) return !0; if (!t || !e) return !1; if (typeof t.valueOf === 'function' && typeof e.valueOf === 'function') { if ((t = t.valueOf()) === (e = e.valueOf()) || t != t && e != e) return !0; if (!t || !e) return !1; } return !(typeof t.equals !== 'function' || typeof e.equals !== 'function' || !t.equals(e)); } function st(t, e) { if (t === e) return !0; if (!a(e) || void 0 !== t.size && void 0 !== e.size && t.size !== e.size || void 0 !== t.__hash && void 0 !== e.__hash && t.__hash !== e.__hash || s(t) !== s(e) || u(t) !== u(e) || l(t) !== l(e)) return !1; if (t.size === 0 && e.size === 0) return !0; const r = !c(t); if (l(t)) { const n = t.entries(); return e.every(((t, e) => { const i = n.next().value; return i && at(i[1], t) && (r || at(i[0], e)); })) && n.next().done; } let i = !1; if (void 0 === t.size) if (void 0 === e.size) typeof t.cacheResult === 'function' && t.cacheResult(); else { i = !0; const o = t; t = e, e = o; } let f = !0; const p = e.__iterate(((e, n) => { if (r ? !t.has(e) : i ? !at(e, t.get(n, g)) : !at(t.get(n, g), e)) return f = !1, !1; })); return f && t.size === p; } function ut(t, e) { if (!(this instanceof ut)) return new ut(t, e); if (this._value = t, this.size = void 0 === e ? 1 / 0 : Math.max(0, e), this.size === 0) { if (T) return T; T = this; } } function ct(t, e) { if (!t) throw new Error(e); } function lt(t, e, r) { if (!(this instanceof lt)) return new lt(t, e, r); if (ct(r !== 0, 'Cannot step a Range by 0'), t = t || 0, void 0 === e && (e = 1 / 0), r = void 0 === r ? 1 : Math.abs(r), e < t && (r = -r), this._start = t, this._end = e, this._step = r, this.size = Math.max(0, Math.ceil((e - t) / r - 1) + 1), this.size === 0) { if (M) return M; M = this; } } function ft() { throw TypeError('Abstract'); } function pt() {} function ht() {} function dt() {}B.prototype.toString = function () { return '[Iterator]'; }, B.KEYS = 0, B.VALUES = 1, B.ENTRIES = 2, B.prototype.inspect = B.prototype.toSource = function () { return this.toString(); }, B.prototype[I] = function () { return this; }, e(j, r), j.of = function () { return j(arguments); }, j.prototype.toSeq = function () { return this; }, j.prototype.toString = function () { return this.__toString('Seq {', '}'); }, j.prototype.cacheResult = function () { return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this; }, j.prototype.__iterate = function (t, e) { return et(this, t, e, !0); }, j.prototype.__iterator = function (t, e) { return rt(this, t, e, !0); }, e(q, j), q.prototype.toKeyedSeq = function () { return this; }, e(H, j), H.of = function () { return H(arguments); }, H.prototype.toIndexedSeq = function () { return this; }, H.prototype.toString = function () { return this.__toString('Seq [', ']'); }, H.prototype.__iterate = function (t, e) { return et(this, t, e, !1); }, H.prototype.__iterator = function (t, e) { return rt(this, t, e, !1); }, e(W, j), W.of = function () { return W(arguments); }, W.prototype.toSetSeq = function () { return this; }, j.isSeq = G, j.Keyed = q, j.Set = W, j.Indexed = H, j.prototype['@@__IMMUTABLE_SEQ__@@'] = !0, e(V, H), V.prototype.get = function (t, e) { return this.has(t) ? this._array[k(this, t)] : e; }, V.prototype.__iterate = function (t, e) { for (var r = this._array, n = r.length - 1, i = 0; i <= n; i++) if (!1 === t(r[e ? n - i : i], i, this)) return i + 1; return i; }, V.prototype.__iterator = function (t, e) { const r = this._array; const n = r.length - 1; let i = 0; return new B(((() => (i > n ? { value: void 0, done: !0 } : R(t, i, r[e ? n - i++ : i++]))))); }, e(Y, q), Y.prototype.get = function (t, e) { return void 0 === e || this.has(t) ? this._object[t] : e; }, Y.prototype.has = function (t) { return this._object.hasOwnProperty(t); }, Y.prototype.__iterate = function (t, e) { for (var r = this._object, n = this._keys, i = n.length - 1, o = 0; o <= i; o++) { const a = n[e ? i - o : o]; if (!1 === t(r[a], a, this)) return o + 1; } return o; }, Y.prototype.__iterator = function (t, e) { const r = this._object; const n = this._keys; const i = n.length - 1; let o = 0; return new B(((() => { const a = n[e ? i - o : o]; return o++ > i ? { value: void 0, done: !0 } : R(t, a, r[a]); }))); }, Y.prototype[d] = !0, e(J, H), J.prototype.__iterateUncached = function (t, e) { if (e) return this.cacheResult().__iterate(t, e); const r = P(this._iterable); let n = 0; if (N(r)) for (var i; !(i = r.next()).done && !1 !== t(i.value, n++, this););return n; }, J.prototype.__iteratorUncached = function (t, e) { if (e) return this.cacheResult().__iterator(t, e); const r = P(this._iterable); if (!N(r)) return new B(L); let n = 0; return new B(((() => { const e = r.next(); return e.done ? e : R(t, n++, e.value); }))); }, e(X, H), X.prototype.__iterateUncached = function (t, e) { if (e) return this.cacheResult().__iterate(t, e); for (var r, n = this._iterator, i = this._iteratorCache, o = 0; o < i.length;) if (!1 === t(i[o], o++, this)) return o; for (;!(r = n.next()).done;) { const a = r.value; if (i[o] = a, !1 === t(a, o++, this)) break; } return o; }, X.prototype.__iteratorUncached = function (t, e) { if (e) return this.cacheResult().__iterator(t, e); const r = this._iterator; const n = this._iteratorCache; let i = 0; return new B(((() => { if (i >= n.length) { const e = r.next(); if (e.done) return e; n[i] = e.value; } return R(t, i, n[i++]); }))); }, e(ut, H), ut.prototype.toString = function () { return this.size === 0 ? 'Repeat []' : `Repeat [ ${this._value} ${this.size} times ]`; }, ut.prototype.get = function (t, e) { return this.has(t) ? this._value : e; }, ut.prototype.includes = function (t) { return at(this._value, t); }, ut.prototype.slice = function (t, e) { const r = this.size; return C(t, e, r) ? this : new ut(this._value, O(e, r) - E(t, r)); }, ut.prototype.reverse = function () { return this; }, ut.prototype.indexOf = function (t) { return at(this._value, t) ? 0 : -1; }, ut.prototype.lastIndexOf = function (t) { return at(this._value, t) ? this.size : -1; }, ut.prototype.__iterate = function (t, e) { for (var r = 0; r < this.size; r++) if (!1 === t(this._value, r, this)) return r + 1; return r; }, ut.prototype.__iterator = function (t, e) { const r = this; let n = 0; return new B(((() => (n < r.size ? R(t, n++, r._value) : { value: void 0, done: !0 })))); }, ut.prototype.equals = function (t) { return t instanceof ut ? at(this._value, t._value) : st(t); }, e(lt, H), lt.prototype.toString = function () { return this.size === 0 ? 'Range []' : `Range [ ${this._start}...${this._end}${this._step > 1 ? ` by ${this._step}` : ''} ]`; }, lt.prototype.get = function (t, e) { return this.has(t) ? this._start + k(this, t) * this._step : e; }, lt.prototype.includes = function (t) { const e = (t - this._start) / this._step; return e >= 0 && e < this.size && e === Math.floor(e); }, lt.prototype.slice = function (t, e) { return C(t, e, this.size) ? this : (t = E(t, this.size), (e = O(e, this.size)) <= t ? new lt(0, 0) : new lt(this.get(t, this._end), this.get(e, this._end), this._step)); }, lt.prototype.indexOf = function (t) { const e = t - this._start; if (e % this._step == 0) { const r = e / this._step; if (r >= 0 && r < this.size) return r; } return -1; }, lt.prototype.lastIndexOf = function (t) { return this.indexOf(t); }, lt.prototype.__iterate = function (t, e) { for (var r = this.size - 1, n = this._step, i = e ? this._start + r * n : this._start, o = 0; o <= r; o++) { if (!1 === t(i, o, this)) return o + 1; i += e ? -n : n; } return o; }, lt.prototype.__iterator = function (t, e) { const r = this.size - 1; const n = this._step; let i = e ? this._start + r * n : this._start; let o = 0; return new B(((() => { const a = i; return i += e ? -n : n, o > r ? { value: void 0, done: !0 } : R(t, o++, a); }))); }, lt.prototype.equals = function (t) { return t instanceof lt ? this._start === t._start && this._end === t._end && this._step === t._step : st(this, t); }, e(ft, r), e(pt, ft), e(ht, ft), e(dt, ft), ft.Keyed = pt, ft.Indexed = ht, ft.Set = dt; const gt = typeof Math.imul === 'function' && Math.imul(4294967295, 2) === -2 ? Math.imul : function (t, e) { const r = 65535 & (t |= 0); const n = 65535 & (e |= 0); return r * n + ((t >>> 16) * n + r * (e >>> 16) << 16 >>> 0) | 0; }; function yt(t) { return t >>> 1 & 1073741824 | 3221225471 & t; } function vt(t) {
        if (!1 === t || t == null) return 0; if (typeof t.valueOf === 'function' && (!1 === (t = t.valueOf()) || t == null)) return 0; if (!0 === t) return 1; const e = typeof t; if (e === 'number') { let r = 0 | t; for (r !== t && (r ^= 4294967295 * t); t > 4294967295;)r ^= t /= 4294967295; return yt(r); } if (e === 'string') return t.length > Ct ? (function (t) { let e = Dt[t]; return void 0 === e && (e = mt(t), Ot === Et && (Ot = 0, Dt = {}), Ot++, Dt[t] = e), e; }(t)) : mt(t); if (typeof t.hashCode === 'function') return t.hashCode(); if (e === 'object') {
          return (function (t) {
            let e; if (wt && void 0 !== (e = _t.get(t))) return e; if (void 0 !== (e = t[xt])) return e; if (!bt) { if (void 0 !== (e = t.propertyIsEnumerable && t.propertyIsEnumerable[xt])) return e; if (void 0 !== (e = (function (t) { if (t && t.nodeType > 0) switch (t.nodeType) { case 1: return t.uniqueID; case 9: return t.documentElement && t.documentElement.uniqueID; } }(t)))) return e; } if (e = ++kt, 1073741824 & kt && (kt = 0), wt)_t.set(t, e); else {
              if (void 0 !== St && !1 === St(t)) throw new Error('Non-extensible objects are not allowed as keys.'); if (bt) {
                Object.defineProperty(t, xt, {
                  enumerable: !1, configurable: !1, writable: !1, value: e,
                });
              } else if (void 0 !== t.propertyIsEnumerable && t.propertyIsEnumerable === t.constructor.prototype.propertyIsEnumerable)t.propertyIsEnumerable = function () { return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments); }, t.propertyIsEnumerable[xt] = e; else { if (void 0 === t.nodeType) throw new Error('Unable to set a non-enumerable property on object.'); t[xt] = e; }
            } return e;
          }(t));
        } if (typeof t.toString === 'function') return mt(t.toString()); throw new Error(`Value type ${e} cannot be hashed.`);
      } function mt(t) { for (var e = 0, r = 0; r < t.length; r++)e = 31 * e + t.charCodeAt(r) | 0; return yt(e); } let _t; var St = Object.isExtensible; var bt = (function () { try { return Object.defineProperty({}, '@', {}), !0; } catch (t) { return !1; } }()); var wt = typeof WeakMap === 'function'; wt && (_t = new WeakMap()); var kt = 0; var xt = '__immutablehash__'; typeof Symbol === 'function' && (xt = Symbol(xt)); var Ct = 16; var Et = 255; var Ot = 0; var Dt = {}; function Kt(t) { ct(t !== 1 / 0, 'Cannot perform this action with an infinite size.'); } function Tt(t) { return t == null ? Ht() : Mt(t) && !l(t) ? t : Ht().withMutations(((e) => { const r = n(t); Kt(r.size), r.forEach(((t, r) => e.set(r, t))); })); } function Mt(t) { return !(!t || !t[It]); }e(Tt, pt), Tt.prototype.toString = function () { return this.__toString('Map {', '}'); }, Tt.prototype.get = function (t, e) { return this._root ? this._root.get(0, void 0, t, e) : e; }, Tt.prototype.set = function (t, e) { return Wt(this, t, e); }, Tt.prototype.setIn = function (t, e) { return this.updateIn(t, g, (() => e)); }, Tt.prototype.remove = function (t) { return Wt(this, t, g); }, Tt.prototype.deleteIn = function (t) { return this.updateIn(t, (() => g)); }, Tt.prototype.update = function (t, e, r) { return arguments.length === 1 ? t(this) : this.updateIn([t], e, r); }, Tt.prototype.updateIn = function (t, e, r) { r || (r = e, e = void 0); const n = (function t(e, r, n, i) { const o = e === g; const a = r.next(); if (a.done) { const s = o ? n : e; const u = i(s); return u === s ? e : u; }ct(o || e && e.set, 'invalid keyPath'); const c = a.value; const l = o ? g : e.get(c, g); const f = t(l, r, n, i); return f === l ? e : f === g ? e.remove(c) : (o ? Ht() : e).set(c, f); }(this, Xe(t), e, r)); return n === g ? void 0 : n; }, Tt.prototype.clear = function () { return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = !0, this) : Ht(); }, Tt.prototype.merge = function () { return Xt(this, void 0, arguments); }, Tt.prototype.mergeWith = function (e) { const r = t.call(arguments, 1); return Xt(this, e, r); }, Tt.prototype.mergeIn = function (e) { const r = t.call(arguments, 1); return this.updateIn(e, Ht(), ((t) => (typeof t.merge === 'function' ? t.merge.apply(t, r) : r[r.length - 1]))); }, Tt.prototype.mergeDeep = function () { return Xt(this, Gt, arguments); }, Tt.prototype.mergeDeepWith = function (e) { const r = t.call(arguments, 1); return Xt(this, Zt(e), r); }, Tt.prototype.mergeDeepIn = function (e) { const r = t.call(arguments, 1); return this.updateIn(e, Ht(), ((t) => (typeof t.mergeDeep === 'function' ? t.mergeDeep.apply(t, r) : r[r.length - 1]))); }, Tt.prototype.sort = function (t) { return be(Ne(this, t)); }, Tt.prototype.sortBy = function (t, e) { return be(Ne(this, e, t)); }, Tt.prototype.withMutations = function (t) { const e = this.asMutable(); return t(e), e.wasAltered() ? e.__ensureOwner(this.__ownerID) : this; }, Tt.prototype.asMutable = function () { return this.__ownerID ? this : this.__ensureOwner(new S()); }, Tt.prototype.asImmutable = function () { return this.__ensureOwner(); }, Tt.prototype.wasAltered = function () { return this.__altered; }, Tt.prototype.__iterator = function (t, e) { return new zt(this, t, e); }, Tt.prototype.__iterate = function (t, e) { const r = this; let n = 0; return this._root && this._root.iterate(((e) => (n++, t(e[1], e[0], r))), e), n; }, Tt.prototype.__ensureOwner = function (t) { return t === this.__ownerID ? this : t ? qt(this.size, this._root, t, this.__hash) : (this.__ownerID = t, this.__altered = !1, this); }, Tt.isMap = Mt; let At; var It = '@@__IMMUTABLE_MAP__@@'; const Bt = Tt.prototype; function Rt(t, e) { this.ownerID = t, this.entries = e; } function Lt(t, e, r) { this.ownerID = t, this.bitmap = e, this.nodes = r; } function Ft(t, e, r) { this.ownerID = t, this.count = e, this.nodes = r; } function Nt(t, e, r) { this.ownerID = t, this.keyHash = e, this.entries = r; } function Pt(t, e, r) { this.ownerID = t, this.keyHash = e, this.entry = r; } function zt(t, e, r) { this._type = e, this._reverse = r, this._stack = t._root && jt(t._root); } function Ut(t, e) { return R(t, e[0], e[1]); } function jt(t, e) { return { node: t, index: 0, __prev: e }; } function qt(t, e, r, n) { const i = Object.create(Bt); return i.size = t, i._root = e, i.__ownerID = r, i.__hash = n, i.__altered = !1, i; } function Ht() { return At || (At = qt(0)); } function Wt(t, e, r) { let n; let i; if (t._root) { const o = m(y); const a = m(v); if (n = Vt(t._root, t.__ownerID, 0, void 0, e, r, o, a), !a.value) return t; i = t.size + (o.value ? r === g ? -1 : 1 : 0); } else { if (r === g) return t; i = 1, n = new Rt(t.__ownerID, [[e, r]]); } return t.__ownerID ? (t.size = i, t._root = n, t.__hash = void 0, t.__altered = !0, t) : n ? qt(i, n) : Ht(); } function Vt(t, e, r, n, i, o, a, s) { return t ? t.update(e, r, n, i, o, a, s) : o === g ? t : (_(s), _(a), new Pt(e, n, [i, o])); } function Yt(t) { return t.constructor === Pt || t.constructor === Nt; } function Jt(t, e, r, n, i) { if (t.keyHash === n) return new Nt(e, n, [t.entry, i]); let o; const a = 31 & (r === 0 ? t.keyHash : t.keyHash >>> r); const s = 31 & (r === 0 ? n : n >>> r); return new Lt(e, 1 << a | 1 << s, a === s ? [Jt(t, e, r + 5, n, i)] : (o = new Pt(e, n, i), a < s ? [t, o] : [o, t])); } function Xt(t, e, r) { for (var i = [], o = 0; o < r.length; o++) { const s = r[o]; let u = n(s); a(s) || (u = u.map(((t) => nt(t)))), i.push(u); } return Qt(t, e, i); } function Gt(t, e, r) { return t && t.mergeDeep && a(e) ? t.mergeDeep(e) : at(t, e) ? t : e; } function Zt(t) { return function (e, r, n) { if (e && e.mergeDeepWith && a(r)) return e.mergeDeepWith(t, r); const i = t(e, r, n); return at(e, i) ? e : i; }; } function Qt(t, e, r) { return (r = r.filter(((t) => t.size !== 0))).length === 0 ? t : t.size !== 0 || t.__ownerID || r.length !== 1 ? t.withMutations(((t) => { for (let n = e ? function (r, n) { t.update(n, g, ((t) => (t === g ? r : e(t, r, n)))); } : function (e, r) { t.set(r, e); }, i = 0; i < r.length; i++)r[i].forEach(n); })) : t.constructor(r[0]); } function $t(t) { return t = (t = (858993459 & (t -= t >> 1 & 1431655765)) + (t >> 2 & 858993459)) + (t >> 4) & 252645135, t += t >> 8, 127 & (t += t >> 16); } function te(t, e, r, n) { const i = n ? t : b(t); return i[e] = r, i; }Bt[It] = !0, Bt.delete = Bt.remove, Bt.removeIn = Bt.deleteIn, Rt.prototype.get = function (t, e, r, n) { for (let i = this.entries, o = 0, a = i.length; o < a; o++) if (at(r, i[o][0])) return i[o][1]; return n; }, Rt.prototype.update = function (t, e, r, n, i, o, a) { for (var s = i === g, u = this.entries, c = 0, l = u.length; c < l && !at(n, u[c][0]); c++);const f = c < l; if (f ? u[c][1] === i : s) return this; if (_(a), (s || !f) && _(o), !s || u.length !== 1) { if (!f && !s && u.length >= ee) return (function (t, e, r, n) { t || (t = new S()); for (var i = new Pt(t, vt(r), [r, n]), o = 0; o < e.length; o++) { const a = e[o]; i = i.update(t, 0, void 0, a[0], a[1]); } return i; }(t, u, n, i)); const p = t && t === this.ownerID; const h = p ? u : b(u); return f ? s ? c === l - 1 ? h.pop() : h[c] = h.pop() : h[c] = [n, i] : h.push([n, i]), p ? (this.entries = h, this) : new Rt(t, h); } }, Lt.prototype.get = function (t, e, r, n) { void 0 === e && (e = vt(r)); const i = 1 << (31 & (t === 0 ? e : e >>> t)); const o = this.bitmap; return (o & i) == 0 ? n : this.nodes[$t(o & i - 1)].get(t + 5, e, r, n); }, Lt.prototype.update = function (t, e, r, n, i, o, a) { void 0 === r && (r = vt(n)); const s = 31 & (e === 0 ? r : r >>> e); const u = 1 << s; const c = this.bitmap; const l = (c & u) != 0; if (!l && i === g) return this; const f = $t(c & u - 1); const p = this.nodes; const h = l ? p[f] : void 0; const d = Vt(h, t, e + 5, r, n, i, o, a); if (d === h) return this; if (!l && d && p.length >= re) return (function (t, e, r, n, i) { for (var o = 0, a = new Array(32), s = 0; r !== 0; s++, r >>>= 1)a[s] = 1 & r ? e[o++] : void 0; return a[n] = i, new Ft(t, o + 1, a); }(t, p, c, s, d)); if (l && !d && p.length === 2 && Yt(p[1 ^ f])) return p[1 ^ f]; if (l && d && p.length === 1 && Yt(d)) return d; const y = t && t === this.ownerID; const v = l ? d ? c : c ^ u : c | u; const m = l ? d ? te(p, f, d, y) : (function (t, e, r) { const n = t.length - 1; if (r && e === n) return t.pop(), t; for (var i = new Array(n), o = 0, a = 0; a < n; a++)a === e && (o = 1), i[a] = t[a + o]; return i; }(p, f, y)) : (function (t, e, r, n) { const i = t.length + 1; if (n && e + 1 === i) return t[e] = r, t; for (var o = new Array(i), a = 0, s = 0; s < i; s++)s === e ? (o[s] = r, a = -1) : o[s] = t[s + a]; return o; }(p, f, d, y)); return y ? (this.bitmap = v, this.nodes = m, this) : new Lt(t, v, m); }, Ft.prototype.get = function (t, e, r, n) { void 0 === e && (e = vt(r)); const i = 31 & (t === 0 ? e : e >>> t); const o = this.nodes[i]; return o ? o.get(t + 5, e, r, n) : n; }, Ft.prototype.update = function (t, e, r, n, i, o, a) { void 0 === r && (r = vt(n)); const s = 31 & (e === 0 ? r : r >>> e); const u = i === g; const c = this.nodes; const l = c[s]; if (u && !l) return this; const f = Vt(l, t, e + 5, r, n, i, o, a); if (f === l) return this; let p = this.count; if (l) { if (!f && --p < ne) return (function (t, e, r, n) { for (var i = 0, o = 0, a = new Array(r), s = 0, u = 1, c = e.length; s < c; s++, u <<= 1) { const l = e[s]; void 0 !== l && s !== n && (i |= u, a[o++] = l); } return new Lt(t, i, a); }(t, c, p, s)); } else p++; const h = t && t === this.ownerID; const d = te(c, s, f, h); return h ? (this.count = p, this.nodes = d, this) : new Ft(t, p, d); }, Nt.prototype.get = function (t, e, r, n) { for (let i = this.entries, o = 0, a = i.length; o < a; o++) if (at(r, i[o][0])) return i[o][1]; return n; }, Nt.prototype.update = function (t, e, r, n, i, o, a) { void 0 === r && (r = vt(n)); const s = i === g; if (r !== this.keyHash) return s ? this : (_(a), _(o), Jt(this, t, e, r, [n, i])); for (var u = this.entries, c = 0, l = u.length; c < l && !at(n, u[c][0]); c++);const f = c < l; if (f ? u[c][1] === i : s) return this; if (_(a), (s || !f) && _(o), s && l === 2) return new Pt(t, this.keyHash, u[1 ^ c]); const p = t && t === this.ownerID; const h = p ? u : b(u); return f ? s ? c === l - 1 ? h.pop() : h[c] = h.pop() : h[c] = [n, i] : h.push([n, i]), p ? (this.entries = h, this) : new Nt(t, this.keyHash, h); }, Pt.prototype.get = function (t, e, r, n) { return at(r, this.entry[0]) ? this.entry[1] : n; }, Pt.prototype.update = function (t, e, r, n, i, o, a) { const s = i === g; const u = at(n, this.entry[0]); return (u ? i === this.entry[1] : s) ? this : (_(a), s ? void _(o) : u ? t && t === this.ownerID ? (this.entry[1] = i, this) : new Pt(t, this.keyHash, [n, i]) : (_(o), Jt(this, t, e, vt(n), [n, i]))); }, Rt.prototype.iterate = Nt.prototype.iterate = function (t, e) { for (let r = this.entries, n = 0, i = r.length - 1; n <= i; n++) if (!1 === t(r[e ? i - n : n])) return !1; }, Lt.prototype.iterate = Ft.prototype.iterate = function (t, e) { for (let r = this.nodes, n = 0, i = r.length - 1; n <= i; n++) { const o = r[e ? i - n : n]; if (o && !1 === o.iterate(t, e)) return !1; } }, Pt.prototype.iterate = function (t, e) { return t(this.entry); }, e(zt, B), zt.prototype.next = function () { for (let t = this._type, e = this._stack; e;) { var r; const n = e.node; const i = e.index++; if (n.entry) { if (i === 0) return Ut(t, n.entry); } else if (n.entries) { if (i <= (r = n.entries.length - 1)) return Ut(t, n.entries[this._reverse ? r - i : i]); } else if (i <= (r = n.nodes.length - 1)) { const o = n.nodes[this._reverse ? r - i : i]; if (o) { if (o.entry) return Ut(t, o.entry); e = this._stack = jt(o, e); } continue; }e = this._stack = this._stack.__prev; } return { value: void 0, done: !0 }; }; var ee = 8; var re = 16; var ne = 8; function ie(t) { const e = de(); if (t == null) return e; if (oe(t)) return t; const r = i(t); const n = r.size; return n === 0 ? e : (Kt(n), n > 0 && n < 32 ? he(0, n, 5, null, new ue(r.toArray())) : e.withMutations(((t) => { t.setSize(n), r.forEach(((e, r) => t.set(r, e))); }))); } function oe(t) { return !(!t || !t[ae]); }e(ie, ht), ie.of = function () { return this(arguments); }, ie.prototype.toString = function () { return this.__toString('List [', ']'); }, ie.prototype.get = function (t, e) { if ((t = k(this, t)) >= 0 && t < this.size) { const r = ve(this, t += this._origin); return r && r.array[31 & t]; } return e; }, ie.prototype.set = function (t, e) { return (function (t, e, r) { if ((e = k(t, e)) != e) return t; if (e >= t.size || e < 0) return t.withMutations(((t) => { e < 0 ? me(t, e).set(0, r) : me(t, 0, e + 1).set(e, r); })); e += t._origin; let n = t._tail; let i = t._root; const o = m(v); return e >= Se(t._capacity) ? n = ge(n, t.__ownerID, 0, e, r, o) : i = ge(i, t.__ownerID, t._level, e, r, o), o.value ? t.__ownerID ? (t._root = i, t._tail = n, t.__hash = void 0, t.__altered = !0, t) : he(t._origin, t._capacity, t._level, i, n) : t; }(this, t, e)); }, ie.prototype.remove = function (t) { return this.has(t) ? t === 0 ? this.shift() : t === this.size - 1 ? this.pop() : this.splice(t, 1) : this; }, ie.prototype.insert = function (t, e) { return this.splice(t, 0, e); }, ie.prototype.clear = function () { return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = 5, this._root = this._tail = null, this.__hash = void 0, this.__altered = !0, this) : de(); }, ie.prototype.push = function () { const t = arguments; const e = this.size; return this.withMutations(((r) => { me(r, 0, e + t.length); for (let n = 0; n < t.length; n++)r.set(e + n, t[n]); })); }, ie.prototype.pop = function () { return me(this, 0, -1); }, ie.prototype.unshift = function () { const t = arguments; return this.withMutations(((e) => { me(e, -t.length); for (let r = 0; r < t.length; r++)e.set(r, t[r]); })); }, ie.prototype.shift = function () { return me(this, 1); }, ie.prototype.merge = function () { return _e(this, void 0, arguments); }, ie.prototype.mergeWith = function (e) { const r = t.call(arguments, 1); return _e(this, e, r); }, ie.prototype.mergeDeep = function () { return _e(this, Gt, arguments); }, ie.prototype.mergeDeepWith = function (e) { const r = t.call(arguments, 1); return _e(this, Zt(e), r); }, ie.prototype.setSize = function (t) { return me(this, 0, t); }, ie.prototype.slice = function (t, e) { const r = this.size; return C(t, e, r) ? this : me(this, E(t, r), O(e, r)); }, ie.prototype.__iterator = function (t, e) { let r = 0; const n = pe(this, e); return new B(((() => { const e = n(); return e === fe ? { value: void 0, done: !0 } : R(t, r++, e); }))); }, ie.prototype.__iterate = function (t, e) { for (var r, n = 0, i = pe(this, e); (r = i()) !== fe && !1 !== t(r, n++, this););return n; }, ie.prototype.__ensureOwner = function (t) { return t === this.__ownerID ? this : t ? he(this._origin, this._capacity, this._level, this._root, this._tail, t, this.__hash) : (this.__ownerID = t, this); }, ie.isList = oe; var ae = '@@__IMMUTABLE_LIST__@@'; const se = ie.prototype; function ue(t, e) { this.array = t, this.ownerID = e; }se[ae] = !0, se.delete = se.remove, se.setIn = Bt.setIn, se.deleteIn = se.removeIn = Bt.removeIn, se.update = Bt.update, se.updateIn = Bt.updateIn, se.mergeIn = Bt.mergeIn, se.mergeDeepIn = Bt.mergeDeepIn, se.withMutations = Bt.withMutations, se.asMutable = Bt.asMutable, se.asImmutable = Bt.asImmutable, se.wasAltered = Bt.wasAltered, ue.prototype.removeBefore = function (t, e, r) { if (r === e ? 1 << e : this.array.length === 0) return this; const n = r >>> e & 31; if (n >= this.array.length) return new ue([], t); let i; const o = n === 0; if (e > 0) { const a = this.array[n]; if ((i = a && a.removeBefore(t, e - 5, r)) === a && o) return this; } if (o && !i) return this; const s = ye(this, t); if (!o) for (let u = 0; u < n; u++)s.array[u] = void 0; return i && (s.array[n] = i), s; }, ue.prototype.removeAfter = function (t, e, r) { if (r === (e ? 1 << e : 0) || this.array.length === 0) return this; let n; const i = r - 1 >>> e & 31; if (i >= this.array.length) return this; if (e > 0) { const o = this.array[i]; if ((n = o && o.removeAfter(t, e - 5, r)) === o && i === this.array.length - 1) return this; } const a = ye(this, t); return a.array.splice(i + 1), n && (a.array[i] = n), a; }; let ce; let le; var fe = {}; function pe(t, e) { const r = t._origin; const n = t._capacity; const i = Se(n); const o = t._tail; return a(t._root, t._level, 0); function a(t, s, u) { return s === 0 ? (function (t, a) { const s = a === i ? o && o.array : t && t.array; let u = a > r ? 0 : r - a; let c = n - a; return c > 32 && (c = 32), function () { if (u === c) return fe; const t = e ? --c : u++; return s && s[t]; }; }(t, u)) : (function (t, i, o) { let s; const u = t && t.array; let c = o > r ? 0 : r - o >> i; let l = 1 + (n - o >> i); return l > 32 && (l = 32), function () { for (;;) { if (s) { const t = s(); if (t !== fe) return t; s = null; } if (c === l) return fe; const r = e ? --l : c++; s = a(u && u[r], i - 5, o + (r << i)); } }; }(t, s, u)); } } function he(t, e, r, n, i, o, a) { const s = Object.create(se); return s.size = e - t, s._origin = t, s._capacity = e, s._level = r, s._root = n, s._tail = i, s.__ownerID = o, s.__hash = a, s.__altered = !1, s; } function de() { return ce || (ce = he(0, 0, 5)); } function ge(t, e, r, n, i, o) { let a; const s = n >>> r & 31; const u = t && s < t.array.length; if (!u && void 0 === i) return t; if (r > 0) { const c = t && t.array[s]; const l = ge(c, e, r - 5, n, i, o); return l === c ? t : ((a = ye(t, e)).array[s] = l, a); } return u && t.array[s] === i ? t : (_(o), a = ye(t, e), void 0 === i && s === a.array.length - 1 ? a.array.pop() : a.array[s] = i, a); } function ye(t, e) { return e && t && e === t.ownerID ? t : new ue(t ? t.array.slice() : [], e); } function ve(t, e) { if (e >= Se(t._capacity)) return t._tail; if (e < 1 << t._level + 5) { for (var r = t._root, n = t._level; r && n > 0;)r = r.array[e >>> n & 31], n -= 5; return r; } } function me(t, e, r) {
        void 0 !== e && (e |= 0), void 0 !== r && (r |= 0); const n = t.__ownerID || new S(); let i = t._origin; let o = t._capacity; let a = i + e; let
          s = void 0 === r ? o : r < 0 ? o + r : i + r; if (a === i && s === o) return t; if (a >= s) return t.clear(); for (var u = t._level, c = t._root, l = 0; a + l < 0;)c = new ue(c && c.array.length ? [void 0, c] : [], n), l += 1 << (u += 5); l && (a += l, i += l, s += l, o += l); for (var f = Se(o), p = Se(s); p >= 1 << u + 5;)c = new ue(c && c.array.length ? [c] : [], n), u += 5; const h = t._tail; let d = p < f ? ve(t, s - 1) : p > f ? new ue([], n) : h; if (h && p > f && a < o && h.array.length) { for (var g = c = ye(c, n), y = u; y > 5; y -= 5) { const v = f >>> y & 31; g = g.array[v] = ye(g.array[v], n); }g.array[f >>> 5 & 31] = h; } if (s < o && (d = d && d.removeAfter(n, 0, s)), a >= p)a -= p, s -= p, u = 5, c = null, d = d && d.removeBefore(n, 0, a); else if (a > i || p < f) { for (l = 0; c;) { const m = a >>> u & 31; if (m !== p >>> u & 31) break; m && (l += (1 << u) * m), u -= 5, c = c.array[m]; }c && a > i && (c = c.removeBefore(n, u, a - l)), c && p < f && (c = c.removeAfter(n, u, p - l)), l && (a -= l, s -= l); } return t.__ownerID ? (t.size = s - a, t._origin = a, t._capacity = s, t._level = u, t._root = c, t._tail = d, t.__hash = void 0, t.__altered = !0, t) : he(a, s, u, c, d);
      } function _e(t, e, r) { for (var n = [], o = 0, s = 0; s < r.length; s++) { const u = r[s]; let c = i(u); c.size > o && (o = c.size), a(u) || (c = c.map(((t) => nt(t)))), n.push(c); } return o > t.size && (t = t.setSize(o)), Qt(t, e, n); } function Se(t) { return t < 32 ? 0 : t - 1 >>> 5 << 5; } function be(t) { return t == null ? xe() : we(t) ? t : xe().withMutations(((e) => { const r = n(t); Kt(r.size), r.forEach(((t, r) => e.set(r, t))); })); } function we(t) { return Mt(t) && l(t); } function ke(t, e, r, n) { const i = Object.create(be.prototype); return i.size = t ? t.size : 0, i._map = t, i._list = e, i.__ownerID = r, i.__hash = n, i; } function xe() { return le || (le = ke(Ht(), de())); } function Ce(t, e, r) { let n; let i; const o = t._map; const a = t._list; const s = o.get(e); const u = void 0 !== s; if (r === g) { if (!u) return t; a.size >= 32 && a.size >= 2 * o.size ? (n = (i = a.filter(((t, e) => void 0 !== t && s !== e))).toKeyedSeq().map(((t) => t[0])).flip().toMap(), t.__ownerID && (n.__ownerID = i.__ownerID = t.__ownerID)) : (n = o.remove(e), i = s === a.size - 1 ? a.pop() : a.set(s, void 0)); } else if (u) { if (r === a.get(s)[1]) return t; n = o, i = a.set(s, [e, r]); } else n = o.set(e, a.size), i = a.set(a.size, [e, r]); return t.__ownerID ? (t.size = n.size, t._map = n, t._list = i, t.__hash = void 0, t) : ke(n, i); } function Ee(t, e) { this._iter = t, this._useKeys = e, this.size = t.size; } function Oe(t) { this._iter = t, this.size = t.size; } function De(t) { this._iter = t, this.size = t.size; } function Ke(t) { this._iter = t, this.size = t.size; } function Te(t) { const e = Ve(t); return e._iter = t, e.size = t.size, e.flip = function () { return t; }, e.reverse = function () { const e = t.reverse.apply(this); return e.flip = function () { return t.reverse(); }, e; }, e.has = function (e) { return t.includes(e); }, e.includes = function (e) { return t.has(e); }, e.cacheResult = Ye, e.__iterateUncached = function (e, r) { const n = this; return t.__iterate(((t, r) => !1 !== e(r, t, n)), r); }, e.__iteratorUncached = function (e, r) { if (e === 2) { const n = t.__iterator(e, r); return new B(((() => { const t = n.next(); if (!t.done) { const e = t.value[0]; t.value[0] = t.value[1], t.value[1] = e; } return t; }))); } return t.__iterator(e === 1 ? 0 : 1, r); }, e; } function Me(t, e, r) { const n = Ve(t); return n.size = t.size, n.has = function (e) { return t.has(e); }, n.get = function (n, i) { const o = t.get(n, g); return o === g ? i : e.call(r, o, n, t); }, n.__iterateUncached = function (n, i) { const o = this; return t.__iterate(((t, i, a) => !1 !== n(e.call(r, t, i, a), i, o)), i); }, n.__iteratorUncached = function (n, i) { const o = t.__iterator(2, i); return new B(((() => { const i = o.next(); if (i.done) return i; const a = i.value; const s = a[0]; return R(n, s, e.call(r, a[1], s, t), i); }))); }, n; } function Ae(t, e) { const r = Ve(t); return r._iter = t, r.size = t.size, r.reverse = function () { return t; }, t.flip && (r.flip = function () { const e = Te(t); return e.reverse = function () { return t.flip(); }, e; }), r.get = function (r, n) { return t.get(e ? r : -1 - r, n); }, r.has = function (r) { return t.has(e ? r : -1 - r); }, r.includes = function (e) { return t.includes(e); }, r.cacheResult = Ye, r.__iterate = function (e, r) { const n = this; return t.__iterate(((t, r) => e(t, r, n)), !r); }, r.__iterator = function (e, r) { return t.__iterator(e, !r); }, r; } function Ie(t, e, r, n) { const i = Ve(t); return n && (i.has = function (n) { const i = t.get(n, g); return i !== g && !!e.call(r, i, n, t); }, i.get = function (n, i) { const o = t.get(n, g); return o !== g && e.call(r, o, n, t) ? o : i; }), i.__iterateUncached = function (i, o) { const a = this; let s = 0; return t.__iterate(((t, o, u) => { if (e.call(r, t, o, u)) return s++, i(t, n ? o : s - 1, a); }), o), s; }, i.__iteratorUncached = function (i, o) { const a = t.__iterator(2, o); let s = 0; return new B(((() => { for (;;) { const o = a.next(); if (o.done) return o; const u = o.value; const c = u[0]; const l = u[1]; if (e.call(r, l, c, t)) return R(i, n ? c : s++, l, o); } }))); }, i; } function Be(t, e, r, n) { const i = t.size; if (void 0 !== e && (e |= 0), void 0 !== r && (r |= 0), C(e, r, i)) return t; const o = E(e, i); const a = O(r, i); if (o != o || a != a) return Be(t.toSeq().cacheResult(), e, r, n); let s; const u = a - o; u == u && (s = u < 0 ? 0 : u); const c = Ve(t); return c.size = s === 0 ? s : t.size && s || void 0, !n && G(t) && s >= 0 && (c.get = function (e, r) { return (e = k(this, e)) >= 0 && e < s ? t.get(e + o, r) : r; }), c.__iterateUncached = function (e, r) { const i = this; if (s === 0) return 0; if (r) return this.cacheResult().__iterate(e, r); let a = 0; let u = !0; let c = 0; return t.__iterate(((t, r) => { if (!u || !(u = a++ < o)) return c++, !1 !== e(t, n ? r : c - 1, i) && c !== s; })), c; }, c.__iteratorUncached = function (e, r) { if (s !== 0 && r) return this.cacheResult().__iterator(e, r); const i = s !== 0 && t.__iterator(e, r); let a = 0; let u = 0; return new B(((() => { for (;a++ < o;)i.next(); if (++u > s) return { value: void 0, done: !0 }; const t = i.next(); return n || e === 1 ? t : R(e, u - 1, e === 0 ? void 0 : t.value[1], t); }))); }, c; } function Re(t, e, r, n) { const i = Ve(t); return i.__iterateUncached = function (i, o) { const a = this; if (o) return this.cacheResult().__iterate(i, o); let s = !0; let u = 0; return t.__iterate(((t, o, c) => { if (!s || !(s = e.call(r, t, o, c))) return u++, i(t, n ? o : u - 1, a); })), u; }, i.__iteratorUncached = function (i, o) { const a = this; if (o) return this.cacheResult().__iterator(i, o); const s = t.__iterator(2, o); let u = !0; let c = 0; return new B(((() => { let t; let o; let l; do { if ((t = s.next()).done) return n || i === 1 ? t : R(i, c++, i === 0 ? void 0 : t.value[1], t); const f = t.value; o = f[0], l = f[1], u && (u = e.call(r, l, o, a)); } while (u);return i === 2 ? t : R(i, o, l, t); }))); }, i; } function Le(t, e) { const r = s(t); const i = [t].concat(e).map(((t) => (a(t) ? r && (t = n(t)) : t = r ? Q(t) : $(Array.isArray(t) ? t : [t]), t))).filter(((t) => t.size !== 0)); if (i.length === 0) return t; if (i.length === 1) { const o = i[0]; if (o === t || r && s(o) || u(t) && u(o)) return o; } let c = new V(i); return r ? c = c.toKeyedSeq() : u(t) || (c = c.toSetSeq()), (c = c.flatten(!0)).size = i.reduce(((t, e) => { if (void 0 !== t) { const r = e.size; if (void 0 !== r) return t + r; } }), 0), c; } function Fe(t, e, r) { const n = Ve(t); return n.__iterateUncached = function (n, i) { let o = 0; let s = !1; return (function t(u, c) { const l = this; u.__iterate(((i, u) => ((!e || c < e) && a(i) ? t(i, c + 1) : !1 === n(i, r ? u : o++, l) && (s = !0), !s)), i); }(t, 0)), o; }, n.__iteratorUncached = function (n, i) { let o = t.__iterator(n, i); const s = []; let u = 0; return new B(((() => { for (;o;) { const t = o.next(); if (!1 === t.done) { let c = t.value; if (n === 2 && (c = c[1]), e && !(s.length < e) || !a(c)) return r ? t : R(n, u++, c, t); s.push(o), o = c.__iterator(n, i); } else o = s.pop(); } return { value: void 0, done: !0 }; }))); }, n; } function Ne(t, e, r) { e || (e = Je); const n = s(t); let i = 0; const o = t.toSeq().map(((e, n) => [n, e, i++, r ? r(e, n, t) : e])).toArray(); return o.sort(((t, r) => e(t[3], r[3]) || t[2] - r[2])).forEach(n ? (t, e) => { o[e].length = 2; } : (t, e) => { o[e] = t[1]; }), n ? q(o) : u(t) ? H(o) : W(o); } function Pe(t, e, r) { if (e || (e = Je), r) { const n = t.toSeq().map(((e, n) => [e, r(e, n, t)])).reduce(((t, r) => (ze(e, t[1], r[1]) ? r : t))); return n && n[0]; } return t.reduce(((t, r) => (ze(e, t, r) ? r : t))); } function ze(t, e, r) { const n = t(r, e); return n === 0 && r !== e && (r == null || r != r) || n > 0; } function Ue(t, e, n) { const i = Ve(t); return i.size = new V(n).map(((t) => t.size)).min(), i.__iterate = function (t, e) { for (var r, n = this.__iterator(1, e), i = 0; !(r = n.next()).done && !1 !== t(r.value, i++, this););return i; }, i.__iteratorUncached = function (t, i) { const o = n.map(((t) => (t = r(t), P(i ? t.reverse() : t)))); let a = 0; let s = !1; return new B(((() => { let r; return s || (r = o.map(((t) => t.next())), s = r.some(((t) => t.done))), s ? { value: void 0, done: !0 } : R(t, a++, e.apply(null, r.map(((t) => t.value)))); }))); }, i; } function je(t, e) { return G(t) ? e : t.constructor(e); } function qe(t) { if (t !== Object(t)) throw new TypeError(`Expected [K, V] tuple: ${t}`); } function He(t) { return Kt(t.size), w(t); } function We(t) { return s(t) ? n : u(t) ? i : o; } function Ve(t) { return Object.create((s(t) ? q : u(t) ? H : W).prototype); } function Ye() { return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : j.prototype.cacheResult.call(this); } function Je(t, e) { return t > e ? 1 : t < e ? -1 : 0; } function Xe(t) { let e = P(t); if (!e) { if (!U(t)) throw new TypeError(`Expected iterable or array-like: ${t}`); e = P(r(t)); } return e; } function Ge(t, e) { let r; var n = function (o) { if (o instanceof n) return o; if (!(this instanceof n)) return new n(o); if (!r) { r = !0; const a = Object.keys(t); !(function (t, e) { try { e.forEach(tr.bind(void 0, t)); } catch (t) {} }(i, a)), i.size = a.length, i._name = e, i._keys = a, i._defaultValues = t; } this._map = Tt(o); }; var i = n.prototype = Object.create(Ze); return i.constructor = n, n; }e(be, Tt), be.of = function () { return this(arguments); }, be.prototype.toString = function () { return this.__toString('OrderedMap {', '}'); }, be.prototype.get = function (t, e) { const r = this._map.get(t); return void 0 !== r ? this._list.get(r)[1] : e; }, be.prototype.clear = function () { return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this) : xe(); }, be.prototype.set = function (t, e) { return Ce(this, t, e); }, be.prototype.remove = function (t) { return Ce(this, t, g); }, be.prototype.wasAltered = function () { return this._map.wasAltered() || this._list.wasAltered(); }, be.prototype.__iterate = function (t, e) { const r = this; return this._list.__iterate(((e) => e && t(e[1], e[0], r)), e); }, be.prototype.__iterator = function (t, e) { return this._list.fromEntrySeq().__iterator(t, e); }, be.prototype.__ensureOwner = function (t) { if (t === this.__ownerID) return this; const e = this._map.__ensureOwner(t); const r = this._list.__ensureOwner(t); return t ? ke(e, r, t, this.__hash) : (this.__ownerID = t, this._map = e, this._list = r, this); }, be.isOrderedMap = we, be.prototype[d] = !0, be.prototype.delete = be.prototype.remove, e(Ee, q), Ee.prototype.get = function (t, e) { return this._iter.get(t, e); }, Ee.prototype.has = function (t) { return this._iter.has(t); }, Ee.prototype.valueSeq = function () { return this._iter.valueSeq(); }, Ee.prototype.reverse = function () { const t = this; const e = Ae(this, !0); return this._useKeys || (e.valueSeq = function () { return t._iter.toSeq().reverse(); }), e; }, Ee.prototype.map = function (t, e) { const r = this; const n = Me(this, t, e); return this._useKeys || (n.valueSeq = function () { return r._iter.toSeq().map(t, e); }), n; }, Ee.prototype.__iterate = function (t, e) { let r; const n = this; return this._iter.__iterate(this._useKeys ? (e, r) => t(e, r, n) : (r = e ? He(this) : 0, function (i) { return t(i, e ? --r : r++, n); }), e); }, Ee.prototype.__iterator = function (t, e) { if (this._useKeys) return this._iter.__iterator(t, e); const r = this._iter.__iterator(1, e); let n = e ? He(this) : 0; return new B(((() => { const i = r.next(); return i.done ? i : R(t, e ? --n : n++, i.value, i); }))); }, Ee.prototype[d] = !0, e(Oe, H), Oe.prototype.includes = function (t) { return this._iter.includes(t); }, Oe.prototype.__iterate = function (t, e) { const r = this; let n = 0; return this._iter.__iterate(((e) => t(e, n++, r)), e); }, Oe.prototype.__iterator = function (t, e) { const r = this._iter.__iterator(1, e); let n = 0; return new B(((() => { const e = r.next(); return e.done ? e : R(t, n++, e.value, e); }))); }, e(De, W), De.prototype.has = function (t) { return this._iter.includes(t); }, De.prototype.__iterate = function (t, e) { const r = this; return this._iter.__iterate(((e) => t(e, e, r)), e); }, De.prototype.__iterator = function (t, e) { const r = this._iter.__iterator(1, e); return new B(((() => { const e = r.next(); return e.done ? e : R(t, e.value, e.value, e); }))); }, e(Ke, q), Ke.prototype.entrySeq = function () { return this._iter.toSeq(); }, Ke.prototype.__iterate = function (t, e) { const r = this; return this._iter.__iterate(((e) => { if (e) { qe(e); const n = a(e); return t(n ? e.get(1) : e[1], n ? e.get(0) : e[0], r); } }), e); }, Ke.prototype.__iterator = function (t, e) { const r = this._iter.__iterator(1, e); return new B(((() => { for (;;) { const e = r.next(); if (e.done) return e; const n = e.value; if (n) { qe(n); const i = a(n); return R(t, i ? n.get(0) : n[0], i ? n.get(1) : n[1], e); } } }))); }, Oe.prototype.cacheResult = Ee.prototype.cacheResult = De.prototype.cacheResult = Ke.prototype.cacheResult = Ye, e(Ge, pt), Ge.prototype.toString = function () { return this.__toString(`${$e(this)} {`, '}'); }, Ge.prototype.has = function (t) { return this._defaultValues.hasOwnProperty(t); }, Ge.prototype.get = function (t, e) { if (!this.has(t)) return e; const r = this._defaultValues[t]; return this._map ? this._map.get(t, r) : r; }, Ge.prototype.clear = function () { if (this.__ownerID) return this._map && this._map.clear(), this; const t = this.constructor; return t._empty || (t._empty = Qe(this, Ht())); }, Ge.prototype.set = function (t, e) { if (!this.has(t)) throw new Error(`Cannot set unknown key "${t}" on ${$e(this)}`); const r = this._map && this._map.set(t, e); return this.__ownerID || r === this._map ? this : Qe(this, r); }, Ge.prototype.remove = function (t) { if (!this.has(t)) return this; const e = this._map && this._map.remove(t); return this.__ownerID || e === this._map ? this : Qe(this, e); }, Ge.prototype.wasAltered = function () { return this._map.wasAltered(); }, Ge.prototype.__iterator = function (t, e) { const r = this; return n(this._defaultValues).map(((t, e) => r.get(e))).__iterator(t, e); }, Ge.prototype.__iterate = function (t, e) { const r = this; return n(this._defaultValues).map(((t, e) => r.get(e))).__iterate(t, e); }, Ge.prototype.__ensureOwner = function (t) { if (t === this.__ownerID) return this; const e = this._map && this._map.__ensureOwner(t); return t ? Qe(this, e, t) : (this.__ownerID = t, this._map = e, this); }; var Ze = Ge.prototype; function Qe(t, e, r) { const n = Object.create(Object.getPrototypeOf(t)); return n._map = e, n.__ownerID = r, n; } function $e(t) { return t._name || t.constructor.name || 'Record'; } function tr(t, e) { Object.defineProperty(t, e, { get() { return this.get(e); }, set(t) { ct(this.__ownerID, 'Cannot set on an immutable record.'), this.set(e, t); } }); } function er(t) { return t == null ? ur() : rr(t) && !l(t) ? t : ur().withMutations(((e) => { const r = o(t); Kt(r.size), r.forEach(((t) => e.add(t))); })); } function rr(t) { return !(!t || !t[ir]); }Ze.delete = Ze.remove, Ze.deleteIn = Ze.removeIn = Bt.removeIn, Ze.merge = Bt.merge, Ze.mergeWith = Bt.mergeWith, Ze.mergeIn = Bt.mergeIn, Ze.mergeDeep = Bt.mergeDeep, Ze.mergeDeepWith = Bt.mergeDeepWith, Ze.mergeDeepIn = Bt.mergeDeepIn, Ze.setIn = Bt.setIn, Ze.update = Bt.update, Ze.updateIn = Bt.updateIn, Ze.withMutations = Bt.withMutations, Ze.asMutable = Bt.asMutable, Ze.asImmutable = Bt.asImmutable, e(er, dt), er.of = function () { return this(arguments); }, er.fromKeys = function (t) { return this(n(t).keySeq()); }, er.prototype.toString = function () { return this.__toString('Set {', '}'); }, er.prototype.has = function (t) { return this._map.has(t); }, er.prototype.add = function (t) { return ar(this, this._map.set(t, !0)); }, er.prototype.remove = function (t) { return ar(this, this._map.remove(t)); }, er.prototype.clear = function () { return ar(this, this._map.clear()); }, er.prototype.union = function () { let e = t.call(arguments, 0); return (e = e.filter(((t) => t.size !== 0))).length === 0 ? this : this.size !== 0 || this.__ownerID || e.length !== 1 ? this.withMutations(((t) => { for (let r = 0; r < e.length; r++)o(e[r]).forEach(((e) => t.add(e))); })) : this.constructor(e[0]); }, er.prototype.intersect = function () { let e = t.call(arguments, 0); if (e.length === 0) return this; e = e.map(((t) => o(t))); const r = this; return this.withMutations(((t) => { r.forEach(((r) => { e.every(((t) => t.includes(r))) || t.remove(r); })); })); }, er.prototype.subtract = function () { let e = t.call(arguments, 0); if (e.length === 0) return this; e = e.map(((t) => o(t))); const r = this; return this.withMutations(((t) => { r.forEach(((r) => { e.some(((t) => t.includes(r))) && t.remove(r); })); })); }, er.prototype.merge = function () { return this.union.apply(this, arguments); }, er.prototype.mergeWith = function (e) { const r = t.call(arguments, 1); return this.union.apply(this, r); }, er.prototype.sort = function (t) { return cr(Ne(this, t)); }, er.prototype.sortBy = function (t, e) { return cr(Ne(this, e, t)); }, er.prototype.wasAltered = function () { return this._map.wasAltered(); }, er.prototype.__iterate = function (t, e) { const r = this; return this._map.__iterate(((e, n) => t(n, n, r)), e); }, er.prototype.__iterator = function (t, e) { return this._map.map(((t, e) => e)).__iterator(t, e); }, er.prototype.__ensureOwner = function (t) { if (t === this.__ownerID) return this; const e = this._map.__ensureOwner(t); return t ? this.__make(e, t) : (this.__ownerID = t, this._map = e, this); }, er.isSet = rr; let nr; var ir = '@@__IMMUTABLE_SET__@@'; const or = er.prototype; function ar(t, e) { return t.__ownerID ? (t.size = e.size, t._map = e, t) : e === t._map ? t : e.size === 0 ? t.__empty() : t.__make(e); } function sr(t, e) { const r = Object.create(or); return r.size = t ? t.size : 0, r._map = t, r.__ownerID = e, r; } function ur() { return nr || (nr = sr(Ht())); } function cr(t) { return t == null ? dr() : lr(t) ? t : dr().withMutations(((e) => { const r = o(t); Kt(r.size), r.forEach(((t) => e.add(t))); })); } function lr(t) { return rr(t) && l(t); }or[ir] = !0, or.delete = or.remove, or.mergeDeep = or.merge, or.mergeDeepWith = or.mergeWith, or.withMutations = Bt.withMutations, or.asMutable = Bt.asMutable, or.asImmutable = Bt.asImmutable, or.__empty = ur, or.__make = sr, e(cr, er), cr.of = function () { return this(arguments); }, cr.fromKeys = function (t) { return this(n(t).keySeq()); }, cr.prototype.toString = function () { return this.__toString('OrderedSet {', '}'); }, cr.isOrderedSet = lr; let fr; const pr = cr.prototype; function hr(t, e) { const r = Object.create(pr); return r.size = t ? t.size : 0, r._map = t, r.__ownerID = e, r; } function dr() { return fr || (fr = hr(xe())); } function gr(t) { return t == null ? br() : yr(t) ? t : br().unshiftAll(t); } function yr(t) { return !(!t || !t[mr]); }pr[d] = !0, pr.__empty = dr, pr.__make = hr, e(gr, ht), gr.of = function () { return this(arguments); }, gr.prototype.toString = function () { return this.__toString('Stack [', ']'); }, gr.prototype.get = function (t, e) { let r = this._head; for (t = k(this, t); r && t--;)r = r.next; return r ? r.value : e; }, gr.prototype.peek = function () { return this._head && this._head.value; }, gr.prototype.push = function () { if (arguments.length === 0) return this; for (var t = this.size + arguments.length, e = this._head, r = arguments.length - 1; r >= 0; r--)e = { value: arguments[r], next: e }; return this.__ownerID ? (this.size = t, this._head = e, this.__hash = void 0, this.__altered = !0, this) : Sr(t, e); }, gr.prototype.pushAll = function (t) { if ((t = i(t)).size === 0) return this; Kt(t.size); let e = this.size; let r = this._head; return t.reverse().forEach(((t) => { e++, r = { value: t, next: r }; })), this.__ownerID ? (this.size = e, this._head = r, this.__hash = void 0, this.__altered = !0, this) : Sr(e, r); }, gr.prototype.pop = function () { return this.slice(1); }, gr.prototype.unshift = function () { return this.push.apply(this, arguments); }, gr.prototype.unshiftAll = function (t) { return this.pushAll(t); }, gr.prototype.shift = function () { return this.pop.apply(this, arguments); }, gr.prototype.clear = function () { return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = !0, this) : br(); }, gr.prototype.slice = function (t, e) { if (C(t, e, this.size)) return this; let r = E(t, this.size); if (O(e, this.size) !== this.size) return ht.prototype.slice.call(this, t, e); for (var n = this.size - r, i = this._head; r--;)i = i.next; return this.__ownerID ? (this.size = n, this._head = i, this.__hash = void 0, this.__altered = !0, this) : Sr(n, i); }, gr.prototype.__ensureOwner = function (t) { return t === this.__ownerID ? this : t ? Sr(this.size, this._head, t, this.__hash) : (this.__ownerID = t, this.__altered = !1, this); }, gr.prototype.__iterate = function (t, e) { if (e) return this.reverse().__iterate(t); for (var r = 0, n = this._head; n && !1 !== t(n.value, r++, this);)n = n.next; return r; }, gr.prototype.__iterator = function (t, e) { if (e) return this.reverse().__iterator(t); let r = 0; let n = this._head; return new B(((() => { if (n) { const e = n.value; return n = n.next, R(t, r++, e); } return { value: void 0, done: !0 }; }))); }, gr.isStack = yr; let vr; var mr = '@@__IMMUTABLE_STACK__@@'; const _r = gr.prototype; function Sr(t, e, r, n) { const i = Object.create(_r); return i.size = t, i._head = e, i.__ownerID = r, i.__hash = n, i.__altered = !1, i; } function br() { return vr || (vr = Sr(0)); } function wr(t, e) { const r = function (r) { t.prototype[r] = e[r]; }; return Object.keys(e).forEach(r), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(e).forEach(r), t; }_r[mr] = !0, _r.withMutations = Bt.withMutations, _r.asMutable = Bt.asMutable, _r.asImmutable = Bt.asImmutable, _r.wasAltered = Bt.wasAltered, r.Iterator = B, wr(r, {
        toArray() { Kt(this.size); const t = new Array(this.size || 0); return this.valueSeq().__iterate(((e, r) => { t[r] = e; })), t; }, toIndexedSeq() { return new Oe(this); }, toJS() { return this.toSeq().map(((t) => (t && typeof t.toJS === 'function' ? t.toJS() : t))).__toJS(); }, toJSON() { return this.toSeq().map(((t) => (t && typeof t.toJSON === 'function' ? t.toJSON() : t))).__toJS(); }, toKeyedSeq() { return new Ee(this, !0); }, toMap() { return Tt(this.toKeyedSeq()); }, toObject() { Kt(this.size); const t = {}; return this.__iterate(((e, r) => { t[r] = e; })), t; }, toOrderedMap() { return be(this.toKeyedSeq()); }, toOrderedSet() { return cr(s(this) ? this.valueSeq() : this); }, toSet() { return er(s(this) ? this.valueSeq() : this); }, toSetSeq() { return new De(this); }, toSeq() { return u(this) ? this.toIndexedSeq() : s(this) ? this.toKeyedSeq() : this.toSetSeq(); }, toStack() { return gr(s(this) ? this.valueSeq() : this); }, toList() { return ie(s(this) ? this.valueSeq() : this); }, toString() { return '[Iterable]'; }, __toString(t, e) { return this.size === 0 ? t + e : `${t} ${this.toSeq().map(this.__toStringMapper).join(', ')} ${e}`; }, concat() { const e = t.call(arguments, 0); return je(this, Le(this, e)); }, includes(t) { return this.some(((e) => at(e, t))); }, entries() { return this.__iterator(2); }, every(t, e) { Kt(this.size); let r = !0; return this.__iterate(((n, i, o) => { if (!t.call(e, n, i, o)) return r = !1, !1; })), r; }, filter(t, e) { return je(this, Ie(this, t, e, !0)); }, find(t, e, r) { const n = this.findEntry(t, e); return n ? n[1] : r; }, findEntry(t, e) { let r; return this.__iterate(((n, i, o) => { if (t.call(e, n, i, o)) return r = [i, n], !1; })), r; }, findLastEntry(t, e) { return this.toSeq().reverse().findEntry(t, e); }, forEach(t, e) { return Kt(this.size), this.__iterate(e ? t.bind(e) : t); }, join(t) { Kt(this.size), t = void 0 !== t ? `${t}` : ','; let e = ''; let r = !0; return this.__iterate(((n) => { r ? r = !1 : e += t, e += n != null ? n.toString() : ''; })), e; }, keys() { return this.__iterator(0); }, map(t, e) { return je(this, Me(this, t, e)); }, reduce(t, e, r) { let n; let i; return Kt(this.size), arguments.length < 2 ? i = !0 : n = e, this.__iterate(((e, o, a) => { i ? (i = !1, n = e) : n = t.call(r, n, e, o, a); })), n; }, reduceRight(t, e, r) { const n = this.toKeyedSeq().reverse(); return n.reduce.apply(n, arguments); }, reverse() { return je(this, Ae(this, !0)); }, slice(t, e) { return je(this, Be(this, t, e, !0)); }, some(t, e) { return !this.every(Or(t), e); }, sort(t) { return je(this, Ne(this, t)); }, values() { return this.__iterator(1); }, butLast() { return this.slice(0, -1); }, isEmpty() { return void 0 !== this.size ? this.size === 0 : !this.some((() => !0)); }, count(t, e) { return w(t ? this.toSeq().filter(t, e) : this); }, countBy(t, e) { return (function (t, e, r) { const n = Tt().asMutable(); return t.__iterate(((i, o) => { n.update(e.call(r, i, o, t), 0, ((t) => t + 1)); })), n.asImmutable(); }(this, t, e)); }, equals(t) { return st(this, t); }, entrySeq() { const t = this; if (t._cache) return new V(t._cache); const e = t.toSeq().map(Er).toIndexedSeq(); return e.fromEntrySeq = function () { return t.toSeq(); }, e; }, filterNot(t, e) { return this.filter(Or(t), e); }, findLast(t, e, r) { return this.toKeyedSeq().reverse().find(t, e, r); }, first() { return this.find(x); }, flatMap(t, e) { return je(this, (function (t, e, r) { const n = We(t); return t.toSeq().map(((i, o) => n(e.call(r, i, o, t)))).flatten(!0); }(this, t, e))); }, flatten(t) { return je(this, Fe(this, t, !0)); }, fromEntrySeq() { return new Ke(this); }, get(t, e) { return this.find(((e, r) => at(r, t)), void 0, e); }, getIn(t, e) { for (var r, n = this, i = Xe(t); !(r = i.next()).done;) { const o = r.value; if ((n = n && n.get ? n.get(o, g) : g) === g) return e; } return n; }, groupBy(t, e) { return (function (t, e, r) { const n = s(t); const i = (l(t) ? be() : Tt()).asMutable(); t.__iterate(((o, a) => { i.update(e.call(r, o, a, t), ((t) => ((t = t || []).push(n ? [a, o] : o), t))); })); const o = We(t); return i.map(((e) => je(t, o(e)))); }(this, t, e)); }, has(t) { return this.get(t, g) !== g; }, hasIn(t) { return this.getIn(t, g) !== g; }, isSubset(t) { return t = typeof t.includes === 'function' ? t : r(t), this.every(((e) => t.includes(e))); }, isSuperset(t) { return (t = typeof t.isSubset === 'function' ? t : r(t)).isSubset(this); }, keySeq() { return this.toSeq().map(Cr).toIndexedSeq(); }, last() { return this.toSeq().reverse().first(); }, max(t) { return Pe(this, t); }, maxBy(t, e) { return Pe(this, e, t); }, min(t) { return Pe(this, t ? Dr(t) : Mr); }, minBy(t, e) { return Pe(this, e ? Dr(e) : Mr, t); }, rest() { return this.slice(1); }, skip(t) { return this.slice(Math.max(0, t)); }, skipLast(t) { return je(this, this.toSeq().reverse().skip(t).reverse()); }, skipWhile(t, e) { return je(this, Re(this, t, e, !0)); }, skipUntil(t, e) { return this.skipWhile(Or(t), e); }, sortBy(t, e) { return je(this, Ne(this, e, t)); }, take(t) { return this.slice(0, Math.max(0, t)); }, takeLast(t) { return je(this, this.toSeq().reverse().take(t).reverse()); }, takeWhile(t, e) { return je(this, (function (t, e, r) { const n = Ve(t); return n.__iterateUncached = function (n, i) { const o = this; if (i) return this.cacheResult().__iterate(n, i); let a = 0; return t.__iterate(((t, i, s) => e.call(r, t, i, s) && ++a && n(t, i, o))), a; }, n.__iteratorUncached = function (n, i) { const o = this; if (i) return this.cacheResult().__iterator(n, i); const a = t.__iterator(2, i); let s = !0; return new B(((() => { if (!s) return { value: void 0, done: !0 }; const t = a.next(); if (t.done) return t; const i = t.value; const u = i[0]; const c = i[1]; return e.call(r, c, u, o) ? n === 2 ? t : R(n, u, c, t) : (s = !1, { value: void 0, done: !0 }); }))); }, n; }(this, t, e))); }, takeUntil(t, e) { return this.takeWhile(Or(t), e); }, valueSeq() { return this.toIndexedSeq(); }, hashCode() { return this.__hash || (this.__hash = (function (t) { if (t.size === 1 / 0) return 0; const e = l(t); const r = s(t); let n = e ? 1 : 0; return (function (t, e) { return e = gt(e, 3432918353), e = gt(e << 15 | e >>> -15, 461845907), e = gt(e << 13 | e >>> -13, 5), e = gt((e = (e + 3864292196 | 0) ^ t) ^ e >>> 16, 2246822507), e = yt((e = gt(e ^ e >>> 13, 3266489909)) ^ e >>> 16); }(t.__iterate(r ? e ? (t, e) => { n = 31 * n + Ar(vt(t), vt(e)) | 0; } : (t, e) => { n = n + Ar(vt(t), vt(e)) | 0; } : e ? (t) => { n = 31 * n + vt(t) | 0; } : (t) => { n = n + vt(t) | 0; }), n)); }(this))); },
      }); const kr = r.prototype; kr[f] = !0, kr[I] = kr.values, kr.__toJS = kr.toArray, kr.__toStringMapper = Kr, kr.inspect = kr.toSource = function () { return this.toString(); }, kr.chain = kr.flatMap, kr.contains = kr.includes, (function () { try { Object.defineProperty(kr, 'length', { get() { if (!r.noLengthWarning) { let t; try { throw new Error(); } catch (e) { t = e.stack; } if (t.indexOf('_wrapObject') === -1) return console && console.warn, this.size; } } }); } catch (t) {} }()), wr(n, {
        flip() { return je(this, Te(this)); }, findKey(t, e) { const r = this.findEntry(t, e); return r && r[0]; }, findLastKey(t, e) { return this.toSeq().reverse().findKey(t, e); }, keyOf(t) { return this.findKey(((e) => at(e, t))); }, lastKeyOf(t) { return this.findLastKey(((e) => at(e, t))); }, mapEntries(t, e) { const r = this; let n = 0; return je(this, this.toSeq().map(((i, o) => t.call(e, [o, i], n++, r))).fromEntrySeq()); }, mapKeys(t, e) { const r = this; return je(this, this.toSeq().flip().map(((n, i) => t.call(e, n, i, r))).flip()); },
      }); const xr = n.prototype; function Cr(t, e) { return e; } function Er(t, e) { return [e, t]; } function Or(t) { return function () { return !t.apply(this, arguments); }; } function Dr(t) { return function () { return -t.apply(this, arguments); }; } function Kr(t) { return typeof t === 'string' ? JSON.stringify(t) : t; } function Tr() { return b(arguments); } function Mr(t, e) { return t < e ? 1 : t > e ? -1 : 0; } function Ar(t, e) { return t ^ e + 2654435769 + (t << 6) + (t >> 2) | 0; } return xr[p] = !0, xr[I] = kr.entries, xr.__toJS = kr.toObject, xr.__toStringMapper = function (t, e) { return `${JSON.stringify(e)}: ${Kr(t)}`; }, wr(i, {
        toKeyedSeq() { return new Ee(this, !1); }, filter(t, e) { return je(this, Ie(this, t, e, !1)); }, findIndex(t, e) { const r = this.findEntry(t, e); return r ? r[0] : -1; }, indexOf(t) { const e = this.toKeyedSeq().keyOf(t); return void 0 === e ? -1 : e; }, lastIndexOf(t) { const e = this.toKeyedSeq().reverse().keyOf(t); return void 0 === e ? -1 : e; }, reverse() { return je(this, Ae(this, !1)); }, slice(t, e) { return je(this, Be(this, t, e, !1)); }, splice(t, e) { const r = arguments.length; if (e = Math.max(0 | e, 0), r === 0 || r === 2 && !e) return this; t = E(t, t < 0 ? this.count() : this.size); const n = this.slice(0, t); return je(this, r === 1 ? n : n.concat(b(arguments, 2), this.slice(t + e))); }, findLastIndex(t, e) { const r = this.toKeyedSeq().findLastKey(t, e); return void 0 === r ? -1 : r; }, first() { return this.get(0); }, flatten(t) { return je(this, Fe(this, t, !1)); }, get(t, e) { return (t = k(this, t)) < 0 || this.size === 1 / 0 || void 0 !== this.size && t > this.size ? e : this.find(((e, r) => r === t), void 0, e); }, has(t) { return (t = k(this, t)) >= 0 && (void 0 !== this.size ? this.size === 1 / 0 || t < this.size : this.indexOf(t) !== -1); }, interpose(t) { return je(this, (function (t, e) { const r = Ve(t); return r.size = t.size && 2 * t.size - 1, r.__iterateUncached = function (r, n) { const i = this; let o = 0; return t.__iterate(((t, n) => (!o || !1 !== r(e, o++, i)) && !1 !== r(t, o++, i)), n), o; }, r.__iteratorUncached = function (r, n) { let i; const o = t.__iterator(1, n); let a = 0; return new B(((() => ((!i || a % 2) && (i = o.next()).done ? i : a % 2 ? R(r, a++, e) : R(r, a++, i.value, i))))); }, r; }(this, t))); }, interleave() { const t = [this].concat(b(arguments)); const e = Ue(this.toSeq(), H.of, t); const r = e.flatten(!0); return e.size && (r.size = e.size * t.length), je(this, r); }, last() { return this.get(-1); }, skipWhile(t, e) { return je(this, Re(this, t, e, !1)); }, zip() { const t = [this].concat(b(arguments)); return je(this, Ue(this, Tr, t)); }, zipWith(t) { const e = b(arguments); return e[0] = this, je(this, Ue(this, t, e)); },
      }), i.prototype[h] = !0, i.prototype[d] = !0, wr(o, { get(t, e) { return this.has(t) ? t : e; }, includes(t) { return this.has(t); }, keySeq() { return this.valueSeq(); } }), o.prototype.has = kr.includes, wr(q, n.prototype), wr(H, i.prototype), wr(W, o.prototype), wr(pt, n.prototype), wr(ht, i.prototype), wr(dt, o.prototype), {
        Iterable: r, Seq: j, Collection: ft, Map: Tt, OrderedMap: be, List: ie, Stack: gr, Set: er, OrderedSet: cr, Record: Ge, Range: lt, Repeat: ut, is: at, fromJS: nt,
      };
    }());
  },
  TNQl(t, e, r) {
    const n = r('maj8'); function i() { return (i = n || function (t) { for (let e = 1; e < arguments.length; e++) { const r = arguments[e]; for (const n in r)Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]); } return t; }).apply(this, arguments); } function o(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t; } function a(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const s = r('ERkP'); const u = r('rim0'); const c = r('tI3i'); const l = r('13UR'); const f = u.isBrowser('IE <= 11') || u.isBrowser('Edge'); const p = (function (t) { let e; let r; function n(e) { let r; return a(o(r = t.call(this, e) || this), '_forceFlag', void 0), a(o(r), '_node', void 0), r._forceFlag = !1, r; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const u = n.prototype; return u.shouldComponentUpdate = function (t) { const e = this._node; const r = t.children === ''; l(e) || c(!1); const n = e; return r ? !(function (t) { return f ? t.textContent === '\n' : t.tagName === 'BR'; }(n)) : n.textContent !== t.children; }, u.componentDidMount = function () { this._forceFlag = !this._forceFlag; }, u.componentDidUpdate = function () { this._forceFlag = !this._forceFlag; }, u.render = function () { const t = this; if (this.props.children === '') return this._forceFlag ? (function (t) { return f ? s.createElement('span', { key: 'A', 'data-text': 'true', ref: t }, '\n') : s.createElement('br', { key: 'A', 'data-text': 'true', ref: t }); }(((e) => t._node = e))) : (function (t) { return f ? s.createElement('span', { key: 'B', 'data-text': 'true', ref: t }, '\n') : s.createElement('br', { key: 'B', 'data-text': 'true', ref: t }); }(((e) => t._node = e))); const e = {}; return typeof this.props.style === 'object' && (e.style = this.props.style), s.createElement('span', i({ key: this._forceFlag ? 'A' : 'B', 'data-text': 'true', ref(e) { return t._node = e; } }, e), this.props.children); }, n; }(s.Component)); t.exports = p;
  },
  USh0(t, e, r) {
    const n = r('sWKX'); const i = r('5mUX'); const o = r('tI3i'); function a(t, e, r, a, s, u, c) { let l = r.getStartOffset(); let f = r.getEndOffset(); const p = t.__get(s).getMutability(); const h = c ? l : f; if (p === 'MUTABLE') return r; const d = i(e, s).filter(((t) => h <= t.end && h >= t.start)); d.length != 1 && o(!1); const g = d[0]; if (p === 'IMMUTABLE') return r.merge({ anchorOffset: g.start, focusOffset: g.end, isBackward: !1 }); u || (c ? f = g.end : l = g.start); const y = n.getRemovalRange(l, f, e.getText().slice(g.start, g.end), g.start, a); return r.merge({ anchorOffset: y.start, focusOffset: y.end, isBackward: !1 }); }t.exports = function (t, e, r, n, i) { const o = n.getStartOffset(); const s = n.getEndOffset(); const u = e.getEntityAt(o); const c = r.getEntityAt(s - 1); if (!u && !c) return n; let l = n; if (u && u === c)l = a(t, e, l, i, u, !0, !0); else if (u && c) { const f = a(t, e, l, i, u, !1, !0); const p = a(t, r, l, i, c, !1, !1); l = l.merge({ anchorOffset: f.getAnchorOffset(), focusOffset: p.getFocusOffset(), isBackward: !1 }); } else if (u) { const h = a(t, e, l, i, u, !1, !0); l = l.merge({ anchorOffset: h.getStartOffset(), isBackward: !1 }); } else if (c) { const d = a(t, r, l, i, c, !1, !1); l = l.merge({ focusOffset: d.getEndOffset(), isBackward: !1 }); } return l; };
  },
  UfDk(t, e, r) {
    const n = r('djSO'); const i = r('7002'); const o = r('1xkk'); const a = r('M7w5'); const s = r('vYw2'); const u = r('VVXv'); const c = r('7XzN'); const l = r('MKsC'); const f = r('X+Re'); const p = r('hF1F'); const h = { onDragEnd(t) { t.exitCurrentMode(), d(t); }, onDrop(t, e) { const r = new n(e.nativeEvent.dataTransfer); const l = t._latestEditorState; const h = (function (t, e) { let r = null; let n = null; const i = s(t.currentTarget); if (typeof i.caretRangeFromPoint === 'function') { const o = i.caretRangeFromPoint(t.x, t.y); r = o.startContainer, n = o.startOffset; } else { if (!t.rangeParent) return null; r = t.rangeParent, n = t.rangeOffset; }r = p(r), n = p(n); const u = p(a(r)); return c(e, u, n, u, n); }(e.nativeEvent, l)); if (e.preventDefault(), t._dragCount = 0, t.exitCurrentMode(), h != null) { const y = r.getFiles(); if (y.length > 0) { if (t.props.handleDroppedFiles && f(t.props.handleDroppedFiles(h, y))) return; u(y, ((e) => { e && t.update(g(l, h, e)); })); } else { const v = t._internalDrag ? 'internal' : 'external'; t.props.handleDrop && f(t.props.handleDrop(h, r, v)) || (t._internalDrag ? t.update(function (t, e) { const r = i.moveText(t.getCurrentContent(), t.getSelection(), e); return o.push(t, r, 'insert-fragment'); }(l, h)) : t.update(g(l, h, r.getText()))), d(t); } } }, onDragOver(t, e) { e.preventDefault(); } }; function d(t) { t._internalDrag = !1; const e = t.editorContainer; if (e) { const r = new MouseEvent('mouseup', { view: l(e), bubbles: !0, cancelable: !0 }); e.dispatchEvent(r); } } function g(t, e, r) { const n = i.insertText(t.getCurrentContent(), e, r, t.getCurrentInlineStyle()); return o.push(t, n, 'insert-fragment'); }t.exports = h;
  },
  VUYy(t, e, r) {
    function n(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const i = r('AL/+'); const o = r('+521'); const a = r('Svze'); const s = a.List; const u = a.Repeat; const c = a.Record; const l = function () { return !0; }; const f = c({ start: null, end: null }); const p = c({
      start: null, end: null, decoratorKey: null, leaves: null,
    }); const h = {
      generate(t, e, r) {
        const n = e.getLength(); if (!n) {
          return s.of(new p({
            start: 0, end: 0, decoratorKey: null, leaves: s.of(new f({ start: 0, end: 0 })),
          }));
        } const o = []; const a = r ? r.getDecorations(e, t) : s(u(null, n)); const c = e.getCharacterList(); return i(a, g, l, ((t, e) => {
          o.push(new p({
            start: t, end: e, decoratorKey: a.get(t), leaves: d(c.slice(t, e).toList(), t),
          }));
        })), s(o);
      },
      fromJS(t) { const e = t.leaves; const r = (function (t, e) { if (t == null) return {}; let r; let n; const i = {}; const o = Object.keys(t); for (n = 0; n < o.length; n++)r = o[n], e.indexOf(r) >= 0 || (i[r] = t[r]); return i; }(t, ['leaves'])); return new p(function (t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let i = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (i = i.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), i.forEach(((e) => { n(t, e, r[e]); })); } return t; }({}, r, { leaves: e != null ? s(Array.isArray(e) ? e : o(e)).map(((t) => f(t))) : null })); },
    }; function d(t, e) { const r = []; const n = t.map(((t) => t.getStyle())).toList(); return i(n, g, l, ((t, n) => { r.push(new f({ start: t + e, end: n + e })); })), s(r); } function g(t, e) { return t === e; }t.exports = h;
  },
  VUbk(t, e, r) {
    const n = r('ERkP'); const i = r('2Wwg'); const o = (0, r('Svze').Map)({
      'header-one': { element: 'h1' }, 'header-two': { element: 'h2' }, 'header-three': { element: 'h3' }, 'header-four': { element: 'h4' }, 'header-five': { element: 'h5' }, 'header-six': { element: 'h6' }, section: { element: 'section' }, article: { element: 'article' }, 'unordered-list-item': { element: 'li', wrapper: n.createElement('ul', { className: i('public/DraftStyleDefault/ul') }) }, 'ordered-list-item': { element: 'li', wrapper: n.createElement('ol', { className: i('public/DraftStyleDefault/ol') }) }, blockquote: { element: 'blockquote' }, atomic: { element: 'figure' }, 'code-block': { element: 'pre', wrapper: n.createElement('pre', { className: i('public/DraftStyleDefault/pre') }) }, unstyled: { element: 'div', aliasedElements: ['p'] },
    }); t.exports = o;
  },
  VVXv(t, e, r) {
    (function (e) { const n = r('tI3i'); const i = /\.textClipping$/; const o = { 'text/plain': !0, 'text/html': !0, 'text/rtf': !0 }; t.exports = function (t, r) { let a = 0; const s = []; t.forEach(((u) => { !(function (t, r) { if (!e.FileReader || t.type && !(t.type in o)) return void r(''); if (t.type === '') { let a = ''; return i.test(t.name) && (a = t.name.replace(i, '')), void r(a); } const s = new FileReader(); s.onload = function () { const t = s.result; typeof t !== 'string' && n(!1), r(t); }, s.onerror = function () { r(''); }, s.readAsText(t); }(u, ((e) => { a++, e && s.push(e.slice(0, 5e3)), a == t.length && r(s.join('\r')); }))); })); }; }).call(this, r('fRV1'));
  },
  VeLA(t, e, r) {
    function n(t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { i(t, e, r[e]); })); } return t; } function i(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const o = r('ooRk'); const a = r('b+nQ'); const s = r('IbSy'); const u = r('YM28'); const c = r('krsZ'); const l = r('IDEf'); const f = r('YSZ8'); const p = r('+521'); const h = r('ZUd0'); const d = r('Svze'); const g = r('fNVm'); const y = d.List; const v = d.Record; const m = d.Repeat; const _ = d.Map; const S = d.OrderedMap; const b = v({
      entityMap: null, blockMap: null, selectionBefore: null, selectionAfter: null,
    }); const w = h('draft_tree_data_support') ? u : s; const k = (function (t) {
      let e; let r; function i() { return t.apply(this, arguments) || this; }r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const s = i.prototype; return s.getEntityMap = function () { return c; }, s.getBlockMap = function () { return this.get('blockMap'); }, s.getSelectionBefore = function () { return this.get('selectionBefore'); }, s.getSelectionAfter = function () { return this.get('selectionAfter'); }, s.getBlockForKey = function (t) { return this.getBlockMap().get(t); }, s.getKeyBefore = function (t) {
        return this.getBlockMap().reverse().keySeq().skipUntil(((e) => e === t))
          .skip(1)
          .first();
      }, s.getKeyAfter = function (t) {
        return this.getBlockMap().keySeq().skipUntil(((e) => e === t)).skip(1)
          .first();
      }, s.getBlockAfter = function (t) { return this.getBlockMap().skipUntil(((e, r) => r === t)).skip(1).first(); }, s.getBlockBefore = function (t) {
        return this.getBlockMap().reverse().skipUntil(((e, r) => r === t)).skip(1)
          .first();
      }, s.getBlocksAsArray = function () { return this.getBlockMap().toArray(); }, s.getFirstBlock = function () { return this.getBlockMap().first(); }, s.getLastBlock = function () { return this.getBlockMap().last(); }, s.getPlainText = function (t) { return this.getBlockMap().map(((t) => (t ? t.getText() : ''))).join(t || '\n'); }, s.getLastCreatedEntityKey = function () { return c.__getLastCreatedEntityKey(); }, s.hasText = function () { const t = this.getBlockMap(); return t.size > 1 || escape(t.first().getText()).replace(/%u200B/g, '').length > 0; }, s.createEntity = function (t, e, r) { return c.__create(t, e, r), this; }, s.mergeEntityData = function (t, e) { return c.__mergeData(t, e), this; }, s.replaceEntityData = function (t, e) { return c.__replaceData(t, e), this; }, s.addEntity = function (t) { return c.__add(t), this; }, s.getEntity = function (t) { return c.__get(t); }, s.getAllEntities = function () { return c.__getAll(); }, s.loadWithEntities = function (t) { return c.__loadWithEntities(t); }, i.createFromBlockArray = function (t, e) {
        const r = Array.isArray(t) ? t : t.contentBlocks; const n = o.createFromArray(r); const a = n.isEmpty() ? new l() : l.createEmpty(n.first().getKey()); return new i({
          blockMap: n, entityMap: e || c, selectionBefore: a, selectionAfter: a,
        });
      }, i.createFromText = function (t) {
        const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /\r\n?|\n/g; const r = t.split(e); const n = r.map(((t) => (t = g(t), new w({
          key: f(), text: t, type: 'unstyled', characterList: y(m(a.EMPTY, t.length)),
        })))); return i.createFromBlockArray(n);
      }, i.fromJS = function (t) { return new i(n({}, t, { blockMap: S(t.blockMap).map(i.createContentBlockFromJS), selectionBefore: new l(t.selectionBefore), selectionAfter: new l(t.selectionAfter) })); }, i.createContentBlockFromJS = function (t) { const e = t.characterList; return new w(n({}, t, { data: _(t.data), characterList: e != null ? y((Array.isArray(e) ? e : p(e)).map(((t) => a.fromJS(t)))) : void 0 })); }, i;
    }(b)); t.exports = k;
  },
  Vwge(t, e, r) {
    const n = r('1xkk'); const i = r('iN4q'); const o = r('2KzS'); t.exports = function (t, e) { const r = e.currentTarget.ownerDocument; if (!t.props.preserveSelectionOnBlur && o(r) === r.body) { const a = r.defaultView.getSelection(); const s = t.editor; a.rangeCount === 1 && i(s, a.anchorNode) && i(s, a.focusNode) && a.removeAllRanges(); } const u = t._latestEditorState; const c = u.getSelection(); if (c.getHasFocus()) { const l = c.set('hasFocus', !1); t.props.onBlur && t.props.onBlur(e), t.update(n.acceptSelection(u, l)); } };
  },
  W6iK(t, e, r) {
    const n = r('tI3i'); const i = /[\uD800-\uDFFF]/; function o(t) { return t >= 55296 && t <= 57343; } function a(t) { return i.test(t); } function s(t, e) { return 1 + o(t.charCodeAt(e)); } function u(t, e, r) { if (e = e || 0, r = void 0 === r ? 1 / 0 : r || 0, !a(t)) return t.substr(e, r); const n = t.length; if (n <= 0 || e > n || r <= 0) return ''; let i = 0; if (e > 0) { for (;e > 0 && i < n; e--)i += s(t, i); if (i >= n) return ''; } else if (e < 0) { for (i = n; e < 0 && i > 0; e++)i -= s(t, i - 1); i < 0 && (i = 0); } let o = n; if (r < n) for (o = i; r > 0 && o < n; r--)o += s(t, o); return t.substring(i, o); } const c = {
      getCodePoints(t) { for (var e = [], r = 0; r < t.length; r += s(t, r))e.push(t.codePointAt(r)); return e; }, getUTF16Length: s, hasSurrogateUnit: a, isCodeUnitInSurrogateRange: o, isSurrogatePair(t, e) { if (e >= 0 && e < t.length || n(!1), e + 1 === t.length) return !1; const r = t.charCodeAt(e); const i = t.charCodeAt(e + 1); return r >= 55296 && r <= 56319 && i >= 56320 && i <= 57343; }, strlen(t) { if (!a(t)) return t.length; for (var e = 0, r = 0; r < t.length; r += s(t, r))e++; return e; }, substring(t, e, r) { (e = e || 0) < 0 && (e = 0), (r = void 0 === r ? 1 / 0 : r || 0) < 0 && (r = 0); const n = Math.abs(r - e); return u(t, e = e < r ? e : r, n); }, substr: u,
    }; t.exports = c;
  },
  WbhC(t, e, r) {
    const n = r('IchF'); t.exports = function (t, e) { const r = e.ownerDocument.defaultView.getSelection(); const i = r.anchorNode; const o = r.anchorOffset; const a = r.focusNode; const s = r.focusOffset; return r.rangeCount === 0 || i == null || a == null ? { selectionState: t.getSelection().set('hasFocus', !1), needsRecovery: !1 } : n(t, e, i, o, a, s); };
  },
  WmAF(t, e, r) {
    const n = r('Svze').Map; t.exports = function (t, e, r) {
      const i = e.getStartKey(); const o = e.getEndKey(); const a = t.getBlockMap(); const s = a.toSeq().skipUntil(((t, e) => e === i)).takeUntil(((t, e) => e === o)).concat(n([[o, a.get(o)]]))
        .map(r); return t.merge({ blockMap: a.merge(s), selectionBefore: e, selectionAfter: e });
    };
  },
  'X+Re': function (t, e, r) {
    t.exports = function (t) { return t === 'handled' || !0 === t; };
  },
  XPEN(t, e, r) {
    const n = r('maj8'); function i(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t; } function o(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const a = r('TNQl'); const s = r('ERkP'); const u = r('tI3i'); const c = r('hGHS'); const l = r('1+m/').setDraftEditorSelection; const f = (function (t) { let e; let r; function f() { for (var e, r = arguments.length, n = new Array(r), a = 0; a < r; a++)n[a] = arguments[a]; return o(i(e = t.call.apply(t, [this].concat(n)) || this), 'leaf', void 0), e; }r = t, (e = f).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const p = f.prototype; return p._setSelection = function () { const t = this.props.selection; if (t != null && t.getHasFocus()) { const e = this.props; const r = e.block; const n = e.start; const i = e.text; const o = r.getKey(); const a = n + i.length; if (t.hasEdgeWithin(o, n, a)) { const s = this.leaf; s || u(!1); let f; const p = s.firstChild; p || u(!1), p.nodeType === Node.TEXT_NODE ? f = p : c(p) ? f = s : (f = p.firstChild) || u(!1), l(t, f, o, n, a); } } }, p.shouldComponentUpdate = function (t) { const e = this.leaf; return e || u(!1), e.textContent !== t.text || t.styleSet !== this.props.styleSet || t.forceSelection; }, p.componentDidUpdate = function () { this._setSelection(); }, p.componentDidMount = function () { this._setSelection(); }, p.render = function () { const t = this; const e = this.props.block; let r = this.props.text; r.endsWith('\n') && this.props.isLast && (r += '\n'); const i = this.props; const o = i.customStyleMap; const u = i.customStyleFn; const c = i.offsetKey; const l = i.styleSet; let f = l.reduce(((t, e) => { const r = {}; const i = o[e]; return void 0 !== i && t.textDecoration !== i.textDecoration && (r.textDecoration = [t.textDecoration, i.textDecoration].join(' ').trim()), n(t, i, r); }), {}); if (u) { const p = u(l, e); f = n(f, p); } return s.createElement('span', { 'data-offset-key': c, ref(e) { return t.leaf = e; }, style: f }, s.createElement(a, { style: this.props.style }, r)); }, f; }(s.Component)); t.exports = f;
  },
  XjoI(t, e, r) {
    const n = r('OJbI'); const i = r('XPEN'); const o = r('b//S'); const a = r('Svze'); const s = r('ERkP'); const u = r('2Wwg'); const c = (a.List, (function (t) {
      let e; let r; function a() { return t.apply(this, arguments) || this; } return r = t, (e = a).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r, a.prototype.render = function () {
        const t = this.props; const e = t.block; const r = t.contentState; const a = t.customStyleFn; const c = t.customStyleMap; const l = t.decorator; const f = t.direction; const p = t.forceSelection; const h = t.hasSelection; const d = t.selection; const g = t.tree; const y = e.getKey(); const v = e.getText(); const m = g.size - 1; const _ = this.props.children || g.map(((t, u) => {
          const g = t.get('decoratorKey'); const _ = t.get('leaves'); const S = _.size - 1; const b = _.map(((t, r) => {
            const n = o.encode(y, u, r); const l = t.get('start'); const f = t.get('end'); return s.createElement(i, {
              key: n, offsetKey: n, block: e, start: l, selection: h ? d : null, forceSelection: p, text: v.slice(l, f), styleSet: e.getInlineStyleAt(l), customStyleMap: c, customStyleFn: a, isLast: g === m && r === S,
            });
          })).toArray(); return g && l ? s.createElement(n, {
            block: e, children: b, contentState: r, decorator: l, decoratorKey: g, direction: f, leafSet: t, text: v, key: u,
          }) : b;
        })).toArray(); return s.createElement('div', { 'data-offset-key': o.encode(y, 0, 0), className: u({ 'public/DraftStyleDefault/block': !0, 'public/DraftStyleDefault/ltr': f === 'LTR', 'public/DraftStyleDefault/rtl': f === 'RTL' }) }, _);
      }, a;
    }(s.Component))); t.exports = c;
  },
  Y5pQ(t, e, r) {
    t.exports = function (t) { let e = t || ''; const r = arguments.length; if (r > 1) for (let n = 1; n < r; n++) { const i = arguments[n]; i && (e = (e ? `${e} ` : '') + i); } return e; };
  },
  YM28(t, e, r) {
    const n = r('b+nQ'); const i = r('AL/+'); const o = r('Svze'); const a = o.List; const s = o.Map; const u = o.OrderedSet; const c = o.Record; const l = o.Repeat; const f = u(); const p = {
      parent: null, characterList: a(), data: s(), depth: 0, key: '', text: '', type: 'unstyled', children: a(), prevSibling: null, nextSibling: null,
    }; const h = function (t, e) { return t.getStyle() === e.getStyle(); }; const d = function (t, e) { return t.getEntity() === e.getEntity(); }; const g = function (t) { if (!t) return t; const e = t.characterList; const r = t.text; return r && !e && (t.characterList = a(l(n.EMPTY, r.length))), t; }; const y = (function (t) { let e; let r; function n() { const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p; return t.call(this, g(e)) || this; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const o = n.prototype; return o.getKey = function () { return this.get('key'); }, o.getType = function () { return this.get('type'); }, o.getText = function () { return this.get('text'); }, o.getCharacterList = function () { return this.get('characterList'); }, o.getLength = function () { return this.getText().length; }, o.getDepth = function () { return this.get('depth'); }, o.getData = function () { return this.get('data'); }, o.getInlineStyleAt = function (t) { const e = this.getCharacterList().get(t); return e ? e.getStyle() : f; }, o.getEntityAt = function (t) { const e = this.getCharacterList().get(t); return e ? e.getEntity() : null; }, o.getChildKeys = function () { return this.get('children'); }, o.getParentKey = function () { return this.get('parent'); }, o.getPrevSiblingKey = function () { return this.get('prevSibling'); }, o.getNextSiblingKey = function () { return this.get('nextSibling'); }, o.findStyleRanges = function (t, e) { i(this.getCharacterList(), h, t, e); }, o.findEntityRanges = function (t, e) { i(this.getCharacterList(), d, t, e); }, n; }(c(p))); t.exports = y;
  },
  YSZ8(t, e, r) {
    const n = {}; const i = Math.pow(2, 24); t.exports = function () { for (var t; void 0 === t || n.hasOwnProperty(t) || !isNaN(+t);)t = Math.floor(Math.random() * i).toString(32); return n[t] = !0, t; };
  },
  Yed0(t, e, r) {
    let n; const i = r('tDjQ'); const o = r('Svze'); const a = r('hF1F'); const s = o.OrderedMap; const u = { getDirectionMap(t, e) { n ? n.reset() : n = new i(); const r = t.getBlockMap(); const u = r.valueSeq().map(((t) => a(n).getDirection(t.getText()))); const c = s(r.keySeq().zip(u)); return e != null && o.is(e, c) ? e : c; } }; t.exports = u;
  },
  ZFda(t, e, r) {
    const n = r('1xkk'); const i = r('W6iK'); const o = r('1AUG'); const a = r('4aXP'); t.exports = function (t) { const e = a(t, ((t) => { const e = t.getSelection(); const r = t.getCurrentContent(); const n = e.getAnchorKey(); const a = e.getAnchorOffset(); const s = r.getBlockForKey(n).getText()[a - 1]; return o(t, s ? i.getUTF16Length(s, 0) : 1); }), 'backward'); if (e === t.getCurrentContent()) return t; const r = t.getSelection(); return n.push(t, e.set('selectionBefore', r), r.isCollapsed() ? 'backspace-character' : 'remove-range'); };
  },
  ZUd0(t, e, r) {
    t.exports = function (t) { return !(typeof window === 'undefined' || !window.__DRAFT_GKX) && !!window.__DRAFT_GKX[t]; };
  },
  ZlNV(t, e, r) {
    const n = (function () {
      function t(t) {
        let e; let r; let n; n = void 0, (r = '_uri') in (e = this) ? Object.defineProperty(e, r, {
          value: n, enumerable: !0, configurable: !0, writable: !0,
        }) : e[r] = n, this._uri = t;
      } return t.prototype.toString = function () { return this._uri; }, t;
    }()); t.exports = n;
  },
  ZxmY(t, e, r) {
    const n = r('b+nQ'); t.exports = function (t, e, r, i) { for (var o = e, a = t.getCharacterList(); o < r;)a = a.set(o, n.applyEntity(a.get(o), i)), o++; return t.set('characterList', a); };
  },
  'b+nQ': function (t, e, r) {
    const n = r('Svze');
    const i = n.Map;
    const o = n.OrderedSet;
    const a = n.Record;
    const s = o();
    const u = { style: s, entity: null };
    const c = (function (t) { let e; let r; function n() { return t.apply(this, arguments) || this; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const a = n.prototype; return a.getStyle = function () { return this.get('style'); }, a.getEntity = function () { return this.get('entity'); }, a.hasStyle = function (t) { return this.getStyle().includes(t); }, n.applyStyle = function (t, e) { const r = t.set('style', t.getStyle().add(e)); return n.create(r); }, n.removeStyle = function (t, e) { const r = t.set('style', t.getStyle().remove(e)); return n.create(r); }, n.applyEntity = function (t, e) { const r = t.getEntity() === e ? t : t.set('entity', e); return n.create(r); }, n.create = function (t) { if (!t) return l; const e = i({ style: s, entity: null }).merge(t); const r = f.get(e); if (r) return r; const o = new n(e); return f = f.set(e, o), o; }, n.fromJS = function (t) { const e = t.style; const r = t.entity; return new n({ style: Array.isArray(e) ? o(e) : e, entity: Array.isArray(r) ? o(r) : r }); }, n; }(a(u)));
    var l = new c();
    var f = i([[i(u), l]]); c.EMPTY = l, t.exports = c;
  },
  'b//S': function (t, e, r) {
    const n = { encode(t, e, r) { return `${t}-${e}-${r}`; }, decode(t) { const e = t.split('-').reverse(); const r = e[0]; const n = e[1]; return { blockKey: e.slice(2).reverse().join('-'), decoratorKey: parseInt(n, 10), leafKey: parseInt(r, 10) }; } }; t.exports = n;
  },
  bdcm(t, e, r) {
    function n(t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { i(t, e, r[e]); })); } return t; } function i(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const o = r('YSZ8'); const a = r('tI3i'); const s = function (t) { if (!t || !t.type) return !1; const e = t.type; return e === 'unordered-list-item' || e === 'ordered-list-item'; }; const u = {
      fromRawTreeStateToRawState(t) { const e = t.blocks; const r = []; return Array.isArray(e) || a(!1), Array.isArray(e) && e.length ? ((function (t, e) { for (let r = [].concat(t).reverse(); r.length;) { const n = r.pop(); e(n); const i = n.children; Array.isArray(i) || a(!1), r = r.concat([].concat(i.reverse())); } }(e, ((t) => { const e = n({}, t); s(t) && (e.depth = e.depth || 0, (function (t) { Array.isArray(t.children) && (t.children = t.children.map(((e) => (e.type === t.type ? n({}, e, { depth: (t.depth || 0) + 1 }) : e)))); }(t)), t.children != null && t.children.length > 0) || (delete e.children, r.push(e)); }))), t.blocks = r, n({}, t, { blocks: r })) : t; },
      fromRawStateToRawTreeState(t) {
        const e = []; const r = []; return t.blocks.forEach(((t) => {
          const i = s(t); const a = t.depth || 0; const u = n({}, t, { children: [] }); if (i) {
            let c = r[0]; if (c == null && a === 0)e.push(u); else if (c == null || c.depth < a - 1) {
              const l = {
                key: o(), text: '', depth: a - 1, type: t.type, children: [], entityRanges: [], inlineStyleRanges: [],
              }; r.unshift(l), a === 1 ? e.push(l) : c != null && c.children.push(l), l.children.push(u);
            } else if (c.depth === a - 1)c.children.push(u); else { for (;c != null && c.depth >= a;)r.shift(), c = r[0]; a > 0 ? c.children.push(u) : e.push(u); }
          } else e.push(u);
        })), n({}, t, { blocks: e });
      },
    }; t.exports = u;
  },
  cQcL(t, e, r) {
    const n = /\r\n?|\n/g; t.exports = function (t) { return t.split(n); };
  },
  dVQN(t, e, r) {
    const n = r('R0VQ'); t.exports = function (t) { const e = t.getSelection(); if (!e.rangeCount) return null; const r = e.getRangeAt(0); const i = n(r); const o = i.top; const a = i.right; const s = i.bottom; const u = i.left; return o === 0 && a === 0 && s === 0 && u === 0 ? null : i; };
  },
  dWxr(t, e, r) {
    const n = r('IGGJ'); r('2G9S'), Object.defineProperty(e, '__esModule', { value: !0 }), e.default = function (t, e) { const r = (0, s.default)(t, e).concat((0, a.default)(t)).concat((0, o.default)(t, { checkUrlOverlap: !1 })).concat((0, i.default)(t)); if (r.length == 0) return []; return (0, u.default)(r), r; }; var i = n(r('EW8Q')); var o = n(r('yyPN')); var a = n(r('YXS5')); var s = n(r('vwfs')); var u = n(r('c8jd')); t.exports = e.default;
  },
  djSO(t, e, r) {
    const n = r('/jhs'); const i = r('CqlG'); const o = r('tBqf'); const a = new RegExp('\r\n', 'g'); const s = { 'text/rtf': 1, 'text/html': 1 }; function u(t) { if (t.kind == 'file') return t.getAsFile(); } const c = (function () { function t(t) { this.data = t, this.types = t.types ? i(t.types) : []; } const e = t.prototype; return e.isRichText = function () { return !(!this.getHTML() || !this.getText()) || !this.isImage() && this.types.some(((t) => s[t])); }, e.getText = function () { let t; return this.data.getData && (this.types.length ? this.types.indexOf('text/plain') != -1 && (t = this.data.getData('text/plain')) : t = this.data.getData('Text')), t ? t.replace(a, '\n') : null; }, e.getHTML = function () { if (this.data.getData) { if (!this.types.length) return this.data.getData('Text'); if (this.types.indexOf('text/html') != -1) return this.data.getData('text/html'); } }, e.isLink = function () { return this.types.some(((t) => t.indexOf('Url') != -1 || t.indexOf('text/uri-list') != -1 || t.indexOf('text/x-moz-url'))); }, e.getLink = function () { return this.data.getData ? this.types.indexOf('text/x-moz-url') != -1 ? this.data.getData('text/x-moz-url').split('\n')[0] : this.types.indexOf('text/uri-list') != -1 ? this.data.getData('text/uri-list') : this.data.getData('url') : null; }, e.isImage = function () { const t = this.types.some(((t) => t.indexOf('application/x-moz-file') != -1)); if (t) return !0; for (let e = this.getFiles(), r = 0; r < e.length; r++) { const i = e[r].type; if (!n.isImage(i)) return !1; } return !0; }, e.getCount = function () { return this.data.hasOwnProperty('items') ? this.data.items.length : this.data.hasOwnProperty('mozItemCount') ? this.data.mozItemCount : this.data.files ? this.data.files.length : null; }, e.getFiles = function () { return this.data.items ? Array.prototype.slice.call(this.data.items).map(u).filter(o.thatReturnsArgument) : this.data.files ? Array.prototype.slice.call(this.data.files) : []; }, e.hasFiles = function () { return this.getFiles().length > 0; }, t; }()); t.exports = c;
  },
  e59y(t, e, r) {
    const n = r('RXrk').notEmptyKey; function i(t, e) { return n(e) && t.__get(e).getMutability() === 'MUTABLE' ? e : null; }t.exports = function (t, e) { let r; if (e.isCollapsed()) { const n = e.getAnchorKey(); const o = e.getAnchorOffset(); return o > 0 ? (r = t.getBlockForKey(n).getEntityAt(o - 1)) !== t.getBlockForKey(n).getEntityAt(o) ? null : i(t.getEntityMap(), r) : null; } const a = e.getStartKey(); const s = e.getStartOffset(); const u = t.getBlockForKey(a); return r = s === u.getLength() ? null : u.getEntityAt(s), i(t.getEntityMap(), r); };
  },
  euSu(t, e, r) {
    const n = /-(.)/g; t.exports = function (t) { return t.replace(n, ((t, e) => e.toUpperCase())); };
  },
  fNVm(t, e, r) {
    const n = new RegExp('\r', 'g'); t.exports = function (t) { return t.replace(n, ''); };
  },
  fNrL(t, e, r) {
    const n = r('PrWI'); t.exports = function (t, e) { t._latestEditorState.getSelection().isCollapsed() ? e.preventDefault() : t.setClipboard(n(t._latestEditorState)); };
  },
  fpFo(t, e, r) {
    const n = r('z0XV'); const i = r('7002'); const o = r('b//S'); const a = r('1xkk'); const s = r('ObfX'); const u = r('DuSR'); const c = r('KqX8'); const l = r('WbhC'); const f = r('e59y'); const p = r('hF1F'); let h = !1; let d = !1; let g = null; var y = {
      onCompositionStart(t) { d = !0, (function (t) { g || (g = new n(c(t))).start(); }(t)); },
      onCompositionEnd(t) { h = !1, d = !1, setTimeout((() => { h || y.resolveComposition(t); }), 20); },
      onSelect: u,
      onKeyDown(t, e) { if (!d) return y.resolveComposition(t), void t._onKeyDown(e); e.which !== s.RIGHT && e.which !== s.LEFT || e.preventDefault(); },
      onKeyPress(t, e) { e.which === s.RETURN && e.preventDefault(); },
      resolveComposition(t) {
        if (!d) {
          const e = p(g).stopAndFlushMutations(); g = null, h = !0; let r = a.set(t._latestEditorState, { inCompositionMode: !1 }); if (t.exitCurrentMode(), e.size) {
            let n = r.getCurrentContent(); e.forEach(((t, e) => {
              const s = o.decode(e); const u = s.blockKey; const c = s.decoratorKey; const l = s.leafKey; const p = r.getBlockTree(u).getIn([c, 'leaves', l]); const h = p.start; const d = p.end; const g = r.getSelection().merge({
                anchorKey: u, focusKey: u, anchorOffset: h, focusOffset: d, isBackward: !1,
              }); const y = f(n, g); const v = n.getBlockForKey(u).getInlineStyleAt(h); n = i.replaceText(n, g, t, v, y), r = a.set(r, { currentContent: n });
            })); const s = l(r, c(t)).selectionState; t.restoreEditorDOM(); const u = a.acceptSelection(r, s); t.update(a.push(u, n, 'insert-characters'));
          } else t.update(r);
        }
      },
    }; t.exports = y;
  },
  gLP3(t, e, r) {
    t.exports = function (t, e) { t.setMode('drag'), e.preventDefault(); };
  },
  gUTI(t, e, r) {
    t.exports = function (t) { return !(!t || !t.ownerDocument) && (t.ownerDocument.defaultView ? t instanceof t.ownerDocument.defaultView.HTMLElement : t instanceof HTMLElement); };
  },
  gZn9(t, e, r) {
    const n = r('laB8'); const i = r('ObfX'); const o = r('rim0'); const a = o.isPlatform('Mac OS X'); const s = a && o.isBrowser('Firefox < 29'); const u = n.hasCommandModifier; const c = n.isCtrlKeyCommand; function l(t) { return a && t.altKey || c(t); }t.exports = function (t) { switch (t.keyCode) { case 66: return u(t) ? 'bold' : null; case 68: return c(t) ? 'delete' : null; case 72: return c(t) ? 'backspace' : null; case 73: return u(t) ? 'italic' : null; case 74: return u(t) ? 'code' : null; case 75: return a && c(t) ? 'secondary-cut' : null; case 77: case 79: return c(t) ? 'split-block' : null; case 84: return a && c(t) ? 'transpose-characters' : null; case 85: return u(t) ? 'underline' : null; case 87: return a && c(t) ? 'backspace-word' : null; case 89: return c(t) ? a ? 'secondary-paste' : 'redo' : null; case 90: return (function (t) { return u(t) ? t.shiftKey ? 'redo' : 'undo' : null; }(t)) || null; case i.RETURN: return 'split-block'; case i.DELETE: return (function (t) { return !a && t.shiftKey ? null : l(t) ? 'delete-word' : 'delete'; }(t)); case i.BACKSPACE: return (function (t) { return u(t) && a ? 'backspace-to-start-of-line' : l(t) ? 'backspace-word' : 'backspace'; }(t)); case i.LEFT: return s && u(t) ? 'move-selection-to-start-of-block' : null; case i.RIGHT: return s && u(t) ? 'move-selection-to-end-of-block' : null; default: return null; } };
  },
  glMO(t, e, r) {
    const n = r('1xkk'); const i = r('rim0'); t.exports = function (t, e) { const r = t._latestEditorState; const o = r.getSelection(); if (!o.getHasFocus()) { const a = o.set('hasFocus', !0); t.props.onFocus && t.props.onFocus(e), i.isBrowser('Chrome < 60.0.3081.0') ? t.update(n.forceSelection(r, a)) : t.update(n.acceptSelection(r, a)); } };
  },
  gpZN(t, e, r) {
    const n = r('7002'); const i = r('1xkk'); const o = r('hDHP'); const a = r('hF1F'); let s = null; const u = { cut(t) { const e = t.getCurrentContent(); const r = t.getSelection(); let u = null; if (r.isCollapsed()) { const c = r.getAnchorKey(); const l = e.getBlockForKey(c).getLength(); if (l === r.getAnchorOffset()) { const f = e.getKeyAfter(c); if (f == null) return t; u = r.set('focusKey', f).set('focusOffset', 0); } else u = r.set('focusOffset', l); } else u = r; u = a(u), s = o(e, u); const p = n.removeRange(e, u, 'forward'); return p === e ? t : i.push(t, p, 'remove-range'); }, paste(t) { if (!s) return t; const e = n.replaceWithFragment(t.getCurrentContent(), t.getSelection(), s); return i.push(t, e, 'insert-fragment'); } }; t.exports = u;
  },
  hDHP(t, e, r) {
    const n = r('n1lM'); const i = r('/L11'); t.exports = function (t, e) { const r = e.getStartKey(); const o = e.getStartOffset(); const a = e.getEndKey(); const s = e.getEndOffset(); const u = i(t, e).getBlockMap(); const c = u.keySeq(); const l = c.indexOf(r); const f = c.indexOf(a) + 1; return n(u.slice(l, f).map(((t, e) => { const n = t.getText(); const i = t.getCharacterList(); return r === a ? t.merge({ text: n.slice(o, s), characterList: i.slice(o, s) }) : e === r ? t.merge({ text: n.slice(o), characterList: i.slice(o) }) : e === a ? t.merge({ text: n.slice(0, s), characterList: i.slice(0, s) }) : t; }))); };
  },
  hF1F(t, e, r) {
    t.exports = function (t) { if (t != null) return t; throw new Error('Got unexpected null or undefined'); };
  },
  hGHS(t, e, r) {
    const n = r('13UR'); t.exports = function (t) { return !(!t || !t.ownerDocument) && (n(t) && t.nodeName === 'BR'); };
  },
  hHEM(t, e, r) {
    const n = r('ERkP'); const i = r('dWxr'); const o = r.n(i); const a = r('rHpw'); const s = r('aITJ'); const u = r('zpdM'); const c = { clipPath: 'circle(0% at center)' }; const l = { strategy: (t, e) => { const r = o()(t.getText()); for (let t = 0; t < r.length; t++)r[t].indices && r[t].indices.length === 2 && e(r[t].indices[0], r[t].indices[1]); }, component: (t) => n.createElement('span', { style: { color: a.a.theme.colors.link } }, t.children) }; const f = {
      strategy: (t, e, r) => { t.findEntityRanges((t) => { const e = t.getEntity(); const n = e && r.getEntity(e); return !(!n || n.type !== m.TWEMOJI_ENTITY_TYPE); }, e); },
      component: (t) => {
        const { children: e, contentState: r, entityKey: i } = t; const o = i && r.getEntity(i) || {}; return !(s.a.isFirefox() && s.a.firefoxVersion() < 49) ? n.Children.map(e, (t) => {
          const e = n.Children.map(t, (t) => n.createElement('span', { style: c }, t))[0]; return n.cloneElement(n.createElement('span', null), {
            style: (r = o.data && o.data.url || '', {
              backgroundImage: `url("${r}")`, backgroundSize: '1em 1em', padding: '0.15em', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', WebkitTextFillColor: 'transparent',
            }),
          }, e); let r;
        }) : e;
      },
    }; const p = { strategy: (t, e) => { const r = ((t, e, r) => { const n = e.getText(); let i; let o; for (;i = t.exec(n);)o = i.index, r(o, o + i[0].length); })(/\r/g, t, e); if (r) return e(r, r + 1); }, component: () => '\n' }; const h = r('z4Oz'); const d = (t, e) => { let r = 0; for (let n = 0; n < t.length; n++) { const i = t[n]; const o = i.getText().length; if (r + o >= e) return { blockKey: i.key, offset: e - r }; r += o + 1; } return {}; }; const g = (t, e, r) => { let n = r; const i = t.getBlockForKey(e); if (!i) return; const o = i.getEntityAt(r); if (void 0 !== o) { const e = o && t.getEntity(o); const a = e && e.data && e.data.id; if (void 0 !== a) for (let e = r - 1; e >= 0; e--) { const r = i.getEntityAt(e); const o = r && t.getEntity(r); if (!o || !o.data || o.data.id !== a) { n = e + 1; break; } } } return n; }; const y = 'TWEMOJI'; const v = 'IMMUTABLE'; var m = e.a = {
      convertEmojiToEntities: (t) => {
        const e = u.EditorState.set(t, { allowUndo: !1 }); let r = e.getCurrentContent(); let n = 0; return r.getBlocksAsArray().forEach((t) => {
          h.a.getTwemojiEntities(t.getText()).forEach((i) => {
            if ((i.indices && i.indices.length) !== 2) return; const o = r.createEntity(y, v, { url: i.url || null, id: n }); n += 1; const a = o.getLastCreatedEntityKey(); const s = t.getKey(); const c = e.getSelection().merge({
              anchorKey: s, anchorOffset: i.indices[0], focusKey: s, focusOffset: i.indices[1], isBackward: !1,
            }); r = u.Modifier.applyEntity(o, c, a);
          });
        }), u.EditorState.set(e, { allowUndo: !0, currentContent: r });
      },
      getRelativeOffset: d,
      initEditorState: (t = '') => { const e = [l, f, p]; const r = u.EditorState.createWithContent(u.ContentState.createFromText(t), new u.CompositeDecorator(e)); return u.EditorState.moveSelectionToEnd(r); },
      insertTextAtCursor: (t, e) => { const r = t.getCurrentContent(); const n = t.getSelection(); const i = u.Modifier.insertText(r, n, e); return u.EditorState.push(t, i, 'insert-characters'); },
      TWEMOJI_ENTITY_TYPE: y,
      updateOverflowStyle: (t, e, r = !1) => {
        let n; const i = t.getSelection(); let o = u.EditorState.set(t, { allowUndo: !1 }); const a = t.getCurrentContent().getSelectionBefore(); const s = t.getCurrentContent().getSelectionAfter(); const c = t.getCurrentContent().getBlocksAsArray(); const l = typeof e === 'number' && e > -1; const f = l ? d(c, e) : {}; if (r && (o = ((t, e) => {
          const r = t.getCurrentContent(); const n = r.getFirstBlock(); const i = r.getLastBlock(); const { blockKey: o = i.key, offset: a = i.getText().length } = e; const s = t.getSelection().merge({
            anchorKey: n.key, anchorOffset: 0, focusKey: o, focusOffset: a, isBackward: !1,
          }); const c = u.Modifier.removeInlineStyle(t.getCurrentContent(), s, 'overflow'); return u.EditorState.push(t, c, 'change-inline-style');
        })(o, f), n = !0), l && (o = ((t, e) => {
          const { blockKey: r, offset: n } = e; const i = t.getCurrentContent(); const o = i.getLastBlock(); const a = g(i, r, n); if (r) {
            const e = t.getSelection().merge({
              anchorKey: r, anchorOffset: a, focusKey: o.key, focusOffset: o.getText().length, isBackward: !1,
            }); const n = u.Modifier.applyInlineStyle(i, e, 'overflow'); return u.EditorState.push(t, n, 'change-inline-style');
          } return t;
        })(o, f), n = !0), n) { o = u.EditorState.forceSelection(o, i); let e = o.getCurrentContent(); e = e.set('selectionBefore', a), e = e.set('selectionAfter', s), o = u.EditorState.set(t, { allowUndo: !0, currentContent: e }); } return o;
      },
    };
  },
  hgxY(t, e, r) {
    const n = r('b+nQ'); const i = r('Svze').List; t.exports = function (t, e) { const r = t.map(((t, r) => { const i = e[r]; return n.create({ style: t, entity: i }); })); return i(r); };
  },
  iN4q(t, e, r) {
    const n = r('MIqs'); t.exports = function t(e, r) { return !(!e || !r) && (e === r || !n(e) && (n(r) ? t(e, r.parentNode) : 'contains' in e ? e.contains(r) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(r)))); };
  },
  iogJ(t, e, r) {
    const n = `\\s|(?![_])${r('lTVW').getPunctuation()}`; const i = new RegExp(`^(?:${n})*(?:['‘’]|(?!${n}).)*(?:(?!${n}).)`); const o = new RegExp(`(?:(?!${n}).)(?:['‘’]|(?!${n}).)*(?:${n})*$`); function a(t, e) { const r = e ? o.exec(t) : i.exec(t); return r ? r[0] : t; } const s = { getBackward(t) { return a(t, !0); }, getForward(t) { return a(t, !1); } }; t.exports = s;
  },
  jPSd(t, e) { (function (e) { t.exports = e; }).call(this, {}); },
  k5bp(t, e, r) {
    const n = r('7002'); const i = r('1xkk'); const o = r('/LAw'); const a = r('PrWI'); const s = r('7MNd'); const u = r('kZJE'); t.exports = function (t, e) { let r; const c = t._latestEditorState; const l = c.getSelection(); const f = e.target; if (l.isCollapsed())e.preventDefault(); else { if (u(f)) { const p = f; r = s(o.getScrollParent(p)); } const h = a(c); t.setClipboard(h), t.setMode('cut'), setTimeout((() => { t.restoreEditorDOM(r), t.exitCurrentMode(), t.update(function (t) { const e = n.removeRange(t.getCurrentContent(), t.getSelection(), 'forward'); return i.push(t, e, 'remove-range'); }(c)); }), 0); } };
  },
  kZJE(t, e, r) {
    t.exports = function (t) { if (!t || !('ownerDocument' in t)) return !1; if ('ownerDocument' in t) { const e = t; if (!e.ownerDocument.defaultView) return e instanceof Node; if (e instanceof e.ownerDocument.defaultView.Node) return !0; } return !1; };
  },
  keCP(t, e, r) {
    r('MvUL'), r('kYxP'); const n = r('KEM+'); const i = r.n(n); const o = r('97Jx'); const a = r.n(o); const s = r('rHpw'); const u = r('ERkP'); const c = r('QX9J'); const l = r('k/Ka'); const f = r('w9LO'); const p = r('fs1G'); const h = (r('aWzz'), r('zpdM')); const d = (t) => Object(l.a)('div', t); let g = !1; e.a = u.forwardRef((t, e) => { const r = c.a.useLogger(); return u.createElement(y, a()({}, t, { onFocus: (e) => { t.onFocus && t.onFocus(e), r('focus'); }, ref: e })); }); class y extends u.Component {
      constructor(...t) { super(...t), i()(this, '_setFocusToEnd', () => { const { autoFocus: t, editorState: e, onChange: r } = this.props; t ? r && r(h.EditorState.moveFocusToEnd(e)) : r && r(h.EditorState.moveSelectionToEnd(e)); }), i()(this, '_setDraftJsStyle', () => { const { placeholderTextColor: t } = this.props; const e = document.createElement('style'); e.innerHTML = (({ placeholderTextColor: t = s.a.theme.colors.deepGray }) => `\n         .DraftEditor-editorContainer, .DraftEditor-root, .public-DraftEditor-content {\n            height: inherit;\n            text-align: initial;\n            min-height: inherit;\n            max-height: inherit;\n            overflow: auto;\n        }\n\n        .public-DraftEditor-content[contenteditable=true] {\n            -webkit-user-modify: read-write-plaintext-only\n        }\n\n        .DraftEditor-root {\n            width: 100%;\n            position: relative\n        }\n\n        .DraftEditor-editorContainer {\n            background-color: rgba(255, 255, 255, 0);\n            border-left: .1px solid transparent;\n            position: relative;\n            z-index: 1\n        }\n\n        .public-DraftEditor-block {\n            position: relative\n        }\n\n        .DraftEditor-alignLeft .public-DraftStyleDefault-block {\n            text-align: left\n        }\n\n        .DraftEditor-alignLeft .public-DraftEditorPlaceholder-root {\n            left: 0;\n            text-align: left\n        }\n\n        .DraftEditor-alignCenter .public-DraftStyleDefault-block {\n            text-align: center\n        }\n\n        .DraftEditor-alignCenter .public-DraftEditorPlaceholder-root {\n            margin: 0 auto;\n            text-align: center;\n            width: 100%\n        }\n\n        .DraftEditor-alignRight .public-DraftStyleDefault-block {\n            text-align: right\n        }\n\n        .DraftEditor-alignRight .public-DraftEditorPlaceholder-root {\n            right: 0;\n            text-align: right\n        }\n\n        .public-DraftEditorPlaceholder-root {\n            color: ${t};\n            position: absolute;\n            z-index: 1\n        }\n\n        .public-DraftEditorPlaceholder-hasFocus {\n            color: ${t};\n        }\n\n        .DraftEditorPlaceholder-hidden {\n            display: none\n        }\n\n        .public-DraftStyleDefault-block {\n            position: relative;\n            overflow:hidden;\n            white-space: pre-wrap\n        }\n\n        .public-DraftStyleDefault-ltr {\n            direction: ltr;\n            text-align: left\n        }\n\n        .public-DraftStyleDefault-rtl {\n            direction: rtl;\n            text-align: right\n        }\n\n        .singleline .public-DraftStyleDefault-block {\n            overflow-x: auto;\n            scrollbar-width: none;\n            white-space: nowrap;\n            -ms-overflow-style: none;\n        }\n        .singleline .public-DraftStyleDefault-block::-webkit-scrollbar {\n            display: none;\n        }\n    `)({ placeholderTextColor: t }); const r = document.head; r && r.insertBefore(e, r.firstChild); }), i()(this, 'focus', () => { this._editor && this._editor.focus(); }), i()(this, 'blur', () => { this._editor && this._editor.blur(); }), i()(this, 'value', () => this.props.editorState.getCurrentContent().getPlainText()), i()(this, 'getOffsetHeight', () => { const { editor: t } = this._editor || {}; return t && t.offsetHeight || 0; }), i()(this, '_setEditorRef', (t) => { this._editor = t; }), i()(this, '_handleViewClick', () => this.focus()), i()(this, '_onPastedFiles', (t) => { const { onFilesAdded: e } = this.props; return e && e(t) ? 'handled' : 'not-handled'; }), i()(this, '_onPastedText', (t, e, r) => { const { multiline: n, onChange: i } = this.props; return !n && i ? (i(h.EditorState.push(r, h.Modifier.replaceText(r.getCurrentContent(), r.getSelection(), t.replace(/[\r\n]+/g, ' ')))), 'handled') : 'not-handled'; }), i()(this, '_myKeyBindingFn', (t) => { const { dismissComposerCommandName: e, sendTweetCommandName: r } = this.props; const { hasCommandModifier: n } = h.KeyBindingUtil; return t.keyCode === 13 && n(t) ? r : t.keyCode === 27 ? e : Object(h.getDefaultKeyBinding)(t); }), i()(this, '_onKeyCommand', (t) => { const { keyCommandHandlers: e } = this.props; const r = e && e[t]; return r ? (r(), 'handled') : 'not-handled'; }), i()(this, '_onSingleLineReturn', (t) => { const { handleReturn: e } = this.props; return e && e(t), 'handled'; }); }

      componentDidMount() { const { positionCursorAtEnd: t } = this.props; t ? this._setFocusToEnd() : this.props.autoFocus && this.focus(), g || (this._setDraftJsStyle(), g = !0); }

      render() {
        const {
          ariaActiveDescendant: t, ariaAutocomplete: e, ariaControls: r, ariaLabel: n, editorState: i, handleReturn: o, maxNumberOfLines: a, multiline: c, numberOfLines: l, onChange: p, onFocus: g, onKeyDown: y, onKeyPress: m, onKeyUp: _, placeholder: S, style: b, testID: w,
        } = this.props; const k = c && a ? a : 1; const x = { minHeight: `${(c && l ? l : 1) * parseFloat(s.a.theme.lineHeight)}em`, maxHeight: `${(k - 1) * parseFloat(s.a.theme.lineHeight)}em` }; return u.createElement(d, { className: c ? void 0 : 'singleline', onClick: this._handleViewClick, style: [b, x] }, u.createElement(h.Editor, {
          ariaActiveDescendantID: t, ariaAutoComplete: e, ariaControls: r, ariaLabel: n, ariaMultiline: c, customAttrs: { [f.a.NO_REFOCUS_ATTRIBUTE]: 'true', onKeyPress: m, onKeyUp: _ }, customStyleMap: v(s.a.theme), editorState: i, handleKeyCommand: this._onKeyCommand, handlePastedFiles: this._onPastedFiles, handlePastedText: this._onPastedText, handleReturn: c ? o : this._onSingleLineReturn, keyBindingFn: this._myKeyBindingFn, onChange: p, onFocus: g, onKeyDown: y, placeholder: S, ref: this._setEditorRef, spellCheck: !0, stripPastedStyles: !0, tabIndex: '0', webDriverTestID: w,
        }));
      }
    }i()(y, 'defaultProps', {
      autoFocus: !1, keyCommandHandlers: {}, maxNumberOfLines: 30, multiline: !0, numberOfLines: 6, onFocus: p.a, positionCursorAtEnd: !1,
    }), y.propTypes = {}; const v = ({ colors: t }) => ({ overflow: { backgroundColor: t.textOverflowBackground } });
  },
  krsZ(t, e, r) {
    function n(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const i = r('or4R'); const o = r('Svze'); const a = r('tI3i'); const s = r('OTOR'); let u = (0, o.Map)(); let c = s(); var l = {
      getLastCreatedEntityKey() { return l.__getLastCreatedEntityKey(); }, create(t, e, r) { return l.__create(t, e, r); }, add(t) { return l.__add(t); }, get(t) { return l.__get(t); }, __getAll() { return u; }, __loadWithEntities(t) { u = t, c = s(); }, mergeData(t, e) { return l.__mergeData(t, e); }, replaceData(t, e) { return l.__replaceData(t, e); }, __getLastCreatedEntityKey() { return c; }, __create(t, e, r) { return l.__add(new i({ type: t, mutability: e, data: r || {} })); }, __add(t) { return c = s(), u = u.set(c, t), c; }, __get(t) { const e = u.get(t); return e || a(!1), e; }, __mergeData(t, e) { const r = l.__get(t); const i = (function (t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let i = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (i = i.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), i.forEach(((e) => { n(t, e, r[e]); })); } return t; }({}, r.getData(), e)); const o = r.set('data', i); return u = u.set(t, o), o; }, __replaceData(t, e) { const r = l.__get(t).set('data', e); return u = u.set(t, r), r; },
    }; t.exports = l;
  },
  kuaq(t, e, r) {
    const n = /([A-Z])/g; t.exports = function (t) { return t.replace(n, '-$1').toLowerCase(); };
  },
  l2Ky(t, e, r) {
    const n = r('maj8'); function i() { return (i = n || function (t) { for (let e = 1; e < arguments.length; e++) { const r = arguments[e]; for (const n in r)Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]); } return t; }).apply(this, arguments); } function o(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t; } function a(t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { s(t, e, r[e]); })); } return t; } function s(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const u = r('XjoI'); const c = r('b//S'); const l = r('ERkP'); const f = r('O+2R'); const p = r('/LAw'); const h = r('CtAg'); const d = r('7MNd'); const g = r('BTrg'); const y = r('Svze'); const v = r('tI3i'); const m = r('gUTI'); const _ = (y.List, function (t, e) { return t.getAnchorKey() === e || t.getFocusKey() === e; }); const S = function (t, e) { const r = e.get(t.getType()) || e.get('unstyled'); const n = r.wrapper; return { Element: r.element || e.get('unstyled').element, wrapperTemplate: n }; }; const b = function (t, e) { const r = e(t); return r ? { CustomComponent: r.component, customProps: r.props, customEditable: r.editable } : {}; }; const w = function (t, e, r, n, i, o) {
      let s = {
        'data-block': !0, 'data-editor': e, 'data-offset-key': r, key: t.getKey(), ref: o,
      }; const u = n(t); return u && (s.className = u), void 0 !== i.customEditable && (s = a({}, s, { contentEditable: i.customEditable, suppressContentEditableWarning: !0 })), s;
    }; const k = (function (t) {
      let e; let r; function n() { for (var e, r = arguments.length, n = new Array(r), i = 0; i < r; i++)n[i] = arguments[i]; return s(o(e = t.call.apply(t, [this].concat(n)) || this), 'wrapperRef', l.createRef()), e; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const y = n.prototype; return y.shouldComponentUpdate = function (t) { const e = this.props; const r = e.block; const n = e.direction; const i = e.tree; const o = !r.getChildKeys().isEmpty(); const a = r !== t.block || i !== t.tree || n !== t.direction || _(t.selection, t.block.getKey()) && t.forceSelection; return o || a; }, y.componentDidMount = function () { const t = this.props.selection; const e = t.getEndKey(); if (t.getHasFocus() && e === this.props.block.getKey()) { const r = this.wrapperRef.current; if (r) { let n; const i = p.getScrollParent(r); const o = d(i); if (i === window) { const a = h(r); (n = a.y + a.height - g().height) > 0 && window.scrollTo(o.x, o.y + n + 10); } else { m(r) || v(!1); const s = r; (n = s.offsetHeight + s.offsetTop - (i.offsetHeight + o.y)) > 0 && f.setTop(i, f.getTop(i) + n + 10); } } } }, y.render = function () {
        const t = this; const e = this.props; const r = e.block; const o = e.blockRenderMap; const s = e.blockRendererFn; const f = e.blockStyleFn; const p = e.contentState; const h = e.decorator; const d = e.editorKey; const g = e.editorState; const y = e.customStyleFn; const v = e.customStyleMap; const m = e.direction; const k = e.forceSelection; const x = e.selection; const C = e.tree; let E = null; r.children.size && (E = r.children.reduce(((e, r) => {
          const i = c.encode(r, 0, 0); const u = p.getBlockForKey(r); const h = b(u, s); const y = h.CustomComponent || n; const v = S(u, o); const m = v.Element; const _ = v.wrapperTemplate; const k = w(u, d, i, f, h, null); const x = a({}, t.props, {
            tree: g.getBlockTree(r), blockProps: h.customProps, offsetKey: i, block: u,
          }); return e.push(l.createElement(m, k, l.createElement(y, x))), !_ || (function (t, e) { const r = t.getNextSiblingKey(); return !!r && e.getBlockForKey(r).getType() === t.getType(); }(u, p)) || (function (t, e, r) { const n = []; let i = !0; let o = !1; let a = void 0; try { for (var s, u = r.reverse()[Symbol.iterator](); !(i = (s = u.next()).done); i = !0) { const f = s.value; if (f.type !== e) break; n.push(f); } } catch (t) { o = !0, a = t; } finally { try { i || u.return == null || u.return(); } finally { if (o) throw a; } }r.splice(r.indexOf(n[0]), n.length + 1); const p = n.reverse(); const h = p[0].key; r.push(l.cloneElement(t, { key: ''.concat(h, '-wrap'), 'data-offset-key': c.encode(h, 0, 0) }, p)); }(_, m, e)), e;
        }), [])); const O = r.getKey(); const D = c.encode(O, 0, 0); const K = b(r, s); const T = K.CustomComponent; const M = T != null ? l.createElement(T, i({}, this.props, {
          tree: g.getBlockTree(O), blockProps: K.customProps, offsetKey: D, block: r,
        })) : l.createElement(u, {
          block: r, children: E, contentState: p, customStyleFn: y, customStyleMap: v, decorator: h, direction: m, forceSelection: k, hasSelection: _(x, O), selection: x, tree: C,
        }); if (r.getParentKey()) return M; const A = S(r, o).Element; const I = w(r, d, D, f, K, this.wrapperRef); return l.createElement(A, I, M);
      }, n;
    }(l.Component)); t.exports = k;
  },
  lTVW(t, e, r) {
    t.exports = { getPunctuation() { return "[.,+*?$|#{}()'\\^\\-\\[\\]\\\\\\/!@%\"~=<>_:;・、。〈-】〔-〟：-？！-／［-｀｛-･⸮؟٪-٬؛،؍﴾﴿᠁।၊။‐-‧‰-⁞¡-±´-¸º»¿]"; } };
  },
  laB8(t, e, r) {
    const n = r('rim0'); const i = r('7mA2'); const o = n.isPlatform('Mac OS X'); var a = {
      isCtrlKeyCommand(t) { return !!t.ctrlKey && !t.altKey; }, isOptionKeyCommand(t) { return o && t.altKey; }, usesMacOSHeuristics() { return o; }, hasCommandModifier(t) { return o ? !!t.metaKey && !t.altKey : a.isCtrlKeyCommand(t); }, isSoftNewlineEvent: i,
    }; t.exports = a;
  },
  'mTn+': function (t, e, r) {
    const n = r('IvBP');
    const i = r('W6iK').strlen; t.exports = function (t, e) { const r = []; return t.findEntityRanges(((t) => !!t.getEntity()), ((o, a) => { const s = t.getText(); const u = t.getEntityAt(o); r.push({ offset: i(s.slice(0, o)), length: i(s.slice(o, a)), key: Number(e[n.stringify(u)]) }); })), r; };
  },
  mVQ8(t, e, r) {
    const n = r('13UR'); t.exports = function (t) { return !(!t || !t.ownerDocument) && (n(t) && t.nodeName === 'IMG'); };
  },
  n09L(t, e, r) {
    const n = r('tI3i'); let i = null; function o(t) { return t === 'LTR' || t === 'RTL'; } function a(t) { return o(t) || n(!1), t === 'LTR' ? 'ltr' : 'rtl'; } function s(t) { i = t; } const u = {
      NEUTRAL: 'NEUTRAL', LTR: 'LTR', RTL: 'RTL', isStrong: o, getHTMLDir: a, getHTMLDirIfDifferent(t, e) { return o(t) || n(!1), o(e) || n(!1), t === e ? null : a(t); }, setGlobalDir: s, initGlobalDir() { s('LTR'); }, getGlobalDir() { return i || this.initGlobalDir(), i || n(!1), i; },
    }; t.exports = u;
  },
  n1lM(t, e, r) {
    const n = r('YM28'); const i = r('YSZ8'); const o = r('Svze').OrderedMap; t.exports = function (t) { return t.first() instanceof n ? (function (t) { let e; const r = {}; return o(t.withMutations(((t) => { t.forEach(((n, o) => { const a = n.getKey(); const s = n.getNextSiblingKey(); const u = n.getPrevSiblingKey(); const c = n.getChildKeys(); const l = n.getParentKey(); const f = i(); (r[a] = f, s) && (t.get(s) ? t.setIn([s, 'prevSibling'], f) : t.setIn([a, 'nextSibling'], null)); u && (t.get(u) ? t.setIn([u, 'nextSibling'], f) : t.setIn([a, 'prevSibling'], null)); if (l && t.get(l)) { const p = t.get(l).getChildKeys(); t.setIn([l, 'children'], p.set(p.indexOf(n.getKey()), f)); } else t.setIn([a, 'parent'], null), e && (t.setIn([e.getKey(), 'nextSibling'], f), t.setIn([a, 'prevSibling'], r[e.getKey()])), e = t.get(a); c.forEach(((e) => { t.get(e) ? t.setIn([e, 'parent'], f) : t.setIn([a, 'children'], n.getChildKeys().filter(((t) => t !== e))); })); })); })).toArray().map(((t) => [r[t.getKey()], t.set('key', r[t.getKey()])]))); }(t)) : (function (t) { return o(t.toArray().map(((t) => { const e = i(); return [e, t.set('key', e)]; }))); }(t)); };
  },
  naKV(t, e, r) {
    t.exports = {
      BOLD: { fontWeight: 'bold' }, CODE: { fontFamily: 'monospace', wordWrap: 'break-word' }, ITALIC: { fontStyle: 'italic' }, STRIKETHROUGH: { textDecoration: 'line-through' }, UNDERLINE: { textDecoration: 'underline' },
    };
  },
  njFt(t, e, r) {
    const n = r('7002'); const i = r('1xkk'); const o = r('laB8'); const a = r('ObfX'); const s = r('gpZN'); const u = r('rim0'); const c = r('X+Re'); const l = r('M6Be'); const f = r('0Gcc'); const p = r('t4Yh'); const h = r('9000'); const d = r('8SYF'); const g = r('ybp+'); const y = r('ZFda'); const v = r('9XMQ'); const m = r('njy0'); const _ = r('BsqC'); const S = o.isOptionKeyCommand; const b = u.isBrowser('Chrome'); t.exports = function (t, e) { const r = e.which; const o = t._latestEditorState; function u(r) { const n = t.props[r]; return !!n && (n(e), !0); } switch (r) { case a.RETURN: if (e.preventDefault(), t.props.handleReturn && c(t.props.handleReturn(e, o))) return; break; case a.ESC: if (e.preventDefault(), u('onEscape')) return; break; case a.TAB: if (u('onTab')) return; break; case a.UP: if (u('onUpArrow')) return; break; case a.RIGHT: if (u('onRightArrow')) return; break; case a.DOWN: if (u('onDownArrow')) return; break; case a.LEFT: if (u('onLeftArrow')) return; break; case a.SPACE: b && S(e) && e.preventDefault(); } const w = t.props.keyBindingFn(e); if (w != null && w !== '') if (w !== 'undo') { if (e.preventDefault(), !t.props.handleKeyCommand || !c(t.props.handleKeyCommand(w, o, e.timeStamp))) { const k = (function (t, e, r) { switch (t) { case 'redo': return i.redo(e); case 'delete': return v(e); case 'delete-word': return p(e); case 'backspace': return y(e); case 'backspace-word': return f(e); case 'backspace-to-start-of-line': return l(e, r); case 'split-block': return h(e); case 'transpose-characters': return m(e); case 'move-selection-to-start-of-block': return g(e); case 'move-selection-to-end-of-block': return d(e); case 'secondary-cut': return s.cut(e); case 'secondary-paste': return s.paste(e); default: return e; } }(w, o, e)); k !== o && t.update(k); } } else _(e, o, t.update); else if (r === a.SPACE && b && S(e)) { const x = n.replaceText(o.getCurrentContent(), o.getSelection(), ' '); t.update(i.push(o, x, 'insert-characters')); } };
  },
  njy0(t, e, r) {
    const n = r('7002'); const i = r('1xkk'); const o = r('hDHP'); t.exports = function (t) { const e = t.getSelection(); if (!e.isCollapsed()) return t; const r = e.getAnchorOffset(); if (r === 0) return t; let a; let s; const u = e.getAnchorKey(); const c = t.getCurrentContent(); const l = c.getBlockForKey(u).getLength(); if (l <= 1) return t; r === l ? (a = e.set('anchorOffset', r - 1), s = e) : s = (a = e.set('focusOffset', r + 1)).set('anchorOffset', r + 1); const f = o(c, a); const p = n.removeRange(c, a, 'backward'); const h = p.getSelectionAfter(); const d = h.getAnchorOffset() - 1; const g = h.merge({ anchorOffset: d, focusOffset: d }); const y = n.replaceWithFragment(p, g, f); const v = i.push(t, y, 'insert-fragment'); return i.acceptSelection(v, s); };
  },
  oNIj(t, e, r) {
    const n = r('1xkk'); t.exports = function (t, e) { t.setMode('composite'), t.update(n.set(t._latestEditorState, { inCompositionMode: !0 })), t._onCompositionStart(e); };
  },
  ooRk(t, e, r) {
    const n = r('Svze').OrderedMap; const i = { createFromArray(t) { return n(t.map(((t) => [t.getKey(), t]))); } }; t.exports = i;
  },
  or4R(t, e, r) {
    const n = (function (t) { let e; let r; function n() { return t.apply(this, arguments) || this; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const i = n.prototype; return i.getType = function () { return this.get('type'); }, i.getMutability = function () { return this.get('mutability'); }, i.getData = function () { return this.get('data'); }, n; }((0, r('Svze').Record)({ type: 'TOKEN', mutability: 'IMMUTABLE', data: Object }))); t.exports = n;
  },
  'pW+J': function (t, e, r) {
    const n = r('Svze');
    const i = r('wu3P');
    const o = r('tI3i');
    const a = n.Repeat; t.exports = function (t, e, r, n) {
      e.isCollapsed() || o(!1); let s = null; if (r != null && (s = r.length), s == null || s === 0) return t; const u = t.getBlockMap();
      const c = e.getStartKey();
      const l = e.getStartOffset();
      const f = u.get(c);
      const p = f.getText();
      const h = f.merge({ text: p.slice(0, l) + r + p.slice(l, f.getLength()), characterList: i(f.getCharacterList(), a(n, s).toList(), l) });
      const d = l + s; return t.merge({ blockMap: u.set(c, h), selectionAfter: e.merge({ anchorOffset: d, focusOffset: d }) });
    };
  },
  qUKZ(t, e, r) {
    const n = r('tI3i'); const i = /\./; const o = /\|\|/; const a = /\s+\-\s+/; const s = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/; const u = /^(\d*)(.*)/; function c(t, e) { const r = t.split(o); return r.length > 1 ? r.some(((t) => S.contains(t, e))) : (function (t, e) { const r = t.split(a); if (r.length > 0 && r.length <= 2 || n(!1), r.length === 1) return l(r[0], e); const i = r[0]; const o = r[1]; return g(i) && g(o) || n(!1), l(`>=${i}`, e) && l(`<=${o}`, e); }(t = r[0].trim(), e)); } function l(t, e) { if ((t = t.trim()) === '') return !0; let r; const n = e.split(i); const o = h(t); const a = o.modifier; const s = o.rangeComponents; switch (a) { case '<': return f(n, s); case '<=': return (r = _(n, s)) === -1 || r === 0; case '>=': return p(n, s); case '>': return (function (t, e) { return _(t, e) === 1; }(n, s)); case '~': case '~>': return (function (t, e) { const r = e.slice(); const n = e.slice(); n.length > 1 && n.pop(); const i = n.length - 1; const o = parseInt(n[i], 10); d(o) && (n[i] = `${o + 1}`); return p(t, r) && f(t, n); }(n, s)); default: return (function (t, e) { return _(t, e) === 0; }(n, s)); } } function f(t, e) { return _(t, e) === -1; } function p(t, e) { const r = _(t, e); return r === 1 || r === 0; } function h(t) { const e = t.split(i); const r = e[0].match(s); return r || n(!1), { modifier: r[1], rangeComponents: [r[2]].concat(e.slice(1)) }; } function d(t) { return !isNaN(t) && isFinite(t); } function g(t) { return !h(t).modifier; } function y(t, e) { for (let r = t.length; r < e; r++)t[r] = '0'; } function v(t, e) { const r = t.match(u)[1]; const n = e.match(u)[1]; const i = parseInt(r, 10); const o = parseInt(n, 10); return d(i) && d(o) && i !== o ? m(i, o) : m(t, e); } function m(t, e) { return typeof t !== typeof e && n(!1), t > e ? 1 : t < e ? -1 : 0; } function _(t, e) { for (let r = (function (t, e) { y(t = t.slice(), (e = e.slice()).length); for (let r = 0; r < e.length; r++) { const n = e[r].match(/^[x*]$/i); if (n && (e[r] = t[r] = '0', n[0] === '*' && r === e.length - 1)) for (let i = r; i < t.length; i++)t[i] = '0'; } return y(e, t.length), [t, e]; }(t, e)), n = r[0], i = r[1], o = 0; o < i.length; o++) { const a = v(n[o], i[o]); if (a) return a; } return 0; } var S = { contains(t, e) { return c(t.trim(), e.trim()); } }; t.exports = S;
  },
  'r5/r': function (t, e, r) {
    const n = r('7002');
    const i = r('1xkk');
    const o = r('rim0');
    const a = r('e59y');
    const s = r('X+Re');
    const u = r('ADYu');
    const c = r('hF1F');
    const l = r('z0MJ');
    const f = o.isBrowser('Firefox'); function p(t, e, r, o, a) { const s = n.replaceText(t.getCurrentContent(), t.getSelection(), e, r, o); return i.push(t, s, 'insert-characters', a); }t.exports = function (t, e) {
      void 0 !== t._pendingStateFromBeforeInput && (t.update(t._pendingStateFromBeforeInput), t._pendingStateFromBeforeInput = void 0); const r = t._latestEditorState;
      const n = e.data; if (n) {
        if (t.props.handleBeforeInput && s(t.props.handleBeforeInput(n, r, e.timeStamp)))e.preventDefault(); else {
          const o = r.getSelection();
          const h = o.getStartOffset();
          const d = o.getAnchorKey(); if (!o.isCollapsed()) return e.preventDefault(), void t.update(p(r, n, r.getCurrentInlineStyle(), a(r.getCurrentContent(), r.getSelection()), !0)); let g;
          let y = p(r, n, r.getCurrentInlineStyle(), a(r.getCurrentContent(), r.getSelection()), !1);
          let v = !1; if (v || (v = u(t._latestCommittedEditorState)), !v) {
            const m = r.getBlockTree(d);
            const _ = y.getBlockTree(d); v = m.size !== _.size || m.zip(_).some(((t) => { const e = t[0]; const r = t[1]; const i = e.get('start'); const o = i + (i >= h ? n.length : 0); const a = e.get('end'); const s = a + (a >= h ? n.length : 0); const u = r.get('start'); const c = r.get('end'); const l = r.get('decoratorKey'); return e.get('decoratorKey') !== l || e.get('leaves').size !== r.get('leaves').size || o !== u || s !== c || l != null && c - u != a - i; }));
          } if (v || (g = n, v = f && (g == "'" || g == '/')), v || (v = c(y.getDirectionMap()).get(d) !== c(r.getDirectionMap()).get(d)), v) return e.preventDefault(), y = i.set(y, { forceSelection: !0 }), void t.update(y); y = i.set(y, { nativelyRenderedContent: y.getCurrentContent() }), t._pendingStateFromBeforeInput = y, l((() => { void 0 !== t._pendingStateFromBeforeInput && (t.update(t._pendingStateFromBeforeInput), t._pendingStateFromBeforeInput = void 0); }));
        }
      }
    };
  },
  rim0(t, e, r) {
    const n = r('NGtv'); const i = r('qUKZ'); const o = r('zgZY'); const a = r('vqxm'); function s(t, e, r, n) { if (t === r) return !0; if (!r.startsWith(t)) return !1; let o = r.slice(t.length); return !!e && (o = n ? n(o) : o, i.contains(o, e)); } function u(t) { return n.platformName === 'Windows' ? t.replace(/^\s*NT/, '') : t; } const c = {
      isBrowser(t) { return s(n.browserName, n.browserFullVersion, t); }, isBrowserArchitecture(t) { return s(n.browserArchitecture, null, t); }, isDevice(t) { return s(n.deviceName, null, t); }, isEngine(t) { return s(n.engineName, n.engineVersion, t); }, isPlatform(t) { return s(n.platformName, n.platformFullVersion, t, u); }, isPlatformArchitecture(t) { return s(n.platformArchitecture, null, t); },
    }; t.exports = o(c, a);
  },
  sWKX(t, e, r) {
    t.exports = { getRemovalRange(t, e, r, n, i) { let o = r.split(' '); o = o.map(((t, e) => { if (i === 'forward') { if (e > 0) return ` ${t}`; } else if (e < o.length - 1) return `${t} `; return t; })); for (var a, s = n, u = null, c = null, l = 0; l < o.length; l++) { if (t < (a = s + o[l].length) && s < e)u !== null || (u = s), c = a; else if (u !== null) break; s = a; } const f = n + r.length; const p = u === n; const h = c === f; return (!p && h || p && !h) && (i === 'forward' ? c !== f && c++ : u !== n && u--), { start: u, end: c }; } };
  },
  stkZ(t, e, r) {
    const n = r('13UR'); t.exports = function (t) { return !(!t || !t.ownerDocument) && (n(t) && t.nodeName === 'A'); };
  },
  t4Yh(t, e, r) {
    const n = r('iogJ'); const i = r('1xkk'); const o = r('MzOC'); const a = r('4aXP'); t.exports = function (t) { const e = a(t, ((t) => { const e = t.getSelection(); const r = e.getStartOffset(); const i = e.getStartKey(); const a = t.getCurrentContent().getBlockForKey(i).getText().slice(r); const s = n.getForward(a); return o(t, s.length || 1); }), 'forward'); return e === t.getCurrentContent() ? t : i.push(t, e, 'remove-range'); };
  },
  tBqf(t, e, r) {
    function n(t) { return function () { return t; }; } const i = function () {}; i.thatReturns = n, i.thatReturnsFalse = n(!1), i.thatReturnsTrue = n(!0), i.thatReturnsNull = n(null), i.thatReturnsThis = function () { return this; }, i.thatReturnsArgument = function (t) { return t; }, t.exports = i;
  },
  tDjQ(t, e, r) {
    function n(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const i = r('Fd87'); const o = r('n09L'); const a = r('tI3i'); const s = (function () { function t(t) { n(this, '_defaultDir', void 0), n(this, '_lastDir', void 0), t ? o.isStrong(t) || a(!1) : t = o.getGlobalDir(), this._defaultDir = t, this.reset(); } const e = t.prototype; return e.reset = function () { this._lastDir = this._defaultDir; }, e.getDirection = function (t) { return this._lastDir = i.getDirection(t, this._lastDir), this._lastDir; }, t; }()); t.exports = s;
  },
  tO3r(t, e, r) {
    let n; function i(t) { for (let e = 1; e < arguments.length; e++) { var r = arguments[e] != null ? arguments[e] : {}; let n = Object.keys(r); typeof Object.getOwnPropertySymbols === 'function' && (n = n.concat(Object.getOwnPropertySymbols(r).filter(((t) => Object.getOwnPropertyDescriptor(r, t).enumerable)))), n.forEach(((e) => { o(t, e, r[e]); })); } return t; } function o(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const a = r('b+nQ'); const s = r('IbSy'); const u = r('YM28'); const c = r('VUbk'); const l = r('krsZ'); const f = r('ZlNV'); const p = r('2Wwg'); const h = r('YSZ8'); const d = r('GSkh'); const g = r('ZUd0'); const y = r('Svze'); const v = y.List; const m = y.Map; const _ = y.OrderedSet; const S = r('stkZ'); const b = r('hGHS'); const w = r('gUTI'); const k = r('mVQ8'); const x = g('draft_tree_data_support'); const C = new RegExp('\r', 'g'); const E = new RegExp('\n', 'g'); const O = new RegExp('^\n', 'g'); const D = new RegExp('&nbsp;', 'g'); const K = new RegExp('&#13;?', 'g'); const T = new RegExp('&#8203;?', 'g'); const M = ['bold', 'bolder', '500', '600', '700', '800', '900']; const A = ['light', 'lighter', 'normal', '100', '200', '300', '400']; const I = ['className', 'href', 'rel', 'target', 'title']; const B = ['alt', 'className', 'height', 'src', 'width']; const R = (o(n = {}, p('public/DraftStyleDefault/depth0'), 0), o(n, p('public/DraftStyleDefault/depth1'), 1), o(n, p('public/DraftStyleDefault/depth2'), 2), o(n, p('public/DraftStyleDefault/depth3'), 3), o(n, p('public/DraftStyleDefault/depth4'), 4), n); const L = m({
      b: 'BOLD', code: 'CODE', del: 'STRIKETHROUGH', em: 'ITALIC', i: 'ITALIC', s: 'STRIKETHROUGH', strike: 'STRIKETHROUGH', strong: 'BOLD', u: 'UNDERLINE', mark: 'HIGHLIGHT',
    }); const F = function (t) { const e = {}; return t.mapKeys(((t, r) => { const n = [r.element]; void 0 !== r.aliasedElements && n.push.apply(n, r.aliasedElements), n.forEach(((r) => { void 0 === e[r] ? e[r] = t : typeof e[r] === 'string' ? e[r] = [e[r], t] : e[r].push(t); })); })), m(e); }; const N = function (t) { if (w(t) && t.style.fontFamily.includes('monospace')) return 'CODE'; return null; }; const P = function (t) { let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0; return Object.keys(R).some(((r) => { t.classList.contains(r) && (e = R[r]); })), e; }; const z = function (t) { if (!S(t)) return !1; const e = t; return !(!e.href || e.protocol !== 'http:' && e.protocol !== 'https:' && e.protocol !== 'mailto:' && e.protocol !== 'tel:'); }; const U = function (t) { if (!k(t)) return !1; const e = t; return !(!e.attributes.getNamedItem('src') || !e.attributes.getNamedItem('src').value); }; const j = function (t, e) { if (!w(t)) return e; const r = t; const n = r.style.fontWeight; const i = r.style.fontStyle; const o = r.style.textDecoration; return e.withMutations(((t) => { M.indexOf(n) >= 0 ? t.add('BOLD') : A.indexOf(n) >= 0 && t.remove('BOLD'), i === 'italic' ? t.add('ITALIC') : i === 'normal' && t.remove('ITALIC'), o === 'underline' && t.add('UNDERLINE'), o === 'line-through' && t.add('STRIKETHROUGH'), o === 'none' && (t.remove('UNDERLINE'), t.remove('STRIKETHROUGH')); })); }; const q = function (t) { return t === 'ul' || t === 'ol'; }; const H = (function () {
      function t(t, e) { o(this, 'characterList', v()), o(this, 'currentBlockType', 'unstyled'), o(this, 'currentDepth', 0), o(this, 'currentEntity', null), o(this, 'currentText', ''), o(this, 'wrapper', null), o(this, 'blockConfigs', []), o(this, 'contentBlocks', []), o(this, 'entityMap', l), o(this, 'blockTypeMap', void 0), o(this, 'disambiguate', void 0), this.clear(), this.blockTypeMap = t, this.disambiguate = e; } const e = t.prototype; return e.clear = function () { this.characterList = v(), this.blockConfigs = [], this.currentBlockType = 'unstyled', this.currentDepth = 0, this.currentEntity = null, this.currentText = '', this.entityMap = l, this.wrapper = null, this.contentBlocks = []; }, e.addDOMNode = function (t) { let e; return this.contentBlocks = [], this.currentDepth = 0, (e = this.blockConfigs).push.apply(e, this._toBlockConfigs([t], _())), this._trimCurrentText(), this.currentText !== '' && this.blockConfigs.push(this._makeBlockConfig()), this; }, e.getContentBlocks = function () { return this.contentBlocks.length === 0 && (x ? this._toContentBlocks(this.blockConfigs) : this._toFlatContentBlocks(this.blockConfigs)), { contentBlocks: this.contentBlocks, entityMap: this.entityMap }; }, e._makeBlockConfig = function () {
        const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; const e = t.key || h(); const r = i({
          key: e, type: this.currentBlockType, text: this.currentText, characterList: this.characterList, depth: this.currentDepth, parent: null, children: v(), prevSibling: null, nextSibling: null, childConfigs: [],
        }, t); return this.characterList = v(), this.currentBlockType = 'unstyled', this.currentText = '', r;
      }, e._toBlockConfigs = function (t, e) { for (var r = [], n = 0; n < t.length; n++) { const i = t[n]; const o = i.nodeName.toLowerCase(); if (o === 'body' || q(o)) { this._trimCurrentText(), this.currentText !== '' && r.push(this._makeBlockConfig()); const a = this.currentDepth; const s = this.wrapper; q(o) && (this.wrapper = o, q(s) && this.currentDepth++), r.push.apply(r, this._toBlockConfigs(Array.from(i.childNodes), e)), this.currentDepth = a, this.wrapper = s; } else { let u = this.blockTypeMap.get(o); if (void 0 === u) if (o !== '#text') if (o !== 'br') if (U(i)) this._addImgNode(i, e); else if (z(i)) this._addAnchorNode(i, r, e); else { let c = e; L.has(o) && (c = c.add(L.get(o))), c = j(i, c); const l = N(i); l != null && (c = c.add(l)), r.push.apply(r, this._toBlockConfigs(Array.from(i.childNodes), c)); } else this._addBreakNode(i, e); else this._addTextNode(i, e); else { this._trimCurrentText(), this.currentText !== '' && r.push(this._makeBlockConfig()); const f = this.currentDepth; const p = this.wrapper; if (this.wrapper = o === 'pre' ? 'pre' : this.wrapper, typeof u !== 'string' && (u = this.disambiguate(o, this.wrapper) || u[0] || 'unstyled'), !x && w(i) && (u === 'unordered-list-item' || u === 'ordered-list-item')) { const d = i; this.currentDepth = P(d, this.currentDepth); } const g = h(); const y = this._toBlockConfigs(Array.from(i.childNodes), e); this._trimCurrentText(), r.push(this._makeBlockConfig({ key: g, childConfigs: y, type: u })), this.currentDepth = f, this.wrapper = p; } } } return r; }, e._appendText = function (t, e) { let r; this.currentText += t; const n = a.create({ style: e, entity: this.currentEntity }); this.characterList = (r = this.characterList).push.apply(r, Array(t.length).fill(n)); }, e._trimCurrentText = function () { const t = this.currentText.length; let e = t - this.currentText.trimLeft().length; let r = this.currentText.trimRight().length; let n = this.characterList.findEntry(((t) => t.getEntity() !== null)); (e = void 0 !== n ? Math.min(e, n[0]) : e) > (r = void 0 !== (n = this.characterList.reverse().findEntry(((t) => t.getEntity() !== null))) ? Math.max(r, t - n[0]) : r) ? (this.currentText = '', this.characterList = v()) : (this.currentText = this.currentText.slice(e, r), this.characterList = this.characterList.slice(e, r)); }, e._addTextNode = function (t, e) { let r = t.textContent; r.trim() === '' && this.wrapper !== 'pre' && (r = ' '), this.wrapper !== 'pre' && (r = (r = r.replace(O, '')).replace(E, ' ')), this._appendText(r, e); }, e._addBreakNode = function (t, e) { b(t) && this._appendText('\n', e); }, e._addImgNode = function (t, e) { if (k(t)) { const r = t; const n = {}; B.forEach(((t) => { const e = r.getAttribute(t); e && (n[t] = e); })), this.currentEntity = this.entityMap.__create('IMAGE', 'IMMUTABLE', n), g('draftjs_fix_paste_for_img') ? r.getAttribute('role') !== 'presentation' && this._appendText('📷', e) : this._appendText('📷', e), this.currentEntity = null; } }, e._addAnchorNode = function (t, e, r) { if (S(t)) { const n = t; const i = {}; I.forEach(((t) => { const e = n.getAttribute(t); e && (i[t] = e); })), i.url = new f(n.href).toString(), this.currentEntity = this.entityMap.__create('LINK', 'MUTABLE', i || {}), e.push.apply(e, this._toBlockConfigs(Array.from(t.childNodes), r)), this.currentEntity = null; } }, e._toContentBlocks = function (t) { for (let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r = t.length - 1, n = 0; n <= r; n++) { const o = t[n]; o.parent = e, o.prevSibling = n > 0 ? t[n - 1].key : null, o.nextSibling = n < r ? t[n + 1].key : null, o.children = v(o.childConfigs.map(((t) => t.key))), this.contentBlocks.push(new u(i({}, o))), this._toContentBlocks(o.childConfigs, o.key); } }, e._hoistContainersInBlockConfigs = function (t) { const e = this; return v(t).flatMap(((t) => (t.type !== 'unstyled' || t.text !== '' ? [t] : e._hoistContainersInBlockConfigs(t.childConfigs)))); }, e._toFlatContentBlocks = function (t) { const e = this; this._hoistContainersInBlockConfigs(t).forEach(((t) => { const r = e._extractTextFromBlockConfigs(t.childConfigs); const n = r.text; const o = r.characterList; e.contentBlocks.push(new s(i({}, t, { text: t.text + n, characterList: t.characterList.concat(o) }))); })); }, e._extractTextFromBlockConfigs = function (t) { for (var e = t.length - 1, r = '', n = v(), i = 0; i <= e; i++) { const o = t[i]; r += o.text, n = n.concat(o.characterList), r !== '' && o.type !== 'unstyled' && (r += '\n', n = n.push(n.last())); const a = this._extractTextFromBlockConfigs(o.childConfigs); r += a.text, n = n.concat(a.characterList); } return { text: r, characterList: n }; }, t;
    }()); t.exports = function (t) {
      const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d; const r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : c; const n = e(t = t.trim().replace(C, '').replace(D, ' ').replace(K, '')
        .replace(T, '')); if (!n) return null; const i = F(r); const o = function (t, e) { return t === 'li' ? e === 'ol' ? 'ordered-list-item' : 'unordered-list-item' : null; }; return new H(i, o).addDOMNode(n).getContentBlocks();
    };
  },
  tRbA(t, e, r) {
    const n = r('ERkP'); const i = r('2Wwg'); const o = (function (t) { let e; let r; function o() { return t.apply(this, arguments) || this; }r = t, (e = o).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const a = o.prototype; return a.shouldComponentUpdate = function (t) { return this.props.text !== t.text || this.props.editorState.getSelection().getHasFocus() !== t.editorState.getSelection().getHasFocus(); }, a.render = function () { const t = this.props.editorState.getSelection().getHasFocus(); const e = i({ 'public/DraftEditorPlaceholder/root': !0, 'public/DraftEditorPlaceholder/hasFocus': t }); return n.createElement('div', { className: e }, n.createElement('div', { className: i('public/DraftEditorPlaceholder/inner'), id: this.props.accessibilityID, style: { whiteSpace: 'pre-wrap' } }, this.props.text)); }, o; }(n.Component)); t.exports = o;
  },
  uJSo(t, e, r) {
    const n = r('YM28'); const i = r('HdU4'); const o = r('Svze'); const a = r('tI3i'); const s = o.OrderedMap; const u = o.List; const c = function (t, e, r) { if (t) { const n = e.get(t); n && e.set(t, r(n)); } }; const l = function (t, e, r, n, i) { if (!i) return t; const o = n === 'after'; const a = e.getKey(); const s = r.getKey(); const l = e.getParentKey(); const f = e.getNextSiblingKey(); const p = e.getPrevSiblingKey(); const h = r.getParentKey(); const d = o ? r.getNextSiblingKey() : s; const g = o ? s : r.getPrevSiblingKey(); return t.withMutations(((t) => { c(l, t, ((t) => { const e = t.getChildKeys(); return t.merge({ children: e.delete(e.indexOf(a)) }); })), c(p, t, ((t) => t.merge({ nextSibling: f }))), c(f, t, ((t) => t.merge({ prevSibling: p }))), c(d, t, ((t) => t.merge({ prevSibling: a }))), c(g, t, ((t) => t.merge({ nextSibling: a }))), c(h, t, ((t) => { const e = t.getChildKeys(); const r = e.indexOf(s); const n = o ? r + 1 : r !== 0 ? r - 1 : 0; const i = e.toArray(); return i.splice(n, 0, a), t.merge({ children: u(i) }); })), c(a, t, ((t) => t.merge({ nextSibling: d, prevSibling: g, parent: h }))); })); }; t.exports = function (t, e, r, o) { o === 'replace' && a(!1); const u = r.getKey(); const c = e.getKey(); c === u && a(!1); const f = t.getBlockMap(); const p = e instanceof n; let h = [e]; let d = f.delete(c); p && (h = [], d = f.withMutations(((t) => { const r = e.getNextSiblingKey(); const n = i(e, t); t.toSeq().skipUntil(((t) => t.getKey() === c)).takeWhile(((t) => { const e = t.getKey(); const i = e === c; const o = r && e !== r; const a = !r && t.getParentKey() && (!n || e !== n); return !!(i || o || a); })).forEach(((e) => { h.push(e), t.delete(e.getKey()); })); }))); const g = d.toSeq().takeUntil(((t) => t === r)); const y = d.toSeq().skipUntil(((t) => t === r)).skip(1); const v = h.map(((t) => [t.getKey(), t])); let m = s(); if (o === 'before') { const _ = t.getBlockBefore(u); _ && _.getKey() === e.getKey() && a(!1), m = g.concat([].concat(v, [[u, r]]), y).toOrderedMap(); } else if (o === 'after') { const S = t.getBlockAfter(u); S && S.getKey() === c && a(!1), m = g.concat([[u, r]].concat(v), y).toOrderedMap(); } return t.merge({ blockMap: l(m, e, r, o, p), selectionBefore: t.getSelectionAfter(), selectionAfter: t.getSelectionAfter().merge({ anchorKey: c, focusKey: c }) }); };
  },
  udiT(t, e, r) {
    t.exports = function (t, e, r, n) {
      const i = e.getStartKey(); const o = e.getEndKey(); let a = t.getBlockMap(); const s = a.toSeq().skipUntil(((t, e) => e === i)).takeUntil(((t, e) => e === o)).concat([[o, a.get(o)]])
        .map(((t) => { let e = t.getDepth() + r; return e = Math.max(0, Math.min(e, n)), t.set('depth', e); })); return a = a.merge(s), t.merge({ blockMap: a, selectionBefore: e, selectionAfter: e });
    };
  },
  vHsC(t, e, r) {
    const n = r('maj8'); function i() { return (i = n || function (t) { for (let e = 1; e < arguments.length; e++) { const r = arguments[e]; for (const n in r)Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]); } return t; }).apply(this, arguments); } const o = r('l2Ky'); const a = r('b//S'); const s = r('ERkP'); const u = r('hF1F'); const c = (function (t) {
      let e; let r; function n() { return t.apply(this, arguments) || this; }r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, e.__proto__ = r; const c = n.prototype; return c.shouldComponentUpdate = function (t) { const e = this.props.editorState; const r = t.editorState; if (e.getDirectionMap() !== r.getDirectionMap()) return !0; if (e.getSelection().getHasFocus() !== r.getSelection().getHasFocus()) return !0; const n = r.getNativelyRenderedContent(); const i = e.isInCompositionMode(); const o = r.isInCompositionMode(); if (e === r || n !== null && r.getCurrentContent() === n || i && o) return !1; const a = e.getCurrentContent(); const s = r.getCurrentContent(); const u = e.getDecorator(); const c = r.getDecorator(); return i !== o || a !== s || u !== c || r.mustForceSelection(); }, c.render = function () {
        for (var t = this.props, e = t.blockRenderMap, r = t.blockRendererFn, n = t.blockStyleFn, c = t.customStyleMap, l = t.customStyleFn, f = t.editorState, p = t.editorKey, h = t.textDirectionality, d = f.getCurrentContent(), g = f.getSelection(), y = f.mustForceSelection(), v = f.getDecorator(), m = u(f.getDirectionMap()), _ = [], S = d.getBlocksAsArray()[0]; S;) {
          const b = S.getKey(); const w = {
            blockRenderMap: e, blockRendererFn: r, blockStyleFn: n, contentState: d, customStyleFn: l, customStyleMap: c, decorator: v, editorKey: p, editorState: f, forceSelection: y, selection: g, block: S, direction: h || m.get(b), tree: f.getBlockTree(b),
          }; const k = (e.get(S.getType()) || e.get('unstyled')).wrapper; _.push({
            block: s.createElement(o, i({ key: b }, w)), wrapperTemplate: k, key: b, offsetKey: a.encode(b, 0, 0),
          }); const x = S.getNextSiblingKey(); S = x ? d.getBlockForKey(x) : null;
        } for (var C = [], E = 0; E < _.length;) { const O = _[E]; if (O.wrapperTemplate) { const D = []; do { D.push(_[E].block), E++; } while (E < _.length && _[E].wrapperTemplate === O.wrapperTemplate);const K = s.cloneElement(O.wrapperTemplate, { key: `${O.key}-wrap`, 'data-offset-key': O.offsetKey }, D); C.push(K); } else C.push(O.block), E++; } return s.createElement('div', { 'data-contents': 'true' }, C);
      }, n;
    }(s.Component)); t.exports = c;
  },
  vYw2(t, e, r) {
    t.exports = function (t) { return t && t.ownerDocument ? t.ownerDocument : document; };
  },
  vqxm(t, e, r) {
    t.exports = function (t) { const e = {}; return function (r) { return e.hasOwnProperty(r) || (e[r] = t.call(this, r)), e[r]; }; };
  },
  wH9P(t, e, r) {
    const n = r('Svze').List; const i = (function () {
      function t(t) {
        let e; let r; let n; n = void 0, (r = '_decorators') in (e = this) ? Object.defineProperty(e, r, {
          value: n, enumerable: !0, configurable: !0, writable: !0,
        }) : e[r] = n, this._decorators = t.slice();
      } const e = t.prototype; return e.getDecorations = function (t, e) { const r = Array(t.getText().length).fill(null); return this._decorators.forEach(((n, i) => { let o = 0; (0, n.strategy)(t, ((t, e) => { (function (t, e, r) { for (let n = e; n < r; n++) if (t[n] != null) return !1; return !0; }(r, t, e)) && (!(function (t, e, r, n) { for (let i = e; i < r; i++)t[i] = n; }(r, t, e, `${i}.${o}`)), o++); }), e); })), n(r); }, e.getComponentForKey = function (t) { const e = parseInt(t.split('.')[0], 10); return this._decorators[e].component; }, e.getPropsForKey = function (t) { const e = parseInt(t.split('.')[0], 10); return this._decorators[e].props; }, t;
    }()); t.exports = i;
  },
  wu3P(t, e, r) {
    t.exports = function (t, e, r) { let n = t; if (r === n.count())e.forEach(((t) => { n = n.push(t); })); else if (r === 0)e.reverse().forEach(((t) => { n = n.unshift(t); })); else { const i = n.slice(0, r); const o = n.slice(r); n = i.concat(e, o).toList(); } return n; };
  },
  'ybp+': function (t, e, r) {
    const n = r('1xkk'); t.exports = function (t) {
      const e = t.getSelection();
      const r = e.getStartKey(); return n.set(t, {
        selection: e.merge({
          anchorKey: r, anchorOffset: 0, focusKey: r, focusOffset: 0, isBackward: !1,
        }),
        forceSelection: !0,
      });
    };
  },
  yzfH(t, e, r) {
    const n = r('ooRk'); const i = r('YM28'); const o = r('Svze'); const a = r('wu3P'); const s = r('tI3i'); const u = r('n1lM'); const c = o.List; const l = function (t, e, r, n, i, o) {
      const s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 'REPLACE_WITH_NEW_DATA'; const u = r.get(i); const c = u.getText(); const l = u.getCharacterList(); const f = i; const p = o + n.getText().length; let
        h = null; switch (s) { case 'MERGE_OLD_DATA_TO_NEW_DATA': h = n.getData().merge(u.getData()); break; case 'REPLACE_WITH_NEW_DATA': h = n.getData(); } let d = u.getType(); c && d === 'unstyled' && (d = n.getType()); const g = u.merge({
        text: c.slice(0, o) + n.getText() + c.slice(o), characterList: a(l, n.getCharacterList(), o), type: d, data: h,
      }); return t.merge({
        blockMap: r.set(i, g),
        selectionBefore: e,
        selectionAfter: e.merge({
          anchorKey: f, anchorOffset: p, focusKey: f, focusOffset: p, isBackward: !1,
        }),
      });
    }; const f = function (t, e, r, o, a, s) {
      const u = r.first() instanceof i; const l = []; const f = o.size; const p = r.get(a); const h = o.first(); const d = o.last(); const g = d.getLength(); const y = d.getKey(); const v = u && (!p.getChildKeys().isEmpty() || !h.getChildKeys().isEmpty()); r.forEach(((t, e) => {
        e === a ? (v ? l.push(t) : l.push(function (t, e, r) {
          const n = t.getText(); const i = t.getCharacterList(); const o = n.slice(0, e); const a = i.slice(0, e); const s = r.first(); return t.merge({
            text: o + s.getText(), characterList: a.concat(s.getCharacterList()), type: o ? t.getType() : s.getType(), data: s.getData(),
          });
        }(t, s, o)), o.slice(v ? 0 : 1, f - 1).forEach(((t) => l.push(t))), l.push(function (t, e, r) { const n = t.getText(); const i = t.getCharacterList(); const o = n.length; const a = n.slice(e, o); const s = i.slice(e, o); const u = r.last(); return u.merge({ text: u.getText() + a, characterList: u.getCharacterList().concat(s), data: u.getData() }); }(t, s, o))) : l.push(t);
      })); let m = n.createFromArray(l); return u && (m = (function (t, e, r, n) { return t.withMutations(((e) => { const i = r.getKey(); const o = n.getKey(); const a = r.getNextSiblingKey(); const s = r.getParentKey(); const u = (function (t, e) { const r = t.getKey(); let n = t; const i = []; for (e.get(r) && i.push(r); n && n.getNextSiblingKey();) { const o = n.getNextSiblingKey(); if (!o) break; i.push(o), n = e.get(o); } return i; }(n, t)); const l = u[u.length - 1]; if (e.get(o) ? (e.setIn([i, 'nextSibling'], o), e.setIn([o, 'prevSibling'], i)) : (e.setIn([i, 'nextSibling'], n.getNextSiblingKey()), e.setIn([n.getNextSiblingKey(), 'prevSibling'], i)), e.setIn([l, 'nextSibling'], a), a && e.setIn([a, 'prevSibling'], l), u.forEach(((t) => e.setIn([t, 'parent'], s))), s) { const f = t.get(s).getChildKeys(); const p = f.indexOf(i) + 1; const h = f.toArray(); h.splice.apply(h, [p, 0].concat(u)), e.setIn([s, 'children'], c(h)); } })); }(m, 0, p, h))), t.merge({
        blockMap: m,
        selectionBefore: e,
        selectionAfter: e.merge({
          anchorKey: y, anchorOffset: g, focusKey: y, focusOffset: g, isBackward: !1,
        }),
      });
    }; t.exports = function (t, e, r) { const n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 'REPLACE_WITH_NEW_DATA'; e.isCollapsed() || s(!1); const o = t.getBlockMap(); const a = u(r); const c = e.getStartKey(); const p = e.getStartOffset(); const h = o.get(c); return h instanceof i && (h.getChildKeys().isEmpty() || s(!1)), a.size === 1 ? l(t, e, o, a.first(), c, p, n) : f(t, e, o, a, c, p); };
  },
  z0XV(t, e, r) {
    function n(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = r, t;
    } const i = r('rim0'); const o = r('M7w5'); const a = r('MKsC'); const s = r('Svze'); const u = r('tI3i'); const c = r('hF1F'); const l = s.Map; const f = {
      subtree: !0, characterData: !0, childList: !0, characterDataOldValue: !1, attributes: !1,
    }; const p = i.isBrowser('IE <= 11'); const h = (function () { function t(t) { const e = this; n(this, 'observer', void 0), n(this, 'container', void 0), n(this, 'mutations', void 0), n(this, 'onCharData', void 0), this.container = t, this.mutations = l(); const r = a(t); r.MutationObserver && !p ? this.observer = new r.MutationObserver((((t) => e.registerMutations(t)))) : this.onCharData = function (t) { t.target instanceof Node || u(!1), e.registerMutation({ type: 'characterData', target: t.target }); }; } const e = t.prototype; return e.start = function () { this.observer ? this.observer.observe(this.container, f) : this.container.addEventListener('DOMCharacterDataModified', this.onCharData); }, e.stopAndFlushMutations = function () { const t = this.observer; t ? (this.registerMutations(t.takeRecords()), t.disconnect()) : this.container.removeEventListener('DOMCharacterDataModified', this.onCharData); const e = this.mutations; return this.mutations = l(), e; }, e.registerMutations = function (t) { for (let e = 0; e < t.length; e++) this.registerMutation(t[e]); }, e.getMutationTextContent = function (t) { const e = t.type; const r = t.target; const n = t.removedNodes; if (e === 'characterData') { if (r.textContent !== '') return p ? r.textContent.replace('\n', '') : r.textContent; } else if (e === 'childList') { if (n && n.length) return ''; if (r.textContent !== '') return r.textContent; } return null; }, e.registerMutation = function (t) { const e = this.getMutationTextContent(t); if (e != null) { const r = c(o(t.target)); this.mutations = this.mutations.set(r, e); } }, t; }()); t.exports = h;
  },
  zRF8(t, e, r) {},
  zYrz(t, e, r) {
    const n = r('W6iK'); const i = r('AL/+'); const o = function (t, e) { return t === e; }; const a = function (t) { return !!t; }; const s = []; t.exports = function (t) { const e = t.getCharacterList().map(((t) => t.getStyle())).toList(); const r = e.flatten().toSet().map(((r) => (function (t, e, r) { const s = []; const u = e.map(((t) => t.has(r))).toList(); return i(u, o, a, ((e, i) => { const o = t.getText(); s.push({ offset: n.strlen(o.slice(0, e)), length: n.strlen(o.slice(e, i)), style: r }); })), s; }(t, e, r)))); return Array.prototype.concat.apply(s, r.toJS()); };
  },
  zgZY(t, e, r) {
    const n = Object.prototype.hasOwnProperty; t.exports = function (t, e, r) { if (!t) return null; const i = {}; for (const o in t)n.call(t, o) && (i[o] = e.call(r, t[o], o, t)); return i; };
  },
  zpdM(t, e, r) {
    const n = r('ApIa'); const i = r('ooRk'); const o = r('b+nQ'); const a = r('wH9P'); const s = r('IbSy'); const u = r('VeLA'); const c = r('VUbk'); const l = r('naKV'); const f = r('0Uhd'); const p = r('MOn9'); const h = r('krsZ'); const d = r('7002'); const g = r('or4R'); const y = r('1xkk'); const v = r('laB8'); const m = r('zRF8'); const _ = r('9Kr7'); const S = r('IDEf'); const b = r('GyyK'); const w = r('KOTo'); const k = r('YSZ8'); const x = r('gZn9'); const C = r('dVQN'); const E = {
      Editor: f, EditorBlock: p, EditorState: y, CompositeDecorator: a, Entity: h, EntityInstance: g, BlockMapBuilder: i, CharacterMetadata: o, ContentBlock: s, ContentState: u, RawDraftContentState: m, SelectionState: S, AtomicBlockUtils: n, KeyBindingUtil: v, Modifier: d, RichUtils: _, DefaultDraftBlockRenderMap: c, DefaultDraftInlineStyle: l, convertFromHTML: r('tO3r'), convertFromRaw: w, convertToRaw: b, genKey: k, getDefaultKeyBinding: x, getVisibleSelectionRect: C,
    }; t.exports = E;
  },
}]);
// # sourceMappingURL=https://ton.twitter.com/responsive-web-internal/sourcemaps/client-web/shared~bundle.RichTextCompose~bundle.DMRichTextCompose~ondemand.RichText.da96bfd5.js.map
