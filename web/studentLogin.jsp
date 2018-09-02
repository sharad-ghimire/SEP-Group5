<%@page import="uts.sep.model.*"%>
<%@page import="uts.sep.model.Students"%>
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
                
                String filePath = application.getRealPath("WEB-INF/students.xml");%>
        <jsp:useBean id="UtsApp" class="uts.sep.model.UtsApp" scope="application">
            <jsp:setProperty name="UtsApp" property="filePath" value="<%=filePath%>"/>
        </jsp:useBean>
        <%
            String id = request.getParameter("id");
            String password = request.getParameter("psw");

            UtsApp.setFilePath(filePath);

            Students students = UtsApp.getStudents();
            Student student = students.login(id, password);

            if (student != null) {
                session.setAttribute("loggedStudent", student);
                response.sendRedirect("index.jsp");
                
            } else {
                errorMsg = "Incorrect ID and Password";%>
                
                
                <div class="row ">
            <div class="col s12 m5 offset-m4">
                <div class="card">
                    <div class="card-action  teal lighten-3 " id="utsImg">
                        <img src="img/uts.png"> 
                    </div>
                    <div class="card-content">
                       <span class="card-title">Student Log In</span>
                       <form method="post" action="studentLogin.jsp">
                           <div class="form-field">
                               <p style="align:center; color:red;"><%=errorMsg%></p>
                                <input type="hidden" name="submitted" value="yes"/>
                                <label><b>Student ID</b></label>
                                <input type="text" placeholder="Enter your Student ID" name="id" required>
                               
                           </div><br>                           
                           <div class="form-field">
                                <label><b>Password</b></label>
                                <input type="password" placeholder="Enter Your Password" name="psw" required>
                           </div><br>
                           
                            <div class="form-field">
                            <button class="btn-large blue darken-1" type="submit" name="submit" style="width: 100%">
                                Login
                                </button>
                           </div><br>
                            <div class="form-field">
                                <button onclick="location.href='doctorLogin.jsp'" class="btn-large  blue darken-1 white-text" name="submitForDoctor" style="width: 100%">
                                Login As Doctor
                                </button>
                           </div><br>
                       </form>
                    </div>
                     <div class="card-action">
                        <p>If you have not used UTS email before, please activate your account, and use your webmail login to
                            access your records.</p>
                        <p align="center"><a target="_blank" class="deep-purple-text text-darken-3" href="https://email.itd.uts.edu.au/webapps/myaccount/activation/">Activate
                                your Account</a></p>
                    </div>  
                   </div>  
                </div>
            </div>
 
        <%}} else { %>
       <div class="row ">
            <div class="col s12 m5 offset-m4">
                <div class="card">
                    <div class="card-action  teal lighten-3 " id="utsImg">
                        <img src="img/uts.png"> 
                    </div>
                    <div class="card-content">
                       <span class="card-title">Student Log In</span>
                       <form method="post" action="studentLogin.jsp">
                           <div class="form-field">
                                <input type="hidden" name="submitted" value="yes"/>
                                <label><b>Student ID</b></label>
                                <input type="text" placeholder="Enter your Student ID" name="id" required>
                               
                           </div><br>                           
                           <div class="form-field">
                                <label><b>Password</b></label>
                                <input type="password" placeholder="Enter Your Password" name="psw" required>
                           </div><br>
                           
                            <div class="form-field">
                            <button class="btn-large blue darken-1" type="submit" name="submit" style="width: 100%">
                                Login
                                </button>
                           </div><br>
                            <div class="form-field">
                                <button onclick="location.href='doctorLogin.jsp'" class="btn-large  blue darken-1 white-text" name="submitForDoctor" style="width: 100%">
                                Login As Doctor
                                </button>
                           </div><br>
                       </form>
                    </div>
                     <div class="card-action">
                        <p>If you have not used UTS email before, please activate your account, and use your webmail login to
                            access your records.</p>
                        <p align="center"><a target="_blank" class="deep-purple-text text-darken-3" href="https://email.itd.uts.edu.au/webapps/myaccount/activation/">Activate
                                your Account</a></p>
                    </div>  
                   </div>  
                </div>
            </div>
    </body> 
</html>
<% }%>

