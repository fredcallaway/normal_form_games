
var $ = require('jquery');
var _ = require('lodash');


function render_game(game) {
  let result = ["<table border=2>"];
  game.forEach((row, i) => {
    result.push(`<tr class='nfg-row' value='${i}'>`);
    // result.push('<td><button class="btn btn-secondary">X</button></td>');
    row.forEach((cell, j) => {
      result.push(`<td class='nfg-cell nfg-row-${i} nfg-col-${j} '>&nbsp;
        <payouts><rowpay>${cell[0]}</rowpay>  |  <colpay>${cell[1]}</colpay></payouts>
        &nbsp;</td>`
      );
    });
    result.push("</tr>");
  });
  result.push("</table>");
  return result.join('\n');
}

var game = [
  [[3, 3], [0, 6], [1, 5]],
  [[6, 0], [0, 0], [2, 6]],
  [[2, 3], [2, 8], [4, 1]],
];

  
function runGame(game, target) {

  let msg = $('<div>', {id: 'nfg-msg'});
  let rowmsg = $('<div>').appendTo(msg);
  let colmsg = $('<div>').appendTo(msg);

  $(target)
    .append(render_game(game))
    .append(msg)
  ;

  rowmsg.html('Please choose a row.');

  rowChoice = new Promise(resolve => {
    $('.nfg-row').click(_.once(function() {
      let row = parseInt($(this).attr('value'));
      console.log(row);
      rowmsg.html(`You chose row ${row+1}.`);
      colmsg.html('Waiting for the other player...');
      $('.nfg-row').removeClass('nfg-row');
      $('.nfg-cell').addClass('unchosen');
      $(`.nfg-row-${row}`)
        .addClass('chosen')
        .removeClass('unchosen');
      resolve(row);
    }));
  });

  colChoice = new Promise(resolve => {
    setTimeout((() => resolve(1)), 1000);
  });

  Promise.all([rowChoice, colChoice]).then(([rc, cc]) => {
    console.log(rc, cc);
    colmsg.html(`The other player chose column ${cc+1}.`);
    $('.nfg-cell').addClass('unchosen');
    $(`.nfg-col-${cc}`).addClass('chosen');
    $(`.nfg-col-${cc}.nfg-row-${rc}`)
      .addClass('chosen')
      .removeClass('unchosen')
    ;
    let outcome = game[rc][cc];
    msg.append(`You earned <rowpay>${outcome[0]}</rowpay> points 
      and the other player earned <colpay>${outcome[1]}</colpay> points.`);


  });

}

module.exports = runGame;