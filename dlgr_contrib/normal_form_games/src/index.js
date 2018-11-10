
var $ = require('jquery');



function render_game(game) {
  let result = ["<table border=1'>"];
  for(let row of game) {
    result.push("<tr>");
    result.push('<td><button>X</button></td>');
    for(let cell of row){
      result.push(`<td><rowpay>${cell[0]}</rowpay>  /  <colpay>${cell[1]}</colpay></td>`);
    }
    result.push("</tr>");
  }
  result.push("</table>");
  return result.join('\n');
}

var game = [
  [[3, 3], [0, 6]],
  [[6, 0], [0, 0]],
];

$(document).ready(function () {

  $('#target')
    .append('<h1>Hello</h1>')
    .append(render_game(game));

});