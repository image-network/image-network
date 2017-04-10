package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class userSearchServlet
 */
@WebServlet("/userSearchServlet")
public class userSearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public userSearchServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uid = (String) request.getParameter("uid");
		String fullname = (String) request.getParameter("fullname");
		String username = (String) request.getParameter("username");
		String email = (String) request.getParameter("email");
		
		HttpSession session = request.getSession(true);

		session.setAttribute("uid", uid);
		session.setAttribute("fullname", fullname);
		session.setAttribute("username", username);
		session.setAttribute("email", email);
		
		response.sendRedirect("userProfile.jsp");
		return;
	}

}
