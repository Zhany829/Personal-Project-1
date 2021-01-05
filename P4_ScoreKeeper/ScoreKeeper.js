const t1 = {
    score: 0,
    button: document.querySelector('#t1Button'),
    display: document.querySelector('#t1Display')
}
const t2 = {
    score: 0,
    button: document.querySelector('#t2Button'),
    display: document.querySelector('#t2Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 5;
let isGameOver = false;

function updateScores(team, opponent) {
    if (!isGameOver) {
        team.score += 1;
        if (team.score === winningScore) {
            isGameOver = true;
            team.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            team.button.disabled = true;
            opponent.button.disabled = true;
        }
        team.display.textContent = team.score;
    }
}


t1.button.addEventListener('click', function() {
    updateScores(t1, t2)
})
t2.button.addEventListener('click', function() {
    updateScores(t2, t1)
})


winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    for (let t of[t1, t2]) {
        t.score = 0;
        t.display.textContent = 0;
        t.display.classList.remove('has-text-success', 'has-text-danger');
        t.button.disabled = false;
    }
}


const LakersForm = document.querySelector('#LakersForm');
const LakersContainer = document.querySelector('#Lakers');
LakersForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const playerNameInput = LakersForm.elements.PlayerName;
    const scoreInput = LakersForm.elements.Scores;
    const assistInput = LakersForm.elements.Assists;
    const reboundInput = LakersForm.elements.Rebounds;
    addPlayer(playerNameInput.value, scoreInput.value, assistInput.value, reboundInput.value)
    playerNameInput.value = '';
    scoreInput.value = '';
    assistInput.value = '';
    reboundInput.value = '';
});

const addPlayer = (name, score, assist, rebound) => {
    const newPlayer = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(name);
    newPlayer.append(bTag);
    newPlayer.append(`:__________________${score}`);
    newPlayer.append(`________________________${assist}`);
    newPlayer.append(`_______________________${rebound}`);
    newPlayer.append("________________");
    LakersContainer.append(newPlayer);
}

const WarriorsForm = document.querySelector('#WarriorsForm');
const WarriorsContainer = document.querySelector('#Warriors');
WarriorsForm.addEventListener('submit', function(a) {
    a.preventDefault();
    const playerNameInput = WarriorsForm.elements.PlayerName2;
    const scoreInput = WarriorsForm.elements.Scores2;
    const assistInput = WarriorsForm.elements.Assists2;
    const reboundInput = WarriorsForm.elements.Rebounds2;
    addPlayer2(playerNameInput.value, scoreInput.value, assistInput.value, reboundInput.value)
    playerNameInput.value = '';
    scoreInput.value = '';
    assistInput.value = '';
    reboundInput.value = '';
});

const addPlayer2 = (name, score, assist, rebound) => {
    const newPlayer = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(name);
    newPlayer.append(bTag);
    newPlayer.append(`:__________________${score}`);
    newPlayer.append(`________________________${assist}`);
    newPlayer.append(`_______________________${rebound}`);
    newPlayer.append("________________");
    WarriorsContainer.append(newPlayer);
}