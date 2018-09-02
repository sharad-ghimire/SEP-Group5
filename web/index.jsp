<%@page import="uts.sep.model.*"%>
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

        <div class="row ">
            <div class="col loginPageDiv">
                <div class="card grey lighten-3" style="position:absolute;" id="utsImg">
                    <img src="img/uts.png">
                    <div class="card-content">
                        <span class="card-title"><h3>Choose An Option</h3></span>
                        <form action="studentLogin.jsp">
       
                            <button class="btn-large deep-purple darken-3" type="submit" name="submit" style="display: block; margin: 0 auto;">
                                Login As Student
                            </button>
                        </form>
                        <form action="doctorLogin.jsp">

                            <button class="btn-large deep-purple darken-3" type="submit" name="submit" style="display: block; margin: 0 auto;">
                                Login As Doctor
                            </button>
                            
                        </form>
                        
                    </div>
                   
                </div>
            </div>
        </div>
    </body> 
</html>


