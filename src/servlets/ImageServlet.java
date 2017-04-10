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
		String path = "/Users/sriramsomasundaram/Documents/workspace/image-network/MachineLearning/";
		// Note that the path will be unique for you guys as well as pythonPath may be different.
		// You will most likely use option 1 for python path below. Mine is more specific b/c of weird settings.
//		String pythonPathOpt1 = "python";
//		String pythonPathOpt2 = "/Library/Frameworks/Python.framework/Versions/2.7/bin/python";
		String pythonPath = "/Applications/anaconda/bin/python";
		String[] command = {pythonPath, path+"imageSimUrl.py",
                "-ud", userId, 
                "-imd", imageId ,          
                "-imu" , imageUrl,
		};
		try {
			ProcessBuilder pb = new ProcessBuilder( command );
			Process p = pb.start();
			// For debugging
//			BufferedReader input = new BufferedReader(new InputStreamReader(p.getInputStream()));
//			BufferedReader in = new BufferedReader(new InputStreamReader(p.getErrorStream()));
			p.waitFor();
			// For debugging
//			String s = null;
//			while((s = in.readLine()) != null) System.out.println(s);
//			while((s = input.readLine()) != null) System.out.println(s);

			ProcessBuilder pb2 = new ProcessBuilder("python", path + "jaccardSimilarity.py");
			Process p2 = pb2.start();
			// For debugging
//			BufferedReader input2 = new BufferedReader(new InputStreamReader(p2.getInputStream()));
//			BufferedReader in2 = new BufferedReader(new InputStreamReader(p2.getErrorStream()));
			p2.waitFor();
//			while((s = in2.readLine()) != null) System.out.println(s);
//			while((s = input2.readLine()) != null) System.out.println(s);
			
			// After this point, netgraph and score files will have been updated
			// Call sigma.refresh and can process score files.
			
		} catch (Exception e) {
			System.out.println(e);
		}

		System.out.println("Image uploaded");
	}

}
