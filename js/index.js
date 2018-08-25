"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var COLORS = {
    RED: "red",
    BLUE: "blue",
    GREEN: "green",
    BLACK: "black",
    GOLD: "gold" };


var IDS = new Set();

var NAMES = ["one", "two", "three", "four", "five", "six", "seven"];

var HEPINDEX = NAMES.map(function (name) {return name + "hep";});

var gold = COLORS.GOLD;
var generate = "G";
var blue = COLORS.BLUE;
var red = COLORS.RED;
var green = COLORS.GREEN;
var gold = COLORS.GOLD;
var black = COLORS.BLACK;
var combust = "C";
var oracle = "O";
var reflex = "R";
var conquer = "A";
var haste = "H";
var one = "1";
var two = "2";
var three = "3";var

Card = function (_React$Component) {_inherits(Card, _React$Component);
    function Card(props) {_classCallCheck(this, Card);var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this,
        props));
        var spaces = Array(7).fill(null);
        if (props.card.one != null) {spaces[0] = props.card.one;}
        if (props.card.two != null) {spaces[1] = props.card.two;}
        if (props.card.three != null) {spaces[2] = props.card.three;}
        if (props.card.four != null) {spaces[3] = props.card.four;}
        if (props.card.five != null) {spaces[4] = props.card.five;}
        if (props.card.six != null) {spaces[5] = props.card.six;}
        if (props.card.seven != null) {spaces[6] = props.card.seven;}
        _this.state = {
            spaces: spaces,
            card: props.card };return _this;

    }_createClass(Card, [{ key: "rotateDisplay", value: function rotateDisplay(

        event) {
            var temp = this.state.spaces.slice();
            if (event.keyCode === 81) {
                var hold = temp[0];
                for (var i = 0; i < 6; i++) {
                    temp[i] = temp[i + 1];
                }
                temp[6] = hold;
            } else if (event.keyCode === 69) {
                var _hold = temp[6];
                for (var i = 6; i > 0; i--) {
                    temp[i] = temp[i - 1];
                }
                temp[0] = _hold;
            }
            this.setState({
                spaces: temp });

        } }, { key: "render", value: function render()

        {var _this2 = this;
            var newSpaces = this.state.spaces.map(function (color, index) {return React.createElement("li", { key: index, className: "dot small " + color + " " + HEPINDEX[index] });});
            newSpaces.push(React.createElement("li", { key: 7, className: "cardType" }, this.props.card.type));
            return React.createElement("div", { onKeyDown: function onKeyDown(e) {return _this2.rotateDisplay(e);},
                    tabIndex: "0",
                    className: "cardRotateContainer" },
                React.createElement("ul", { onClick: function onClick() {return _this2.props.onClick(_this2.state.card);},
                        className: "card " + this.props.display + " " + this.props.selected }, "  ",
                    newSpaces, " "));
        } }]);return Card;}(React.Component);


function Header(props) {
    var myTurn = props.myTurn ? "My turn" : "Not my turn";
    return React.createElement("p", null, myTurn);
}

function OtherHands(props) {
    return React.createElement("div", { className: "otherHands" },
        props.played);

}

function PlayedTiles(props) {
    return React.createElement("div", { className: "playedtiles" }, props.played);
}

function MyHand(props) {
    return React.createElement("div", { className: "hand" },
        props.cards,
        React.createElement("button", { disabled: props.gameState === "setup" || !props.myTurn, onClick: function onClick() {return props.playClicked();}, className: "playbutton" }, "Play Tiles"));

}

function Community(props) {
    var basin = props.colorCounts;
    var listBasin = basin.map(function (color) {return (
            React.createElement("button", {
                    className: "dot " + color.color,
                    key: color.color,
                    onClick: function onClick() {return props.onClick(color);} },

                color.count));});


    return React.createElement("ul", null, listBasin);
}

function Board(props) {
    var spaces = props.spaces;
    var listBoard = spaces.map(function (color, index) {return (
            React.createElement("button", {
                className: "dot " + color + " " + HEPINDEX[index],
                key: index,
                onClick: function onClick() {return props.onClick(color, index);} }));});




    return React.createElement("ul", { className: "board" }, listBoard);
}

function Lobby(props) {
    return React.createElement("button", { onClick: props.onClick }, "Start Game");
}var

Display = function (_React$Component2) {_inherits(Display, _React$Component2);function Display() {_classCallCheck(this, Display);return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).apply(this, arguments));}_createClass(Display, [{ key: "renderSelector", value: function renderSelector()
        {var _this4 = this;
            return (
                React.createElement(Community, {
                    onClick: function onClick(i) {return _this4.props.selectorClick(i);},
                    colorCounts: this.props.colorCounts }));


        } }, { key: "renderOtherHands", value: function renderOtherHands()

        {
            var hands = [];
            for (var i = 0; i < this.props.allPlayed.length; i++) {
                hands.push(React.createElement(OtherHands, { played: this.props.allPlayed[i] }));
            }
            return hands;
        } }, { key: "render", value: function render()

        {var _this5 = this;
            return (
                React.createElement("div", { className: "display" },
                    this.renderOtherHands(),
                    React.createElement(Header, { myTurn: this.props.myTurn }),
                    this.renderSelector(),
                    React.createElement(Board, {
                        onClick: function onClick(i, j) {return _this5.props.boardClick(i, j);},
                        spaces: this.props.spaces }),

                    React.createElement(PlayedTiles, { played: this.props.played }),
                    React.createElement(MyHand, { playClicked: function playClicked() {return _this5.props.playClicked();},
                        cards: this.props.cards,
                        myTurn: this.props.myTurn,
                        gameState: this.props.gameState })));



        } }]);return Display;}(React.Component);var


Game = function (_React$Component3) {_inherits(Game, _React$Component3);
    function Game(props) {_classCallCheck(this, Game);var _this6 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this,
        props));
        var selectCards = props.selectCards;
        var cards = selectCards.map(function (name) {return React.createElement(Card, { key: name.ID, onClick: function onClick(i) {return _this6.handleCardClick(i);}, display: "", card: name });});
        _this6.state = {
            playedRaw: props.played,
            played: [],
            selectedColor: null,
            isSwap: false,
            index: null,
            rawCards: selectCards,
            cards: cards };return _this6;

    }_createClass(Game, [{ key: "componentDidMount", value: function componentDidMount()

        {var _this7 = this;
            this.props.socket.on('boardChange', function () {
                _this7.setState({
                    cards: _this7.updateActiveCards(_this7.props.spaces, _this7.props.selectCards),
                    played: _this7.updateActiveCards(_this7.props.spaces, _this7.props.played) });

            });
            this.props.socket.on('cardPlayed', function () {
                _this7.setState({
                    cards: _this7.updateActiveCards(_this7.props.spaces, _this7.props.selectCards),
                    played: _this7.updateActiveCards(_this7.props.spaces, _this7.props.played) });

            });
        } }, { key: "handlePlayClick", value: function handlePlayClick()

        {
            var number = this.state.selectedNumberCard;
            var action = this.state.selectedActionCard;
            var spaceState = this.props.spaces.slice();
            var tempPlayed = [];
            var cardsToRemove = this.state.rawCards.slice();
            if (number != null && action != null) {
                if (this.isActive(spaceState, number) && this.isActive(spaceState, action) && action.type != "A" && action.type != "R" && action.type != "H") {
                    var j = 0;
                    while (j < cardsToRemove.length) {
                        if (cardsToRemove[j] === number || cardsToRemove[j] === action) {
                            tempPlayed.push(cardsToRemove.splice(j, 1)[0]);
                        } else {
                            j++;
                        }
                    }
                }
            } else if (action != null) {
                if (this.isActive(spaceState, action) && (action.type === "A" || action.type === "R" || action.type === "H")) {
                    var _j = 0;
                    while (_j < cardsToRemove.length) {
                        if (cardsToRemove[_j] === action) {
                            tempPlayed.push(cardsToRemove.splice(_j, 1)[0]);
                        } else {
                            _j++;
                        }
                    }
                }
            }
            this.setState({
                selectedNumberCard: null,
                selectedActionCard: null });

            socket.emit('cardPlayed', {
                newPlayed: tempPlayed,
                rest: cardsToRemove,
                pid: this.props.pid });

        } }, { key: "handleCardClick", value: function handleCardClick(

        i) {var _this8 = this;
            var selectCards = this.props.selectCards.slice();
            var played = this.props.played.slice();
            var cardType = i.type;
            if (cardType === "1" || cardType === "2" || cardType === "3") {
                var newSelected = i === this.state.selectedNumberCard ? null : i;
                this.setState({
                    selectedNumberCard: newSelected,
                    cards: selectCards.map(function (name) {
                        var active = _this8.isActive(_this8.props.spaces, name) ? "active" : "";
                        var selected = cardsEqual(name, newSelected) || cardsEqual(name, _this8.state.selectedActionCard) ? "selectedCard" : "";
                        return React.createElement(Card, { key: name.ID, selected: selected, onClick: function onClick(i) {return _this8.handleCardClick(i);}, display: active, card: name });
                    }),
                    played: played.map(function (name) {
                        var active = _this8.isActive(_this8.props.spaces, name) ? "active" : "";
                        var selected = cardsEqual(name, newSelected) || cardsEqual(name, _this8.state.selectedActionCard) ? "selectedCard" : "";
                        return React.createElement(Card, { key: name.ID, selected: selected, onClick: function onClick(i) {return _this8.handleCardClick(i);}, display: active, card: name });
                    }) });

            } else {
                var _newSelected = i === this.state.selectedActionCard ? null : i;
                this.setState({
                    selectedActionCard: _newSelected,
                    cards: selectCards.map(function (name) {
                        var active = _this8.isActive(_this8.props.spaces, name) ? "active" : "";
                        var selected = cardsEqual(name, _newSelected) || cardsEqual(name, _this8.state.selectedNumberCard) ? "selectedCard" : "";
                        return React.createElement(Card, { key: name.ID, selected: selected, onClick: function onClick(i) {return _this8.handleCardClick(i);}, display: active, card: name });
                    }),
                    played: played.map(function (name) {
                        var active = _this8.isActive(_this8.props.spaces, name) ? "active" : "";
                        var selected = cardsEqual(name, _newSelected) || cardsEqual(name, _this8.state.selectedNumberCard) ? "selectedCard" : "";
                        return React.createElement(Card, { key: name.ID, selected: selected, onClick: function onClick(i) {return _this8.handleCardClick(i);}, display: active, card: name });
                    }) });

            }
        } }, { key: "handleSelectorClick", value: function handleSelectorClick(

        i) {
            if (this.props.currentPlayer === this.props.pid) {
                if (i.count > 0) {
                    this.setState({
                        selectedColor: i.color,
                        isSwap: false,
                        index: null });

                }
            }
        } }, { key: "handleBoardClick", value: function handleBoardClick(

        i, index) {
            var prevState = this.state;
            if (this.props.currentPlayer === this.props.pid) {
                if (this.props.gameState === "setup") {
                    if (prevState.selectedColor != null && this.props.spaces[index] === null) {
                        // swap with stack
                        var newSpaces = this.props.spaces.slice();
                        newSpaces[index] = prevState.selectedColor;
                        var newCounts = this.props.colorCounts.slice();
                        var setupcomplete = true;
                        for (var j = 0; j < 7; j++) {
                            if (newSpaces[j] === null) {
                                setupcomplete = false;
                                break;
                            }
                        }
                        for (var j = 0; j < newCounts.length; j++) {
                            if (newCounts[j].color === prevState.selectedColor) {
                                newCounts[j].count--;
                            }
                            if (
                            this.props.spaces[index] != null &&
                            this.props.spaces[index] === newCounts[j].color)
                            {
                                newCounts[j].count++;
                            }
                        }
                        socket.emit('boardChange', { newSpaces: newSpaces, newCounts: newCounts });
                        this.setState({
                            selectedColor: null,
                            isSwap: false,
                            index: null,
                            gameState: setupcomplete ? "" : "setup" });

                    }
                } else {
                    if (prevState.index === index) {
                        //Selecting already selected deselects
                        this.setState({
                            selectedColor: null,
                            isSwap: false,
                            index: null });

                    } else if (prevState.selectedColor != null) {
                        // swap with stack
                        var _newSpaces = this.props.spaces.slice();
                        _newSpaces[index] = prevState.selectedColor;
                        var _newCounts = this.props.colorCounts.slice();
                        for (var j = 0; j < _newCounts.length; j++) {
                            if (_newCounts[j].color === prevState.selectedColor) {
                                _newCounts[j].count--;
                            }
                            if (
                            this.props.spaces[index] != null &&
                            this.props.spaces[index] === _newCounts[j].color)
                            {
                                _newCounts[j].count++;
                            }
                        }
                        socket.emit('boardChange', { newSpaces: _newSpaces, newCounts: _newCounts });
                        this.setState({
                            selectedColor: null,
                            isSwap: false,
                            index: null });

                    } else if (prevState.isSwap) {
                        //Swapping with active thing
                        var _newSpaces2 = this.props.spaces.slice();
                        var temp = _newSpaces2[index];
                        _newSpaces2[index] = _newSpaces2[prevState.index];
                        _newSpaces2[prevState.index] = temp;
                        socket.emit('boardChange', { newSpaces: _newSpaces2, newCounts: this.props.colorCounts });
                        this.setState({
                            selectColor: null,
                            isSwap: false,
                            index: null });

                    } else {
                        //Selecting for swap
                        this.setState({
                            selectColor: null,
                            isSwap: true,
                            index: index });

                    }
                }
            }
        } }, { key: "updateActiveCards", value: function updateActiveCards(

        newState, selectCards) {var _this9 = this;
            return selectCards.map(function (name, index) {
                var active = _this9.isActive(newState, name) ? "active" : "";
                var selected = _this9.state.selectedActionCard === name || _this9.state.selectedNumberCard === name ? "selectedCard" : "";
                return React.createElement(Card, { key: name.ID, onClick: function onClick(i) {return _this9.handleCardClick(i);}, selected: selected, display: active, card: name });
            });
        } }, { key: "isActive", value: function isActive(

        newState, name) {
            var active = true;
            var rotation = newState.slice();
            for (var j = 0; j < 7; j++) {
                active = true;
                for (var i = 0; i < 7; i++) {
                    if (name[NAMES[i]] !== rotation[i] && name[NAMES[i]] != null) {
                        active = false;
                        break;
                    }
                }
                if (active) {
                    break;
                }
                var temp = rotation[0];
                for (var i = 0; i < 6; i++) {
                    rotation[i] = rotation[i + 1];
                }
                rotation[6] = temp;
            }
            return active;
        } }, { key: "render", value: function render()

        {var _this10 = this;
            var allPlayed = this.props.allPlayed.slice();
            allPlayed.splice(this.props.pid - 1, 1);
            for (var i = 0; i < allPlayed.length; i++) {
                allPlayed[i] = this.updateActiveCards(this.props.spaces, allPlayed[i]);
            }
            var display = React.createElement(Display, {
                spaces: this.props.spaces //[]
                , colorCounts: this.props.colorCounts //[]
                , selectorClick: function selectorClick(i) {return _this10.handleSelectorClick(i);} //function
                , boardClick: function boardClick(i, j) {return _this10.handleBoardClick(i, j);} //function
                , cards: this.state.cards //[<Cards>]
                , played: this.state.played //[<Cards>]
                , playClicked: function playClicked() {return _this10.handlePlayClick();} //function
                , myTurn: this.props.pid === this.props.currentPlayer,
                gameState: this.props.gameState,
                allPlayed: allPlayed });

            var lobby = React.createElement(Lobby, {
                onClick: function onClick() {return _this10.startGame();} });

            var showMe = this.props.gameState === "lobby" ? lobby : display;
            return showMe;
        } }]);return Game;}(React.Component);


var socket = io.connect('http://localhost:3000');
socket.on('initialize', function (data) {
    var localData = Object.assign({}, data);
    socket.on('boardChange', function (data) {
        Object.assign(localData, data);
        renderGame(localData, socket);
    });
    socket.on('setupphase', function (data) {
        Object.assign(localData, data);
        renderGame(localData, socket);
    });
    socket.on('cardUpdate', function (data) {
        Object.assign(localData, data);
        console.log(localData);
        renderGame(localData, socket);
    });
    socket.on('cardPlayed', function (data) {
        Object.assign(localData, data);
        renderGame(localData, socket);
    });
    renderGame(localData, socket);
});

function renderGame(data, socket) {
    ReactDOM.render(React.createElement(Game, { spaces: data.spaces,
        colorCounts: data.colorCounts,
        selectCards: data.selectCards,
        gameState: data.gameState,
        pid: data.pid,
        currentPlayer: data.currentPlayer,
        socket: socket,
        played: data.played[data.pid - 1],
        allPlayed: data.played }),

    document.getElementById("root"));
}

function cardsEqual(a, b) {
    return a != null && b != null && a.one === b.one &&
    a.two === b.two &&
    a.three === b.three &&
    a.four === b.four &&
    a.five === b.five &&
    a.six === b.six &&
    a.seven === b.seven &&
    a.type === b.type &&
    a.id === b.id;

}
//# sourceMappingURL=index.js.map