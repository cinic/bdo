#$ ->
#  $("#new_prospect").on("ajax:success", (e, data, status, xhr) ->
#    $("#new_prospect").append xhr.responseText
#  ).bind "ajax:error", (e, xhr, status, error) ->
#    $("#new_prospect").append "<p>ERROR</p>"