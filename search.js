function searchBar() {
  // Declare variables
  var input, filter, ol, li, a, i;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  ol = document.getElementById("searchMenu");
  li = ol.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}