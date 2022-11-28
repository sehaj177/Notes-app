//if users add a note add it to localstorage
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }

    else {
        notesObj = JSON.parse(notes);
    }
    let myObj= {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    //   console.log(notesObj);
    showNotes();
});
// function to show elements from locl Storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">

                <div class="card-body">
                    <h5 class="card-title"> ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick='deleteNote(this.id)' class="btn btn-primary">Remove Note</button>
                    <button id="${index}" onclick='bookMark(this.id)' class="btn btn-secondary"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Bookmark_icon.svg/1024px-Bookmark_icon.svg.png" height="20px"></button>
                </div>
        </div>
               `

    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `<b>nothing to show! add a note using the above section :)</b>`
    }
}

// function to deletea note
function deleteNote(index) {
    console.log('i am deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
 

    showNotes();
}
//function to bookmark a note
function bookMark(index) {
    console.log("i am bookmarking", index)
    var elements = document.getElementsByClassName('card-body',index); // get all elements
	for(var i = 0; i < elements.length; i++){
		elements[i].style.backgroundColor = "grey";
	}

}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    console.log('input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';

        }
        // console.log(cardTxt);
    })

})



















