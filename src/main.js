var bracketElement = document.querySelector('.bracket');
var roundsTemplate = document.getElementById('rounds');
var roundTemplate = document.getElementById('round');

window.data.forEach(function(rounds) {
    var roundsElement = document.importNode(roundsTemplate.content, true);
    var roundsWrapperElement = roundsElement.querySelector('.rounds__wrapper');

    rounds.forEach(function(round) {
        roundsWrapperElement.append(createRoundElement(round));
    });

    bracketElement.append(roundsElement);
    setConnectorsHeight(bracketElement);
});

bracketElement.classList.add('bracket--visible');

function createRoundElement(round) {
    var roundElement = document.importNode(roundTemplate.content, true);
    var timingElement = roundElement.querySelector('.round__timing');
    var membersElement = roundElement.querySelector('.round__members');

    timingElement.textContent = round.time;

    round.members.forEach(function(member) {
        membersElement.append(createMemberElement(member));
    });

    return roundElement;
};

function createMemberElement(member) {
    var login = member.login;
    var memberElement = document.createElement(login ? 'a' : 'div');
    var memberClassName = 'round__member';

    if (member.winner) {
        memberClassName += ' round__member--winner';
    }

    memberElement.className = memberClassName;

    if (login) {
        var memberLink = '#' + login;
        var memberLogin = login + '@';

        memberElement.href = memberLink;
        memberElement.target = '_blank';
        memberElement.textContent = memberLogin;
    }

    return memberElement;
}

function setConnectorsHeight(bracketElement) {
    var roundsElement = bracketElement.querySelector('.rounds:last-child');
    var roundsConnectors = document.querySelectorAll('.rounds__connector');

    var firstConnectorPosition = roundsElement
        .querySelector('.round:first-child .round__connector')
        .getBoundingClientRect();

    var secondConnectorPosition = roundsElement
        .querySelector('.round:last-child .round__connector')
        .getBoundingClientRect();

    var connectorsHeight = secondConnectorPosition.top - firstConnectorPosition.top + 1;

    roundsConnectors.forEach(function(connector) {
        connector.style.height = connectorsHeight + 'px';
    });
}
