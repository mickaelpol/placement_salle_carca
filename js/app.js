$(document).ready(function(){


	$.ajax({ // requete ajax de l'api google 
		dataType: 'json',
		url: "http://spreadsheets.google.com/feeds/list/1-oYlvGP573O4ml4AzgapLhK_KoEqlfDIzvSnWz48_nQ/od6/public/values?alt=json",

		success:function(data){

			$('#melange').click(function(){ // clic du mélange

				shuffle(data.feed.entry);
				console.log(data.feed.entry);
				for(var i = 0; i < 15; i++){ // boucle 

					//insertion des données dans les id correspondant
					$('#place' + i).html(data.feed.entry[i].title.$t + "<br>" + '<img src="' + data.feed.entry[i].gsx$url.$t + '"/>' );

				}

			});
		},

		error:function(){ // renvoi d'erreur
			$('#contenu').html("erreur");
		}

	});

	function shuffle(array) {// fonction de mélange aleatoire 
		var j, x, i;
		for (i = array.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = array[i - 1];
			array[i - 1] = array[j];
			array[j] = x;
		}
	}

$.ajax({ // requete ajax pour la météo
	url:"http://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q=Carcassonne&&APPID=a46b3c46d72e846fc8c834a487a2b41d",

	success:function(data){//ajoute les infos dans les id correspondant 
		console.log(data);
	$('#meteo').html(data.city.name + "<br>"); // Ville de Carcassonne
	$('#jour').html(moment(data.list[0].dt_txt).format("ll, LT")); // jour + heure
	$('#temp').html(Math.floor(data.list[0].main.temp) + " °C" + "<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png'>"); //température + icone
	$('#param').html("humidité " +data.list[0].main.humidity + " %" + "<br>" + "Vent " + Math.floor(data.list[0].wind.speed * 3.6)+ " Km/h" + "<br>");// humidité et vent
	},
	erreur:function(){ // renvoi de l'erreur si le chargement ne se fait pas
		$('#meteo').html("erreur de chargement");
	}
})


}); // fin du document ready function 

