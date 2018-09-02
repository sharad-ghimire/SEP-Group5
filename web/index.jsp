<%@page import="uts.sep.model.*"%>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<%@include file="navBar.jsp" %>
<% Student student = (Student) session.getAttribute("loggedStudent");
   Doctor doctor = (Doctor) session.getAttribute("loggedDoctor");
    

    if(student == null && doctor == null) {
        response.sendRedirect("studentLogin.jsp");
        
    } else if(student != null && doctor == null){
            String name = student.getName(); %> 
            <div class="container">
                <h1>Student Home Page</h1>
                <h4>Hello <%=name%></h4>
                <p>Welcome to the UTS Medical Appointment Services!</p>            
            </div>
    <%} else if(doctor != null && student == null){
            String name = doctor.getName(); %> 
            <div class="container">
                <h1>Doctor Home Page</h1>
                <h4>Hello <%=name%></h4>
                <p>Welcome to the UTS Medical Appointment Services!</p>            
            </div>
    
    <%}%>
        
        
