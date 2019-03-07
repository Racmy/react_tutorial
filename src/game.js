import React from 'react'
import './game.css'

function Square(props) {
    // constructor() {
    //     super()
    //     this.state = {
    //         value: null,
    //     }
    // }

    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(num) {
        return (
            <Square
                value={this.props.squares[num]}
                onClick={() => this.props.onClick(num)}
            />
        )
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],

            xIsNext: true, //x's turn: ture
            stepNumber: 0,
        }
    }
    handleClick(num) {
        var history = this.state.history.slice(0, this.state.stepNumber + 1)
        var current = history[history.length - 1]
        const squares = current.squares.slice()
        //gameover
        if (calculateWinner(squares) || squares[num]) {
            return
        }
        squares[num] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        })
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 ? false : true,
        })
    }
    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)
        let status
        if (winner) {
            status = 'winner:' + winner
        } else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
        }
        const moves = history.map((step, move) => {
            const desc = move ? 'Move #' + move : 'Game start'
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={num => this.handleClick(num)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}
export default Game
// ========================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }
    return null
}
