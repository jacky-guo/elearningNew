<%@ page import="java.util.*,java.sql.*,ICAN.*"%>
<%@ page contentType="text/html; charset=utf-8" %>
<% 
	
	request.setCharacterEncoding("UTF-8");
	String content = request.getParameter("Content");
	String source = request.getParameter("Source");
	String grade = request.getParameter("Grade");
	String hashTag = request.getParameter("HashTag");
	String user = session.getAttribute("user").toString();

	ArrayList<ParagraphBean> paragraphBeanList = new ArrayList<ParagraphBean>();
	Controller controller = new Controller();
	int previousParagraphID = 0;
	String[] paragraphContent = content.split("\n");
	
	for(String temp:paragraphContent){
		if (!temp.equals("")) {
			int sentenceLength = temp.split("\\.").length;
			int wordCount = temp.split(" ").length;
			int level = Integer.valueOf(grade) * 100;
			ParagraphBean paragraphBean = new ParagraphBean();
			paragraphBean.setContent(temp);
			paragraphBean.setHashTag(hashTag);
			paragraphBean.setGrade(grade);
			paragraphBean.setSource(source);
			paragraphBean.setUser(user);
			paragraphBean.setPreviousParagraphID(previousParagraphID);
			paragraphBean.setSentenceLength(sentenceLength);
			paragraphBean.setWordCount(wordCount);
			paragraphBean.setLevel(level);
			previousParagraphID = controller.insertParagraph(paragraphBean);
			paragraphBean.setParagraphID(previousParagraphID);
			paragraphBeanList.add(paragraphBean);
		}
	}

	for(ParagraphBean paragraphBean:paragraphBeanList)
	{	
		QuestionBean questionbean = new QuestionBean();
		questionbean = controller.questionpaser(paragraphBean);
		int questionid = controller.insertQuestion(questionbean);
		controller.insertAnswer(questionbean,questionid);
	}

    System.out.println(user + " insertparagraph!");
%>