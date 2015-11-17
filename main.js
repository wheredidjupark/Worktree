$(document).ready(function() {
    var KEY_ENTER = 13;
    var KEY_DELETE = 8;
    var KEY_TAB = 9;
    var KEY_SHIFT = 16;

    var KEY_LEFTARROW = 37;
    var KEY_UPARROW = 38;
    var KEY_RIGHTARROW = 39;
    var KEY_DOWNARROW = 40;

    var createNode = function() {

        var $node = $("<div></div>").addClass("node");
        var $value = $("<div  contenteditable></div>").addClass("value");
        var $children = $("<div></div>").addClass("children");
        var $point = $("<span>O</span>").addClass("point");

        $node.append($value);
        $node.append($children);
        $node.prepend($point);

        var $copy = $node.clone();
        return $copy;

        // return $("<div contenteditable></div>").addClass("node");
    };

    var saveData = function() {
        var data = $("#app").html();
        window.localStorage.setItem('appData', data);
    };

    var getData = function() {
        return window.localStorage.getItem('appData');
    };

    var initialize = function() {
        if (getData()) {
            $("#app").html("");
            $("#app").append(getData());
        } else {
            $("#app").append(createNode());
        }


        //if there is no content in the app, create a node.
        var appContent = $("#app").text();
        if (appContent.length === 0) {
            $("#app").append(createNode());
        }
    };

    initialize();



    $("#app").on("keydown", ".value", function(e) {

        // console.log("You pressed the key with the following keycode",e.keyCode);
        var textVal = $(this).text();
        var htmlVal = $(this).html();
        var $thisNode = $(this).closest(".node");

        //ENTER: Create a new sibling node. Focus on the newly created sibling node.
        if (e.keyCode === KEY_ENTER) {
            e.preventDefault();
            $thisNode.after(createNode());
            $thisNode.next().children(".value").focus();
        }

        //DOWNARROW: focus on the next node
        if (e.keyCode === KEY_DOWNARROW) {
            e.preventDefault();
            $thisNode.next().children(".value").focus();
        }

        //UPARROW: Focus on the previous node
        if (e.keyCode === KEY_UPARROW) {
            e.preventDefault();
            $thisNode.prev().children(".value").focus();
        }

        //LEFT ARROW + caret at beginning: move to the previous node
        if (e.keyCode === KEY_LEFTARROW) {
            if ($(this).caret() === 0) {
                e.preventDefault();
                var $prevNodeValue = $thisNode.prev().children(".value");
                $prevNodeValue.focus();
            }
        }

        //RIGHT ARROW + caret at end: move to the next node.
        if (e.keyCode === KEY_RIGHTARROW) {

            var length = $(this).text().length;
            if ($(this).caret() === length) {
                e.preventDefault();
                var $nextNodeValue = $thisNode.next().children(".value");
                $nextNodeValue.focus();
            }
        }

        //DELETE: Remove the node. Focus on the previous node.
        if (e.keyCode === KEY_DELETE) {

            if ($("#app").children().length > 1) {
                var $prevNode = $thisNode.prev();
                var $prevNodeValue = $thisNode.prev().children(".value");

                if (htmlVal.toString().length === 0) {
                    e.preventDefault();
                    $prevNodeValue.focus(); //the focus functionality should place the text cursor at the end of its content
                    //http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
                    $thisNode.remove();
                    //if the current node is not empty & the previous node is empty + caret at the beginning, delete the previous node.
                }
            }
        }

        //TAB: Move the node inside of its previous sibling node. Label the moved node as a child node.
        if (e.keyCode === KEY_TAB) {
            e.preventDefault();
            var $prevNodeChildren = $thisNode.prev().children(".children");
            $prevNodeChildren.append($thisNode);
        }

        //REVERSE TAB: Move the child node outside of its parent node(i.e. next)
        //http://stackoverflow.com/questions/10655202/detect-multiple-keys-on-single-keypress-event-on-jquery 

        //ENTER + Nothing in the node: Same functionality as REVERSE TAB (see above)
        if (e.keyCode === KEY_ENTER && htmlVal.toString().length === 0) {

        }

        saveData();


    });

    // //when text of the node is clicked,
    // $("#app").on("click", ".text", function(e) {
    //     var $form = $("<form><input type='text'></form>").addClass("modifier");
    //     $form.children("input").val($(this).text());
    //     $(this).before($form);
    //     $(this).remove();

    //     saveData();

    // });


    var hoverButton = function() {
        // var timeoutId;
        // $(".button").hover(function() {
        //     if (!timeoutId) {
        //         var $this = $(this);
        //         timeoutId = setTimeout(function() {
        //             console.log("hovering");

        //             //turn the background grey (configure in CSS)
        //             $this.closest(".node").addClass("highlight");
        //         }, 500);

        //     }

        // }, function() {

        //     if (timeoutId) {
        //         console.log("leaving");
        //         clearTimeout(timeoutId);
        //         timeoutId = false;
        //         //turn the background white (configure in CSS)
        //         $(this).closest(".node").removeClass("highlight");
        //     }

        // });

    };


});
