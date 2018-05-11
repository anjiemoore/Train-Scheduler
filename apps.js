

//Initialize Firebase
var config = {
    apiKey: "AIzaSyB7n64qkqGv-47xBoW237nqLFczUeIXU0I",
    authDomain: "practice-project-3a233.firebaseapp.com",
    databaseURL: "https://practice-project-3a233.firebaseio.com",
    projectId: "practice-project-3a233",
    storageBucket: "practice-project-3a233.appspot.com",
    messagingSenderId: "108692186750"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  var firstTrainTime = 0;
  var trainFrequency = "";
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    trainName = $("#train-name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    firstTrainTime = $("#time-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: firstTrainTime,
      frequency: trainFrequency
    };
  
    database.ref().push(newTrain);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    var tFrequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().time;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

    var tableRow = $("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    $("#train-table").append(tableRow);
});

