$(function () {

    //reset page position
    $("html, body").animate({
        scrollTop: 0
    }, 500);

    //draw map on load with default
    drawMap(1);
    //update html on load with default
    $("#map-header").prepend("<h2>Heart Transplant<small> Average Procedure Cost by State</small></h2><p>Includes all heart transplant procedures and implantation of ventricular assist devices with major complications and comorbidities.</p>");

    //    hide empty lineChart and nav btn by default, will show on update 
    $("#region-div").hide();
    $("#down-btn").hide();
    $("#up-btn").hide();
    $("#region-header").hide();



    $(".proc-btn").on("click", function () {
        $("#region-div").hide();
        $("#down-btn").hide();
        $("#up-btn").hide();
        $("#region-header").hide();
        //redraw map
        drawMap($(this).data("id"));
        //update html
        let name = $(this).data("name");
        let procDesc = $(this).data("desc");
        $("#map-header").empty();
        $("#procedure-lead").empty();
        $("#map-header").prepend(`<h2>${name}<small> Average Procedure Cost by State</small></h2><p>${procDesc}</p>`);
        //scroll to map div
        $('html,body').animate({
            scrollTop: $(".button-wrapper").offset().top
        }, 800);
    });

    $("#down-btn").on("click", function () {
        $('html,body').animate({
            scrollTop: $("#region-div").offset().top
        }, 800);
    })

    $("#up-btn").on("click", function () {
        $('html,body').animate({
            scrollTop: $(".button-wrapper").offset().top
        }, 800);
        //        $("#up-btn").hide();
    })



    $(".proc-btn").mouseover(function () {
        let id = $(this).data("id");
        let name = $(this).data("name");
        $.get("/api/mm/" + id).then(function (data) {
            updateBarChart(name, data[0].state, data[0].min, data[1].state, data[1].max)
        });
    });

});

//***** left in case I decide to implement the state rank list somehow.. but it doesn't seem to fit well in this current layout

//disable page scrolling while mouse is in the list-div. prevents page from moving 
//    $(document).on('mousewheel DOMMouseScroll', "#list-div", (e) => {
//        var e0 = e.originalEvent,
//            delta = e0.wheelDelta || -e0.detail;
//
//        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
//        e.preventDefault();
//    });

//    const getRankedStateList = (procId, name) => {
//        $.get('/api/avg/' + procId).then(function (data) {
//            console.log(data);
//            let list = "<ol>{{#each data}}<li><a href ='#stateAnchor' class='state-select' data-state='{{this.state}}' data-id='{{this.procId}}'>{{this.state}}</a></li>{{/each}}</ol>";
//            getDataForMap(data, name);
//            let compiledTemplate = Handlebars.compile(list);
//            let html = compiledTemplate({
//                data: data
//            });
//            $("#list-div").empty().append(html);
//        });
//    };
