package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ImageServlet
 */
@WebServlet("/ImageServlet")
public class ImageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ImageServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String imageId = (String) request.getParameter("imageID");
		String imageUrl = (String) request.getParameter("imageUrl");
		String userId = (String) request.getParameter("userID");

		System.out.println(imageId);
		System.out.println(imageUrl);
		System.out.println(userId);

		try {
			Runtime.getRuntime().exec(
					"python ../MachineLearning/imageSimUrl.py -ud" + userId + " -imd" + imageId + " -imu" + imageUrl);

			Runtime.getRuntime().exec("python ../MachineLearning/jaccardSimilarity.py");

		} catch (IOException i) {
			System.out.println(i.getMessage());
		}

		System.out.println(System.getProperty("user.dir"));
	}

}
