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
            response.sendRedirect("studentIndex.jsp");
    } else if(doctor != null && student == null){
            String name = doctor.getName(); %> 
            <div class="container">
                <h1>Doctor Home Page</h1>
                <h4>Hello <%=name%></h4>
                <p>Welcome to the UTS Medical Appointment Services!</p>  
                <h2>Your Bookings For Today</h2>              
                 <div class="col s12 m8 offset-m2 l6 offset-l3">
                    <div class="card-panel teal lighten-5 z-depth-1">
                    <div class="row valign-wrapper">
                        <div class="col s2">
                            <h5>Robin Roqueza</h5>
                        </div>
                        <div class="col s10">
                          <span class="black-text">
                              <ul>
                                  <li>Returning Patient</li>
                                  <li>Time: <span class="red-text">11:00 AM</span></li> 
                                   <li>Last Visited: 2018-09-98</li>
                                   
                              </ul>
                          </span>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="col s12 m8 offset-m2 l6 offset-l3">
                    <div class="card-panel teal lighten-5 z-depth-1">
                    <div class="row valign-wrapper">
                        <div class="col s2">
                            <h5>Sharad Ghimire</h5>
                        </div>
                        <div class="col s10">
                          <span class="black-text">
                              <ul>
                                  <li>New Patient</li> 
                                  <li>Time: <span class="red-text">2:00 PM</span></li> 
                              </ul>
                          </span>
                        </div>
                      </div>
                    </div>
                </div>
  
            </div>
    
    <%}%>
    
<!--    <%@include file="footer.jsp" %> -->
        
