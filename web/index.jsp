<%-- 
    Document   : index
    Created on : 02/09/2018, 2:44:40 PM
    Author     : srd
--%>
<%@page import="uts.sep.model.Student"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="navBar.jsp" %>

<% Student student = (Student) session.getAttribute("loggedStudent");

    if(student == null) {
        response.sendRedirect("login.jsp");
    } else {
        String name = student.getName(); %>  
    <p>Hello <%=name%></p>  
    </body>
    </html> 
    <%}%>