package main;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Authenticate
 */
@WebServlet("/Authenticate")
public class Authenticate extends HttpServlet {
    private static final long serialVersionUID = 1L;
    static boolean hasCert = false;

    /**
     * Default constructor. 
     */
    public Authenticate() {
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub

    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        response.setContentType("text/plain");
        TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }
            public void checkClientTrusted(X509Certificate[] certs, String authType) {
            }
            public void checkServerTrusted(X509Certificate[] certs, String authType) {
            }
        }
        };
        // Install the all-trusting trust manager
        SSLContext sc;
        sc = null;
            try {
                sc = SSLContext.getInstance("SSL");
            } catch (NoSuchAlgorithmException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            try {
                sc.init(null, trustAllCerts, new java.security.SecureRandom());
            } catch (KeyManagementException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }



        // Create all-trusting host name verifier
        HostnameVerifier allHostsValid = new HostnameVerifier() {
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        };
        SSLSocketFactory bad = sc.getSocketFactory();
        HttpsURLConnection.setDefaultSSLSocketFactory(bad);
        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
        URL chaimsLogin = new URL("https://csec380-core.csec.rit.edu/login.php");
        HttpsURLConnection myConnection = (HttpsURLConnection) chaimsLogin.openConnection();
        myConnection.setRequestMethod("POST");
        String urlEncParams = "username="+request.getParameter("username")+"&password="+request.getParameter("password");
        myConnection.setDoOutput(true);
        DataOutputStream out = new DataOutputStream(myConnection.getOutputStream());
        out.writeBytes(urlEncParams);
        out.flush();
        out.close();
        BufferedReader buffy = new BufferedReader(new InputStreamReader(myConnection.getInputStream()));
        StringBuffer input = new StringBuffer();
        String nextLine = "";
        while ((nextLine = buffy.readLine()) != null) {
            input.append(nextLine);
        }
        buffy.close();
        // TODO use JSON module and verify authenciation
        if(input.toString().startsWith("[true,\"")) {
            response.getWriter().append("User Authenticated");
            // TODO if authenicated: verify if user is in database
            // IF NOT: Add user to database using username
            //
            // Add Session token to session table and generate session expiration for login
            // Also add ip address to session table
            //
            // RETURN: Fetch information and return user id along with session token and session expiration
        }
        else {
            return;
        }
        response.setStatus(myConnection.getResponseCode());
        }

}

// ENDPOINT: isAuthenicated
// TODO IsAuthenicated
// IsAuthenticated should take a param of the session id
// This should verify if a matching sessions exists and is valid by:
// Matching the request origin's IP and ensuring the expiration date is not in the past
//
// If valid, RETURN: "true" and the user ID
// If not valid: RETURN: "false"
