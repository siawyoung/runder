// Set height of codeContainer to 100% - height of header

$(".codeContainer").css("height", ($(window).height() - $(".header").height()) + "px");

$(".codeContainerCode").css("height", ($(".codeContainer").height()-$(".codeContainerTitle").outerHeight(true)) + "px");

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
}
});

    caja.initialize({
        cajaServer: "https://caja.appspot.com/"
    });


$(".run").click(function() {

    $("#result").empty();

    caja.load(document.getElementById('result'), undefined, function(frame) {
        frame.code("http://siawyoung.github.io/runder",
                   'text/html', "<style>" + $("#cssCode").val() + "</style>" + $("#htmlCode").val() + "<script type='text/javascript'>" + $("#jsCode").val() + "</script>")
             .run();
      });

});