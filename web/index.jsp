<%-- 
    Document   : index
    Created on : 02/09/2018, 2:44:40 PM
    Author     : srd
--%>
<%@page import="uts.sep.model.Student"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="navBar.jsp" %>
<html>
    <title>Student Welcome Page</title>
<% Student student = (Student) session.getAttribute("loggedStudent");

    if(student == null) {
        response.sendRedirect("login.jsp");
    } else {
        String name = student.getName(); %> 
        <h1>Student Home Page</h1>
    <p>Hello <%=name%>, Welcome to the UTS Medical Appointment Application!</p>  
    </body>
</html> 
<%}%>