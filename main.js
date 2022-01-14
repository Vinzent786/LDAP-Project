const save = document.getElementById('save');
const imported = document.getElementById('imported');
const button1 = document.getElementById('table_button1');
const button2 = document.getElementById('table_button2');
const import_button = document.getElementById('table_button3');
const grid = document.getElementById('grid');
const output = document.getElementById('output');
const copyButton = document.getElementById('copy');
const alert = document.getElementById('alert')
const gridElements = {
    zNumber: document.getElementById('zNumber'),
    userName: document.getElementById('userName'),
    passWord: document.getElementById('passWord'),
    expiration: document.getElementById('expiration'),
    lastName: document.getElementById('lastName'),
    firstName: document.getElementById('firstName'),
    middleInitial: document.getElementById('middleInitial'),
    department: document.getElementById('department'),
    affiliation: document.getElementById('affiliation'),
    email: document.getElementById('email'),
    address: document.getElementById('address'),
    city: document.getElementById('city'),
    state: document.getElementById('state'),
    zip: document.getElementById('zip'),
    dob: document.getElementById('dob'),
    phone: document.getElementById('phone'),
    sponsor: document.getElementById('sponsor'),
};
const keys = Object.keys(gridElements);
let paramaters = [];
let values = [];
let obj = {};
let firstButton;
let secondButton;

save.addEventListener('click', update);

const showHide = () => {
    alert.style.display = 'block';
}

const b1 = () => {
    firstButton = true;
    main();
}
const b2 = () => {
    secondButton = true;
    main();
}
button1.addEventListener('click', b1);
button2.addEventListener('click', b2);


function write_output() {
    // Wraps each element in array (besides 0 index) in quotation marks
    for (let i = 0; i <= paramaters.length - 1; i++){
        if (i != 0) {
            paramaters[i] = ` "${paramaters[i]}"`;
        } 
    }
    let lastElement = paramaters[paramaters.length - 1];
    // Appends output html element with last index of array
    output.textContent = output.textContent + lastElement;
}


function main() {
    // Appends output and value array based on which button was pressed
    if (firstButton == true) {
        paramaters.push('./ldapuseradd.pl');
        values.push('./ldapuseradd.pl');
    } else {
        paramaters.push('./ldapusermod.pl');
        values.push('./ldapusermod.pl');
    }

    function show_grid() {
        button1.disabled = true;
        button2.disabled = true;
    
        grid.style.display = 'grid';
        document.getElementById('outputHeader').style.display = 'block';
        output.style.display = 'block';
    }
    show_grid();
    write_output();
    

    // Displays next HTML element, appends parameter list, calls write_output()
    for (let i = 0; i < keys.length; i++) {
        gridElements[keys[i]].addEventListener('keydown', (event) => {
            if (event.code === 'Enter' && i !== 16) {
                gridElements[keys[i + 1]].style.display = 'block';
                paramaters.push(gridElements[keys[i]].textContent);
                write_output();
            } else if (event.code === 'Enter' && i === 16)
            {
                paramaters.push(gridElements[keys[i]].textContent);
                write_output();
            }
        });
    }

    // Copies output to clipboard and shows/hides alert
    copyButton.addEventListener('click', () => {
        function copyText() {
            const cb = navigator.clipboard;
            const text = document.querySelector('#output');
            cb.writeText(text.innerText).then(showHide);
        }
        copyText();
    });
}

// ***Logging Functionality***

const readURL = 'https://api.jsonbin.io/v3/b/6195199f62ed886f914fe335/latest';
const updateURL = 'https://api.jsonbin.io/v3/b/6195199f62ed886f914fe335';

function update(){

    const logs = document.getElementById('logs');

    document.getElementById('logging').style.display = 'inline-block';
    logs.style.display = 'inline-block';

    function read() {
        const header = new Headers({
            'X-Master-Key': '$2b$10$kM6jWpRxYWWUSJ5ZIi.Pwejmhgf52uTn/3aBEYU/CW.h6KNQHdETm'
        });
        const request = new Request(readURL, {
            method: 'GET',
            headers: header
        });
    
        let read_data = (response) => {
            
            let data = response.record;
            write(data);
        }
    
        fetch(request)
        .then(response => response.json())
        .then(read_data)
        .catch(err => {
            console.log(`There was an error getting the logs: ${err}`)
        });
    }
    read();
    
    
    function write(data) {

        for (i of keys) {
            if (gridElements[i].textContent != ""){
                values.push(`${gridElements[i].textContent}`)
            } else {
                values.push(``)
            }
        }
        
        keys.unshift('script');

        for (let i = 0; i < keys.length; i++) {
            obj[keys[i]] = values[i];
        }

        data.push(obj);

        const header = new Headers({
            'Content-Type': 'application/json',
            'X-Master-Key': '$2b$10$kM6jWpRxYWWUSJ5ZIi.Pwejmhgf52uTn/3aBEYU/CW.h6KNQHdETm'
        });
        
        const request = new Request(updateURL, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        });
    
        fetch(request)
        .catch((err) => {
            alert(`There was an error saving: ${err}`)
        });
    }
}

