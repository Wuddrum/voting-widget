function VotingWidget(options) {
    var THUMB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16"><style type="text/css">.a{fill:none;stroke:#000000;stroke-miterlimit:10;}.b{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><path class="thumb-part1 a" d="M1.8,6.4h1.3c0.7,0,1.3,0.5,1.3,1.1v6.9c0,0.6-0.6,1.1-1.3,1.1H1.8c-0.7,0-1.3-0.5-1.3-1.1V7.6C0.5,6.9,1.1,6.4,1.8,6.4z"/><path class="thumb-part2 b" d="M4.5,7.8c0-0.2,0.1-0.4,0.2-0.6L7,3.7c0.5-1.2-0.2-2.3,1.1-2.5c2,0.3,1.6,4.7,1.6,4.7l3.4-0.5c0.6-0.1,1.2,0.3,1.3,1v0.1v1.4c0.8,0.4,1.1,1.3,0.7,2c-0.1,0.3-0.4,0.6-0.7,0.7c0.6,0.6,0.6,1.6-0.1,2.2c-0.1,0.1-0.3,0.3-0.5,0.3l0.2,1.1c0.1,0.6-0.3,1.2-0.9,1.3c-0.1,0-0.1,0-0.2,0H5.6c-0.6,0-1.1-0.5-1.1-1.1V7.8z"/></svg>';
    var STARS_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 19.73 19.6"><defs><style>.c{fill:#fff;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.5px;}</style></defs><title>Stars2</title><path class="c" d="M15.31,1.77l-.66-.37L15.31,1l.37-.68L16,1l.67.37L16,1.77l-.36.67Z" transform="translate(-0.12 -0.1)"/><path class="c" d="M1,6.08.37,5.71,1,5.34l.37-.67.36.67.67.37-.67.37-.36.68Z" transform="translate(-0.12 -0.1)"/><path class="c" d="M16.33,18.78l-.67-.37.67-.37.36-.67.37.67.66.37-.66.37-.37.68Z" transform="translate(-0.12 -0.1)"/><path class="c" d="M5.71,1.26l-.38-.21L5.71.84,5.92.45l.21.39.38.21-.38.21-.2.39Z" transform="translate(-0.12 -0.1)"/><path class="c" d="M18.8,3.65l-.38-.21.38-.22L19,2.84l.21.38.38.22-.38.21L19,4Z" transform="translate(-0.12 -0.1)"/><path class="c" d="M.86,15.14l-.38-.21.38-.21.21-.39.21.39.38.21-.38.21-.21.39Z" transform="translate(-0.12 -0.1)"/></svg>';
    var LINES_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 9.44 4.38"><defs><style>.d{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.5px;}</style></defs><title>Lines2</title><path class="d" d="M1.59,4.13.25,3.23"/><path class="d" d="M4.14,3.29,2.59,1.62"/><path class="d" d="M6.07,3.11V.25"/><path class="d" d="M8,3.32l1.17-1.7"/></svg>';

    var that = this;
    options = options || {};
    var id = options.id || '';
    var horizontalPosition = options.horizontalPosition || HorizontalPosition.Left;
    var verticalPosition = options.verticalPosition || VerticalPosition.Top;
    var horizontalAnchor = options.horizontalAnchor || HorizontalAnchor.Inside;
    var verticalAnchor = options.verticalAnchor || VerticalAnchor.Inside;
    var layout = options.layout || Layout.Horizontal;
    var containerEl = options.containerElement || document.body;
    var stateChangedCallback = options.stateChangedCallback || null;
    var state = null;
    var widgetEl = createAndInsertWidget();
    setState(options.state || VoteState.Neutral, false);

    this.options = {};

    Object.defineProperty(this.options, 'id', {
        get: function() {
            return id;
        },
        set: function(value) {
            id = value;
            widgetEl.setAttribute('id', value);
        }
    });

    Object.defineProperty(this.options, 'state', {
        get: function() {
            return state;
        },
        set: function(value) {
            setState(value, true);
        }
    });

    Object.defineProperty(this.options, 'horizontalPosition', {
        get: function() {
            return horizontalPosition;
        },
        set: function(value) {
            horizontalPosition = value;
            removeHorizontalPositionClasses();
            widgetEl.classList.add(getHorizontalPositionClass(value));
        }
    });

    Object.defineProperty(this.options, 'verticalPosition', {
        get: function() {
            return verticalPosition;
        },
        set: function(value) {
            verticalPosition = value;
            removeVerticalPositionClasses();
            widgetEl.classList.add(getVerticalPositionClass(value));
        }
    });

    Object.defineProperty(this.options, 'horizontalAnchor', {
        get: function() {
            return horizontalAnchor;
        },
        set: function(value) {
            horizontalAnchor = value;
            removeHorizontalAnchorClasses();
            widgetEl.classList.add(getHorizontalAnchorClass(value));
        }
    });

    Object.defineProperty(this.options, 'verticalAnchor', {
        get: function() {
            return verticalAnchor;
        },
        set: function(value) {
            verticalAnchor = value;
            removeVerticalAnchorClasses();
            widgetEl.classList.add(getVerticalAnchorClass(value));
        }
    });

    Object.defineProperty(this.options, 'layout', {
        get: function() {
            return layout;
        },
        set: function(value) {
            layout = value;
            removeLayoutClasses();
            widgetEl.classList.add(getLayoutClass());
        }
    });

    Object.defineProperty(this.options, 'containerElement', {
        get: function() {
            return containerEl;
        },
        set: function(value) {
            containerEl = value;
            value.appendChild(widgetEl);
        }
    });

    Object.defineProperty(this.options, 'stateChangedCallback', {
        get: function() {
            return stateChangedCallback;
        },
        set: function(value) {
            stateChangedCallback = value;
        }
    });

    this.show = function() {
        widgetEl.classList.remove('hidden');
    }

    this.hide = function() {
        widgetEl.classList.add('hidden');
    }

    function createAndInsertWidget() {
        var widgetEl = createWidgetEl();
        var titleEl = createTitleEl();
        var upvoteEl = createUpvoteEl();
        var downvoteEl = createDownvoteEl();
        
        widgetEl.appendChild(titleEl);
        widgetEl.appendChild(upvoteEl);
        widgetEl.appendChild(downvoteEl);
        containerEl.appendChild(widgetEl);

        return widgetEl;
    }

    function createWidgetEl() {
        var widgetEl = document.createElement('div');
        if (id) {
            widgetEl.setAttribute('id', id);
        }  

        widgetEl.classList.add('voting-widget');
        widgetEl.classList.add('hidden');
        widgetEl.classList.add(getHorizontalPositionClass());
        widgetEl.classList.add(getVerticalPositionClass());
        widgetEl.classList.add(getHorizontalAnchorClass());
        widgetEl.classList.add(getVerticalAnchorClass());

        return widgetEl;
    }

    function createTitleEl() {
        var titleEl = document.createElement('p');
        titleEl.innerHTML = 'Was this article useful?';
        titleEl.className = 'title';

        return titleEl;
    }

    function createUpvoteEl() {
        var voteBtnContainerEl = document.createElement('div');
        voteBtnContainerEl.className = 'upvote';

        var thumbBtnEl = document.createElement('div');
        thumbBtnEl.className = 'thumb-button';
        thumbBtnEl.addEventListener('click', onClickUpvote);

        var thumbIconEl = createThumbIconEl();

        var greenThumbCircle = document.createElement('div');
        greenThumbCircle.className = 'green-circle';

        var starsContainerEl = document.createElement('div');
        starsContainerEl.className = 'stars';
        var starsSvgDoc = new DOMParser().parseFromString(STARS_SVG, 'application/xml');
        
        var linesContainerEl = document.createElement('div');
        linesContainerEl.className = 'lines';
        var linesSvgDoc = new DOMParser().parseFromString(LINES_SVG, 'application/xml');

        var whiteThumbIconEl = createThumbIconEl();
        whiteThumbIconEl.className += ' white';

        var thumbTextEl = document.createElement('p');
        thumbTextEl.className = 'thumb-text';
        thumbTextEl.innerHTML = 'YES';

        starsContainerEl.appendChild(document.adoptNode(starsSvgDoc.documentElement));
        linesContainerEl.appendChild(document.adoptNode(linesSvgDoc.documentElement));
        thumbBtnEl.appendChild(thumbIconEl);
        thumbBtnEl.appendChild(greenThumbCircle);
        thumbBtnEl.appendChild(starsContainerEl);
        thumbBtnEl.appendChild(linesContainerEl);
        thumbBtnEl.appendChild(whiteThumbIconEl);
        voteBtnContainerEl.appendChild(thumbBtnEl);
        voteBtnContainerEl.appendChild(thumbTextEl);

        return voteBtnContainerEl;
    }

    function createDownvoteEl() {
        var voteBtnContainerEl = document.createElement('div');
        voteBtnContainerEl.className = 'downvote';

        var thumbBtnEl = document.createElement('div');
        thumbBtnEl.className = 'thumb-button';
        thumbBtnEl.addEventListener('click', onClickDownvote);

        var thumbIconEl = createThumbIconEl();

        var redThumbCircle = document.createElement('div');
        redThumbCircle.className = 'red-circle';

        var whiteThumbIconEl = createThumbIconEl();
        whiteThumbIconEl.className += ' white';

        var thumbTextEl = document.createElement('p');
        thumbTextEl.className = 'thumb-text';
        thumbTextEl.innerHTML = 'NO';

        thumbBtnEl.appendChild(thumbIconEl);
        thumbBtnEl.appendChild(redThumbCircle);
        thumbBtnEl.appendChild(whiteThumbIconEl);
        voteBtnContainerEl.appendChild(thumbBtnEl);
        voteBtnContainerEl.appendChild(thumbTextEl);

        return voteBtnContainerEl;
    }

    function createThumbIconEl() {
        var thumbIconOuter = document.createElement('div');
        thumbIconOuter.className = 'thumb-icon-outer';

        var thumbIconInner = document.createElement('div');
        thumbIconInner.className = 'thumb-icon-inner';

        var thumbSvgDoc = new DOMParser().parseFromString(THUMB_SVG, 'application/xml');

        thumbIconInner.appendChild(document.adoptNode(thumbSvgDoc.documentElement));
        thumbIconOuter.appendChild(thumbIconInner);

        return thumbIconOuter;
    }

    function getVerticalPositionClass() {
        switch (verticalPosition) {
            case VerticalPosition.Top:
                return 'top';
            case VerticalPosition.Middle:
                return 'middle';
            case VerticalPosition.Bottom:
                return 'bottom';
            default:
                return 'top';
        }
    }

    function removeVerticalPositionClasses() {
        widgetEl.classList.remove('top');
        widgetEl.classList.remove('middle');
        widgetEl.classList.remove('bottom');
    }

    function getHorizontalPositionClass() {
        switch (horizontalPosition) {
            case HorizontalPosition.Left:
                return 'left';
            case HorizontalPosition.Right:
                return 'right';
            default:
                return 'left';
        }
    }

    function removeHorizontalPositionClasses() {
        widgetEl.classList.remove('left');
        widgetEl.classList.remove('right');
    }

    function getHorizontalAnchorClass() {
        switch (horizontalAnchor) {
            case HorizontalAnchor.Inside:
                return 'horizontal-inside';
            case HorizontalAnchor.Outside:
                return 'horizontal-outside';
            default:
                return 'horizontal-inside';
        }
    }

    function removeHorizontalAnchorClasses() {
        widgetEl.classList.remove('horizontal-inside');
        widgetEl.classList.remove('horizontal-outside');
    }

    function getVerticalAnchorClass() {
        switch (verticalAnchor) {
            case VerticalAnchor.Inside:
                return 'vertical-inside';
            case VerticalAnchor.Outside:
                return 'vertical-outside';
            default:
                return 'vertical-inside';
        }
    }

    function removeVerticalAnchorClasses() {
        widgetEl.classList.remove('vertical-inside');
        widgetEl.classList.remove('vertical-outside');
    }

    function getLayoutClass() {
        switch (layout) {
            case Layout.Horizontal:
                return 'layout-horizontal';
            case Layout.Vertical:
                return 'layout-vertical';
            default:
                return 'layout-horizontal';
        }
    }

    function removeLayoutClasses() {
        widgetEl.classList.remove('layout-horizontal');
        widgetEl.classList.remove('layout-vertical');
    }

    function getStateClass() {
        switch (state) {
            case VoteState.Neutral:
                return '';
            case VoteState.Upvoted:
                return 'upvoted';
            case VoteState.Downvoted:
                return 'downvoted';
        }
    }

    function removeStateClasses() {
        widgetEl.classList.remove('upvoted');
        widgetEl.classList.remove('downvoted');
    }

    function setState(newState, notifyCallback) {
        if (state === newState) {
            return;
        }

        state = newState;
        removeStateClasses();
        var stateClass = getStateClass(newState);
        if (stateClass) {
            widgetEl.classList.add(getStateClass(newState));
        }

        if (!notifyCallback || (!stateChangedCallback || typeof stateChangedCallback !== 'function')) {
            return;
        }

        stateChangedCallback({
            state: newState,
            widget: that,
            widgetEl: widgetEl
        });
    }

    function onClickUpvote() {
        setState(VoteState.Upvoted, true);
    }

    function onClickDownvote() {
        setState(VoteState.Downvoted, true);
    }
}

var HorizontalPosition = {
    Left: 'HorizontalPosition.Left',
    Right: 'HorizontalPosition.Right'
}

var VerticalPosition = {
    Top: 'VerticalPosition.Top',
    Middle: 'VerticalPosition.Middle',
    Bottom: 'VerticalPosition.Bottom'
}

var HorizontalAnchor = {
    Inside: 'HorizontalAnchor.Inside',
    Outside: 'HorizontalAnchor.Outside'
}

var VerticalAnchor = {
    Inside: 'VerticalAnchor.Inside',
    Outside: 'VerticalAnchor.Outside'
}

var Layout = {
    Horizontal: 'Layout.Horizontal',
    Vertical: 'Layout.Vertical'
}

var VoteState = {
    Neutral: 'VoteState.Neutral',
    Upvoted: 'VoteState.Upvoted',
    Downvoted: 'VoteState.Downvoted'
}
