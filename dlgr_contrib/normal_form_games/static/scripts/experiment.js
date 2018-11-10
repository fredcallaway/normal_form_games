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

  $(".submit-response").click(function(event) {
    // global.event = event;
    // console.log('submit response', event);
    console.log('Value', $(this).val());
    // $(".submit-response").addClass('disabled');
    $(".submit-response").hide();
    $(this).html('Sending...');
    // var msg = {contents: $(this).val(), info_type: "Play"};
    var msg = {this: "that"};
    dallinger.createInfo(my_node_id, msg)
    .done(function (resp) {
      console.log('resp', resp);
      // dallinger.allowExit();
      // dallinger.goToPage('questionnaire');
    })
    .fail(function (rejection) {
      dallinger.allowExit();
      dallinger.error(rejection);
    });
  });
});

// Create the agent.
var create_agent = function() {
  // Setup participant and get node id
  $(".submit-response").addClass('disabled');
  dallinger.createAgent()
  .done(function (resp) {
    my_node_id = resp.node.id;
    $(".submit-response").removeClass('disabled');
  })
  .fail(function (rejection) {
    dallinger.allowExit();
    dallinger.error(rejection);
  });
};
