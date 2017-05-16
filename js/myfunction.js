$(function() {
    //showQuestion();
    //hideAll();
});


function cleanClass() {
    $("ul.nav-sidebar li").removeClass('active');
}

function hideAll() {
    $(".leftDiv").hide();

}

$("ul.nav-sidebar li").click(function() {
    cleanClass();
    $(this).addClass('active');
    hideAll();
    $($(this).children().attr('href')).show();
    $(".overlay").hide();
    $(".sidebar").removeClass('toggled');
});

$("#wordSubmit").click(function() {

    var content = $("#word-Content").val();
    var interpretation = $("#word-Interpretation").val();
    var partOfSpeech = $("#word-PartOfSpeech").val();
    var grade = $("#word-Grade").val();
    var source = $("#word-Source").val();

    content = $.trim(content);
    interpretation = $.trim(interpretation);
    source = $.trim(source);
    if (content != "") {
        $.ajax({
            url: 'writeintodb.jsp',
            data: {
                Content: content,
                Interpretation: interpretation,
                PartOfSpeech: partOfSpeech,
                Grade: grade,
                Source: source,
            },
            type: 'post',
            success: function(resp) {
                alert("添加成功");
                $("#wordform").submit();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
            }
        });
    } else {
        alert("單字不能為空");
    }
});

$("#paragraphSubmit").click(function() {

    var content = $("#paragraph-content").val();
    var source = $("#paragraph-source").val();
    var grade = $("#paragraph-grade").val();
    var hashTag = $("#paragraph-hashTag").val();

    if (content != "") {
        $.ajax({
            url: 'writeintodb2.jsp',
            data: {
                Content: content,
                Source: source,
                Grade: grade,
                HashTag: hashTag
            },
            type: 'post',
            success: function(resp) {
                alert("添加成功");
                $("#paragraphform").submit();
                insertQuestion(resp);

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
            }
        });
    } else {
        alert("文章不能為空");
    }
});


$('#displayselect').on('change', function() {
    var val = $(this).val();
    $("#mytable").remove();
    $("#table").append('<table class="table table-condensed" id="mytable"></table>');
    $.ajax({
        url: 'querylevelword.jsp',
        data: { grade: val },
        dataType: 'Json',
        type: 'post',
        success: function(data) {
            $('#mytable').append('<tr><th>單詞</th><th>詞性</th><th>解釋</th><th>難易程度</th></tr>');
            for (var i = 0; i < data.length; i++) {
                $('#mytable').append('<tr><td>' + data[i].Content + '</td><td>' + data[i].PartOfSpeech + '</td><td>' + data[i].Interpretation + '</td><td>' + data[i].Level + '</td></tr>');
            }
            //$('#mytable').append('<tr><th>菜單</th></tr><tr><th>病名</th><td>'+data.sick+'</td></tr><tr><th>開胃菜</th><td>'+data.kwc+'</td></tr><tr><th>主食</th><td>'+data.zs+'</td></tr><tr><th>主菜</th><td>'+data.zc+'</td></tr><tr><th>副菜</th><td>'+data.fc+'</td></tr><tr><th>配菜</th><td>'+data.pc+'</td></tr><tr><th>抗癌菜</th><td>'+data.kac+'</td></tr><tr><th>燉湯</th><td>'+data.dt+'</td></tr><tr><th>茶飲/甜品</th><td>'+data.cy+'</td></tr>');
        },
    });
});

function insertQuestion(data){
    alert(data);
}

function showQuestion() {
    $("#mytable").remove();
    $("#questionTable").append('<table class="table table-condensed" id="mytable"></table>');
    $.ajax({
        url: 'QueryQuestionList.jsp',
        data: {},
        dataType: 'Json',
        type: 'post',
        success: function(data) {
            $('#mytable').append('<tr><th>題號</th><th>題型</th><th>題目</th><th>難度</th></tr>');
            for (var i = 0; i < data.length; i++) {
                $('#mytable').append('<tr><td>' + data[i].QuestionID + '</td><td>完型填空</td><td><a id="question' + data[i].QuestionID + '" href="javascript:void(0)">' + data[i].Content + '</a></td><td>' + data[i].Level + '</td></tr>');
                $("#question" + data[i].QuestionID).on("click", function() {
                    var questionID = $(this).attr("id").substring(8);
                    var questionContent = data[questionID - 1].Content;
                    showQuestionOne(questionID, questionContent);
                    $('#myModal').modal({ backdrop: 'static' });
                });
            }

            //$('#mytable').append('<tr><th>菜單</th></tr><tr><th>病名</th><td>'+data.sick+'</td></tr><tr><th>開胃菜</th><td>'+data.kwc+'</td></tr><tr><th>主食</th><td>'+data.zs+'</td></tr><tr><th>主菜</th><td>'+data.zc+'</td></tr><tr><th>副菜</th><td>'+data.fc+'</td></tr><tr><th>配菜</th><td>'+data.pc+'</td></tr><tr><th>抗癌菜</th><td>'+data.kac+'</td></tr><tr><th>燉湯</th><td>'+data.dt+'</td></tr><tr><th>茶飲/甜品</th><td>'+data.cy+'</td></tr>');
        },
    });

}

function test(){
    $(".sidebar").toggleClass("toggled");
    $(".overlay").toggle();
}

function showQuestionOne(questionID, questionContent) {
    $("#headerContent").empty();
    $("#headerContent").append("<h4 class='modal-title' style='text-align:center;'>Question" + questionID + "</h4>");
    $("#question-area-tags").empty();
    $("#question-area-content").addClass('question-area__content--border')
    $("#question-area-tags").append('<p>選擇題</p>');
    $("#question-area-content").empty();
    $("#question-area-content").append('<p>' + questionContent + '</p>');

    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    $.ajax({
        url: 'QueryQuestion.jsp',
        data: { questionid: questionID },
        dataType: 'Json',
        type: 'post',
        success: function(data) {
            $('#question-area-answer').empty();
            for (var i = 0; i < data.length; i++) {
                $('#question-area-answer').append('<div class="question-area__answer"><div class="question-answer-title">' + (i + 1) + '</div></div>');
                for (var j = 0; j < data[i].length; j++) {
                    $('#question-area-answer').append('<div class="question-answer"><label><span><input type = "radio" name = "answer' + i + '" value = "' + alphabet[j] + '" > </span><span> (' + alphabet[j] + ') </span><span id = "answer' + alphabet[j] + '" >' + data[i][j].Content + '</span></label></div>');
                }
                //$('#questionContent').append('<tr><td>' + data[i].QuestionID + '</td><td>完型填空</td><td><a id="question' + data[i].QuestionID + '" href="javascript:void(0)">' + data[i].Content + '</a></td><td>' + data[i].Level + '</td></tr>');
                //$("#question" + data[i].QuestionID).on("click", function() {
                //$('#myModal').modal({backdrop:'static'});

                //});
            }

            //$('#mytable').append('<tr><th>菜單</th></tr><tr><th>病名</th><td>'+data.sick+'</td></tr><tr><th>開胃菜</th><td>'+data.kwc+'</td></tr><tr><th>主食</th><td>'+data.zs+'</td></tr><tr><th>主菜</th><td>'+data.zc+'</td></tr><tr><th>副菜</th><td>'+data.fc+'</td></tr><tr><th>配菜</th><td>'+data.pc+'</td></tr><tr><th>抗癌菜</th><td>'+data.kac+'</td></tr><tr><th>燉湯</th><td>'+data.dt+'</td></tr><tr><th>茶飲/甜品</th><td>'+data.cy+'</td></tr>');
        },
    });

}
