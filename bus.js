const ul = document.getElementById('busBooked');

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/73a8461579574825b1d88127e1bb42e0/busBooking")
    .then((response) => {
        //console.log(response);
        console.log(response.data);
        
        for(let i = 0; i < response.data.length; i++)
        {
            showBooking(response.data[i]);
        }
        //console.log(document.getElementById('bus').value);
        console.log("All Bookings are displayed");
    })
    .catch((err) => {
        ul.innerHTML = ul.innerHTML + `<h4>Something went wrong(${err})</h4>`;
        console.log(err);
    })
});

export const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const emailID = event.target.emailID.value;
    const phonenumber = event.target.phonenumber.value;
    const busnumber = event.target.bus.value;
    const obj = {
        username,
        emailID,
        phonenumber,
        busnumber
    }

    event.target.username.value = "";
    event.target.emailID.value = "";
    event.target.phonenumber.value = "";
    event.target.bus.value = "Choose a Bus";

    createBooking(obj);
}

const createBooking = (obj) => {
axios.post("https://crudcrud.com/api/73a8461579574825b1d88127e1bb42e0/busBooking", obj)
    .then((response) => {
        showBooking(response.data);
        console.log("Booking Done");
    })
    .catch((err) => {
        console.log(err);
    })
}

const showBooking = (user) => {
    const childNode = `<li id = ${user._id} class = "booking"> ${user.username} ${user.emailID} ${user.phonenumber} ${user.busnumber}
                            <button onclick = deleteBooking('${user._id}')> Delete </button>
                            <button onclick = editBooking('${user._id}','${user.username}','${user.emailID}','${user.phonenumber}','${user.busnumber}')> Edit </button>
                        </li>`;
    //console.log(`${user.busnumber}`);
    ul.innerHTML = ul.innerHTML + childNode;
}

window.deleteBooking = (userId) => {
    axios.delete(`https://crudcrud.com/api/73a8461579574825b1d88127e1bb42e0/busBooking/${userId}`)
    .then((response) => {
        console.log(`${userId} Booking deleted`);
        removeBooking(userId);
    })
    .catch((err) => {
        console.log(err);
    })
}

const removeBooking = (userId) => {
    const childElement = document.getElementById(userId);
    if(childElement)
    {
        ul.removeChild(childElement);
    }
}

window.editBooking = (userId, username, emailID, phonenumber, busnumber) => {
    document.getElementById('username').value = username;
    document.getElementById('emailID').value = emailID;
    document.getElementById('phonenumber').value = phonenumber;
    document.getElementById('bus').value = busnumber;

    deleteBooking(userId);
    console.log("Booking Edited");
}

const filter = document.getElementById("filter");
filter.addEventListener('change', function(event) {
    const filterSelected = document.getElementById('filter').value;
    //console.log(filterSelected);
    const matchedBusNumber = document.querySelectorAll("#busBooked .booking");
    for(let i = 0; i < matchedBusNumber.length; i++)
    {
        //console.log(matchedBusNumber[i].firstChild.textContent);
        const currentmatchedBusNumber = matchedBusNumber[i].firstChild.textContent;
        //console.log(filterSelected)
        if(currentmatchedBusNumber.indexOf(filterSelected) !== -1 || filterSelected === "All")
        {
            //matchedBusNumber[i].style.listStyleType = "circle";
            matchedBusNumber[i].style.display = "flex";
            //console.log("true");            
        }
        else
        {
            matchedBusNumber[i].style.display = "none";
            //console.log("false");
        }
    }
})