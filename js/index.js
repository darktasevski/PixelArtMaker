//Preset pixel arrays are preloaded in the <head>

var activeColor,
  numOfPixels = 32 * 32,
  colorComponents = ["red", "green", "blue"],
  defaultColors = [
    "rgb(216,101,101)",
    "rgb(216,153,101)",
    "rgb(60,130,130)",
    "rgb(80,173,80)",
    "rgb(40,40,40)"
  ];

//Clear the grid and preview areas
var clearViews = function() {
  $("#grid span").css("background-color", "rgba(0,0,0,0)");
  $("#preview span").css("background-color", "rgba(0,0,0,0)");
};

//Activate a palette color
var makeActive = function(c) {
  $("span.color").removeClass("active");
  c.addClass("active");
  activeColor = c.css("background-color");
};

//Color a pixel
var colorAPixel = function(g) {
  g.css("background-color", activeColor);
  var pixel = g.attr("class");
  $("#preview span." + pixel).css("background-color", activeColor);
};

//Create the grid and preview
var views = function() {
  for (i = 1; i <= numOfPixels; i++) {
    $("#grid").append("<span class='" + i + "'></span>");
    $("#preview").append("<span class='" + i + "'></span>");
  }
};

//Set the default palette colors
var setDefaultColors = function() {
  for (i = 1; i < 6; i++) {
    $(".col-2 .colors span.color.c" + i).css(
      "background-color",
      defaultColors[i - 1]
    );
  }
};

//Set a color choice to the palette
var setToPalette = function(s) {
  var d = s.substr(s.length - 1);
  $("#pal-" + d).css(
    "background-color",
    $("#choice-color").css("background-color")
  );
};

//Show the hover color if not blank/transparent
//"rgba(0, 0, 0, 0)" for Chrome
//"transparent" for IE and FF
var hoverText = function(h) {
  if (
    h.css("background-color") != "rgba(0, 0, 0, 0)" &&
    h.css("background-color") != "transparent"
  ) {
    $("#hover-color").html(h.css("background-color"));
  }
};

//Clear the hover color
var hoverTextClear = function() {
  $("#hover-color").html("&nbsp;");
};

//Show the number (class) of the pixel
var pixelText = function(p) {
  $("#pixel-no").html(p.attr("class"));
};

//Clear the number of th pixel
var pixelTextClear = function(p) {
  $("#pixel-no").html("&nbsp;");
};

//Surely I can condense these next 3 preset functions.

//Draw the Link preset
var drawLink = function() {
  //Fill the green pixels
  for (i = 1; i <= presetLink1.length; i++) {
    $("." + presetLink1[i - 1]).css("background-color", presetLinkC[0]);
  }
  //Fill the tan pixels
  for (i = 1; i <= presetLink2.length; i++) {
    $("." + presetLink2[i - 1]).css("background-color", presetLinkC[1]);
  }
  //Fill the brown pixels
  for (i = 1; i <= presetLink3.length; i++) {
    $("." + presetLink3[i - 1]).css("background-color", presetLinkC[2]);
  }
};

//Draw the Megaman preset
var drawMegaman = function() {
  //Fill the white pixels
  for (i = 1; i <= presetMegaman1.length; i++) {
    $("." + presetMegaman1[i - 1]).css("background-color", presetMegamanC[0]);
  }
  //Fill the tan pixels
  for (i = 1; i <= presetMegaman2.length; i++) {
    $("." + presetMegaman2[i - 1]).css("background-color", presetMegamanC[1]);
  }
  //Fill the lite blue pixels
  for (i = 1; i <= presetMegaman3.length; i++) {
    $("." + presetMegaman3[i - 1]).css("background-color", presetMegamanC[2]);
  }
  //Fill the dark blue pixels
  for (i = 1; i <= presetMegaman4.length; i++) {
    $("." + presetMegaman4[i - 1]).css("background-color", presetMegamanC[3]);
  }
  //Fill the black pixels
  for (i = 1; i <= presetMegaman5.length; i++) {
    $("." + presetMegaman5[i - 1]).css("background-color", presetMegamanC[4]);
  }
};

//Draw the Megaman preset
var drawHeis = function() {
  //Fill the black pixels
  for (i = 1; i <= presetHeis1.length; i++) {
    $("." + presetHeis1[i - 1]).css("background-color", presetHeisC[0]);
  }
  //Fill the tan pixels
  for (i = 1; i <= presetHeis2.length; i++) {
    $("." + presetHeis2[i - 1]).css("background-color", presetHeisC[1]);
  }
  //Fill the brown pixels
  for (i = 1; i <= presetHeis3.length; i++) {
    $("." + presetHeis3[i - 1]).css("background-color", presetHeisC[2]);
  }
  //Fill the purple pixels
  for (i = 1; i <= presetHeis4.length; i++) {
    $("." + presetHeis4[i - 1]).css("background-color", presetHeisC[3]);
  }
  //Fill the gray pixels
  for (i = 1; i <= presetHeis5.length; i++) {
    $("." + presetHeis5[i - 1]).css("background-color", presetHeisC[4]);
  }
  //Fill the white pixels
  for (i = 1; i <= presetHeis6.length; i++) {
    $("." + presetHeis6[i - 1]).css("background-color", presetHeisC[5]);
  }
};

//When the page is ready...
$(document).ready(function() {
  views();

  setDefaultColors();

  //This next function looks messy and I want to clean it up.

  //When a slider is moved...
  $("input[type=range]").on("change mousemove", function() {
    var r = $(this).get(0).id;
    var c = $("#choice-color").css("background-color");
    var x;
    if (r == colorComponents[0]) {
      x = 0;
    } else if (r == colorComponents[1]) {
      x = 1;
    } else if (r == colorComponents[2]) {
      x = 2;
    }
    //Put the R, G, and B values into an array
    var rgb = c
      .replace(/^(rgb|rgba)\(/, "")
      .replace(/\)$/, "")
      .replace(/\s/g, "")
      .split(",");
    //Update the array with the new component value
    rgb[x] = $("#" + r).val();
    //$(".col-1 .choices .choice span").text(rgb[x]);
    $("#comp-" + x).text(rgb[x]);
    //Update the chosen color with the new component value
    $("#choice-color").css(
      "background-color",
      "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"
    );
  });

  //Activate a palette color
  $("span.color").click(function() {
    makeActive($(this));
  });

  //Color a pixel
  // $("#grid span").click(function() {
  // colorAPixel($(this));
  // });

  //Color a pixel
  $("#grid span").on("mouseover", function() {
    colorAPixel($(this));
  });

  //When the 'Clear the Grid' preset is chosen...
  $("#clear-preset").click(function() {
    clearViews();
  });

  //When the 'Link' preset is chosen...
  $("#link-preset").click(function() {
    clearViews();
    drawLink();
  });

  //When the 'Megaman' preset is chosen...
  $("#megaman-preset").click(function() {
    clearViews();
    drawMegaman();
  });

  //When the 'Heisenberg' preset is chosen...
  $("#heis-preset").click(function() {
    clearViews();
    drawHeis();
  });

  //Hmm, how can I make these next 8 mouse functions dry?

  //Display a color code when a pixel is hovered
  $("#grid span").mouseenter(function() {
    hoverText($(this));
  });
  $("#grid span").mouseleave(function() {
    hoverTextClear();
  });
  $("#preview span").mouseenter(function() {
    hoverText($(this));
  });
  $("#preview span").mouseleave(function() {
    hoverTextClear();
  });

  //Display the pixel number when a pixel is hovered
  $("#grid span").mouseenter(function() {
    pixelText($(this));
  });
  $("#grid span").mouseleave(function() {
    pixelTextClear();
  });
  $("#preview span").mouseenter(function() {
    pixelText($(this));
  });
  $("#preview span").mouseleave(function() {
    pixelTextClear();
  });

  //Set a color choice to the palette
  $(".col-1 .colors span.color").click(function() {
    setToPalette($(this).get(0).id);
  });
});
