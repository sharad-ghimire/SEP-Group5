<%@page import="uts.sep.model.*"%>
<%@page import="uts.sep.model.Doctors"%>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>

    <head>
        <title>UTS Medical Application</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>
    </head>
    <body>
        <%
            String errorMsg = "";
            String submitted = request.getParameter("submitted");
            if (submitted != null && submitted.equals("yes")) {
                
                String filePath = application.getRealPath("WEB-INF/doctors.xml");%>
        <jsp:useBean id="UtsAppDoctor" class="uts.sep.model.UtsAppDoctor" scope="application">
            <jsp:setProperty name="UtsAppDoctor" property="filePath" value="<%=filePath%>"/>
        </jsp:useBean>
        <%
            String id = request.getParameter("id");
            String password = request.getParameter("psw");

            UtsAppDoctor.setFilePath(filePath);

            Doctors doctors = UtsAppDoctor.getDoctors();
            Doctor doctor = doctors.login(id, password);

            if (doctor != null) {
                session.setAttribute("loggedDoctor", doctor);
                response.sendRedirect("welcomeDoctor.jsp");
                
            } else {
                errorMsg = "Incorrect ID and Password";%>
        <div class="row ">
            <div class="col loginPageDiv">
                <div class="card grey lighten-3" style="position:absolute;" id="utsImg">
                    <img src="img/uts.png">
                    <div class="card-content">
                        <span class="card-title"><h3>Doctor Login Page</h3></span>
                        <form method="post" action="doctorLogin.jsp">
                            <input type="hidden" name="submitted" value="yes"/>
                            <p style="align:center; color:red;"><%=errorMsg%></p>
                            <label><b>Doctor ID</b></label>
                            <input type="text" placeholder="Enter your Doctor ID" name="id" required>
                            <label><b>Password</b></label>
                            <input type="password" placeholder="Enter Your Password" name="psw" required>
                            <button class="btn-large deep-purple darken-3" type="submit" name="submit" style="display: block; margin: 0 auto;">
                                Login
                            </button>
                        </form>
                            <form action="index.jsp">
                            <button class="btn-large deep-purple darken-3" type="submit" name="submit" style="display: block; margin: 0 auto;">
                                Main Menu
                            </button>
                            </form>
                    </div>
                    
                </div>
            </div>
        </div>
        <%}} else { %>
       <div class="row ">
            <div class="col loginPageDiv">
                <div class="card grey lighten-3" style="position:absolute;" id="utsImg">
                    <img src="img/uts.png">
                    <div class="card-content">
                        <span class="card-title"><h3>Doctor Log In</h3></span>
                        <form method="post" action="doctorLogin.jsp">
                            <input type="hidden" name="submitted" value="yes"/>
                            <label><b>Doctor ID</b></label>
                            <input type="text" placeholder="Enter your Student ID" name="id" required>
                            <label><b>Password</b></label>
                            <input type="password" placeholder="Enter Your Password" name="psw" required>
                            <button class="btn-large deep-purple darken-3" type="submit" name="submit" style="display: block; margin: 0 auto;">
                                Login
                            </button>
                        </form>
                        <form action="index.jsp">
                            <button class="btn-large deep-purple darken-3" type="submit" name="submit" style="display: block; margin: 0 auto;">
                                Main Menu
                            </button>
                            </form>
                    </div>
                   
                </div>
            </div>
        </div>
    </body> 
</html>
<% }%>

