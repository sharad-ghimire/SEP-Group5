<%-- 
  
--%>
<%@page import="uts.sep.model.Student"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="navBar.jsp" %>
<html>
    <title>Student Welcome Page</title>
<% Student student = (Student) session.getAttribute("loggedStudent");

    if(student == null) {
        response.sendRedirect("studentLogin.jsp");
    } else {
        String name = student.getName();
        String age = student.getAge(); 
        String condition = student.getCondition(); 
%> 
<div class="container">
    <h1 align="center">Student Profile</h1>
        <h3>Account Details:</h3>
        
        <table>
            <tr>
                <td>Full Name:</td> 
                <td><%=name%></td>
            </tr>
            <tr>
                <td>Age:</td>
                <td><%=age%></td>
            </tr>
            <tr>
                <td>Medical History:</td>
                <td><%=condition%></td>
            </tr>
        </table>
    
</div>
    
<%}%>