window.addEventListener('load', async function (event) {
    const response = await fetch('http://127.0.0.1:8090/event/list');
    const body = await response.json();
    renderevents(body);

    for (let i = 0; i < body.length; i++) {
        document.getElementById('events').children[i].addEventListener('click', async function () {
            const response = await fetch('http://127.0.0.1:8090/event/' + (document.getElementById('events').children[i].innerHTML.toLowerCase()).trim().replace(/\s/g, ''));
            const body = await response.json();
            renderinfo(body);
        }
        );
    }
    document.getElementById('createevent').addEventListener('click', async function () {
        // Changes colour on tabs
        document.getElementById('create_event_tab').setAttribute('class', 'nav-item active');
        document.getElementById('create_event_tab').style.backgroundColor = '#1abc9c';
        document.getElementById('home_tab').setAttribute('class', 'nav-item');
        document.getElementById('home_tab').style.backgroundColor = 'white';

        document.getElementById('header4').innerText = 'Create Event';

        // clears list from home page
        const container = document.getElementById('events');
        while (container.children.length > 0) {
            container.removeChild(container.childNodes[0]);
        }

        // Add form to create event

        const br = document.createElement('br');

        const frm = document.createElement('form');
        frm.id = 'createevent_form';
        frm.action = 'http://127.0.0.1:8090/event/create';
        frm.method = 'POST';

        const inpTextName = document.createElement('input');
        inpTextName.id = 'createevent_input_text_name';
        inpTextName.type = 'text';
        inpTextName.placeholder = 'Name:';

        const inpTextDate = document.createElement('input');
        inpTextDate.id = 'createevent_input_text_date';
        inpTextDate.type = 'text';
        inpTextDate.placeholder = 'Date:';

        const inpTextTime = document.createElement('input');
        inpTextTime.id = 'createevent_input_text_time';
        inpTextTime.type = 'text';
        inpTextTime.placeholder = 'Time:';

        const inpTextLocation = document.createElement('input');
        inpTextLocation.id = 'createevent_input_text_location';
        inpTextLocation.type = 'text';
        inpTextLocation.placeholder = 'Location:';

        const inpTextDescription = document.createElement('input');
        inpTextDescription.id = 'createevent_input_text_description';
        inpTextDescription.type = 'text';
        inpTextDescription.placeholder = 'Description:';

        const inpSubmit = document.createElement('input');
        inpSubmit.id = 'createevent_submit';
        inpSubmit.type = 'submit';
        inpSubmit.value = 'Create Event';

        frm.appendChild(inpTextName);
        frm.appendChild(br.cloneNode());
        frm.appendChild(inpTextDate);
        frm.appendChild(br.cloneNode());
        frm.appendChild(inpTextTime);
        frm.appendChild(br.cloneNode());
        frm.appendChild(inpTextLocation);
        frm.appendChild(br.cloneNode());
        frm.appendChild(inpTextDescription);
        frm.appendChild(br.cloneNode());
        frm.appendChild(inpSubmit);
        frm.appendChild(br.cloneNode());

        document.body.appendChild(frm);

        const submit = document.getElementById('createevent_submit');
        submit.addEventListener('click', async function (event) {
            event.preventDefault();
            const eventName = document.getElementById('createevent_input_text_name').value;
            const eventDate = document.getElementById('createevent_input_text_date').value;
            const eventTime = document.getElementById('createevent_input_text_time').value;
            const eventLocation = document.getElementById('createevent_input_text_location').value;
            const eventDescription = document.getElementById('createevent_input_text_description').value;
            const parameters = { eventName: eventName, eventDate: eventDate, eventTime: eventTime, eventLocation: eventLocation, eventDescription: eventDescription };
            const response = await fetch('http://127.0.0.1:8090/event/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)

            });
            console.log(body)
            document.getElementById('createevent_input_text_name').value = '';
            document.getElementById('createevent_input_text_date').value = '';
            document.getElementById('createevent_input_text_time').value = '';
            document.getElementById('createevent_input_text_location').value = '';
            document.getElementById('createevent_input_text_description').value = '';
        });
    });
});

function renderevents(events) {
    const container = document.getElementById('events');
    container.innerHTML = '';

    for (const event of events) {
        const item = document.createElement('li');
        item.innerHTML = event;
        container.appendChild(item);
    }
    ;
}

function renderinfo(eventName) {
    const container = document.getElementById('events');

    while (container.children.length > 0) {
        container.removeChild(container.childNodes[0]);
    }

    const itemName = document.createElement('li');
    itemName.innerHTML = (eventName.name);
    container.appendChild(itemName);
    itemName.style.fontSize = '20px';

    const itemDate = document.createElement('li');
    itemDate.innerHTML = ('Date: ' + eventName.date);
    itemDate.style.fontWeight = 'normal';
    container.appendChild(itemDate);

    const itemTime = document.createElement('li');
    itemTime.innerHTML = ('Time: ' + eventName.time);
    itemTime.style.fontWeight = 'normal';
    container.appendChild(itemTime);

    const itemLocation = document.createElement('li');
    itemLocation.innerHTML = ('Location: ' + eventName.location);
    itemLocation.style.fontWeight = 'normal';
    container.appendChild(itemLocation);

    const itemDescription = document.createElement('li');
    itemDescription.innerHTML = ('Description: ' + eventName.description);
    itemDescription.style.fontWeight = 'normal';
    container.appendChild(itemDescription);

    const itemStatus = document.createElement('li');
    itemStatus.innerHTML = (eventName.status);
    itemStatus.style.fontWeight = 'bold';

    if (eventName.status === 'Go to Event') {
        itemStatus.style.color = '#1abc9c';
    } else {
        itemStatus.style.color = 'red';
    }
    container.appendChild(itemStatus);

    const itemCommentText = document.createElement('li');
    itemCommentText.innerHTML = 'Show Comments:';
    itemCommentText.style.fontWeight = 'normal';
    container.appendChild(itemCommentText);

    const submit = document.getElementById('events').children[5];
    submit.addEventListener('click', async function (event) {
        event.preventDefault();
        if (document.getElementById('events').children[5].innerHTML === 'Go to Event') {
            const status = 'join';
            const parameters = { status: status };
            const response = await fetch('http://127.0.0.1:8090/event/' + (document.getElementById('events').children[0].innerHTML.toLowerCase()).trim().replace(/\s/g, '') + '/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)
            });
            const body = await response.json();
            document.getElementById('events').children[5].style.color = 'red';
            renderinfo(body);
        } else if (document.getElementById('events').children[5].innerHTML === 'Going to Event, click to cancel Event.') {
            const status = 'not';
            const parameters = { status: status };
            const response = await fetch('http://127.0.0.1:8090/event/' + (document.getElementById('events').children[0].innerHTML.toLowerCase()).trim().replace(/\s/g, '') + '/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)
            });
            const body = await response.json();
            document.getElementById('events').children[5].style.color = '#1abc9c';
            renderinfo(body);
        }
    });

    document.getElementById('events').children[6].addEventListener('click', async function (event) {
        event.preventDefault();
        if (document.getElementById('events').children[6].innerHTML === 'Show Comments:') {
            const response = await fetch('http://127.0.0.1:8090/event/' + (document.getElementById('events').children[0].innerHTML.toLowerCase()).trim().replace(/\s/g, '') + '/comments');
            const body = await response.json();

            document.getElementById('events').children[6].innerHTML = 'Hide Comments:';
            document.getElementById('events').children[6].style.fontWeight = 'bold';

            rendercomments(body);
        } else if (document.getElementById('events').children[6].innerHTML === 'Hide Comments:') {
            while (document.getElementById('comment_section')) {
                const container = document.getElementById('events');
                const d = document.getElementById('comment_section');
                container.removeChild(d);
            }
            container.removeChild(document.getElementById('addcomment'));
            document.getElementById('events').children[6].innerHTML = 'Show Comments:';
            document.getElementById('events').children[6].style.fontWeight = 'normal';
        }
    });
}

function rendercomments(body) {
    if (typeof (body) !== 'string') {
        for (let i = 0; i < body.length; i++) {
            const container = document.getElementById('events');
            const elemList = document.createElement('li');
            elemList.innerHTML = body[i];
            elemList.style.fontWeight = 'normal';
            elemList.setAttribute('id', 'comment_section');
            container.appendChild(elemList);
        }
    } else {
        const container = document.getElementById('events');
        const elemList = document.createElement('li');
        elemList.innerHTML = body;
        elemList.style.fontWeight = 'normal';
        elemList.setAttribute('id', 'comment_section');
        container.appendChild(elemList);
    }

    const container = document.getElementById('events');
    const frm = document.createElement('form');
    frm.id = 'addcomment';
    frm.action = 'http://127.0.0.1:8090/event/' + (document.getElementById('events').children[0].innerHTML.toLowerCase()).trim().replace(/\s/g, '') + '/comments/add';
    frm.method = 'POST';

    const inpText = document.createElement('input');
    inpText.id = 'addcomment_input_text';
    inpText.type = 'text';
    inpText.placeholder = 'Add Comment';

    const inpSubmit = document.createElement('input');
    inpSubmit.id = 'addcomment_input_submit';
    inpSubmit.type = 'submit';
    inpSubmit.value = 'Comment';

    frm.appendChild(inpText);
    frm.appendChild(inpSubmit);

    container.appendChild(frm);

    const submit = document.getElementById('addcomment_input_submit');
    submit.addEventListener('click', async function (event) {
        event.preventDefault();
        const newComment = document.getElementById('addcomment_input_text').value;
        const parameters = { newComment: newComment };
        const response = await fetch('http://127.0.0.1:8090/event/' + (document.getElementById('events').children[0].innerHTML.toLowerCase()).trim().replace(/\s/g, '') + '/comments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(parameters)
        });
        let body = await response.json();
        body = body[body.length - 1];
        container.removeChild(frm);
        rendercomments(body);
    });
}

document.getElementById('home_tab').addEventListener('click', function (event) {
    document.getElementById('create_event_tab').setAttribute('class', 'nav-item');
    document.getElementById('home_tab').setAttribute('class', 'nav-item active');
});
