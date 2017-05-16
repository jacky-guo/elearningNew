<%@ page import="java.util.*,java.sql.*,java.sql.ResultSet,ICAN.*"%>
<%@ page contentType="text/html; charset=utf-8" %>
<% 
	request.setCharacterEncoding("UTF-8");
	String username = request.getParameter("account");
	String password = request.getParameter("password");
	Controller controller = new Controller();
	String result = controller.checkaccount(username,password);
	if(result==null){
		out.print("null");
	}else{
		out.print(username);
		System.out.println(username + " Login!");
		session.setAttribute("user", username);
	}

%>