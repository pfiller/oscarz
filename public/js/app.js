pickRow = _.template("<tr><th><%= category %></th><td class=\"<%= correct %>\"><%= pick %></td></tr>")
picksBody = document.querySelector("#picksBody");
function showPicksFor(name){
  entrant = _.findWhere(data.picks, {entrant: name});
  html = ""
  _.each(entrant, function(pick, category){
    if(category!=="entrant" && category!=="correct" && category!=="percentage"){
      correct = (data.winners[category] === pick) ? "correct" : "incorrect";
      html += pickRow({category: category, pick: pick, correct: correct});
    }
  });
  picksBody.innerHTML =html;
}

function nameRowClick(evt){
  selected = document.querySelector(".selected");
  if(selected){ selected.classList.remove("selected"); }

  row = evt.target;
  if(evt.target.nodeName!=="TR"){
    row = evt.target.parentNode;
  }
  row.classList.add("selected")
  showPicksFor(row.querySelector(".entrant").innerHTML);
}

_.each(data.picks, function(picks){
  picks.correct = 0;
  _.each(data.winners, function(winner, category){
    if(winner === picks[category]){
      picks.correct += 1;
    }
  });
  picks.percentage = Math.round(picks.correct / 14 * 100);
})

sortedPicks = _.sortBy(data.picks, "correct").reverse();

html = ""
row = _.template("<tr><td class=\"entrant\"><%= entrant %></td><th class=\"table-center\"><%= correct %></th><td class=\"table-center\"><%= percentage %>%</td></tr>")
tbody = document.querySelector("#entrants");
_.each(sortedPicks, function(pick){ html += row(pick); });
tbody.innerHTML = html;

tbody.addEventListener("click", nameRowClick);
