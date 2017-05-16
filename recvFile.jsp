<%@page import="java.io.*,java.util.*,ICAN.*"%>
<%
  request.setCharacterEncoding("utf-8");
  try{
    String user = session.getAttribute("user").toString();
    ServletInputStream in = request.getInputStream();
    int bLen=0;
    byte[] buffer = new byte[1024];
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    //baos.setHeaderEncoding("utf-8");
    while((bLen=in.read(buffer))>0){
      baos.write(buffer, 0, bLen);
    }
    
    String rs = baos.toString(request.getCharacterEncoding());

    int a = rs.indexOf("grade");
    int b = rs.indexOf("lesson");
    int c = rs.indexOf("HashTag");
    int d = rs.indexOf("filename=");


    int gradel = rs.indexOf("-",a+7);
    String grade = rs.substring(a+7,gradel);

    int lessonl = rs.indexOf("-",b+8);
    String lesson = rs.substring(b+8,lessonl);

    int HashTagl = rs.indexOf("-",c+9);
    String HashTag = rs.substring(c+9,HashTagl);

    int filenamel = rs.indexOf("\"",d+10);
    String filename2 = rs.substring(d+10,filenamel);
    int filename2l = filename2.indexOf(".");
    String filename3 = filename2.substring(filename2l,filename2.length());

    //String name = grade + lesson + HashTag + filenmae3;
    String name = filename2;
    //System.out.println(lesson);
    /*
    //String boundary = rs.substring(0,a);
    String boundary = rs.substring(c,d);
    //out.println(boundary);
    int bdlen = boundary.length();
    //out.println(bdlen);
    //get the last location byte
    int sec = rs.indexOf(boundary, bdlen);
    //get the content-Disposition
    int cdlen = rs.indexOf("Content-Disposition",bdlen);
    int cdlenl = rs.indexOf("\r\n",cdlen);
    String cdstr = rs.substring(cdlen+20,cdlenl);

    int ctlen = rs.indexOf("Content-Type",bdlen);
    int ctlenl = rs.indexOf("\r\n",ctlen);
    String ctstr = rs.substring(ctlen +13,ctlenl );

    String name = "";
    int fnlen = cdstr.indexOf("filename=");
    int fnlenl = cdstr.indexOf("\"",fnlen+10);
    name = cdstr.substring(fnlen+10,fnlenl);*/
    LessonplanBean lessonplanbean = new LessonplanBean();
        lessonplanbean.setGrade(grade);
        lessonplanbean.setLesson(lesson);
        lessonplanbean.setFilename(name);
        lessonplanbean.setHashTag(HashTag);
        lessonplanbean.setUser(user);

    
    Controller controller = new Controller();
    controller.insertLessonplan(lessonplanbean);
    System.out.println(user + " insertlessonplan!");


    String filename = "../webapps/elearning/lessonplan/"+name;
    FileOutputStream fos = new FileOutputStream(filename);
    fos.write(baos.toByteArray());
    fos.close();
    out.println("upload success!");
    //pageContext.forward("home.html",);
    response.setHeader("refresh","1;URL=home.html") ;
  }catch(Exception ex){
    out.println("upload fail! you must choice grade and fill lesson and upload fill! ");
    System.out.println(ex);
    response.setHeader("refresh","2;URL=home.html") ;
  }
%>