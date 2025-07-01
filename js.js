const color = {
    red:{
        rgb:"rgb(255, 0, 0)",
        name:"赤"    
    },
    blue:{
        rgb:"rgb(0, 0, 255)",
        name:"青"   
    },
    yellow:{
        rgb:"rgb(255, 255, 0)",
        name:"黄"    
    },
    green:{
        rgb:"rgb(0, 128, 0)",
        name:"緑"
    },
    purple:{
        rgb:"rgb(128, 0, 128)",
        name: "紫"   
    },
}
const row = 5;
const col = 5;
const colors = document.querySelector('.colors');
const palette = colors.querySelectorAll('p');
const tile = document.getElementById('tile');
const tiles = tile.querySelectorAll('tr');
const answer_text = document.getElementById('answer');
const answer_color = color.yellow;
answer_text.innerText = answer_color.name+"色に染めろ";
answer_text.style.color = answer_color.rgb;
answer_text.style.fontSize = "3em";
let clicked_color = "";

const get_same_connected_tiles = (start,target_color) =>{
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
        [1, 0],  // 下
        [0, -1], // 左
        [0, 1],  // 右
    ];

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        result.push([x, y]);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            const tile = tiles[nx].querySelectorAll('td')[ny];
            const style = window.getComputedStyle(tile);
            if (
                nx >= 0 && nx < rows &&
                ny >= 0 && ny < cols &&
                !visited[nx][ny] &&
                style.backgroundColor === target_color
            ) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }
    console.log(result);
    return result;
}

const change_tile_color = (i,j,color) =>{
    tiles[i].querySelectorAll('td')[j].style.backgroundColor = color;
}

const check_clear = () =>{
     if(get_same_connected_tiles(answer_color.rgb).length == 25){
        alert("clear");
    }
}

change_tile_color(0,1,color.red.rgb);
change_tile_color(1,1,color.blue.rgb);
change_tile_color(3,2,color.red.rgb);
change_tile_color(4,4,color.green.rgb);
change_tile_color(2,0,color.purple.rgb);




tiles.forEach((element,i) =>{
    element.querySelectorAll('td').forEach((c,j) => {
        c.addEventListener('click',()=>{
            if(clicked_color != ""){
                const style = window.getComputedStyle(c);
                get_same_connected_tiles([i,j],style.backgroundColor).forEach(e =>{
                    change_tile_color(e[0],e[1],clicked_color);
                });
            }
            setTimeout(check_clear, 100);
        });
    });
});

palette.forEach(element => {
    element.addEventListener('click',()=>{
        const style = window.getComputedStyle(element);
        clicked_color = style.backgroundColor;
    })
});
