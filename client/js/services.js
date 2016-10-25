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

    // $rootScope.$on("savequiz", this.SaveQuiz);
    $rootScope.$on("restorequiz", this.restoreQuiz());
}]);
