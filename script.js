
// Initialize Caja
caja.initialize({
    cajaServer: "https://caja.appspot.com/"
});

/* CSS-specific JS */

//Set height of codeContainer to 100% - height of header
$(".codeContainer").css("height", ($(window).height() - $(".header").height()) + "px");

$(".codeContainerCode").css("height", ($(".codeContainer").height()-$(".codeContainerTitle").outerHeight(true)) + "px");

/* Initialize Ace editors */

// HTML Editor-specific Options
var htmlEditor = ace.edit("htmlCode");
htmlEditor.getSession().setMode("ace/mode/html");
htmlEditor.setValue("<!doctype html>\n<head>\n\t<meta charset='utf-8'>\n</head>\n<body>\n\t\n</body>\n</html>");
htmlEditor.clearSelection();
htmlEditor.moveCursorTo(5,1);
htmlEditor.focus();

// CSS Editor-specific Options
var cssEditor = ace.edit("cssCode");
cssEditor.getSession().setMode("ace/mode/css");

// JS Editor-specific Options
var jsEditor = ace.edit("jsCode");
jsEditor.getSession().setMode("ace/mode/javascript");

// List of editors
var editors = [htmlEditor, cssEditor, jsEditor];

// Global options, takes list from above
for (i = 0; i < editors.length; i++) {
    editors[i].setTheme("ace/theme/solarized_light");
    editors[i].setShowPrintMargin(false);
    editors[i].getSession().setUseWrapMode(true);
    editors[i].getSession().setUseSoftTabs(true);
}

/* Editor toggle behavior */

$(".toggle").click(function() {

    var noOfDisplayedDivs=$(".codeContainer").filter(function() {
        return ($(this).css("display") != "none");
    }).length;

    if (noOfDisplayedDivs <= 1 && $(this).hasClass("selected")){ return;
    } else {

    $(this).toggleClass("selected");

    var activeDiv = $(this).html();

    $("#" + activeDiv + "Container").toggle();

    noOfDisplayedDivs=$(".codeContainer").filter(function() {
        return ($(this).css("display") != "none");
    }).length;

    var containerWidth = 100/noOfDisplayedDivs;

    $(".codeContainer").css("width", containerWidth+"%");

    htmlEditor.resize();
    cssEditor.resize();
    jsEditor.resize();

}
});

/* Keypress Behavior for Editor Toggle */

down = {'13': null, '49': null, '50': null, 51: null, 52: null, 81: null, '82': null, '83': null, '69': null};
$(document).keydown(function(event) {
    console.log(down);
    // Check if any editors are in focus
    var anyEditorsFocused = htmlEditor.isFocused() || cssEditor.isFocused() || jsEditor.isFocused();

    var keycode = (event.keyCode ? event.keyCode : event.which);

    // bind '1' to HTML
    if (keycode == '49' && !anyEditorsFocused){
        if (down['49'] === null) { // first press
            $('#htmlToggle').click();
            down['49'] = true; // record that the key's down
      }
    }

    // bind '2' to CSS
    if (keycode == '50' && !anyEditorsFocused){
        if (down['50'] === null) { // first press
            $('#cssToggle').click();
            down['50'] = true; // record that the key's down
      }
    }

    // bind '3' to JS
    if (keycode == '51' && !anyEditorsFocused){
        if (down['51'] === null) { // first press
            $('#jsToggle').click();
            down['51'] = true; // record that the key's down
      }
    }

    // bind '4' to result
    if (keycode == '52' && !anyEditorsFocused){
        if (down['52'] === null) { // first press
            $('#resultToggle').click();
            down['52'] = true; // record that the key's down
      }
    }

    // bind 'q' to htmlEditor focus   

    if (keycode == '81' && !anyEditorsFocused){
        if (down['81'] === null) { // first press
            event.preventDefault();
            htmlEditor.focus();
            down['81'] = true; // record that the key's down
      }
    }

    // bind 'w' to cssEditor focus   

    if (keycode == '87' && !anyEditorsFocused){
        if (down['87'] === null) { // first press
            event.preventDefault();
            cssEditor.focus();
            down['87'] = true; // record that the key's down
      }
    }

    // bind 'e' to htmlEditor focus   

    if (keycode == '69' && !anyEditorsFocused){
        if (down['69'] === null) { // first press
            event.preventDefault();
            jsEditor.focus();
            down['69'] = true; // record that the key's down
      }
    }

    // bind 'r' to run

    if (keycode == '82' && !anyEditorsFocused){
        if (down['82'] === null) { // first press
            event.preventDefault();
            $(".run").click();
            down['82'] = true; // record that the key's down
      }
    }

    // bind cmd/ctrl + return to run (global)
    if ((event.metaKey || event.ctrlKey) && (keycode == '13')) {
        event.preventDefault();
        if (down['13'] === null || down['83'] === null) { // first press
            $(".run").click();
            if (keycode == '13') {
                down['13'] = true;
            } else {
                down['83'] = true;
            }
        }
    }

    // bind escape to unfocus (global)
    if (keycode == '27') {
        $("textarea").blur();
    }

}); 
// Prevent keydown repetition
$(document).keyup(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    down[keycode] = null;
});

/* Run behavior */

$(".run").click(function() {

     $("#result").empty();
     $('.run button').animate({
        backgroundColor: "#f1c40f"
    }, 150).delay(200);


     //TODO: Change regex to account for commented out tags
     var doctypePattern = /<!doctype html>/i;
     var bodyPattern = /<body>/i;
     var headPattern = /<head>/i;

     // If any of the the tags are missing, scream
    if (!doctypePattern.test(htmlEditor.getValue()) || !bodyPattern.test(htmlEditor.getValue()) || !headPattern.test(htmlEditor.getValue())) {

        caja.load(document.getElementById('result'), undefined, function(frame) {
    frame.code("http://siawyoung.github.io/runder",
               'text/html', "Please add your doctype declaration, or head and body tags!")
         .run();
    });
        return;
    }

    var replaceStyle = htmlEditor.getValue().replace("</head>", "<style>" +cssEditor.getValue() + "</style></head>");

    var replaceStyleAndScript = replaceStyle.replace("</body>", "<script type='text/javascript'>" + jsEditor.getValue() + "</script></body>");


    caja.load(document.getElementById('result'), undefined, function(frame) {
        frame.code("http://siawyoung.github.io/runder",
               'text/html', replaceStyleAndScript)
            .run(function() {
                $('.run button').animate({
                    backgroundColor: "#2ecc71"
                }, 500).delay(500);
            });
    });

});

/* Transition green to normal on keystroke in editor */

htmlEditor.on("change", function(e) {
    $('.run button').animate({
        backgroundColor: "#ecf0f1"
    }, 150).delay(150);
});

cssEditor.on("change", function(e) {
    $('.run button').animate({
        backgroundColor: "#ecf0f1"
    }, 150).delay(150);
});

jsEditor.on("change", function(e) {
    $('.run button').animate({
        backgroundColor: "#ecf0f1"
    }, 150).delay(150);
});