<%-- 
    Document   : navBar
    Created on : 26/08/2018, 4:41:35 PM
    Author     : sharad
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>UTS Medical Application</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Materialize CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css">
    <link rel="stylesheet" href="css/main.css">

    <!--Materialize CSS - Javascript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>
</head>
<body>
    <nav>
    <div class="nav-wrapper deep-purple darken-2">
        <a href="#" class="brand-logo"><img style="margin: 6px;" src="img/uts-white.png" height="50" width="150" alt="University of Technology Sydney" title="University of Technology Sydney"></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="#">Appointments</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="logout.jsp">Logout</a></li>
      </ul>
    </div>
  </nav>
