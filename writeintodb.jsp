<%@ page import="java.util.*,java.sql.*,ICAN.*"%>
<%@ page contentType="text/html; charset=utf-8" %>
<% 
	
	request.setCharacterEncoding("UTF-8");
	String content = request.getParameter("Content");
	String interpretation = request.getParameter("Interpretation");
	String partOfSpeech = request.getParameter("PartOfSpeech");
	String grade = request.getParameter("Grade");
	String source = request.getParameter("Source");
	int wordLength = content.length();
	String user = session.getAttribute("user").toString();

	Controller controller = new Controller();
	int level = Integer.valueOf(controller.forecastWordLevel(content,grade));

	WordBean wordbean = new WordBean();
	wordbean.setContent(content);
	wordbean.setInterpretation(interpretation);
	wordbean.setPartOfSpeech(partOfSpeech);
	wordbean.setGrade(grade);
	wordbean.setLength(wordLength);
	wordbean.setSource(source);
	wordbean.setUser(user);
	wordbean.setLevel(level);

	controller.insertWord(wordbean);
    System.out.println(user + " insertdata!");
%>