const mostRecentScore = localStorage.getItem('mostRecentScore');            // get the user's mostRecentScore that is stored in memory
$('#finalScore').text(mostRecentScore);                                     // update the end.html with the user's mostRecentScore stored in memory

$('#totalScore').text(`${questions.length}`);                               // update the end.html with the total number of questions in the quiz