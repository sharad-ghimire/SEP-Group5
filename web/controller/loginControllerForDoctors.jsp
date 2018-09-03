<%@page import="uts.sep.model.Doctor"%>
<%@page import="uts.sep.model.Doctors"%>
<%
            String errorMsg = "";
            String submitted = request.getParameter("submitted");
            if (submitted != null && submitted.equals("yes")) {
                
                String filePath = application.getRealPath("WEB-INF/doctors.xml");%>
        <jsp:useBean id="UtsApp" class="uts.sep.model.UtsApp" scope="application">
            <jsp:setProperty name="UtsApp" property="filePath" value="<%=filePath%>"/>
        </jsp:useBean>
        <%
            String id = request.getParameter("id");
            String password = request.getParameter("psw");

            UtsApp.setFilePathForDoctors(filePath);

            Doctors doctors = UtsApp.getDoctors();
            Doctor doctor = doctors.login(id, password);

            if (doctor != null) {
                session.setAttribute("loggedDoctor", doctor);
                response.sendRedirect("index.jsp");
                
            } else {
                errorMsg = "Incorrect ID and Password";%>