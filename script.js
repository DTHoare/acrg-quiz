var originalGraph = []
var originalBoxes = []

document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      dragSrcEl.style.opacity = '1';
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';


    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }


  let items = document.querySelectorAll('.container .box');
  items.forEach(function(item) {
    originalBoxes.push(item.cloneNode());
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);

  });

  items = document.querySelectorAll('.container_graph .box');
  items.forEach(function(item) {
    originalGraph.push(item.cloneNode());
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);

  });
});

function checkAnswers() {
  let items = document.querySelectorAll('.container_graph .box');
  let answers = ["Cow","Sheep", "Pig", "Human"]
  for (var i = 0, len = items.length; i < len; ++i) {
    if (items[i].textContent.indexOf(answers[i]) == -1){
      console.log("Incorrect")
      document.getElementById("message").textContent = "Not quite - try again! For some clues, read the 'Animals and Methane' page."
      return 0;
    }
  }
  console.log("Correct!")
  document.getElementById("message").innerHTML = " <img src='images/cow_burping.png'> <br> Correct - well done!"
  return 1;
}

function reset() {
  location.reload();
  // let items = document.querySelectorAll('.container .box');
  // for (var i = 0, len = items.length; i < len; ++i) {
  //   items[i].replaceWith(originalBoxes[i].cloneNode());
  // }
  // items = document.querySelectorAll('.container_graph .box');
  // for (var i = 0, len = items.length; i < len; ++i) {
  //   items[i].replaceWith(originalGraph[i].cloneNode());
  // }
}

function openPopup(id) {
  var popup = document.getElementById(id);
  popup.classList.toggle("show");
}
