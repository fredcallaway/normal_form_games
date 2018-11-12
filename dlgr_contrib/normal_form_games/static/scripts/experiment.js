var my_node_id;

// Consent to the experiment.
$(document).ready(function() {

  // do not allow user to close or reload
  dallinger.preventExit = true;

  // Print the consent form.
  $("#print-consent").click(function() {
    window.print();
  });

  // Consent to the experiment.
  $("#consent").click(function() {
    store.set("recruiter", dallinger.getUrlParameter("recruiter"));
    store.set("hit_id", dallinger.getUrlParameter("hit_id"));
    store.set("worker_id", dallinger.getUrlParameter("worker_id"));
    store.set("assignment_id", dallinger.getUrlParameter("assignment_id"));
    store.set("mode", dallinger.getUrlParameter("mode"));

    dallinger.allowExit();
    dallinger.goToPage('instructions');
  });

  // Consent to the experiment.
  $("#no-consent").click(function() {
    dallinger.allowExit();
    window.close();
  });

  // Consent to the experiment.
  $("#go-to-experiment").click(function() {
    dallinger.allowExit();
    dallinger.goToPage('exp');
  });

  // $(".submit-response").click(function(event) {
  //   window.event = event;
  //   console.log('submit response', event);
  //   $(".submit-response").addClass('disabled');
  //   $(".submit-response").html('Sending...');
  //   dallinger.createInfo(my_node_id, {contents: "222", info_type: "Info"})
  //   .done(function (resp) {
  //     window.resp = resp;
  //     console.log('resp', resp);
  //     // dallinger.allowExit();
  //     // dallinger.goToPage('questionnaire');
  //   })
  //   .fail(function (rejection) {
  //     dallinger.allowExit();
  //     dallinger.error(rejection);
  //   });
  // });
});

// Create the agent.
var create_agent = function() {
  // Setup participant and get node id
  // $(".submit-response").addClass('disabled');
  dallinger.createAgent()
  .done(function (resp) {
    my_node_id = resp.node.id;

    var game = [
      [[3, 3], [0, 6], [1, 5]],
      [[6, 0], [0, 0], [2, 6]],
      [[2, 3], [2, 8], [4, 1]],
    ];

    var opponent = function(game) {
      return new Promise(resolve => {
        // dallinger.getTransmissions(my_node_id, { status: 'pending' })
        //   .done(function (resp) {
        //     console.log(resp);
        //     transmissions = resp.transmissions;
        //     for (var i = transmissions.length - 1; i >= 0; i--) {
        //       console.log('transmission', transmissions[i]);
        //     }
        //     setTimeout(function () { get_transmissions(my_node_id); }, 100);
        //   });
        setTimeout((() => resolve(0)), 2000);
      });
    };

    window.runGame('#target', game, opponent).then(choice => {
      dallinger.createInfo(my_node_id, {contents: `choose row ${choice}`, info_type: 'Info'});
    });

    
    // $(".submit-response").removeClass('disabled');
  })
  .fail(function (rejection) {
    dallinger.allowExit();
    dallinger.error(rejection);
  });
};
