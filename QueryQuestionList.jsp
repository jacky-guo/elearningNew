<%@ page import="java.util.*,java.sql.*,ICAN.*,org.json.JSONObject,org.json.JSONArray"%>
<%@ page contentType="text/html; charset=utf-8" %>
<% 
	request.setCharacterEncoding("utf-8");
	//level = java.net.URLDecoder.decode(level,"UTF-8");
	Controller controller = new Controller();
	JSONArray searchResults = controller.queryQuestion();
    response.getWriter().print(searchResults);
%>