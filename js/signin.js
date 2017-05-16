$("#form-login").keypress(function(event) { 
    if (event.keyCode == 13) { 
        $("#submit-button").click();
    } 
}); 

function SignIn() {    
    var parm;
    var account = $("#inputEmail").val();
    var pwd = $("#inputPassword").val();
    
    parm = "account=" + account + "&password=" + pwd;
    if(account!="" && pwd!="") {
        $.ajax({
            url: "signIncheck.jsp",
            data:parm,
            type: "POST",
            dataType: "text",
            success: function(result){
                //alert(typeof(result));
                //alert(result);
                /*if(result=="null") {
                    //$('#login').effect("shake");
                    //$("#pwd").val('');
                    alert("賬號或密碼錯誤");
                }else {
                    $(".form-signin").submit();
                }*/
                if(result.trim() != "null")
                    $("#form-login").submit();
                else
                    alert("賬號或密碼錯誤");
            }
        });
    }else {
        $("#inputEmail").val('');
        $("#inputPassword").val('');
    }              
}

