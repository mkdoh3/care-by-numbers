$(function () {

    //draw map on load with default
    drawMap(1);
    //update html on load with default
    $("#map-header").prepend("<h2>Heart Transplant<small> Procedure Cost by State</small></h2><p>Includes all heart transplant procedures and implantation of ventricular assist devices with major complications and comorbidities.</p>");


    $(".proc-btn").on("click", function () {
        //redraw map
        drawMap($(this).data("id"));
        //update html
        let name = $(this).data("name");
        let procDesc = $(this).data("desc");
        $("#map-header").empty();
        $("#procedure-lead").empty();
        $("#map-header").prepend(`<h2>${name}<small> Procedure Cost by State</small></h2><p>${procDesc}</p>`);
        //scroll to map div
        $('html,body').animate({
            scrollTop: $("#map-div").offset().top
        }, 800);
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
