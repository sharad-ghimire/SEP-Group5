<%-- 

--%>
<%@page import="uts.sep.model.Doctor"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="navBar.jsp" %>
<html>
    <title>Doctor Welcome Page</title>
<% Doctor doctor = (Doctor) session.getAttribute("loggedDoctor");

    if(doctor == null) {
        response.sendRedirect("doctorLogin.jsp");
    } else {
        String name = doctor.getName(); %> 
        <h1>Doctor Home Page</h1>
    <p>Hello <%=name%>, Welcome to the UTS Medical Appointment Application!</p>  
    </body>
</html> 
<%}%>