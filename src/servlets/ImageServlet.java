package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

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

		String params = " -ud " + userId + " -imd " + imageId + " -imu " + imageUrl;

		// Can comment out the try and catch block, if you don't want to run the
		// python part
		// and you just want to test the parameters
		try {
			String path = "/Users/sriramsomasundaram/Documents/workspace/image-network/MachineLearning/";
			ProcessBuilder pb = new ProcessBuilder("python", path + "imageSimUrl.py" + params);
			Process p = pb.start();
			BufferedReader in = new BufferedReader(new InputStreamReader(p.getErrorStream()));
			p.waitFor();
			System.out.println(in.readLine());

			ProcessBuilder pb2 = new ProcessBuilder("python", path + "jaccardSimilarity.py");
			Process p2 = pb2.start();
			BufferedReader in2 = new BufferedReader(new InputStreamReader(p.getErrorStream()));
			p2.waitFor();
			System.out.println(in2.readLine());
		} catch (Exception e) {
			System.out.println(e);
		}

		System.out.println("here");
	}

}
