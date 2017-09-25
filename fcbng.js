Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function generateModel(corpus, n) {
    var ngramsCounted = {};
    for (var i = 0; i < corpus.length - n + 1; i++) {
        var ngram = corpus.substring(i, i + n);
        if (!ngramsCounted[ngram]) {
            ngramsCounted[ngram] = [];
        }
        ngramsCounted[ngram].push(corpus.charAt(i+n));

    }
    //console.log(ngramsCounted);
    return ngramsCounted;
}

function generateText(model, length, start) {
    if (!start) {
        start = Object.keys(model).randomElement();
    }
    var currentNgram = start;
    n = currentNgram.length;

    var result = currentNgram;
    for (var i = 0; i < length; i++) {
        // console.log("model:", model);
        // console.log("model[result]:", model[result]);
        currentNgram = result.substring(result.length - n)
        var possibilities = model[currentNgram];
        var next = possibilities.randomElement();
        result = result + next;
        //console.log(i, possibilities, next, "'", result, "'");
        //console.log(result);
    }

    return result;
}
