	<%@page contentType="text/html" pageEncoding="UTF-8"%>

  
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Uplaod File Sample</title>
  
  
    <form action="recvFile.jsp" method="post" enctype="multipart/form-data">
    	<input type="text"  id="lessonplan-Lesson" />
      Select File to upload :<input type="file" name="filename" value="" /><br>
      <input type="submit" value="Upload" name="upload" />
    </form>