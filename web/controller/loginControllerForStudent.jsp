<%@page import="uts.sep.model.Student"%>
<%@page import="uts.sep.model.Students"%>
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
                errorMsg = "Incorrect ID and Password";

        %>
                