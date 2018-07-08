package main;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Properties;


/**
 * Servlet implementation class Authenticated
 */
@SuppressWarnings("unused")
@WebServlet(asyncSupported = true, urlPatterns = { "/isAuthenticated" })
public class Authenticated extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Authenticated() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Usage: POST /isAuthenticated?id=<token>");
		
	}
	// ENDPOINT: isAuthenicated

	// TODO IsAuthenicated
	// IsAuthenticated should take a param of the session id
	// This should verify if a matching sessions exists and is valid by:
	// Matching the request origin's IP and ensuring the expiration date is not in the past
	//
	// If valid, RETURN: "true" and the user ID
	// If not valid: RETURN: "false"

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		String id = request.getParameter("id");
		String sqlUrl = "jdbc:mysql://mariadb:3306/accounts";
		Properties sqlStr = new Properties();
		sqlStr.put("user", "root");
		sqlStr.put("password", "default");
		try {
			Connection conn = DriverManager.getConnection(sqlUrl, sqlStr);
			PreparedStatement ps = conn.prepareStatement(String.format("Select *  from sessions where session_id=%s AND ip = %s AND 0 >  (expiration - now()) ;", id, request.getRemoteAddr()));
			ResultSet rs = ps.executeQuery();
			Boolean authenticated = rs.first();
			String uid = rs.getString("user_id");
			response.setContentType("application/JSON");
			response.getWriter().append("{"+ "id:"+uid +","
					+"authenticated:" + authenticated.toString()
		    		+"}");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

}
