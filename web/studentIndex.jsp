<%-- 
    Document   : studentIndex
    Created on : 03/09/2018, 10:16:34 AM
    Author     : srd
--%>

<%@page import="uts.sep.model.Doctor"%>
<%@page import="java.util.ArrayList"%>
<%@page import="uts.sep.model.Doctors"%>
<%@page import="uts.sep.model.Student"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        
        <%@include file="navBar.jsp" %>
        <% Student student = (Student) session.getAttribute("loggedStudent");
            String name = student.getName();
             
            String filePath = application.getRealPath("WEB-INF/doctors.xml");
        %>
        <jsp:useBean id="UtsApp" class="uts.sep.model.UtsApp" scope="application">
            <jsp:setProperty name="UtsApp" property="filePath" value="<%=filePath%>"/>
        </jsp:useBean>
           <% UtsApp.setFilePathForDoctors(filePath);

            Doctors doctors = UtsApp.getDoctors();  
            ArrayList<Doctor> docList = doctors.getList();
            System.out.print("" + docList );
            
            %> 
            <div class="container">
                <h1>Student Home Page</h1>
                <h4>Hello <%=name%></h4>
                <p>Welcome to the UTS Medical Appointment Services!</p>  <br> 
                <h5>List of Doctors available</h5>
                 <ul>
                <% for(int i =0; i<docList.size(); i++) {  %>
                    <li><a><%= docList.get(i).getName() %></a></li>
                <% } %>
                </ul>
                
            </div>
            
        
        
        
        
    </body>
</html>
