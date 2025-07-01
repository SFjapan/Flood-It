const color = {
    red: {
        rgb: "rgb(255, 0, 0)",
        name: "赤"
    },
    blue: {
        rgb: "rgb(0, 0, 255)",
        name: "青"
    },
    yellow: {
        rgb: "rgb(255, 255, 0)",
        name: "黄"
    },
    green: {
        rgb: "rgb(0, 128, 0)",
        name: "緑"
    },
    purple: {
        rgb: "rgb(128, 0, 128)",
        name: "紫"
    },
}
const colors = document.querySelector('.colors');
const palette = colors.querySelectorAll('p');

palette.forEach(element => {
    element.addEventListener('click', () => {
        const style = window.getComputedStyle(element);
        clicked_color = style.backgroundColor;
    })
});

const tile = document.getElementById('tile');
let row = Math.floor(Math.random() * 6 + 5);
let col = Math.floor(Math.random() * 6 + 5);
let answer_text = document.getElementById('answer');
let answer_color = color[Object.keys(color)[Math.floor(Math.random() * Object.keys(color).length)]];
answer_text.innerText = answer_color.name + "色に染めろ";
answer_text.style.color = answer_color.rgb;
answer_text.style.fontSize = "3em";
//create tiles
for (let i = 0; i < row; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < col; j++) {
        const td = document.createElement('td');
        td.style.width = 1 / col * 100 + "%";
        td.style.height = 1 / row * 100 + "%";
        tr.appendChild(td);
    }
    tile.appendChild(tr);
}
let tiles = tile.querySelectorAll('tr');

let question = Array.from({ length: row }, () =>
    Array.from({ length: col }, () =>
        color[Object.keys(color)[Math.floor(Math.random() * Object.keys(color).length)]].rgb
    )
);

question.map((e, i) => {
    e.map((f, j) => {
        tiles[i].querySelectorAll('td')[j].style.backgroundColor = f;
    });
});

tiles.forEach((element, i) => {
    element.querySelectorAll('td').forEach((c, j) => {
        c.addEventListener('click', () => {
            if (clicked_color != "") {
                const style = window.getComputedStyle(c);
                get_same_connected_tiles([i, j], style.backgroundColor).forEach(e => {
                    change_tile_color(e[0], e[1], clicked_color);
                });
            }
            setTimeout(check_clear, 100);
        });
    });
});



let clicked_color = "";

const reset = () => {
    while (tile.firstChild) {
        tile.removeChild(tile.firstChild);
    }
    row = Math.floor(Math.random() * 6 + 5);
    col = Math.floor(Math.random() * 6 + 5);
    answer_text = document.getElementById('answer');
    answer_color = color[Object.keys(color)[Math.floor(Math.random() * Object.keys(color).length)]];
    answer_text.innerText = answer_color.name + "色に染めろ";
    answer_text.style.color = answer_color.rgb;
    answer_text.style.fontSize = "3em";
    //create tiles
    for (let i = 0; i < row; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < col; j++) {
            const td = document.createElement('td');
            td.style.width = 1 / col * 100 + "%";
            td.style.height = 1 / row * 100 + "%";
            tr.appendChild(td);
        }
        tile.appendChild(tr);
    }

    tiles = tile.querySelectorAll('tr');

    tiles.forEach((element, i) => {
        element.querySelectorAll('td').forEach((c, j) => {
            c.addEventListener('click', () => {
                if (clicked_color != "") {
                    const style = window.getComputedStyle(c);
                    get_same_connected_tiles([i, j], style.backgroundColor).forEach(e => {
                        change_tile_color(e[0], e[1], clicked_color);
                    });
                }
                setTimeout(check_clear, 100);
            });
        });
    });

    question = Array.from({ length: row }, () =>
        Array.from({ length: col }, () =>
            color[Object.keys(color)[Math.floor(Math.random() * Object.keys(color).length)]].rgb
        )
    );

    question.map((e, i) => {
        e.map((f, j) => {
            tiles[i].querySelectorAll('td')[j].style.backgroundColor = f;
        });
    });

    clicked_color = "";
}

const get_same_connected_tiles = (start, target_color) => {
    const rows = row;
    const cols = col;

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const result = [];

    const [sx, sy] = start;

    const queue = [];
    queue.push([sx, sy]);
    visited[sx][sy] = true;

    const directions = [
        [-1, 0], // 上
        [1, 0], // 下
        [0, -1], // 左
        [0, 1], // 右
    ];

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        result.push([x, y]);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 && nx < rows &&
                ny >= 0 && ny < cols &&
                !visited[nx][ny]
            ) {
                const tile = tiles[nx].querySelectorAll('td')[ny];
                const style = window.getComputedStyle(tile);
                if (style.backgroundColor === target_color) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                }

            }
        }
    }
    return result;
}

const change_tile_color = (i, j, color) => {
    tiles[i].querySelectorAll('td')[j].style.backgroundColor = color;
}

const check_clear = () => {
    if (get_same_connected_tiles([0, 0], answer_color.rgb).length == col * row) {
        alert("clear");
    }
}