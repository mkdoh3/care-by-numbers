$(function () {

    //draw map on load witht default
    drawMap(1);

    //redraw map on button click
    $(".proc-btn").on("click", function () {
        drawMap($(this).data("id"));
        let name = $(this).data("name");
        let procDesc = $(this).data("desc");
        $("#title-for-map").empty();
        $("#procedure-lead").empty();
        $("#title-for-map ").prepend("<h2> " + name + " <small>Procedure Cost by State</small></h2><p>" + procDesc + "</p>");
    });







    const getRankedStateList = (procId, name) => {
        $.get('/api/avg/' + procId).then(function (data) {
            console.log(data);
            let list = "<ol>{{#each data}}<li><a href ='#stateAnchor' class='state-select' data-state='{{this.state}}' data-id='{{this.procId}}'>{{this.state}}</a></li>{{/each}}</ol>";
            getDataForMap(data, name);
            let compiledTemplate = Handlebars.compile(list);
            let html = compiledTemplate({
                data: data
            });
            $("#list-div").empty().append(html);
        });
    };

    const getStateCostData = (state, procId) => {
        $.get("/api/cost/" + state + "/" + procId).then(function (data) {})
    }


    //    $(".proc-btn").on("click", function () {
    //        //        clear html
    //        $("#title-for-map").children("h1:first").remove();
    //        $("#procedure-lead").text("");
    //        $("state-ranking-title").text("");
    //        //        set html
    //        let procId = $(this).data("id");
    //        let name = $(this).data("name");
    //        let procDesc = $(this).data("desc");
    //        $("#title-for-map").append("<h1>" + name + "<small> Procedure Cost by State</small></h1>");
    //        $("#procedure-lead").text(procDesc);
    //        //        get ranked list
    //        getRankedStateList(procId, name);
    //        $("#state-ranking-title").text("State Ranking");
    //    });







    $("#nav-patient").on("click", function () {
        console.log('clicked');
        //$.get("/patient";
    })


    $(".proc-btn").hover(function () {
        let id = $(this).data("id");
        let name = $(this).data("name");
        $.get("/api/mm/" + id).then(function (data) {
            addData(name, data[0].state, data[0].min, data[1].state, data[1].max)
        });
    });


    //disable page scrolling while mouse is in the list-div. prevents page from moving 
    $(document).on('mousewheel DOMMouseScroll', "#list-div", (e) => {
        var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;

        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
    });
});
