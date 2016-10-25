app.service("MainService", ["$rootScope", function($rootScope) {
    this.quiz = [];

    this.saveQuiz = function (quiz) {
        localStorage.setItem('quiz', JSON.stringify(quiz));
        console.log(localStorage, 'success')
    };

    this.restoreQuiz = function () {
        this.quiz = JSON.parse(localStorage.quiz);
        console.log(this.quiz, `Cache size: ${this.quiz.length}`)
    };

    // grab whatever is in local storage
    $rootScope.$on("restorequiz", this.restoreQuiz());
}]);
